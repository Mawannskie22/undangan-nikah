"use client";

import { useEffect, useState } from "react";
import { weddingData } from "@/lib/wedding-data";

/** Mini-hero yang menempel di atas saat scroll melewati hero. */
export function StickyHero() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky-hero ${show ? "show" : ""}`}>
      <div className="flex items-center gap-3 px-4 py-2.5">
        <span
          className="inline-block h-10 w-10 shrink-0 rounded-full border-2 border-gold bg-cream"
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="truncate font-photo-sig text-[18px] text-cream">
            {weddingData.namaAcara}
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold">
            {weddingData.tanggalAcara.hari}, {weddingData.tanggalAcara.tanggal}
          </p>
        </div>
      </div>
    </div>
  );
}
