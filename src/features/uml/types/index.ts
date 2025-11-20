export type EdgeType =
  | 'association'
  | 'include'
  | 'extend'
  | 'generalization'
  | 'inheritance'
  | 'realization'
  | 'dependency'
  | 'aggregation'
  | 'composition';

export type ConnectionDirection = 'forward' | 'backward' | 'bidirectional';

export type ActorData = {
  label?: string;
  onChangeLabel?: (id: string, label: string) => void;
};

export type UseCaseData = {
  label?: string;
  onChangeLabel?: (id: string, label: string) => void;
};

export type NoteData = {
  text?: string;
  onChangeText?: (id: string, text: string) => void;
};

export type SystemBoundaryData = {
  title?: string;
  onChangeTitle?: (id: string, title: string) => void;
};

export type ClassNodeData = {
  className?: string;
  attributes?: string;
  methods?: string;
  onChangeClassName?: (id: string, className: string) => void;
  onChangeClassAttributes?: (id: string, attributes: string) => void;
  onChangeClassMethods?: (id: string, methods: string) => void;
};

export type PackageNodeData = {
  label?: string;
  onChangeLabel?: (id: string, label: string) => void;
};

export type LabelEdgeData = {
  onEdgeLabelChange?: (id: string, label: string | undefined) => void;
  autoLabel?: string;
  labelDeleted?: boolean;
  extensionPoint?: string;
  direction?: ConnectionDirection;
};

export type EdgeTerminatorShape =
  | 'triangleOutline'
  | 'triangleFilled'
  | 'diamondOutline'
  | 'diamondFilled';

export type EdgeTerminatorSettings = {
  start?: EdgeTerminatorShape;
  end?: EdgeTerminatorShape;
};
