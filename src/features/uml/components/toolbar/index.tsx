import { clsx } from 'clsx';
import Image from 'next/image';

import type { EdgeType } from '@/features/uml/types';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

type Props = {
  selectedEdgeType: EdgeType;
  onEdgeTypeChange: (type: EdgeType) => void;
  onAddActor: () => void;
  onAddUseCase: () => void;
  onAddNote: () => void;
  onAddBoundary: () => void;
  onAddClassNode: () => void;
  onAddPackage: () => void;
};

export const Toolbar = ({
  selectedEdgeType,
  onEdgeTypeChange,
  onAddActor,
  onAddUseCase,
  onAddNote,
  onAddBoundary,
  onAddClassNode,
  onAddPackage,
}: Props) => {
  const componentGroups = [
    {
      title: 'Use Case',
      items: [
        { iconSrc: '/uml/actor.svg', label: 'Actor', onClick: onAddActor },
        { iconSrc: '/uml/use-case.svg', label: 'Use Case', onClick: onAddUseCase },
        { iconSrc: '/uml/system-boundary.svg', label: 'System Boundary', onClick: onAddBoundary },
        { iconSrc: '/uml/text.svg', label: 'Text', onClick: onAddNote },
      ],
    },
    {
      title: 'Class Diagram',
      items: [
        { iconSrc: '/uml/class.svg', label: 'Class', onClick: onAddClassNode },
        { iconSrc: '/uml/text.svg', label: 'Text', onClick: onAddNote },
      ],
    },
    {
      title: 'Package Diagram',
      items: [
        { iconSrc: '/uml/package.svg', label: 'Package', onClick: onAddPackage },
        { iconSrc: '/uml/text.svg', label: 'Text', onClick: onAddNote },
      ],
    },
    {
      title: 'Relationships',
      items: [
        {
          iconSrc: '/arrows/association.svg',
          label: 'Association',
          onClick: () => onEdgeTypeChange('association'),
          edgeType: 'association',
        },
        {
          iconSrc: '/arrows/include.svg',
          label: 'Include',
          onClick: () => onEdgeTypeChange('include'),
          edgeType: 'include',
        },
        {
          iconSrc: '/arrows/extend.svg',
          label: 'Extend',
          onClick: () => onEdgeTypeChange('extend'),
          edgeType: 'extend',
        },
        {
          iconSrc: '/arrows/generalization.svg',
          label: 'Generalization',
          onClick: () => onEdgeTypeChange('generalization'),
          edgeType: 'generalization',
        },
        {
          iconSrc: '/arrows/inheritance.svg',
          label: 'Inheritance',
          onClick: () => onEdgeTypeChange('inheritance'),
          edgeType: 'inheritance',
        },
        {
          iconSrc: '/arrows/realization.svg',
          label: 'Realization',
          onClick: () => onEdgeTypeChange('realization'),
          edgeType: 'realization',
        },
        {
          iconSrc: '/arrows/dependency.svg',
          label: 'Dependency',
          onClick: () => onEdgeTypeChange('dependency'),
          edgeType: 'dependency',
        },
        {
          iconSrc: '/arrows/aggregation.svg',
          label: 'Aggregation',
          onClick: () => onEdgeTypeChange('aggregation'),
          edgeType: 'aggregation',
        },
        {
          iconSrc: '/arrows/composition.svg',
          label: 'Composition',
          onClick: () => onEdgeTypeChange('composition'),
          edgeType: 'composition',
        },
      ],
    },
  ];

  return (
    <aside className="bg-card h-full p-2">
      <Accordion
        type="multiple"
        defaultValue={['Use Case', 'Class Diagram', 'Relationships']}
        className="w-full space-y-2"
      >
        {componentGroups.map(({ title, items }) => (
          <AccordionItem
            key={title}
            value={title}
            className="border-border border-b last:border-b-0"
          >
            <AccordionTrigger className="hover:bg-accent hover:text-accent-foreground mb-1 p-3 text-sm font-medium text-nowrap no-underline!">
              {title}
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-4">
              <div className="flex flex-wrap items-center gap-2">
                {items.map(item => {
                  const { iconSrc, label, onClick } = item;
                  const isSelected = 'edgeType' in item && item.edgeType === selectedEdgeType;

                  return (
                    <Button
                      key={label}
                      size="icon"
                      variant="outline"
                      onClick={onClick}
                      title={label}
                      className={clsx(
                        'size-12 cursor-pointer rounded-md border transition-colors',
                        isSelected
                          ? 'bg-primary/15 border-primary shadow-sm'
                          : 'hover:bg-primary/15 hover:border-primary',
                      )}
                    >
                      <Image
                        src={iconSrc}
                        width={28}
                        height={28}
                        alt={label}
                        className="size-7"
                      />
                    </Button>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
};
