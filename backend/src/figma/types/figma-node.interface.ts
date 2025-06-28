export interface Vector {
  x: number;
  y: number;
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Paint {
  type:
    | 'SOLID'
    | 'GRADIENT_LINEAR'
    | 'GRADIENT_RADIAL'
    | 'GRADIENT_ANGULAR'
    | 'GRADIENT_DIAMOND'
    | 'IMAGE';
  color?: Color;
  opacity?: number;
}

// Базовый тип Figma Node (общие для всех)
export interface FigmaNodeBase {
  id: string;
  name: string;
  type: string;
  visible?: boolean;
  pluginData?: any;
  sharedPluginData?: any;
}

// FRAME, COMPONENT, GROUP, VECTOR, RECTANGLE и др.
export interface FigmaNode extends FigmaNodeBase {
  children?: FigmaNode[]; // Для FRAME, COMPONENT, GROUP
  absoluteBoundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  backgroundColor?: Color;
  fills?: Paint[];
  strokes?: Paint[];
  strokeWeight?: number;
  strokeAlign?: string;
  blendMode?: string;
  characters?: string;
  style?: {
    fontFamily?: string;
    fontPostScriptName?: string;
    fontWeight?: number;
    fontSize?: number;
    textAlignHorizontal?: string;
    textAlignVertical?: string;
    letterSpacing?: number;
    lineHeightPx?: number;
  };
  // https://www.figma.com/developers/api#node-types
}

export interface FigmaNodeWrapper {
  document: FigmaNode;
  components?: any;
  schemaVersion?: number;
}

export interface FigmaFileNodesResponse {
  nodes: {
    [key: string]: FigmaNodeWrapper;
  };
}
