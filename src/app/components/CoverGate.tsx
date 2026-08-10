"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { weddingData } from "@/lib/wedding-data";

type CoverGateProps = {
  visible: boolean;
  onOpen: () => void;
};

const emptySubscribe = () => () => {};

const getSearch = () => window.location.search;

const getServerSearch = () => "";

/** Layar pembuka (cover) dengan slideshow foto + tombol "Buka Undangan". */
export function CoverGate({ visible, onOpen }: CoverGateProps) {
  const search = useSyncExternalStore(emptySubscribe, getSearch, getServerSearch);
  const guest = useMemo(() => {
    const params = new URLSearchParams(search);
    const nama =
      params.get("to") || params.get("dear") || params.get("kepada") || "";
    return decodeURIComponent(nama.replace(/\+/g, " "));
  }, [search]);

  const slides = weddingData.bg.cover;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className={`cover-gate ${visible ? "" : "hidden-gate"}`}>
      {slides.map((src, i) => (
        <div
          key={src}
          className={`cover-slide ${i === idx ? "active" : ""}`}
          style={{ backgroundImage: `url(${src})` }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="judul-acara">{weddingData.judul}</p>
        <h1 className="judul-undangan mt-4">{weddingData.namaAcara}</h1>

        <div className="mt-8 w-full max-w-xs border-t border-b border-white/25 py-4">
          <p className="body-text uppercase tracking-[0.2em] text-cream/75">
            Kepada Yth:
          </p>
          <p className="nama-lengkap mt-2 text-[22px] md:text-[26px]">
            {guest || "Nama Tamu"}
          </p>
          <p className="body-text mt-2 text-cream/70">
            Mohon maaf bila ada salah penulisan
          </p>
        </div>

        <button type="button" className="btn-cover mt-9" onClick={onOpen}>
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
          Buka Undangan
        </button>
      </div>
    </div>
  );
}
