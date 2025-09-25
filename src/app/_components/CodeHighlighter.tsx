"use client";

import React, { Fragment, useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { common, createStarryNight } from "@wooorm/starry-night";
import "@wooorm/starry-night/style/dark";

let starryNightPromise: Promise<any> | null = null;

interface CodeHighlighterProps {
  code: string;
  language: string;
}

export default function CodeHighlighter({
  code,
  language,
}: CodeHighlighterProps) {
  const [highlightedCode, setHighlightedCode] =
    useState<React.ReactElement | null>(null);

  useEffect(() => {
    if (!starryNightPromise) {
      starryNightPromise = createStarryNight(common);
    }

    starryNightPromise.then((starryNight) => {
      const scope = starryNight.flagToScope(language) || "textgrid";
      const tree = starryNight.highlight(code, scope);
      const hast = toJsxRuntime(tree, { Fragment, jsx, jsxs });
      setHighlightedCode(hast);
    });
  }, [code, language]);

  // Fallback while waiting for highlighting
  if (!highlightedCode) {
    return (
      <pre
        style={{
          position: "relative",
          padding: "1em 1em 1em 4em", // Extra left padding for line numbers
          backgroundColor: "#0d1117",
          color: "#c9d1d9",
          borderRadius: "0.5em",
          whiteSpace: "pre", // Disable wrapping
          overflowX: "auto",
          lineHeight: "1.5",
        }}
      >
        <code>{code}</code>
      </pre>
    );
  }

  // Count the number of lines by splitting the *raw* code
  const lines = code.split("\n").length;

  return (
    <pre
      style={{
        position: "relative",
        padding: "1em 1em 1em 4em", // Extra left padding for line numbers
        backgroundColor: "#0d1117",
        color: "#c9d1d9",
        borderRadius: "0.5em",
        whiteSpace: "pre", // Disable wrapping
        overflowX: "auto",
        lineHeight: "1.5",
      }}
    >
      {/* Absolutely positioned line numbers */}
      <div
        style={{
          position: "absolute",
          top: "1em",
          left: "1em", // Position the line numbers
          textAlign: "right",
          opacity: 0.5,
          userSelect: "none",
          lineHeight: "1.5",
        }}
      >
        {Array.from({ length: lines }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>

      {/* The highlighted code */}
      <code>{highlightedCode}</code>
    </pre>
  );
}
