"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Loader2 } from "lucide-react";

const CursorProvider: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorBallBigRef = useRef<SVGCircleElement | null>(null);
  const cursorBallSmallRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorBallBig = cursorBallBigRef.current;
    const cursorBallSmall = cursorBallSmallRef.current;
    if (!cursor || !cursorBallBig || !cursorBallSmall) return;

    let posS = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let posB = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let mouse = { x: posS.x, y: posS.y };
    const speed = 0.1;
    let fpms = 60 / 1000;

    const xSetBallSmall = gsap.quickSetter(cursorBallSmall, "x", "px");
    const ySetBallSmall = gsap.quickSetter(cursorBallSmall, "y", "px");
    const xSetBallBig = gsap.quickSetter(cursorBallBig, "x", "px");
    const ySetBallBig = gsap.quickSetter(cursorBallBig, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove);

    const updateCursor = (time: number, deltaTime: number) => {
      let delta = deltaTime * fpms;
      let dt = 1.0 - Math.pow(1.0 - speed, delta);

      posS.x += mouse.x - posS.x;
      posS.y += mouse.y - posS.y;
      posB.x += (mouse.x - posB.x) * dt;
      posB.y += (mouse.y - posB.y) * dt;
      xSetBallSmall(posS.x);
      ySetBallSmall(posS.y);
      xSetBallBig(posB.x);
      ySetBallBig(posB.y);
    };

    const ticker = gsap.ticker.add(updateCursor);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, [cursorRef, cursorBallBigRef, cursorBallSmallRef]);
  return (
    <div id="cursor" className="pointer-events-none" ref={cursorRef}>
      <div
        className=" fixed top-0 left-0 mix-blend-mode-difference z-10 md:block hidden"
        ref={cursorBallBigRef}
      >
        <div className="animate-spin w-14 h-14 rounded-full border-l-4 border-r-4 border-t-0 border-b-0 border-zinc-500"></div>
        <span className="absolute top-0 flex items-center justify-center w-full h-full font-semibold text-zinc-300">
          Drag
        </span>
      </div>

      <div
        className=" fixed top-0 left-0 mix-blend-mode-difference md:block hidden  z-10"
        ref={cursorBallSmallRef}
      >
        <svg height="10" width="10">
          <circle cx="5" cy="5" r="4" strokeWidth="0" fill="#a18248"></circle>
        </svg>
      </div>
    </div>
  );
};

export default CursorProvider;
