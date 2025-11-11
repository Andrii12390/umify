import { Download, FileText, Image } from 'lucide-react';
import { Panel, useReactFlow } from 'reactflow';

import type { ExportFormat } from '@/features/uml/utils';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DEFAULT_OPTIONS, makeExportHandler } from '@/features/uml/utils';

interface Props {
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
  width = DEFAULT_OPTIONS.width,
  height = DEFAULT_OPTIONS.height,
  backgroundColor = DEFAULT_OPTIONS.backgroundColor,
  filePrefix = 'diagram',
  pixelRatio = DEFAULT_OPTIONS.pixelRatio,
}: Props) => {
  const reactFlow = useReactFlow();

  const handleExport = makeExportHandler(
    {
      ...reactFlow,
    },
    filePrefix,
    { width, height, backgroundColor, pixelRatio },
  );

  return (
    <Panel position="top-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-lg shadow-md">
            <Download className="size-4" /> Export Diagram
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
