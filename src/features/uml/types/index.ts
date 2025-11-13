export type EdgeType = 'association' | 'include' | 'extend' | 'generalization';

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

export type LabelEdgeData = {
  onEdgeLabelChange?: (id: string, label: string | undefined) => void;
  autoLabel?: string;
  labelDeleted?: boolean;
  extensionPoint?: string;
  direction?: ConnectionDirection;
};
