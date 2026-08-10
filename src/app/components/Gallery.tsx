"use client";

import { useMemo, useState } from "react";
import { weddingData } from "@/lib/wedding-data";
import { PhotoFrame } from "./PhotoFrame";
import { Reveal } from "./Reveal";

type Item = { id: number; src?: string; label: string; span?: string };

/** Bagian galeri: video youtube + carousel + grid + lightbox. */
export function Gallery() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const photos = weddingData.bg.gallery;
  const items = useMemo<Item[]>(() => {
    if (photos.length > 0) {
      return photos.map((src, i) => ({
        id: i,
        src,
        label: `Foto ${i + 1}`,
        span: i % 4 === 0 ? "tall" : i % 4 === 3 ? "wide" : "",
      }));
    }
    const spans = ["tall", "", "wide", "", "tall", "", "", "wide", "", "", "tall", ""];
    return spans.map((span, i) => ({
      id: i,
      label: `Foto ${i + 1}`,
      span,
    }));
  }, [photos]);

  const carousel = items.slice(0, 9);
  const grid = items.slice(9);

  return (
    <section className="section">
      <div className="container-wd text-center">
        <Reveal>
          <h2 className="judul-kolom">Gallery</h2>
          <p className="body-text mt-5 text-cream/80">Moment kebersamaan kami</p>
        </Reveal>

        {/* Carousel */}
        <Reveal className="mt-8">
          <div className="gallery-scroll">
            {carousel.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setOpenIdx(g.id)}
                className="w-52 shrink-0 cursor-pointer text-left"
                aria-label={`Buka ${g.label}`}
              >
                <PhotoFrame ratio="3 / 4" label={g.label} src={g.src} />
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid 2 kolom */}
        <Reveal className="mt-4">
          <div className="gallery-grid">
            {grid.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setOpenIdx(g.id)}
                className={`${g.span} cursor-pointer text-left`}
                aria-label={`Buka ${g.label}`}
              >
                <PhotoFrame
                  ratio={false}
                  label={g.label}
                  src={g.src}
                  className="h-full w-full"
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      <div
        className={`lightbox ${openIdx !== null ? "show" : ""}`}
        onClick={() => setOpenIdx(null)}
        role="dialog"
        aria-modal="true"
      >
        {openIdx !== null && (
          <div className="w-[85vw] max-w-md" onClick={(e) => e.stopPropagation()}>
            <PhotoFrame
              ratio="3 / 4"
              label={items[openIdx]?.label ?? "Foto"}
              src={items[openIdx]?.src}
              className="border-gold-light!"
            />
            <button type="button" className="btn-ink mt-5" onClick={() => setOpenIdx(null)}>
              Tutup
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
