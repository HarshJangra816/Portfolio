import { useEffect, useRef } from "react";

// Floating anime-inspired background: sakura petals + drifting kanji/katakana glyphs,
// rendered on canvas with a soft blur overlay for a dreamy cyberpunk-anime vibe.
const GLYPHS = [
  "花", "夢", "刀", "闇", "光", "神", "鬼", "月", "星", "音",
  "ハ", "ル", "シ", "ブ", "ル", "ッ", "ク", "サ", "ク", "ラ",
  "01", "10", "//", ">_",
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  vr: number;
  kind: "petal" | "glyph";
  glyph: string;
  hue: number;
  alpha: number;
};

export function AnimeBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const makeParticle = (initial = false): Particle => {
      const isGlyph = Math.random() < 0.35;
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : -20 - Math.random() * height * 0.3,
        vx: (Math.random() - 0.5) * 0.4,
        vy: 0.25 + Math.random() * 0.8,
        size: isGlyph ? 14 + Math.random() * 22 : 6 + Math.random() * 10,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.02,
        kind: isGlyph ? "glyph" : "petal",
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        hue: Math.random() < 0.5 ? 320 : 190, // magenta / cyan
        alpha: 0.15 + Math.random() * 0.35,
      };
    };

    resize();
    const count = Math.min(70, Math.floor((width * height) / 22000));
    particles = Array.from({ length: count }, () => makeParticle(true));

    const drawPetal = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = p.alpha;
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
      grad.addColorStop(0, `hsla(${p.hue}, 90%, 75%, 0.9)`);
      grad.addColorStop(1, `hsla(${p.hue}, 90%, 55%, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawGlyph = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * 0.2);
      ctx.globalAlpha = p.alpha * 0.8;
      ctx.font = `${p.size}px "Share Tech Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, 0.9)`;
      ctx.shadowBlur = 12;
      ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, 0.9)`;
      ctx.fillText(p.glyph, 0, 0);
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if (p.y - p.size > height || p.x < -50 || p.x > width + 50) {
          Object.assign(p, makeParticle(false));
        }
        if (p.kind === "petal") drawPetal(p);
        else drawGlyph(p);
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => resize();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
      style={{ filter: "blur(1.2px)" }}
    >
      <canvas ref={ref} className="h-full w-full" />
    </div>
  );
}
