import { toPng, toJpeg, toSvg } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { getNodesBounds, getViewportForBounds, type Node } from 'reactflow';

export type ExportFormat = 'png' | 'jpg' | 'svg' | 'pdf';

export interface ExportOptions {
  width?: number;
  height?: number;
  backgroundColor?: string | null;
  padding?: number;
  maxZoom?: number;
  minZoom?: number;
  jpegQuality?: number;
  pixelRatio?: number;
  selector?: string;
}

export const DEFAULT_OPTIONS: Required<Omit<ExportOptions, 'backgroundColor' | 'selector'>> & {
  backgroundColor: string | null;
  selector: string;
} = {
  width: 1920,
  height: 1080,
  backgroundColor: 'var(--color-diagram)',
  padding: 0.5,
  maxZoom: 2,
  minZoom: 0.1,
  jpegQuality: 0.95,
  pixelRatio: 2,
  selector: '.react-flow__viewport',
};

const pad2 = (n: number) => String(n).padStart(2, '0');

const timestamp = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}_${pad2(d.getHours())}-${pad2(d.getMinutes())}-${pad2(d.getSeconds())}`;
};

const withExt = (base: string, ext: string) => `${base}.${ext}`;

const ensureDom = (selector: string): HTMLElement => {
  const el = document.querySelector(selector) as HTMLElement | null;
  if (!el) {
    throw new Error();
  }

  return el;
};

const computeTransform = (nodes: Node[], opt: Required<ExportOptions>) => {
  const bounds = getNodesBounds(nodes);
  return getViewportForBounds(bounds, opt.width, opt.height, opt.padding, opt.maxZoom, opt.minZoom);
};

const buildHtmlToImageOptions = (
  transform: { x: number; y: number; zoom: number },
  opt: Required<ExportOptions>,
) => ({
  backgroundColor: opt.backgroundColor ?? undefined, // undefined preserves transparency for PNG
  width: opt.width,
  height: opt.height,
  cacheBust: true,
  pixelRatio: opt.pixelRatio,
  style: {
    width: `${opt.width}px`,
    height: `${opt.height}px`,
    transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.zoom})`,
  },
});

const triggerDownload = (href: string, filename: string) => {
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

const exportPNG = async (
  el: HTMLElement,
  transform: ReturnType<typeof computeTransform>,
  opt: Required<ExportOptions>,
  filename: string,
) => {
  const dataUrl = await toPng(el, buildHtmlToImageOptions(transform, opt));
  triggerDownload(dataUrl, withExt(filename, 'png'));
};

const exportJPEG = async (
  el: HTMLElement,
  transform: ReturnType<typeof computeTransform>,
  opt: Required<ExportOptions>,
  filename: string,
) => {
  const base = buildHtmlToImageOptions(transform, opt);
  const dataUrl = await toJpeg(el, {
    ...base,
    quality: opt.jpegQuality,
    backgroundColor: opt.backgroundColor ?? '#ffffff',
  });
  triggerDownload(dataUrl, withExt(filename, 'jpg'));
};

const exportSVG = async (
  el: HTMLElement,
  transform: ReturnType<typeof computeTransform>,
  opt: Required<ExportOptions>,
  filename: string,
) => {
  const dataUrl = await toSvg(el, {
    ...buildHtmlToImageOptions(transform, opt),
    pixelRatio: 1,
    filter: () => true,
  });
  triggerDownload(dataUrl, withExt(filename, 'svg'));
};

const exportPDF = async (
  el: HTMLElement,
  transform: ReturnType<typeof computeTransform>,
  opt: Required<ExportOptions>,
  filename: string,
) => {
  const pngUrl = await toPng(el, buildHtmlToImageOptions(transform, opt));
  const landscape = opt.width >= opt.height;
  const pdf = new jsPDF({
    unit: 'px',
    format: [opt.width, opt.height],
    orientation: landscape ? 'l' : 'p',
  });
  pdf.addImage(pngUrl, 'PNG', 0, 0, opt.width, opt.height);
  pdf.save(withExt(filename, 'pdf'));
};

export const exportDiagram = async (
  format: ExportFormat,
  nodes: Node[],
  name = 'diagram',
  options: ExportOptions = {},
): Promise<void> => {
  const opt: Required<ExportOptions> = {
    ...DEFAULT_OPTIONS,
    ...options,
  } as Required<ExportOptions>;

  const filename = `${name}_${timestamp()}`;

  const el = ensureDom(opt.selector);
  const transform = computeTransform(nodes, opt);

  switch (format) {
    case 'png':
      return exportPNG(el, transform, opt, filename);
    case 'jpg':
      return exportJPEG(el, transform, opt, filename);
    case 'svg':
      return exportSVG(el, transform, opt, filename);
    case 'pdf':
      return exportPDF(el, transform, opt, filename);
    default:
      return;
  }
};

export const makeExportHandler =
  (
    getters: {
      getNodes: () => Node[];
    },
    filePrefix = 'diagram',
    baseOptions: Partial<ExportOptions> = {},
  ) =>
  async (format: ExportFormat) => {
    const { getNodes } = getters;

    try {
      await exportDiagram(format, getNodes(), filePrefix, baseOptions);
    } catch {
      return { success: false, error: 'Failed to export diagram' };
    }
  };
