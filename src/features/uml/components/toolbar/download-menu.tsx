import { Download, FileText, Image, Save } from 'lucide-react';
import { Panel, useReactFlow } from 'reactflow';
import { toast } from 'sonner';

import type { ExportFormat } from '@/features/uml/utils';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { saveDiagram } from '@/features/uml/actions';
import { DEFAULT_OPTIONS, makeExportHandler } from '@/features/uml/utils';

interface Props {
  diagramId: string;
  width?: number;
  height?: number;
  backgroundColor?: string | null;
  filePrefix?: string;
  pixelRatio?: number;
}

const dropdownItems = [
  { key: 'svg', label: 'SVG', Icon: Image },
  { key: 'png', label: 'PNG', Icon: Image },
  { key: 'jpg', label: 'JPEG', Icon: Image },
  { key: 'pdf', label: 'PDF', Icon: FileText },
];

export const DownloadMenu = ({
  diagramId,
  width = DEFAULT_OPTIONS.width,
  height = DEFAULT_OPTIONS.height,
  backgroundColor = DEFAULT_OPTIONS.backgroundColor,
  filePrefix = 'diagram',
  pixelRatio = DEFAULT_OPTIONS.pixelRatio,
}: Props) => {
  const reactFlow = useReactFlow();
  const { toObject } = useReactFlow();
  const handleExport = makeExportHandler(
    {
      ...reactFlow,
    },
    filePrefix,
    { width, height, backgroundColor, pixelRatio },
  );

  const handleSave = () =>
    saveDiagram(diagramId, JSON.stringify(toObject())).then(res => {
      if (!res.success) {
        toast.error(res.error);
      } else {
        toast.success('Diagram saved successfully');
      }
    });

  return (
    <Panel
      position="top-right"
      className="flex gap-2"
    >
      <Button
        className="rounded-lg shadow-md"
        variant="outline"
        onClick={handleSave}
      >
        <Save className="size-4" /> Save
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-lg shadow-md">
            <Download className="size-4" /> Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="min-w-42 rounded-md"
        >
          <DropdownMenuLabel>File Format</DropdownMenuLabel>
          {dropdownItems.map(({ key, label, Icon }) => (
            <DropdownMenuItem
              key={key}
              onClick={() => handleExport(key as ExportFormat)}
            >
              <Icon className="size-4" /> {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </Panel>
  );
};
