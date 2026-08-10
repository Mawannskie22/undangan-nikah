import { weddingData } from "@/lib/wedding-data";
import { Reveal } from "./Reveal";

/** Bagian Dress Code (3 lingkaran warna). */
export function DressCode() {
  return (
    <section className="section">
      <div className="container-wd text-center">
        <Reveal>
          <h2 className="judul-kolom">Dress Code</h2>
          <p className="body-text mx-auto mt-5 max-w-lg text-cream/80">
            Kami dengan hormat meminta Tamu Undangan mengenakan warna-warna di bawah
            ini pada hari istimewa kami.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-3 gap-4">
          {weddingData.dressCode.map((d) => (
            <Reveal key={d.warna}>
              <div className="flex flex-col items-center gap-3">
                <div className="dc-dot" style={{ background: d.hex }} />
                <p className="font-hagmolya text-[17px] text-gold-light">{d.warna}</p>
                <p className="body-text text-[10px] uppercase tracking-[0.15em] text-cream/60">
                  {d.deskripsi}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
