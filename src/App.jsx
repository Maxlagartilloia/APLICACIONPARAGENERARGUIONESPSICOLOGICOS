import React, { useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import {
  Download as DownloadIcon,
  Image as ImageIcon,
  Upload as UploadIcon,
  Wand2 as WandIcon,
} from "lucide-react";

/* ============ 1) TEMÁTICAS PARA ROTAR PORTADAS ============ */
const THEMES = {
  regalo: { title: "LE DIMOS UN IMPULSO GIGANTE 🚀", sub: "Su negocio hoy luce diferente" },
  rescate: { title: "LLEGAMOS CUANDO MÁS LO NECESITABA", sub: "Mira cómo lo resolvimos en minutos" },
  antesDespues: { title: "ASÍ CAMBIÓ EN 24 HORAS", sub: "Del taller al mundo digital" },
  historia: { title: "DE SHUSHUFINDI PARA EL MUNDO 🌎", sub: "Un ecuatoriano que no se rinde" },
  reto24h: { title: "24 HORAS PARA HACERLO POSIBLE", sub: "¿Lo logramos? Mira el final" },
  transformacion: { title: "DE OFICIO A MARCA", sub: "La diferencia está en cómo te ven" },
  dolorVentas: { title: "ESTABA PERDIENDO CLIENTES 😢", sub: "Hasta que hicimos esto…" },
  truco: { title: "EL TRUCO QUE NADIE TE CONTÓ", sub: "Así te encuentran más rápido" },
  precio: { title: "LO QUE HICIMOS POR $0", sub: "Y el cambio fue brutal" },
  testimonio: { title: "LO QUE DIJO SU PRIMER CLIENTE", sub: "Te vas a sorprender" },
  error: { title: "EL ERROR #1 DE LOS NEGOCIOS", sub: "Y cómo lo corregimos hoy" },
  comunidad: { title: "ESTO LO HICIMOS ENTRE TODOS", sub: "Gracias por apoyar a los que luchan" },
  backstage: { title: "ASÍ SE VIVE CUANDO AYUDAMOS", sub: "Momentos reales, cero guion" },
  sueno: { title: "SUEÑOS QUE SE CONSTRUYEN TRABAJANDO", sub: "Hoy dimos un paso más" },
};

/* ============ 2) UI BÁSICA (botones, inputs, tarjetas) ============ */
const Button = ({ className = "", children, ...props }) => (
  <button
    className={`px-4 py-2 rounded-2xl shadow-sm border border-black/10 bg-white hover:bg-gray-50 active:scale-[0.98] transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ className = "", children }) => (
  <div className={`rounded-3xl shadow-lg border border-black/10 bg-white p-4 ${className}`}>{children}</div>
);

const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
    {children}
  </label>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    {...props}
  />
);

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    {...props}
  />
);

/* ============ 3) HELPERS ============ */
const readFileAsDataURL = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

/* ============ 4) APP PRINCIPAL ============ */
export default function App() {
  // Imagenes persistentes
  const [crissFace, setCrissFace] = useState(null);
  const [tottiFace, setTottiFace] = useState(null);
  const [logo, setLogo] = useState(null);

  // Textos portada
  const [businessName, setBusinessName] = useState("Cerrajería Totti");
  const [city, setCity] = useState("Shushufindi");
  const [headline, setHeadline] = useState("LE REGALAMOS SU PROPIA WEB 💻");
  const [subhead, setSubhead] = useState("Y NO PUDO CREERLO…");
  const [brandSignature, setBrandSignature] = useState("Criss Lombeida");

  // Estética
  const [tone, setTone] = useState("warm"); // warm | cool | neutral
  const [contrast, setContrast] = useState(95); // 50-110
  const [sparkIntensity, setSparkIntensity] = useState(80); // 0-100

  // Temática
  const [themeKey, setThemeKey] = useState("regalo");
  const applyTheme = (key) => {
    setThemeKey(key);
    setHeadline(THEMES[key].title);
    setSubhead(THEMES[key].sub);
  };

  // Duración guion
  const [duration, setDuration] = useState("45"); // 45 | 120

  // Cargar desde localStorage rostro y logo
  useEffect(() => {
    const savedCriss = localStorage.getItem("crissFaceDataURL");
    const savedLogo = localStorage.getItem("crissLogoDataURL");
    if (savedCriss) setCrissFace(savedCriss);
    if (savedLogo) setLogo(savedLogo);
  }, []);

  // Subidas de imágenes
  const handleUpload = async (e, setter, persistKey) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataURL = await readFileAsDataURL(file);
    setter(dataURL);
    if (persistKey) localStorage.setItem(persistKey, dataURL);
  };

  // Exportar PNG (nativo, sin file-saver)
  const thumbRef = useRef(null);
  const exportPNG = async () => {
    if (!thumbRef.current) return;
    const dataUrl = await toPng(thumbRef.current, { pixelRatio: 2 });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${businessName.replace(/\s+/g, "_")}_thumbnail.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // Generar guion psicológico
  const script = useMemo(() => {
    const d = parseInt(duration, 10);
    const short = d === 45;

    const t = THEMES[themeKey]; // para ajustar tono si quisieras
    const lines = [];
    // Hook
    lines.push(`HOOK (0–3s): Esto pasó HOY en ${city} 🔥 Llegamos a ${businessName}, un negocio que no se rinde.`);
    // Acción
    lines.push(
      `ACCIÓN (3–${short ? 20 : 40}s): Mostrar al dueño trabajando (soldadura / esmeril), cortes cada 3s, subtítulos dinámicos: "${businessName} 🔑 | ${city}".`
    );
    // Pico
    lines.push(
      `PICO EMOCIONAL (${short ? 21 : 41}–${short ? 30 : 70}s): Entrega de la app web en el celular, reacción y sonrisa.`
    );
    // Post pico
    lines.push(
      `POST-PICO (${short ? 31 : 71}–${short ? 38 : 100}s): "Esto… esto es lo que vale la pena. Ver a un ecuatoriano feliz porque alguien creyó en su trabajo." (pausa 1–2s).`
    );
    // Cierre
    lines.push(
      `CIERRE (${short ? 39 : 101}–${short ? 45 : 120}s): "Seguimos mañana con otro emprendedor. Si crees en los que trabajan con el corazón, únete a esta comunidad."`
    );
    // Anclaje de temática (para recordarte qué elegiste)
    lines.push(`\n[Temática elegida: ${t.title}]`);
    return lines.join("\n");
  }, [businessName, city, duration, themeKey]);

  // Overlays
  const sparkMask = {
    backgroundImage:
      sparkIntensity > 0
        ? `radial-gradient(circle at 70% 70%, rgba(255,180,80,${sparkIntensity / 150}) 0, rgba(255,140,0,${
            sparkIntensity / 200
          }) 20%, transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,220,120,${
            sparkIntensity / 180
          }) 0, transparent 50%)`
        : "none",
  };
  const toneOverlay =
    {
      warm: "from-amber-300/20 via-orange-400/10 to-transparent",
      cool: "from-sky-400/15 via-blue-500/10 to-transparent",
      neutral: "from-white/10 via-white/0 to-transparent",
    }[tone] || "from-amber-300/20 via-orange-400/10 to-transparent";

  return (
    <div className="min-h-screen w-full p-4 md:p-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda: controles */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <h2 className="text-xl font-bold mb-3">Ajustes de Portada</h2>

            <div className="space-y-3">
              <div>
                <Label>Temática</Label>
                <select
                  value={themeKey}
                  onChange={(e) => applyTheme(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2"
                >
                  {Object.entries(THEMES).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Negocio</Label>
                <Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
              </div>
              <div>
                <Label>Ciudad</Label>
                <Input value={city} onChange={(e) => setCity(e.target.value)} />
              </div>
              <div>
                <Label>Título (arriba)</Label>
                <Input value={headline} onChange={(e) => setHeadline(e.target.value)} />
              </div>
              <div>
                <Label>Subtítulo (debajo)</Label>
                <Input value={subhead} onChange={(e) => setSubhead(e.target.value)} />
              </div>
              <div>
                <Label>Firma</Label>
                <Input value={brandSignature} onChange={(e) => setBrandSignature(e.target.value)} />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Button onClick={() => setTone("warm")} className={tone === "warm" ? "bg-orange-100" : ""}>
                  Cálido
                </Button>
                <Button onClick={() => setTone("cool")} className={tone === "cool" ? "bg-sky-100" : ""}>
                  Frío
                </Button>
                <Button onClick={() => setTone("neutral")} className={tone === "neutral" ? "bg-gray-100" : ""}>
                  Neutro
                </Button>
              </div>

              <div>
                <Label>Contraste (%)</Label>
                <Input type="range" min={50} max={110} value={contrast} onChange={(e) => setContrast(e.target.value)} />
              </div>
              <div>
                <Label>Intensidad de chispas (%)</Label>
                <Input
                  type="range"
                  min={0}
                  max={100}
                  value={sparkIntensity}
                  onChange={(e) => setSparkIntensity(e.target.value)}
                />
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-3">Imágenes</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Button onClick={() => document.getElementById("crissInput").click()}>
                  <UploadIcon className="w-4 h-4 mr-2" />
                  Cargar rostro base (Criss)
                </Button>
                <input
                  id="crissInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleUpload(e, setCrissFace, "crissFaceDataURL")}
                />
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={() => document.getElementById("tottiInput").click()}>
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Cargar foto del emprendedor
                </Button>
                <input
                  id="tottiInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleUpload(e, setTottiFace)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={() => document.getElementById("logoInput").click()}>
                  <WandIcon className="w-4 h-4 mr-2" />
                  Cargar logo (PNG fondo transparente)
                </Button>
                <input
                  id="logoInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleUpload(e, setLogo, "crissLogoDataURL")}
                />
              </div>

              <p className="text-xs text-gray-500">
                Tu rostro y logo quedan guardados en este navegador (localStorage).
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-3">Guion psicológico</h2>
            <div className="flex gap-2 mb-2">
              <Button className={duration === "45" ? "bg-blue-100" : ""} onClick={() => setDuration("45")}>
                Corto 45s
              </Button>
              <Button className={duration === "120" ? "bg-blue-100" : ""} onClick={() => setDuration("120")}>
                Extendido 2 min
              </Button>
            </div>
            <Textarea rows={10} value={script} readOnly />
            <p className="text-xs text-gray-500 mt-2">
              Incluye: sesgo de recencia, cortes cada 3s, pico emocional, pausa empática y CTA.
            </p>
          </Card>
        </div>

        {/* Columna derecha: canvas de portada */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold">Vista previa de Portada (1080×1920)</h2>
              <Button onClick={exportPNG}>
                <DownloadIcon className="w-4 h-4 mr-2 inline" />
                Exportar PNG
              </Button>
            </div>

            <div className="w-full flex justify-center">
              <div
                ref={thumbRef}
                className="relative w-[270px] h-[480px] md:w-[360px] md:h-[640px] lg:w-[405px] lg:h-[720px] bg-black overflow-hidden rounded-2xl"
                style={{ filter: `contrast(${contrast}%)` }}
              >
                {/* Tono/gradiente */}
                <div className={`absolute inset-0 bg-gradient-to-br ${toneOverlay}`} />

                {/* Fondo: emprendedor */}
                {tottiFace ? (
                  <img src={tottiFace} alt="emprendedor" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-white/60 text-sm">
                    Sube la foto del emprendedor
                  </div>
                )}

                {/* Chispas/luces */}
                <div className="absolute inset-0 pointer-events-none" style={sparkMask} />

                {/* Titulares */}
                <div className="absolute top-3 left-3 right-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  <div className="text-[20px] leading-tight font-extrabold text-yellow-300 uppercase">{headline}</div>
                  <div className="mt-1 text-[14px] font-extrabold text-white uppercase">{subhead}</div>
                </div>

                {/* Criss foreground */}
                {crissFace && (
                  <img
                    src={crissFace}
                    alt="Criss"
                    className="absolute bottom-0 left-0 w-[70%] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                  />
                )}

                {/* Marca */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  {logo && <img src={logo} alt="logo" className="w-10 h-10 object-contain" />}
                  <span className="text-white/90 font-semibold italic">{brandSignature}</span>
                </div>

                {/* Tag negocio */}
                <div className="absolute bottom-3 left-3 bg-white/90 text-black text-[12px] px-2 py-1 rounded-lg shadow">
                  {businessName} • {city}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
