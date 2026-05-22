// MUSA Green Tweaks
// 3 expressive controls that reshape the *feel* of the homepage:
//   1. Accent palette  - the headline accent + CTA glow
//   2. Hero atmosphere - 3D scene pace + HUD intensity + scene glow
//   3. Visual rhythm   - editorial vs standard vs dense type/section scale

const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "sunset",
  "atmosphere": "standard",
  "rhythm": "standard"
}/*EDITMODE-END*/;

const ACCENTS = {
  sunset: { c1: "#FFAF7E", c2: "#FF7D3D", glow: "rgba(255,175,126,.35)" },
  citrus: { c1: "#D6E36A", c2: "#9EC23C", glow: "rgba(214,227,106,.30)" },
  cobalt: { c1: "#8FB6FF", c2: "#3D7DFF", glow: "rgba(143,182,255,.30)" },
  mono:   { c1: "#FFFFFF", c2: "#D7DDDF", glow: "rgba(255,255,255,.18)" },
};

const ATMOSPHERES = {
  calm:     { speed: 0.45, opacity: 0.55, rise: 0.55, pulse: 0.55 },
  standard: { speed: 1.0,  opacity: 1.0,  rise: 1.0,  pulse: 1.0  },
  charged:  { speed: 1.9,  opacity: 1.4,  rise: 1.7,  pulse: 1.6  },
};

function applyAccent(name) {
  const p = ACCENTS[name] || ACCENTS.sunset;
  const r = document.documentElement;
  r.style.setProperty("--accent-1", p.c1);
  r.style.setProperty("--accent-2", p.c2);
  r.style.setProperty("--accent-glow", p.glow);
  r.dataset.accent = name;
}
function applyAtmosphere(name) {
  document.documentElement.dataset.atmosphere = name;
  window.__musaAtmosphere = ATMOSPHERES[name] || ATMOSPHERES.standard;
}
function applyRhythm(name) {
  document.documentElement.dataset.rhythm = name;
}

// Apply defaults synchronously so hero3d.js has the right factors from frame 0.
applyAccent(TWEAK_DEFAULTS.accent);
applyAtmosphere(TWEAK_DEFAULTS.atmosphere);
applyRhythm(TWEAK_DEFAULTS.rhythm);

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => applyAccent(t.accent), [t.accent]);
  useEffect(() => applyAtmosphere(t.atmosphere), [t.atmosphere]);
  useEffect(() => applyRhythm(t.rhythm), [t.rhythm]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Accent palette" />
      <TweakRadio
        label="Accent"
        value={t.accent}
        options={[
          { value: "sunset", label: "Sunset" },
          { value: "citrus", label: "Citrus" },
          { value: "cobalt", label: "Cobalt" },
          { value: "mono",   label: "Mono"   },
        ]}
        onChange={(v) => setTweak("accent", v)}
      />

      <TweakSection label="Hero atmosphere" />
      <TweakRadio
        label="Pace"
        value={t.atmosphere}
        options={[
          { value: "calm",     label: "Calm"   },
          { value: "standard", label: "Steady" },
          { value: "charged",  label: "Charged"},
        ]}
        onChange={(v) => setTweak("atmosphere", v)}
      />

      <TweakSection label="Visual rhythm" />
      <TweakRadio
        label="Scale"
        value={t.rhythm}
        options={[
          { value: "editorial", label: "Editorial" },
          { value: "standard",  label: "Standard"  },
          { value: "dense",     label: "Dense"     },
        ]}
        onChange={(v) => setTweak("rhythm", v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<App />);
