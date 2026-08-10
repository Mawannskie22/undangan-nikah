import { weddingData } from "@/lib/wedding-data";
import { Reveal } from "./Reveal";

/** Bagian Wedding Event (3 kartu acara + tombol Google Maps). */
export function Events() {
  return (
    <section className="section">
      <div className="container-wd text-center">
        <Reveal>
          <h2 className="judul-kolom">Wedding Event</h2>
          <p className="body-text mx-auto mt-5 max-w-lg text-cream/80">
            Kami berharap Bapak/Ibu/Sdra/i berkenan hadir pada Acara Pernikahan kami
            ini.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-col items-center gap-6">
          {weddingData.events.map((ev, i) => (
            <Reveal key={ev.judul} className="w-full max-w-sm">
              <div className="event-card">
                <div className="icon-badge">
                  {i === 0 ? (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  ) : i === 1 ? (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                      <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                      <circle cx="12" cy="10" r="2.6" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                      <path d="M3 21h18M5 21V7l7-4 7 4v14" />
                      <path d="M9 21v-6h6v6" />
                    </svg>
                  )}
                </div>
                <p className="nama-acara mt-4">{ev.judul}</p>
                <p className="body-text mt-2 uppercase tracking-[0.2em] text-maroon/70">
                  {ev.hari}
                </p>
                <p className="font-hagmolya mt-1 text-[24px] leading-tight text-maroon">
                  {ev.tanggal}
                </p>
                <p className="body-text mt-1 text-ink/70">{ev.waktu}</p>
                <p className="nama-acara mt-4 text-[17px] text-maroon">{ev.tempat}</p>
                <p className="body-text mx-auto mt-1 max-w-[280px] text-ink/70">
                  {ev.alamat}
                </p>
                <a
                  href={ev.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ink mt-5"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                    <circle cx="12" cy="10" r="2.6" />
                  </svg>
                  Google Maps
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
