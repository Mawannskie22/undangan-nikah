"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { weddingData } from "@/lib/wedding-data";

type T = { days: string; hours: string; minutes: string; seconds: string };

const pad = (n: number) => String(n).padStart(2, "0");

/** Bagian countdown (latar gelap) dengan tombol Save The Date. */
export function Countdown() {
  const [t, setT] = useState<T>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const target = new Date(weddingData.tanggalAcara.iso).getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setT({
        days: pad(Math.floor(diff / 86_400_000)),
        hours: pad(Math.floor(diff / 3_600_000) % 24),
        minutes: pad(Math.floor(diff / 60_000) % 60),
        seconds: pad(Math.floor(diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const saveTheDateUrl = (() => {
    const base = "https://www.google.com/calendar/render?action=TEMPLATE";
    const text = `Pernikahan ${weddingData.namaAcara}`;
    const details = `${weddingData.tanggalAcara.tanggal}, jangan lupa hadir ya pada Acara Pernikahan Kami..`;
    const location = weddingData.events[1]?.tempat ?? "";
    const dateISO = "20501231T020000Z/20501231T150000Z";
    return `${base}&text=${encodeURIComponent(text)}&details=${encodeURIComponent(
      details,
    )}&location=${encodeURIComponent(location)}&dates=${dateISO}`;
  })();

  const boxes = [
    { v: t.days, l: "Hari" },
    { v: t.hours, l: "Jam" },
    { v: t.minutes, l: "Menit" },
    { v: t.seconds, l: "Detik" },
  ];

  return (
    <section className="section">
      <div className="container-wd text-center">
        <Image
          src="/images/ornaments/MINANG-ICON.png"
          alt="Ornamen Minang"
          width={220}
          height={103}
          className="minang-icon"
          priority={false}
        />
        <h2 className="judul-kolom mt-8">Countdown</h2>

        <div className="mt-10 flex items-center justify-center gap-3">
          {boxes.map((b) => (
            <div key={b.l} className="countdown-box">
              <span className="num">{b.v}</span>
              <span className="lbl">{b.l}</span>
            </div>
          ))}
        </div>

        <a
          href={saveTheDateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ink mt-10"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 10h18M8 3v4M16 3v4" />
          </svg>
          Save The Date
        </a>
      </div>
    </section>
  );
}
