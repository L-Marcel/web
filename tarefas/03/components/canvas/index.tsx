"use client";

import { useMouse, usePrevious, useWindowSize } from "@uidotdev/usehooks";
import { useCallback, useEffect } from "react";
import "./index.scss";

interface CanvasProps {
  drawing: boolean;
  mobile?: boolean;
  touch?: Touch;
}

export default function Canvas({
  drawing,
  mobile = false,
  touch,
}: CanvasProps) {
  const { width } = useWindowSize();
  const isSmallScreen = width && width < 600;
  const [mouse, ref] = useMouse<HTMLCanvasElement>();
  const previous = usePrevious(mouse);
  const previousTouch = usePrevious(touch);

  const clear = useCallback(() => {
    const context = ref.current.getContext("2d");
    if (context) context.reset();
  }, [ref]);

  useEffect(() => {
    if (drawing && !mobile) {
      const context = ref.current.getContext("2d");
      if (context) {
        if (previous) {
          context.lineWidth = 2.5;
          context.moveTo(previous.elementX, previous.elementY);
          context.lineTo(mouse.elementX, mouse.elementY);
        }
        context.stroke();
      }
    }
  }, [drawing, mobile, mouse.elementX, mouse.elementY, previous, ref]);

  useEffect(() => {
    if (drawing && mobile) {
      const context = ref.current.getContext("2d");
      if (context) {
        if (previousTouch && touch) {
          context.lineWidth = 2.5;
          context.moveTo(
            previousTouch.clientX - ref.current.offsetLeft,
            previousTouch.clientY - ref.current.offsetTop
          );
          context.lineTo(
            touch.clientX - ref.current.offsetLeft,
            touch.clientY - ref.current.offsetTop
          );
        }
        context.stroke();
      }
    }
  }, [
    drawing,
    mobile,
    touch?.clientX,
    touch?.clientY,
    previousTouch,
    ref,
    isSmallScreen,
  ]);

  return (
    <div className="canvas">
      <h2>Área de Desenho</h2>
      <canvas
        width={isSmallScreen ? 300 : 420}
        height={isSmallScreen ? 200 : 280}
        ref={ref}
      />
      <button onClick={clear}>Limpar Canvas</button>
    </div>
  );
}
