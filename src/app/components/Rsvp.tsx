"use client";

import { useState, useSyncExternalStore } from "react";
import { Reveal } from "./Reveal";

type Ucapan = {
  id: number;
  nama: string;
  kehadiran: string;
  jumlah: string;
  pesan: string;
};

const STORAGE_KEY = "undangan-ucapan-v1";

const SEED: Ucapan[] = [
  {
    id: 1,
    nama: "Teman Mempelai",
    kehadiran: "Hadir",
    jumlah: "2",
    pesan: "Selamat menempuh hidup baru, semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
  },
  {
    id: 2,
    nama: "Sahabat Baik",
    kehadiran: "Masih Ragu",
    jumlah: "1",
    pesan: "Barakallahu lakuma. Semoga lancar acaranya sampai hari H ya!",
  },
];

const KEHADIRAN = [
  { value: "Hadir", label: "Hadir", cls: "chip-hadir" },
  { value: "Tidak Hadir", label: "Tidak Hadir", cls: "chip-tidak" },
  { value: "Masih Ragu", label: "Masih Ragu", cls: "chip-ragu" },
];

/* ---- Store ucapan (localStorage) dengan useSyncExternalStore ---- */
const listeners = new Set<() => void>();
let cached: Ucapan[] | null = null;

function getSnapshot(): Ucapan[] {
  if (cached) return cached;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cached = raw ? (JSON.parse(raw) as Ucapan[]) : SEED;
  } catch {
    cached = SEED;
  }
  return cached;
}

function getServerSnapshot(): Ucapan[] {
  return SEED;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function saveList(next: Ucapan[]) {
  cached = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* abaikan */
  }
  listeners.forEach((l) => l());
}

/** Bagian doa & ucapan / RSVP. */
export function Rsvp() {
  const list = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [nama, setNama] = useState("");
  const [kehadiran, setKehadiran] = useState("");
  const [jumlah, setJumlah] = useState("1");
  const [pesan, setPesan] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nama.trim().length < 2) {
      setError("Nama minimal 2 karakter");
      return;
    }
    if (!kehadiran) {
      setError("Konfirmasi kehadiran wajib diisi");
      return;
    }
    if (!pesan.trim()) {
      setError("Tulis ucapan terlebih dahulu");
      return;
    }
    setError("");
    const item: Ucapan = {
      id: Date.now(),
      nama: nama.trim(),
      kehadiran,
      jumlah,
      pesan: pesan.trim(),
    };
    saveList([item, ...list]);
    setNama("");
    setKehadiran("");
    setJumlah("1");
    setPesan("");
  };

  const stats = KEHADIRAN.map((k) => ({
    ...k,
    total: list.filter((x) => x.kehadiran === k.value).length,
  }));

  return (
    <section className="section">
      <div className="container-wd text-center">
        <Reveal>
          <h2 className="judul-kolom">Doa &amp; Ucapan</h2>
          <p className="body-text mt-5 text-cream/80">
            Ucapan Selamat &amp; Do&apos;a Terbaik
          </p>
        </Reveal>

        {/* Statistik */}
        <Reveal className="mt-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {stats.map((s) => (
              <span
                key={s.value}
                className={`rounded-full px-4 py-1 font-sans text-[11px] ${s.cls}`}
              >
                {s.value} {s.total}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Form */}
        <Reveal className="mt-8">
          <form onSubmit={submit} className="panel mx-auto max-w-md space-y-4 p-6 text-left">
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama Anda"
              className="field"
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                value={kehadiran}
                onChange={(e) => setKehadiran(e.target.value)}
                className="field"
                aria-label="Konfirmasi kehadiran"
              >
                <option value="">Kehadiran</option>
                {KEHADIRAN.map((k) => (
                  <option key={k.value} value={k.value}>
                    {k.label}
                  </option>
                ))}
              </select>
              {kehadiran === "Hadir" ? (
                <select
                  value={jumlah}
                  onChange={(e) => setJumlah(e.target.value)}
                  className="field"
                  aria-label="Jumlah tamu"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                    <option key={n} value={n}>
                      {n} orang
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={kehadiran ? "—" : ""}
                  readOnly
                  disabled
                  className="field disabled:opacity-60"
                  placeholder="Jumlah Tamu"
                />
              )}
            </div>
            <textarea
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
              placeholder="Tulis Ucapan & Doa terbaik Anda"
              rows={4}
              className="field resize-none"
            />
            {error && (
              <p className="font-sans text-[11px] text-[#ef4444]">{error}</p>
            )}
            <button type="submit" className="btn-ink w-full">
              Kirim Ucapan
            </button>
          </form>
        </Reveal>

        {/* Daftar ucapan */}
        <div className="mx-auto mt-10 max-w-md space-y-4 text-left">
          {list.map((x) => (
            <div key={x.id} className="panel p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="font-hagmolya text-[17px] text-maroon">{x.nama}</p>
                {x.kehadiran && (
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-sans text-[10px] ${
                      KEHADIRAN.find((k) => k.value === x.kehadiran)?.cls ?? ""
                    }`}
                  >
                    {x.kehadiran} {x.jumlah && x.kehadiran === "Hadir" ? `· ${x.jumlah} org` : ""}
                  </span>
                )}
              </div>
              <p className="body-text mt-1 whitespace-pre-line leading-relaxed text-ink/75">
                {x.pesan}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
