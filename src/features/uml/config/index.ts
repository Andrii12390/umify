import {
  AggregationEdge,
  AssociationEdge,
  CompositionEdge,
  DependencyEdge,
  ExtendEdge,
  GeneralizationEdge,
  IncludeEdge,
  InheritanceEdge,
  RealizationEdge,
} from '@/features/uml/components/edges/edge-variants';
import { PackageNode } from '@/features/uml/components/nodes';
import { ActorNode } from '@/features/uml/components/nodes/actor-node';
import { ClassNode } from '@/features/uml/components/nodes/class-node';
import { NoteNode } from '@/features/uml/components/nodes/note-node';
import { SystemBoundaryNode } from '@/features/uml/components/nodes/system-boundary-node';
import { UseCaseNode } from '@/features/uml/components/nodes/use-case-node';

export const nodeTypes = {
  actor: ActorNode,
  useCase: UseCaseNode,
  note: NoteNode,
  systemBoundary: SystemBoundaryNode,
  class: ClassNode,
  package: PackageNode,
};

export const edgeTypes = {
  association: AssociationEdge,
  include: IncludeEdge,
  extend: ExtendEdge,
  generalization: GeneralizationEdge,
  inheritance: InheritanceEdge,
  realization: RealizationEdge,
  dependency: DependencyEdge,
  aggregation: AggregationEdge,
  composition: CompositionEdge,
};
