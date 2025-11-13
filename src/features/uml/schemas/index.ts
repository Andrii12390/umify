import { z } from 'zod';

const positionSchema = z.object({
  x: z.number(),
  y: z.number(),
});

const dimensionsSchema = z.object({
  width: z.number().optional(),
  height: z.number().optional(),
});

const nodeDataSchema = z.object({
  label: z.string().optional(),
  text: z.string().optional(),
  title: z.string().optional(),
  onChangeLabel: z.function().optional(),
  onChangeText: z.function().optional(),
  onChangeTitle: z.function().optional(),
  onEdgeLabelChange: z.function().optional(),
});

const nodeSchema = z.object({
  id: z.string(),
  type: z.enum(['actor', 'useCase', 'note', 'systemBoundary']),
  position: positionSchema,
  data: nodeDataSchema.passthrough(),
  width: z.number().optional(),
  height: z.number().optional(),
  selected: z.boolean().optional(),
  dragging: z.boolean().optional(),
  positionAbsolute: positionSchema.optional(),
  style: z.object().optional(),
  measured: dimensionsSchema.optional(),
});

const markerSchema = z.object({
  type: z.string(),
  color: z.string().optional(),
  strokeWidth: z.number().optional(),
});

const edgeDataSchema = z.object({
  onEdgeLabelChange: z.function().optional(),
  autoLabel: z.string().optional(),
  labelDeleted: z.boolean().optional(),
});

const edgeSchema = z.object({
  id: z.string(),
  type: z.string(),
  source: z.string(),
  target: z.string(),
  label: z.string().optional(),
  data: edgeDataSchema.passthrough(),
  style: z.object().optional(),
  markerEnd: markerSchema.optional(),
  markerStart: markerSchema.optional(),
  selected: z.boolean().optional(),
});

const viewportSchema = z.object({
  x: z.number(),
  y: z.number(),
  zoom: z.number(),
});

export const diagramDataSchema = z.object({
  nodes: z.array(nodeSchema),
  edges: z.array(edgeSchema),
  viewport: viewportSchema,
});

export type DiagramData = z.infer<typeof diagramDataSchema>;
