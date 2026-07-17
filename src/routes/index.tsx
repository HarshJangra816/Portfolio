import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Github, Mail, Terminal, Shield, Code2, Cpu, ExternalLink, ChevronRight, Volume2, VolumeX } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AnimeBackground } from "@/components/AnimeBackground";
import { useSfx } from "@/hooks/useSfx";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { id: "about", label: "01 // about" },
  { id: "stack", label: "02 // stack" },
  { id: "projects", label: "03 // projects" },
  { id: "contact", label: "04 // contact" },
];

const STACK = [
  { group: "languages", items: ["C++", "C", "Python", "JavaScript"] },
  { group: "web", items: ["HTML", "CSS", "JS", "React"] },
  { group: "security", items: ["Recon", "Web Exploits", "Linux", "Wireshark"] },
];

const PROJECTS = [
  {
    id: "01",
    name: "PortSniff",
    tag: "SECURITY // PYTHON",
    desc: "Multithreaded port scanner with banner grabbing and JSON reports. Built as a hands-on TCP/IP exercise.",
    tech: ["Python", "asyncio", "sockets"],
  },
  {
    id: "02",
    name: "CryptoNotes",
    tag: "WEB APP // JS",
    desc: "Client-side encrypted notes. AES-GCM in the browser, nothing readable on the server.",
    tech: ["JavaScript", "WebCrypto", "IndexedDB"],
  },
  {
    id: "03",
    name: "PayloadForge",
    tag: "CLI // C++",
    desc: "Small offensive-security learning tool that generates and encodes test payloads for CTF labs.",
    tech: ["C++", "CMake"],
  },
  {
    id: "04",
    name: "NetPulse",
    tag: "DASHBOARD // REACT",
    desc: "Real-time local network dashboard: latency, live hosts, and a tiny anomaly indicator.",
    tech: ["React", "Python", "WebSocket"],
  },
];

function Boot() {
  const lines = [
    "> booting kernel: brook-os v0.7 ...",
    "> mounting /dev/skills ... ok",
    "> loading agent: HARSH.JANGRA ...",
    "> handshake complete. welcome, operator.",
  ];
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setShown((n) => (n < lines.length ? n + 1 : n)), 350);
    return () => clearInterval(id);
  }, []);
  return (
    <pre className="text-xs md:text-sm text-[var(--neon-green)] leading-relaxed font-[var(--font-terminal)]">
      {lines.slice(0, shown).map((l, i) => (
        <div key={i}>{l}</div>
      ))}
      <span className="text-[var(--neon-cyan)]">▊<span className="animate-blink">_</span></span>
    </pre>
  );
}

function HarshHover() {
  // HARSH: single subtle lift-on-hover per letter, no color change
  const letters = ["H", "A", "R", "S", "H"];
   return (
    <span className="neon-text-magenta inline-flex">
      {letters.map((c, i) => (
        <span
          key={i}
          className="inline-block cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-1"
        >
          {c}
        </span>
      ))}
    </span>
  );
}

function JangraHover() {
  // JANGRA: glitch-slice reveal on hover — two offset color layers
  const [hover, setHover] = useState(false);
  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative inline-block cursor-pointer text-foreground"
      data-text="JANGRA"
    >
      <span className="relative z-10">JANGRA</span>
      <span
        aria-hidden
        className={`absolute inset-0 text-[var(--neon-magenta)] transition-transform duration-150 ${
          hover ? "animate-[slice-top_0.9s_ease-in-out_infinite]" : "opacity-0"
        }`}
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
      >
        JANGRA
      </span>
      <span
        aria-hidden
        className={`absolute inset-0 text-[var(--neon-cyan)] transition-transform duration-150 ${
          hover ? "animate-[slice-bottom_0.9s_ease-in-out_infinite]" : "opacity-0"
        }`}
        style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)" }}
      >
        JANGRA
      </span>
    </span>
  );
}


function BrookCycler() {
  const variants = [
    { text: "BROOK", lang: "en" },
    { text: "ブルック", lang: "ja" }, // Japanese
    { text: "布鲁克", lang: "zh" }, // Chinese
    { text: "ब्रूक", lang: "hi" }, // Hindi
    { text: "بروك", lang: "ar" }, // Arabic
    { text: "브룩", lang: "ko" }, // Korean
    { text: "БРУК", lang: "ru" }, // Russian
  ];
  const [i, setI] = useState(0);
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => {
        setI((n) => (n + 1) % variants.length);
        setGlitch(false);
      }, 180);
    }, 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span
      key={i}
      lang={variants[i].lang}
      className={`neon-text-cyan inline-block transition-all duration-300 ${
        glitch ? "opacity-0 translate-y-1 blur-sm" : "opacity-100 translate-y-0 blur-0 animate-flicker"
      }`}
      style={{ minWidth: "6ch" }}
    >
      {variants[i].text}
    </span>
  );
}

function Index() {
  const sfx = useSfx();
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* animated anime background (petals + kanji, blurred) */}
      <AnimeBackground />
      {/* grid background */}
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-60 z-[1]" aria-hidden />
      {/* scanlines overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[2] mix-blend-overlay opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0, transparent 2px, rgba(255,255,255,0.05) 3px)",
        }}
        aria-hidden
      />


      {/* NAV */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#top" className="flex items-center gap-2 font-display text-sm tracking-widest">
            <span className="neon-text-magenta">&gt;_</span>
            <span className="glitch-hover">HARSH<span className="text-[var(--neon-cyan)]">.</span>JNG</span>
            <span className="ml-2 hidden text-[10px] text-muted-foreground sm:inline">aka BROOK</span>
          </a>
          <nav className="hidden gap-5 text-xs uppercase tracking-widest text-muted-foreground md:flex">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onMouseEnter={() => sfx.play("hover")}
                onClick={() => sfx.play("click")}
                className="hover:text-[var(--neon-cyan)]"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={sfx.toggle}
              aria-label={sfx.enabled ? "Mute sound effects" : "Enable sound effects"}
              title={sfx.enabled ? "SFX on" : "SFX off"}
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-card/50 text-muted-foreground hover:text-[var(--neon-cyan)]"
            >
              {sfx.enabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>


      {/* HERO */}
      <section id="top" className="relative z-10 mx-auto max-w-6xl px-4 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="mb-6 inline-flex items-center gap-2 rounded-sm border border-border bg-card/50 px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--neon-green)]" />
          status: online // node_IN-DL
        </div>
        <h1 className="font-display text-4xl leading-[1.05] sm:text-6xl md:text-7xl">
          <HarshHover />{" "}
          <JangraHover />

          <br />
          <span className="text-muted-foreground">// alias</span>{" "}
          <BrookCycler />
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          BCA student. Builder of small useful things on the web. Poking at systems to
          understand how they break — and how to make them break less. Currently sharpening
          <span className="text-foreground"> web dev</span>,{" "}
          <span className="text-foreground">Python tooling</span> and{" "}
          <span className="text-foreground">offensive security</span>.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            onMouseEnter={() => sfx.play("hover")}
            onClick={() => sfx.play("click")}
            className="neon-border group inline-flex items-center gap-2 rounded-sm bg-primary/10 px-4 py-2 text-xs uppercase tracking-widest text-foreground hover:bg-primary/20"
          >
            view projects <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            onMouseEnter={() => sfx.play("hover")}
            onClick={() => sfx.play("click")}
            className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-[var(--neon-cyan)]"
          >
            open channel
          </a>
        </div>


        <div className="mt-12 grid gap-6 md:grid-cols-[1.1fr_.9fr]">
          <div className="neon-border rounded-sm bg-card/60 p-4 backdrop-blur md:p-6">
            <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
              <Terminal className="h-3.5 w-3.5" /> tty0 // boot.log
            </div>
            <Boot />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Code2, k: "12+", v: "projects" },
              { icon: Shield, k: "CTF", v: "player" },
              { icon: Cpu, k: "24/7", v: "curious" },
            ].map((s, i) => (
              <div key={i} className="neon-border rounded-sm bg-card/50 p-3 text-center backdrop-blur">
                <s.icon className="mx-auto mb-2 h-4 w-4 text-[var(--neon-cyan)]" />
                <div className="font-display text-lg text-foreground">{s.k}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* marquee */}
      <div className="relative z-10 border-y border-border/60 bg-card/30 py-3 backdrop-blur">
        <div className="flex whitespace-nowrap text-xs uppercase tracking-[0.4em] text-muted-foreground animate-marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 gap-8 px-4">
              {["C++", "Python", "JavaScript", "React", "Linux", "Recon", "CTF", "Web Sec", "HTML/CSS", "C"].map((t) => (
                <span key={t + i} className="flex items-center gap-8">
                  <span className="text-foreground">{t}</span>
                  <span className="text-[var(--neon-magenta)]">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="relative z-10 mx-auto max-w-6xl px-4 py-20">
        <SectionTitle index="01" title="ABOUT" />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>
              I&apos;m <span className="text-foreground">Harsh Jangra</span> — online I mostly go by{" "}
              <span className="neon-text-cyan">Brook</span> (yes, from One Piece). BCA student who
              spends more time in a terminal than is probably healthy.
            </p>
            <p>
              I build. I break. I read writeups at 2am. My comfort zone is somewhere between a
              messy VS Code window and a Kali VM with too many tabs open.
            </p>
            <p>
              Right now I&apos;m focused on shipping real projects — small web apps, security
              utilities, and CLI tools — while grinding fundamentals in DSA and networking.
            </p>
          </div>
          <div className="neon-border rounded-sm bg-card/60 p-6 backdrop-blur">
            <div className="mb-4 text-[10px] uppercase tracking-widest text-muted-foreground">operator.card</div>
            <dl className="grid grid-cols-3 gap-y-3 text-sm">
              <dt className="text-muted-foreground">handle</dt>
              <dd className="col-span-2 text-foreground">brook</dd>
              <dt className="text-muted-foreground">real</dt>
              <dd className="col-span-2 text-foreground">Harsh Jangra</dd>
              <dt className="text-muted-foreground">role</dt>
              <dd className="col-span-2 text-foreground">dev / sec learner</dd>
              <dt className="text-muted-foreground">edu</dt>
              <dd className="col-span-2 text-foreground">BCA (in progress)</dd>
              <dt className="text-muted-foreground">loc</dt>
              <dd className="col-span-2 text-foreground">India</dd>
              <dt className="text-muted-foreground">status</dt>
              <dd className="col-span-2 text-[var(--neon-green)]">open to collab</dd>
            </dl>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="relative z-10 mx-auto max-w-6xl px-4 py-20">
        <SectionTitle index="02" title="STACK" />
        <div className="grid gap-4 md:grid-cols-3">
          {STACK.map((g) => (
            <div key={g.group} className="neon-border rounded-sm bg-card/60 p-5 backdrop-blur">
              <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-widest">
                <span className="text-muted-foreground">./{g.group}</span>
                <span className="text-[var(--neon-magenta)]">{g.items.length}</span>
              </div>
              <ul className="space-y-2 font-mono text-sm">
                {g.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-foreground">
                    <span className="text-[var(--neon-cyan)]">›</span> {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative z-10 mx-auto max-w-6xl px-4 py-20">
        <SectionTitle index="03" title="PROJECTS" note="// placeholders — swap with real repos soon" />
        <div className="grid gap-4 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <article
              key={p.id}
              className="group neon-border relative overflow-hidden rounded-sm bg-card/60 p-6 backdrop-blur transition hover:-translate-y-0.5"
            >
              <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-widest">
                <span className="text-muted-foreground">{p.tag}</span>
                <span className="text-[var(--neon-cyan)]">#{p.id}</span>
              </div>
              <h3 className="font-display text-2xl text-foreground group-hover:neon-text-magenta">
                {p.name}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-sm border border-border bg-background/40 px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-4 text-xs uppercase tracking-widest">
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <ExternalLink className="h-3 w-3" /> demo soon
                </span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Github className="h-3 w-3" /> repo soon
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 mx-auto max-w-6xl px-4 py-20">
        <SectionTitle index="04" title="CONTACT" />
        <div className="neon-border rounded-sm bg-card/60 p-8 backdrop-blur">
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
            $ initiate handshake --with=harsh
          </div>
          <h3 className="mt-3 font-display text-3xl md:text-4xl">
            <span className="neon-text-cyan">Let&apos;s</span> build or break something.
          </h3>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Open to collabs, CTF teams, freelance web work, and interesting problems. Ping me on
            Discord as <span className="text-foreground">Brook</span> or drop a mail.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="mailto:dev.Brook@outlook.in"
              className="inline-flex items-center gap-2 rounded-sm bg-[var(--neon-magenta)] px-4 py-2 text-xs uppercase tracking-widest text-[oklch(0.12_0.03_275)] hover:opacity-90"
            >
              <Mail className="h-3.5 w-3.5" /> dev.Brook@outlook.in
            </a>
            <a
              href="https://github.com/HarshJangra816"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-[var(--neon-cyan)]"
            >
              <Github className="h-3.5 w-3.5" /> github/brook
            </a>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/60 py-6 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
        © {new Date().getFullYear()} harsh.jangra // brook — compiled in the dark
      </footer>
    </div>
  );
}

function SectionTitle({ index, title, note }: { index: string; title: string; note?: string }) {
  return (
    <div className="mb-8 flex items-end justify-between border-b border-border/60 pb-3">
      <h2 className="font-display text-2xl md:text-3xl">
        <span className="text-[var(--neon-magenta)]">{index}</span>{" "}
        <span className="text-foreground">// {title}</span>
      </h2>
      {note && <span className="hidden text-[10px] uppercase tracking-widest text-muted-foreground md:inline">{note}</span>}
    </div>
  );
}
