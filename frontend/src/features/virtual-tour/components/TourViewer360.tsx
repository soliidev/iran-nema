import { useEffect, useRef, useCallback, useState } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import "@photo-sphere-viewer/core/index.css";
import { AlertTriangle, PanelRight, PanelLeft, Loader2 } from "lucide-react";
import type { PanoramaSection } from "../types/tour";

type Props = {
  image: string;
  title: string;
  onClose: () => void;
  isPanorama?: boolean;
  panoramas?: PanoramaSection[];
};

const TourViewer360 = ({ image, title, onClose, isPanorama, panoramas }: Props) => {
  if (!isPanorama) {
    return <SimpleViewer image={image} title={title} onClose={onClose} />;
  }

  return (
    <PanoramaViewer
      image={image}
      title={title}
      onClose={onClose}
      panoramas={panoramas}
    />
  );
};

const PanoramaViewer = ({ image, title, onClose, panoramas }: { image: string; title: string; onClose: () => void; panoramas?: PanoramaSection[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [activePanorama, setActivePanorama] = useState(image);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    setSidebarOpen(window.innerWidth >= 1024);
  }, []);

  const destroyViewer = useCallback(() => {
    if (viewerRef.current) {
      try {
        viewerRef.current.destroy();
      } catch {
        // DOM node already removed by React
      }
      viewerRef.current = null;
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    let cancelled = false;

    const img = new Image();
    img.onload = () => {
      if (cancelled || !mountedRef.current) return;
      if (!containerRef.current) return;

      try {
        const viewer = new Viewer({
          container: containerRef.current,
          panorama: activePanorama,
          caption: title,
          defaultZoomLvl: 0,
          navbar: ["zoom", "move", "fullscreen"],
          loadingImg: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        });

        viewerRef.current = viewer;

        viewer.addEventListener("ready", () => {
          if (mountedRef.current) setStatus("ready");
        });

        viewer.addEventListener("error", () => {
          if (mountedRef.current) setStatus("error");
        });
      } catch {
        if (mountedRef.current) setStatus("error");
      }
    };
    img.onerror = () => {
      if (mountedRef.current) setStatus("error");
    };
    img.src = activePanorama;

    const timeout = setTimeout(() => {
      if (mountedRef.current && status === "loading") {
        setStatus("error");
      }
    }, 20000);

    return () => {
      cancelled = true;
      mountedRef.current = false;
      clearTimeout(timeout);
      setTimeout(destroyViewer, 0);
    };
  }, [activePanorama, title, destroyViewer, status]);

  const handlePanoramaChange = (newImage: string) => {
    setStatus("loading");
    setActivePanorama(newImage);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div ref={containerRef} className="absolute inset-0 h-full w-full" />

      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="absolute top-4 right-2 z-30 rounded-xl bg-white/10 p-2 text-white backdrop-blur transition hover:bg-white/20 cursor-pointer"
        >
          <PanelLeft className="h-5 w-5" />
        </button>
      )}

      {panoramas && panoramas.length > 0 && (
        <div
          style={{ right: sidebarOpen ? "0" : "-16rem" }}
          className="absolute top-0 bottom-0 z-20 w-64 bg-black/90 border-r border-white/10 flex flex-col overflow-hidden transition-all duration-300"
        >
          <div className="flex items-center p-4 border-b border-white/10">
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-xl bg-white/10 p-1.5 text-white hover:bg-white/20 transition cursor-pointer ml-2"
            >
              <PanelRight className="h-4 w-4" />
            </button>
            <h3 className="text-white font-bold text-sm">سایر قسمت‌ها</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {panoramas.map((panorama) => (
              <button
                key={panorama.id}
                onClick={() => handlePanoramaChange(panorama.image)}
                className={`w-full text-right rounded-lg p-3 transition ${
                  activePanorama === panorama.image
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={panorama.image}
                    alt={panorama.title}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <span className="text-sm font-medium">{panorama.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {status === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-white/50" />
            <p className="mt-4 text-white/60">در حال بارگذاری تور مجازی...</p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
            <p className="mt-4 text-white/80">خطا در بارگذاری تصویر ۳۶۰ درجه</p>
            <p className="mt-2 text-sm text-white/40">تصویر ممکن است فرمت مناسب نداشته باشد</p>
            <button onClick={onClose} className="mt-6 rounded-xl bg-white/10 px-6 py-2 text-white transition hover:bg-white/20">
              بازگشت
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => {
          destroyViewer();
          onClose();
        }}
        className="absolute left-4 top-4 z-30 rounded-xl bg-white/10 px-4 py-2 text-white backdrop-blur transition hover:bg-white/20"
      >
        بازگشت
      </button>
    </div>
  );
};

const SimpleViewer = ({ image, title, onClose }: { image: string; title: string; onClose: () => void }) => {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offsetStart, setOffsetStart] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const zoom = useCallback((factor: number) => {
    setScale((prev) => Math.max(0.5, Math.min(5, prev * factor)));
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black select-none"
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      <div className="flex items-center justify-between px-4 py-3 bg-black/80 border-b border-white/10">
        <h2 className="text-white font-bold text-lg truncate ml-4">{title}</h2>
        <div className="flex items-center gap-2">
          <button onClick={() => zoom(1.2)} className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition">+</button>
          <button onClick={() => zoom(0.8)} className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition">-</button>
          <button onClick={() => { setScale(1); setOffset({ x: 0, y: 0 }); }} className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition">⟳</button>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition mr-2">✕</button>
        </div>
      </div>
      <div
        className="relative flex-1 flex items-center justify-center overflow-hidden"
        onWheel={(e) => { e.preventDefault(); zoom(e.deltaY > 0 ? 0.9 : 1.1); }}
        onMouseDown={(e) => { setIsDragging(true); setDragStart({ x: e.clientX, y: e.clientY }); setOffsetStart({ x: offset.x, y: offset.y }); }}
        onMouseMove={(e) => { if (!isDragging) return; setOffset({ x: offsetStart.x + e.clientX - dragStart.x, y: offsetStart.y + e.clientY - dragStart.y }); }}
        style={{ cursor: isDragging ? "grabbing" : scale > 1 ? "grab" : "default" }}
      >
        {(isLoading || error) && (
          <div className="absolute inset-0 flex items-center justify-center">
            {error ? (
              <p className="text-white/60">خطا در بارگذاری تصویر</p>
            ) : (
              <Loader2 className="h-12 w-12 animate-spin text-white/50" />
            )}
          </div>
        )}
        <img
          src={image}
          alt={title}
          onLoad={() => setIsLoading(false)}
          onError={() => { setIsLoading(false); setError(true); }}
          className="max-h-full max-w-full transition-transform duration-75"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
            opacity: isLoading || error ? 0 : 1,
          }}
          draggable={false}
        />
      </div>
      <div className="flex items-center justify-center gap-6 px-4 py-3 bg-black/80 border-t border-white/10 text-white/60 text-xs sm:text-sm">
        <span>چرخ دنده ماوس: بزرگنمایی</span>
        <span>کلیک و درگ: جابجایی</span>
      </div>
    </div>
  );
};

export default TourViewer360;
