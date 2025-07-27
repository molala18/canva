"use client";
import { useEditor } from "@/features/editor/hooks/use-editor";
import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

const EditorProjectIdPage = () => {
  const { init } = useEditor();
  const cnavasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(cnavasRef.current, {
      preserveObjectStacking: true,
      controlsAboveOverlay: true,
    });

    init({ initialCanvas: canvas, initialContainer: containerRef.current! });
  }, [init]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 h-full bg-muted" ref={containerRef}>
        <canvas ref={cnavasRef} />
      </div>
    </div>
  );
};

export default EditorProjectIdPage;
