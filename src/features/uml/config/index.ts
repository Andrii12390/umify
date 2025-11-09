import {
  AssociationEdge,
  ExtendEdge,
  GeneralizationEdge,
  IncludeEdge,
} from '@/features/uml/components/edges/edge-variants';
import { ActorNode } from '@/features/uml/components/nodes/actor-node';
import { NoteNode } from '@/features/uml/components/nodes/note-node';
import { SystemBoundaryNode } from '@/features/uml/components/nodes/system-boundary-node';
import { UseCaseNode } from '@/features/uml/components/nodes/use-case-node';

export const nodeTypes = {
  actor: ActorNode,
  useCase: UseCaseNode,
  note: NoteNode,
  systemBoundary: SystemBoundaryNode,
};

export const edgeTypes = {
  association: AssociationEdge,
  include: IncludeEdge,
  extend: ExtendEdge,
  generalization: GeneralizationEdge,
};
