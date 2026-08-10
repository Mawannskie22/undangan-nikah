import { weddingData } from "@/lib/wedding-data";
import { Reveal } from "./Reveal";

/** Bagian Live Streaming (Join Streaming). */
export function LiveStreaming() {
  return (
    <section className="section">
      <div className="container-wd text-center">
        <Reveal>
          <h2 className="judul-kolom">Live Streaming</h2>
          <p className="body-text mx-auto mt-5 max-w-lg text-cream/80">
            Temui kami secara virtual untuk menyaksikan acara pernikahan kami melalui
            tautan di bawah ini:
          </p>
          {weddingData.streaming.aktif && (
            <a
              href={weddingData.streaming.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink mt-8"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
              </svg>
              {weddingData.streaming.label}
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}
