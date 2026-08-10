import { weddingData } from "@/lib/wedding-data";

/** Bagian hero setelah cover dibuka (id="hero" / #open). */
export function Hero() {
  const video = weddingData.bg.heroVideo;
  const foto = weddingData.bg.hero;

  return (
    <section id="hero" className="section relative">
      {/* Background video / foto / gradient */}
      {video ? (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : foto ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${foto})` }}
          aria-hidden="true"
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 600px at 50% 30%, #5c2a2a 0%, #2a1010 65%)",
          }}
          aria-hidden="true"
        />
      )}
      <div className="section-overlay" aria-hidden="true" />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
        <p className="judul-acara">{weddingData.judul}</p>
        <div className="mt-6 flex flex-col items-center gap-1 md:gap-2">
          <span className="nama-panggilan">{weddingData.wanita.panggilan}</span>
          <span className="font-photo-sig text-[30px] leading-none text-gold md:text-[36px]">
            &amp;
          </span>
          <span className="nama-panggilan">{weddingData.pria.panggilan}</span>
        </div>
        <p className="body-text mt-8 uppercase tracking-[0.3em] text-cream/85">
          {weddingData.tanggalAcara.hari},{" "}
          {weddingData.tanggalAcara.tanggal}
        </p>

        {/* Indikator scroll */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2">
          <span className="body-text text-[10px] uppercase tracking-[0.3em] text-cream/60">
            Scroll
          </span>
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 text-gold scroll-bounce"
            fill="none"
            aria-hidden="true"
          >
            <rect x="7" y="3" width="10" height="16" rx="5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 8v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
