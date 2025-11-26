import { Download, FileText, Image, Save } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
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
import { STORAGE_KEYS } from '@/constants';
import { saveDiagram } from '@/features/uml/actions';
import { makeExportHandler } from '@/features/uml/utils';

interface Props {
  diagramId: string;
}

const dropdownItems = [
  { key: 'svg', label: 'SVG', Icon: Image },
  { key: 'png', label: 'PNG', Icon: Image },
  { key: 'jpg', label: 'JPEG', Icon: Image },
  { key: 'pdf', label: 'PDF', Icon: FileText },
];

const diagramBackgroundMap = {
  light: '#ffffff',
  dark: '#000000',
};

export const DownloadMenu = ({ diagramId }: Props) => {
  const reactFlow = useReactFlow();
  const { theme } = useTheme();
  const { toObject } = useReactFlow();
  const handleExport = makeExportHandler(
    {
      ...reactFlow,
    },
    'diagram',
    diagramBackgroundMap[theme as keyof typeof diagramBackgroundMap],
  );

  useEffect(() => {
    const enabled = !!localStorage.getItem(STORAGE_KEYS.AUTO_SAVE_ENABLED);

    if (!enabled) {
      return;
    }

    const interval =
      parseInt(localStorage.getItem(STORAGE_KEYS.AUTO_SAVE_INTERVAL) || '5', 10) || 5;

    const intervalId = setInterval(() => {
      saveDiagram(diagramId, JSON.stringify(toObject()));
    }, interval * 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
        className="cursor-pointer rounded-lg shadow-md"
        variant="outline"
        onClick={handleSave}
      >
        <Save className="size-4" /> Save
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="cursor-pointer rounded-lg shadow-md">
            <Download className="size-4" /> Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="min-w-42 rounded-md"
        >
          <DropdownMenuLabel>Format</DropdownMenuLabel>
          {dropdownItems.map(({ key, label, Icon }) => (
            <DropdownMenuItem
              key={key}
              onClick={() => handleExport(key as ExportFormat)}
              className="cursor-pointer"
            >
              <Icon className="size-4" /> {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </Panel>
  );
};
