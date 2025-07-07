export type FigmaFileResponse = {
  name: string;
  lastModified: string;
  thumbnailUrl: string;
  version: string;
  document: FigmaNode;
  components?: Record<string, FigmaComponentMeta>;
};

export type FigmaComponentMeta = {
  key: string;
  name: string;
  description?: string;
};

export type FigmaNode = {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  absoluteBoundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  [key: string]: any;
};

export type FigmaNodesResponse = {
  nodes: Record<string, { document: FigmaNode }>;
};
