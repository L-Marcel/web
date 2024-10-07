"use client";

import Canvas from "@/components/canvas";
import { useLongPress } from "@uidotdev/usehooks";
import { TouchEvent, useCallback, useRef, useState } from "react";
import { useIsMobile } from "@nextui-org/use-is-mobile";

export default function Home() {
  const ref = useRef<HTMLElement>(null);
  const mobile = useIsMobile();
  const [touch, setTouch] = useState<Touch>();
  const [drawing, setDrawing] = useState(false);

  const start = useCallback(() => setDrawing(true), [setDrawing]);
  const stop = useCallback(() => setDrawing(false), [setDrawing]);

  const attrs = useLongPress(() => {}, {
    onStart: start,
    onCancel: stop,
    onFinish: stop,
  });

  const catchTouch = useCallback(
    (e: TouchEvent<HTMLElement>, end: boolean = false) => {
      if (e.changedTouches.length > 0 && e.changedTouches[0] && ref.current) {
        setTouch(e.changedTouches[0] as Touch);
        setDrawing(!end);
        if (end) {
          setTouch(undefined);
        }
      }
    },
    [setDrawing, setTouch, ref]
  );

  return (
    <main
      {...attrs}
      ref={ref}
      onTouchMove={catchTouch}
      onTouchStart={catchTouch}
      onTouchEnd={(e) => catchTouch(e, true)}
    >
      <section>
        <h1>Caixa de Conteúdo Interativo</h1>
        <p>
          Desenhe uma imagem <span>bonita e interativa</span>. Clique nos itens
          da lista e desenho no canvas!
        </p>
        <Canvas drawing={drawing} mobile={mobile} touch={touch} />
      </section>
    </main>
  );
}
