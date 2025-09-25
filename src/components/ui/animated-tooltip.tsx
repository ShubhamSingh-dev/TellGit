"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";

export const AnimatedTooltip = ({
  items,
  className,
}: {
  items: {
    id: number | string;
    name: string;
    image: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {items.map((item, index) => (
        <div
          className="group relative -mr-4"
          key={`tooltip-item-${item.id !== undefined ? item.id : index}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="bg-foreground absolute -top-12 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md px-4 py-2 text-xs shadow-xl"
              >
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                <div className="text-background relative z-30 text-base font-bold">
                  {item.name}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {item.image ? (
            <Image
              onMouseMove={handleMouseMove}
              height={50}
              width={50}
              src={item.image}
              alt={item.name}
              className="relative m-0! h-10 w-10 rounded-full border-2 border-purple-800 object-cover object-top p-0! transition duration-500 group-hover:z-30 group-hover:scale-105"
            />
          ) : (
            <div
              onMouseMove={handleMouseMove}
              className="relative m-0! flex h-10 w-10 items-center justify-center rounded-full border-2 border-purple-800 bg-gray-100 transition duration-500 group-hover:z-30 group-hover:scale-105"
            >
              <User size={20} className="text-purple-800" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
