import { fabric } from "fabric";

export type ActiveTools =
  | "select"
  | "images"
  | "text"
  | "shapes"
  | "ai"
  | "settings"
  | "stroke-color"
  | "stroke-width"
  | "font"
  | "opacity"
  | "filter"
  | "remove-bg"
  | "templates"
  | "fill"
  | "draw"
  | "design";

export type BuildEditorProps = {
  canvas: fabric.Canvas;
};

export interface Editor {
  addCircle: () => void;
  // addSquare: () => void;
  // addSquareFull: () => void;
  // addTriangle: () => void;
  // addTriangleReversed: () => void;
  // addDiamond: () => void;
  // Add other methods as needed
}
