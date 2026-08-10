"use client";

import { useState } from "react";
import { weddingData } from "@/lib/wedding-data";
import { Reveal } from "./Reveal";

const BANK_COLORS: Record<string, string> = {
  mandiri: "#3b7fc6",
  btn: "#1d5fa8",
  dana: "#17a589",
};

/** Bagian kado digital / rekening. */
export function Gift() {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (no: string) => {
    try {
      await navigator.clipboard.writeText(no);
      setCopied(no);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  };

  return (
    <section className="section">
      <div className="container-wd text-center">
        <Reveal>
          <h2 className="judul-kolom">Wedding Gift</h2>
          <p className="body-text mx-auto mt-5 max-w-lg text-cream/80">
            Tanpa mengurangi rasa hormat, bagi Bapak/Ibu/Saudara/i yang ingin memberikan
            tanda kasih untuk kami, dapat melalui:
          </p>
        </Reveal>

        <Reveal className="mt-8">
          <button type="button" className="btn-ink" onClick={() => setShow((s) => !s)}>
            {show ? "Sembunyikan" : "Lihat Rekening"}
          </button>
        </Reveal>

        {show && (
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {weddingData.bank.map((b) => (
              <div key={b.nomor} className="bank-card">
                <span
                  className="bank-logo mt-6 text-lg"
                  style={{ color: BANK_COLORS[b.nama] ?? "#444444" }}
                >
                  {b.nama}
                </span>
                <p className="font-sans mt-4 text-[20px] font-semibold tracking-[0.12em] text-ink">
                  {b.nomor}
                </p>
                <p className="body-text mt-1 text-ink/70">An. {b.atasNama}</p>
                <button
                  type="button"
                  className="btn-ink mt-4 w-full"
                  onClick={() => copy(b.nomor)}
                >
                  {copied === b.nomor ? "Tersalin ✓" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        )}

        <Reveal className="mt-14">
          <p className="font-photo-sig text-[38px] leading-tight text-gold-light">
            Terima Kasih
          </p>
        </Reveal>
      </div>
    </section>
  );
}
