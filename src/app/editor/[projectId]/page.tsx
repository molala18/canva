"use client";
import { useEditor } from "@/features/editor/hooks/use-editor";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { NavBar } from "@/features/editor/components/navbar";
import SideBar from "@/features/editor/components/sidebar";
import ToolBar from "@/features/editor/components/toolbar";
import Footer from "@/features/editor/components/footer";
import { ActiveTools } from "@/features/editor/types";
import { ShapeSideBar } from "@/features/editor/components/shape-sidebar";

const EditorProjectIdPage = () => {
  const [activeTool, setActiveTool] = useState<ActiveTools>("select");

  const onChangeActiveTool = useCallback(
    (tool: ActiveTools) => {
      if (tool === activeTool) {
        return setActiveTool("select");
      }
      if (tool === "draw") {
      } //enable draw tool

      if (activeTool === "draw") {
        //disable draw tool
      }
      setActiveTool(tool);
    },
    [activeTool]
  );
  const { init } = useEditor();
  const cnavasRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(cnavasRef.current, {
      preserveObjectStacking: true,
      controlsAboveOverlay: true,
    });

    init({ initialCanvas: canvas, initialContainer: containerRef.current! });
    return () => {
      canvas.dispose();
    };
  }, [init]);

  return (
    <div className="flex flex-col h-full">
      <NavBar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
      <div className="absolute h-[calc(100%-68px)] w-full flex top-[68px] ">
        <SideBar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <ShapeSideBar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />
        <main className="bg-muted relative flex flex-1 flex-col overflow-auto">
          <ToolBar />
          <div
            className="flex-1 h-[calc(100%-124px)] bg-muted"
            ref={containerRef}
          >
            <canvas ref={cnavasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default EditorProjectIdPage;
