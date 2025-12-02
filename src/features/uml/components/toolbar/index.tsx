import { clsx } from 'clsx';
import { debounce } from 'lodash-es';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import type { EdgeType } from '@/features/uml/types';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
      title: 'Use Case Diagram',
      items: [
        { iconSrc: '/uml/nodes/actor.svg', label: 'Actor', onClick: onAddActor },
        { iconSrc: '/uml/nodes/use-case.svg', label: 'Use Case', onClick: onAddUseCase },
        {
          iconSrc: '/uml/nodes/system-boundary.svg',
          label: 'System Boundary',
          onClick: onAddBoundary,
        },
        { iconSrc: '/uml/nodes/text.svg', label: 'Text', onClick: onAddNote },
      ],
    },
    {
      title: 'Class Diagram',
      items: [
        { iconSrc: '/uml/nodes/class.svg', label: 'Class', onClick: onAddClassNode },
        { iconSrc: '/uml/nodes/text.svg', label: 'Text', onClick: onAddNote },
      ],
    },
    {
      title: 'Package Diagram',
      items: [
        { iconSrc: '/uml/nodes/package.svg', label: 'Package', onClick: onAddPackage },
        { iconSrc: '/uml/nodes/text.svg', label: 'Text', onClick: onAddNote },
      ],
    },
    {
      title: 'Relationships',
      items: [
        {
          iconSrc: '/uml/relations/association.svg',
          label: 'Association',
          onClick: () => onEdgeTypeChange('association' as EdgeType),
          edgeType: 'association' as EdgeType,
        },
        {
          iconSrc: '/uml/relations/include.svg',
          label: 'Include',
          onClick: () => onEdgeTypeChange('include' as EdgeType),
          edgeType: 'include' as EdgeType,
        },
        {
          iconSrc: '/uml/relations/extend.svg',
          label: 'Extend',
          onClick: () => onEdgeTypeChange('extend' as EdgeType),
          edgeType: 'extend' as EdgeType,
        },
        {
          iconSrc: '/uml/relations/generalization.svg',
          label: 'Generalization',
          onClick: () => onEdgeTypeChange('generalization' as EdgeType),
          edgeType: 'generalization' as EdgeType,
        },
        {
          iconSrc: '/uml/relations/inheritance.svg',
          label: 'Inheritance',
          onClick: () => onEdgeTypeChange('inheritance' as EdgeType),
          edgeType: 'inheritance' as EdgeType,
        },
        {
          iconSrc: '/uml/relations/realization.svg',
          label: 'Realization',
          onClick: () => onEdgeTypeChange('realization' as EdgeType),
          edgeType: 'realization' as EdgeType,
        },
        {
          iconSrc: '/uml/relations/dependency.svg',
          label: 'Dependency',
          onClick: () => onEdgeTypeChange('dependency' as EdgeType),
          edgeType: 'dependency' as EdgeType,
        },
        {
          iconSrc: '/uml/relations/aggregation.svg',
          label: 'Aggregation',
          onClick: () => onEdgeTypeChange('aggregation' as EdgeType),
          edgeType: 'aggregation' as EdgeType,
        },
        {
          iconSrc: '/uml/relations/composition.svg',
          label: 'Composition',
          onClick: () => onEdgeTypeChange('composition' as EdgeType),
          edgeType: 'composition' as EdgeType,
        },
      ],
    },
  ] as const;

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value.trim().toLowerCase());
      }, 200),
    [],
  );

  useEffect(() => {
    return () => debouncedUpdate.cancel();
  }, [debouncedUpdate]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedUpdate(value);
  };

  const searchableNodes = useMemo(() => {
    const map = new Map<string, (typeof componentGroups)[number]['items'][number]>();

    componentGroups
      .filter(group => group.title !== 'Relationships')
      .forEach(group => {
        group.items.forEach(item => {
          if (!map.has(item.label)) {
            map.set(item.label, item);
          }
        });
      });

    return Array.from(map.values());
  }, [componentGroups]);

  const searchResults =
    debouncedSearch.length > 0
      ? searchableNodes.filter(item =>
          item.label.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )
      : [];

  const buttonClass = (isSelected: boolean) =>
    clsx(
      'size-12 cursor-pointer rounded-md border transition-colors',
      isSelected
        ? 'border-primary bg-primary/10! shadow-sm'
        : 'hover:border-primary hover:bg-primary/10!',
    );

  return (
    <aside className="bg-card h-full p-2">
      <div className="flex h-full flex-col gap-4">
        <div className="bg-card sticky top-2 z-[100] px-2 pb-2">
          <div className="relative">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              value={search}
              onChange={handleSearchChange}
              placeholder="Search"
              className="h-9 pr-3 pl-9 text-sm"
            />
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="space-y-2">
            <div className="px-2 text-sm font-medium tracking-wide">Search Results</div>
            <div className="flex flex-wrap items-center gap-2 p-2">
              {searchResults.map(({ iconSrc, label, onClick }) => (
                <Button
                  key={label}
                  size="icon"
                  variant="outline"
                  onClick={onClick}
                  title={label}
                  className={buttonClass(false)}
                >
                  <Image
                    src={iconSrc}
                    width={28}
                    height={28}
                    alt={label}
                    className="size-7 dark:invert"
                  />
                </Button>
              ))}
            </div>
            <div className="bg-border h-px" />
          </div>
        )}

        <Accordion
          type="multiple"
          defaultValue={['Use Case Diagram', 'Class Diagram', 'Package Diagram', 'Relationships']}
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
                        key={`${title}-${label}`}
                        size="icon"
                        variant="outline"
                        onClick={onClick}
                        title={label}
                        className={buttonClass(isSelected)}
                      >
                        <Image
                          src={iconSrc}
                          width={28}
                          height={28}
                          alt={label}
                          className="size-7 dark:invert"
                        />
                      </Button>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </aside>
  );
};
