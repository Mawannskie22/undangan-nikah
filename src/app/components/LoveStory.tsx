import Image from "next/image";
import { loveStory } from "@/lib/wedding-data";
import { Reveal } from "./Reveal";

/** Bagian Love Story (timeline). */
export function LoveStory() {
  return (
    <section className="section">
      <div className="container-wd text-center">
        <Reveal>
          <Image
            src="/images/ornaments/MINANG-ICON.png"
            alt="Ornamen Minang"
            width={220}
            height={103}
            className="minang-icon"
          />
          <h2 className="judul-kolom mt-8">Love Story</h2>
          <p className="body-text mt-5 text-cream/80">Cerita perjalanan cinta kami</p>
        </Reveal>

        <div className="timeline mx-auto mt-14 max-w-3xl">
          {loveStory.map((item) => (
            <Reveal key={item.judul} className="timeline-item">
              <span className="tl-dot" aria-hidden="true" />
              <div className="tl-content pb-12">
                <div className="panel inline-block w-full max-w-[300px] p-5 text-left">
                  <p className="body-text text-[11px] uppercase tracking-[0.25em] text-maroon/60">
                    {item.tahun}
                  </p>
                  <h3 className="nama-acara mt-1 text-[22px]">{item.judul}</h3>
                  <p className="body-text mt-2 leading-relaxed text-ink/75">
                    {item.deskripsi}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
