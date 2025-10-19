import { useCallback, useMemo, useState } from "react";
import { fabric } from "fabric";
import { useAutoResize } from "./use-auto-resize";
import { BuildEditorProps, Editor } from "../types";

const buildEditor = ({ canvas }: BuildEditorProps): Editor => {
  return {
    addCircle: () => {
      const object = new fabric.Circle({
        height: 100,
        width: 100,
        fill: "black",
        stroke: "black",
        strokeWidth: 5,
        radius: 50,
      });
      canvas.add(object);
      canvas.setActiveObject(object);
    },
    addSquare: () => {
      const object = new fabric.Rect({
        height: 100,
        width: 100,
        fill: "black",
        stroke: "black",
        strokeWidth: 5,
      });
      canvas.add(object);
      canvas.setActiveObject(object);
    },
    addSquareFull: () => {
      const object = new fabric.Rect({
        height: 100,
        width: 100,
        fill: "black",
      });
      canvas.add(object);
      canvas.setActiveObject(object);
    },
    addTriangle: () => {
      const object = new fabric.Triangle({
        height: 100,
        width: 100,
        fill: "black",
        stroke: "black",
        strokeWidth: 5,
      });
      canvas.add(object);
      canvas.setActiveObject(object);
    },
    addTriangleReversed: () => {
      const object = new fabric.Triangle({
        height: 100,
        width: 100,
        fill: "black",
        stroke: "black",
        strokeWidth: 5,
        angle: 180,
      });
      canvas.add(object);
      canvas.setActiveObject(object);
    },
    addDiamond: () => {
      const object = new fabric.Rect({
        height: 100,
        width: 100,
        fill: "black",
        stroke: "black",
        strokeWidth: 5,
        angle: 45,
      });
      canvas.add(object);
      canvas.setActiveObject(object);
    },
  };
};
export const useEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useAutoResize({
    canvas,
    container,
  });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
      });
    }
    return undefined;
  }, [canvas]);

  const init = useCallback(
    ({
      initialCanvas,
      initialContainer,
    }: {
      initialCanvas: fabric.Canvas;
      initialContainer: HTMLDivElement;
    }) => {
      fabric.Object.prototype.set({
        cornerColor: "#FFF",
        cornerStyle: "circle",
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        transparentCorners: false,
        cornerStrokeColor: "#3b82f6",
        borderOpacityWhenMoving: 1,
      });

      const initialWorkSpace = new fabric.Rect({
        width: 900,
        height: 1200,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0, 0, 0, 0.8)",
          blur: 5,
        }),
      });

      setCanvas(initialCanvas);
      setContainer(initialContainer);

      const test = new fabric.Rect({
        width: 100,
        height: 100,
        fill: "black",
      });

      initialCanvas.setWidth(initialContainer.offsetWidth);
      initialCanvas.setHeight(initialContainer.offsetHeight);
      initialCanvas.add(initialWorkSpace);
      initialCanvas.centerObject(initialWorkSpace);
      initialCanvas.clipPath = initialWorkSpace;
      initialCanvas.add(test);
      initialCanvas.centerObject(test);
    },
    []
  );
  return { init, editor };
};
