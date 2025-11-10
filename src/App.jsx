import React, { useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, Upload, Image as ImageIcon, Wand2 } from "lucide-react";

/* -------------------- TEMÁTICAS -------------------- */
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

const Label = ({ children }) => (
  <label className="block text-sm font-semibold text-gray-700 mb-1">{children}</label>
);
const Input = (props) => (
  <input {...props} className={`w-full border rounded-xl px-3 py-2 text-sm ${props.className || ""}`} />
);
const Button = ({ children, className = "", ...p }) => (
  <button
    {...p}
    className={`px-4 py-2 rounded-xl bg-white border border-gray-300 shadow-sm hover:bg-gray-50 active:scale-95 transition ${className}`}
  >
    {children}
  </button>
);

/* -------------------- APP -------------------- */
export default function App() {
  const [themeKey, setThemeKey] = useState("regalo");
  const [headline, setHeadline] = useState(THEMES.regalo.title);
  const [subhead, setSubhead] = useState(THEMES.regalo.sub);
  const [businessName, setBusinessName] = useState("Cerrajería Totti");
  const [city, setCity] = useState("Shushufindi");
  const [signature, setSignature] = useState("Criss Lombeida");
  const [contrast, setContrast] = useState(100);
  const [spark, setSpark] = useState(80);

  const [titleSize, setTitleSize] = useState(26);
  const [subtitleSize, setSubtitleSize] = useState(18);
  const [signatureSize, setSignatureSize] = useState(20);
  const [logoSize, setLogoSize] = useState(48);

  const [tone, setTone] = useState("warm");

  const [crissFace, setCrissFace] = useState(null);
  const [tottiFace, setTottiFace] = useState(null);
  const [logo, setLogo] = useState(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    const savedFace = localStorage.getItem("crissFace");
    const savedLogo = localStorage.getItem("crissLogo");
    if (savedFace) setCrissFace(savedFace);
    if (savedLogo) setLogo(savedLogo);
  }, []);

  const handleUpload = async (e, setter, key) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setter(reader.result);
      if (key) localStorage.setItem(key, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const exportPNG = async () => {
    const node = thumbRef.current;
    if (!node) return;
    const dataUrl = await toPng(node, { pixelRatio: 2 });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${businessName}_thumbnail.png`;
    a.click();
  };

  const applyTheme = (key) => {
    setThemeKey(key);
    setHeadline(THEMES[key].title);
    setSubhead(THEMES[key].sub);
  };

  const toneOverlay =
    {
      warm: "from-amber-300/20 via-orange-400/10 to-transparent",
      cool: "from-sky-400/20 via-blue-500/10 to-transparent",
      neutral: "from-white/10 via-white/0 to-transparent",
    }[tone] || "from-amber-300/20 via-orange-400/10 to-transparent";

  const sparkMask = {
    backgroundImage:
      spark > 0
        ? `radial-gradient(circle at 70% 70%, rgba(255,200,120,${spark / 200}) 0, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,150,0,${
            spark / 180
          }) 0, transparent 50%)`
        : "none",
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-blue-50 to-white font-[Inter]">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-3xl shadow-md">
            <h2 className="font-bold text-xl mb-3">Ajustes de Portada</h2>

            <Label>Temática</Label>
            <select
              value={themeKey}
              onChange={(e) => applyTheme(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 mb-3"
            >
              {Object.entries(THEMES).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.title}
                </option>
              ))}
            </select>

            <Label>Negocio</Label>
            <Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
            <Label>Ciudad</Label>
            <Input value={city} onChange={(e) => setCity(e.target.value)} />
            <Label>Título</Label>
            <Input value={headline} onChange={(e) => setHeadline(e.target.value)} />
            <Label>Subtítulo</Label>
            <Input value={subhead} onChange={(e) => setSubhead(e.target.value)} />
            <Label>Firma</Label>
            <Input value={signature} onChange={(e) => setSignature(e.target.value)} />

            <Label>Tamaño de texto (Título)</Label>
            <Input type="range" min="16" max="40" value={titleSize} onChange={(e) => setTitleSize(e.target.value)} />
            <Label>Tamaño de subtítulo</Label>
            <Input type="range" min="12" max="28" value={subtitleSize} onChange={(e) => setSubtitleSize(e.target.value)} />
            <Label>Tamaño de firma</Label>
            <Input type="range" min="12" max="32" value={signatureSize} onChange={(e) => setSignatureSize(e.target.value)} />
            <Label>Tamaño del logo</Label>
            <Input type="range" min="30" max="100" value={logoSize} onChange={(e) => setLogoSize(e.target.value)} />

            <div className="mt-3 grid grid-cols-3 gap-2">
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

            <Label>Contraste</Label>
            <Input type="range" min="60" max="130" value={contrast} onChange={(e) => setContrast(e.target.value)} />
            <Label>Chispas</Label>
            <Input type="range" min="0" max="100" value={spark} onChange={(e) => setSpark(e.target.value)} />
          </div>

          <div className="bg-white p-4 rounded-3xl shadow-md space-y-3">
            <h2 className="font-bold text-xl mb-2">Imágenes</h2>
            <Button onClick={() => document.getElementById("crissFace").click()}>
              <Upload className="w-4 h-4 inline mr-2" />
              Cargar rostro Criss
            </Button>
            <input id="crissFace" type="file" className="hidden" onChange={(e) => handleUpload(e, setCrissFace, "crissFace")} />

            <Button onClick={() => document.getElementById("tottiFace").click()}>
              <ImageIcon className="w-4 h-4 inline mr-2" />
              Cargar emprendedor
            </Button>
            <input id="tottiFace" type="file" className="hidden" onChange={(e) => handleUpload(e, setTottiFace)} />

            <Button onClick={() => document.getElementById("logo").click()}>
              <Wand2 className="w-4 h-4 inline mr-2" />
              Cargar logo (PNG)
            </Button>
            <input id="logo" type="file" className="hidden" onChange={(e) => handleUpload(e, setLogo, "crissLogo")} />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white p-4 rounded-3xl shadow-md">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-xl">Vista Previa</h2>
              <Button onClick={exportPNG}>
                <Download className="w-4 h-4 inline mr-2" />
                Exportar PNG
              </Button>
            </div>

            <div className="flex justify-center">
              <div
                ref={thumbRef}
                className="relative w-[270px] h-[480px] bg-black rounded-2xl overflow-hidden"
                style={{ filter: `contrast(${contrast}%)` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${toneOverlay}`} />

                {tottiFace ? (
                  <img src={tottiFace} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-white/60">Sube foto del negocio</div>
                )}

                <div className="absolute inset-0 pointer-events-none" style={sparkMask} />

                <div className="absolute top-3 left-3 right-3 text-center text-white font-extrabold drop-shadow-lg">
                  <div style={{ fontSize: `${titleSize}px` }}>{headline}</div>
                  <div style={{ fontSize: `${subtitleSize}px` }} className="mt-1 text-yellow-300">
                    {subhead}
                  </div>
                </div>

                {crissFace && (
                  <img src={crissFace} className="absolute bottom-0 left-0 w-[70%] object-contain drop-shadow-lg" />
                )}

                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  {logo && <img src={logo} style={{ width: `${logoSize}px`, height: `${logoSize}px` }} />}
                  <span
                    style={{ fontSize: `${signatureSize}px`, fontFamily: "Dancing Script, cursive" }}
                    className="text-white italic"
                  >
                    {signature}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 bg-white/90 text-black text-xs px-2 py-1 rounded-lg">
                  {businessName} • {city}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
