import { ayatPenutup, weddingData } from "@/lib/wedding-data";
import { Reveal } from "./Reveal";

/** Bagian penutup + footer. */
export function ClosingFooter() {
  const bg = weddingData.bg.closing;

  return (
    <>
      {/* ===== Penutup ===== */}
      <section className="section relative">
        {bg ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bg})` }}
            aria-hidden="true"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(800px 500px at 50% 0%, #5c2a2a 0%, #240d0d 70%)",
            }}
            aria-hidden="true"
          />
        )}
        <div className="section-overlay" aria-hidden="true" />

        <div className="container-wd relative z-10 text-center">
          <Reveal>
            <div className="ayat mx-auto max-w-xl">
              <p className="arab leading-loose text-gold">{ayatPenutup.arab}</p>
              <p className="arti">{ayatPenutup.latin}</p>
              <p className="sumber mt-1">{ayatPenutup.sumber}</p>
            </div>
            <p className="body-text mx-auto mt-10 max-w-lg text-cream/85">
              {weddingData.kalimatPenutup}
            </p>
            <p className="salam mt-8">{weddingData.salamPenutup}</p>
            <p className="body-text mt-10 uppercase tracking-[0.3em] text-cream/60">
              {weddingData.yangMengundang}
            </p>
            <h2 className="font-photo-sig mt-4 text-[46px] leading-tight text-gold-light">
              {weddingData.namaAcara}
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="section bg-maroon-deep">
        <div className="container-wd py-10! text-center">
          <p className="font-photo-sig text-[34px] text-gold-light">{weddingData.brand}</p>
          <p className="font-hagmolya mt-2 text-[18px] text-cream/90">Acara Kita</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <a
              href={weddingData.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 text-gold transition hover:bg-gold hover:text-maroon"
              aria-label="WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.6-5.5c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4 0-.6.1-.7l.4-.6c.1-.2.1-.3 0-.5l-1.7-4c-.3-.6-.6-.5-.9-.5h-.8c-.2 0-.6.1-.9.4-.3.3-1 1-1 2.5s1 2.9 1.2 3.1a20 20 0 0 0 3.3 5.4c1.7 1.7 3 2.2 3.7 2.5.9.3 1.7.3 2.3.2.7-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3Z" />
              </svg>
            </a>
            <a
              href="https://acarakita.my.id/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 text-gold transition hover:bg-gold hover:text-maroon"
              aria-label="Globe"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
              </svg>
            </a>
          </div>
          <p className="mt-6 font-sans text-[10px] tracking-widest text-cream/40">
            DIGITAL WEDDING INVITATION
          </p>
        </div>
      </footer>
    </>
  );
}
