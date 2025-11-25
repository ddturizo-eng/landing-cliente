"use client";

import React, { useEffect, useState } from "react";

type Props = {
  feedId: string;
  containerId?: string;
};

export default function BeholdWidget({ feedId, containerId = "behold-instagram-feed" }: Props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scriptSrc = "https://w.behold.so/widget.js";

    // If script already present, assume it will initialize or is initialized
    const existing = document.querySelector(`script[src=\"${scriptSrc}\"]`);
    if (existing) {
      // Give the script a tick to initialize
      setTimeout(() => setLoaded(true), 50);
      return;
    }

    const s = document.createElement("script");
    s.src = scriptSrc;
    s.async = true;
    // The original integration used a module script; keep as module if available.
    try {
      (s as HTMLScriptElement).type = "module";
    } catch (e) {
      // ignore
    }

    s.onload = () => {
      setLoaded(true);
    };

    s.onerror = () => {
      // Still set loaded to avoid blocking UI — the widget may fail silently.
      setLoaded(true);
      // Optionally, you could log an error to monitoring here.
    };

    document.head.appendChild(s);

    return () => {
      // do not remove the script on unmount — avoids reloading on route changes
    };
  }, []);

  return (
    <div id={containerId} className="mb-8">
      {loaded ? (
        <div dangerouslySetInnerHTML={{ __html: `<behold-widget feed-id=\"${feedId}\"></behold-widget>` }} />
      ) : (
        <div className="h-48 flex items-center justify-center text-gray-400">Cargando feed...</div>
      )}
    </div>
  );
}
