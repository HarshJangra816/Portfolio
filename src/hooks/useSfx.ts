import { useEffect, useRef, useState, useCallback } from "react";

// Tiny WebAudio SFX engine — subtle cyberpunk blips. Respects a persisted
// "sfx" preference in localStorage so it stays off if the user mutes it.
type SfxKind = "hover" | "click" | "boot" | "toggle";

let sharedCtx: AudioContext | null = null;
function getCtx() {
  if (typeof window === "undefined") return null;
  if (!sharedCtx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    sharedCtx = new AC();
  }
  return sharedCtx;
}

function blip(kind: SfxKind) {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  const now = ctx.currentTime;

  const o = ctx.createOscillator();
  const g = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 6;

  o.connect(filter);
  filter.connect(g);
  g.connect(ctx.destination);

  let freq = 880;
  let dur = 0.08;
  let vol = 0.04;
  let type: OscillatorType = "square";

  switch (kind) {
    case "hover":
      freq = 1400; dur = 0.05; vol = 0.02; type = "triangle"; break;
    case "click":
      freq = 620; dur = 0.09; vol = 0.05; type = "square"; break;
    case "toggle":
      freq = 300; dur = 0.14; vol = 0.05; type = "sawtooth"; break;
    case "boot":
      freq = 200; dur = 0.25; vol = 0.03; type = "square"; break;
  }

  o.type = type;
  o.frequency.setValueAtTime(freq, now);
  o.frequency.exponentialRampToValueAtTime(Math.max(80, freq * 0.5), now + dur);
  filter.frequency.setValueAtTime(freq * 1.5, now);

  g.gain.setValueAtTime(0, now);
  g.gain.linearRampToValueAtTime(vol, now + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, now + dur);

  o.start(now);
  o.stop(now + dur + 0.02);
}

export function useSfx() {
  const [enabled, setEnabled] = useState(true);
  const enabledRef = useRef(enabled);

  useEffect(() => {
    try {
      const v = localStorage.getItem("sfx");
      if (v === "off") setEnabled(false);
    } catch {}
  }, []);

  useEffect(() => {
    enabledRef.current = enabled;
    try {
      localStorage.setItem("sfx", enabled ? "on" : "off");
    } catch {}
  }, [enabled]);

  const play = useCallback((kind: SfxKind) => {
    if (!enabledRef.current) return;
    try { blip(kind); } catch {}
  }, []);

  const toggle = useCallback(() => {
    setEnabled((v) => {
      const next = !v;
      // audible confirm when turning on
      if (next) { try { blip("toggle"); } catch {} }
      return next;
    });
  }, []);

  return { enabled, toggle, play };
}
