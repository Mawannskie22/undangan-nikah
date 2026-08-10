import Image from "next/image";
import { ayatBuka, weddingData } from "@/lib/wedding-data";
import { PhotoFrame } from "./PhotoFrame";
import { Reveal } from "./Reveal";

/** Bagian pembuka: ayat + salam + Mempelai (Bride & Groom). */
export function Opening() {
  return (
    <>
      {/* ===== Ayat pembuka + P & P ===== */}
      <section className="section">
        <div className="container-wd text-center">
          <Reveal>
            <div className="panel mx-auto max-w-sm p-6">
              <PhotoFrame
                arch
                ratio="3 / 4"
                label="Foto Pasangan"
                className="mx-auto max-w-[240px]"
                src={weddingData.bg.cover[0] || undefined}
              />
              <div
                className="mx-auto -mt-7 mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink/20 bg-white font-hagmolya text-xl text-maroon"
                style={{ boxShadow: "0 0 0 4px rgba(68,68,68,.12)" }}
              >
                P &amp; P
              </div>
              <div className="ayat px-2">
                <p className="arab leading-loose">{ayatBuka.arab}</p>
                <p className="arti">{ayatBuka.latin}</p>
                <p className="sumber mt-1">{ayatBuka.sumber}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Salam pembuka ===== */}
      <section className="section">
        <div className="container-wd pt-0 text-center">
          <Reveal>
            <Image
              src="/images/ornaments/MINANG-ICON.png"
              alt="Ornamen Minang"
              width={220}
              height={103}
              className="minang-icon"
            />
            <p className="salam mt-8">{weddingData.salamPembuka}</p>
            <p className="body-text mx-auto mt-4 max-w-lg text-cream/85">
              {weddingData.kalimatPembuka}
            </p>
            <h2 className="judul-kolom mt-12">Bride &amp; Groom</h2>
          </Reveal>
        </div>
      </section>

      {/* ===== Mempelai ===== */}
      <section className="section">
        <div className="container-wd pt-0 text-center">
          <div className="grid grid-cols-1 items-start gap-14 md:grid-cols-[1fr_auto_1fr]">
            {/* Wanita */}
            <Reveal className="md:text-right">
              <div className="relative mx-auto max-w-[280px]">
                <Image
                  src="/images/ornaments/MINANG-COUPLE-2.png"
                  alt=""
                  fill
                  sizes="280px"
                  className="object-contain opacity-70"
                  aria-hidden="true"
                />
                <PhotoFrame
                  arch
                  ratio="4 / 5"
                  label="Foto Mempelai Wanita"
                  className="relative z-10 -translate-y-3"
                  src={weddingData.wanita.foto || undefined}
                />
              </div>
              <div className="mt-6">
                <p className="nama-panggilan">{weddingData.wanita.panggilan}</p>
                <h3 className="nama-lengkap mt-1">{weddingData.wanita.namaLengkap}</h3>
                <p className="body-text mt-3 whitespace-pre-line text-cream/80">
                  {weddingData.wanita.orangTua}
                </p>
                <a
                  href={`https://instagram.com/${weddingData.wanita.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="body-text mt-3 inline-block text-gold underline underline-offset-4"
                >
                  {weddingData.wanita.instagram}
                </a>
              </div>
            </Reveal>

            {/* Ampersand */}
            <Reveal className="hidden md:flex md:items-center md:pt-24">
              <span className="font-photo-sig text-[54px] text-gold">&amp;</span>
            </Reveal>

            {/* Pria */}
            <Reveal className="md:text-left">
              <div className="relative mx-auto max-w-[280px]">
                <Image
                  src="/images/ornaments/MINANG-COUPLE-4.png"
                  alt=""
                  fill
                  sizes="280px"
                  className="object-contain opacity-70"
                  aria-hidden="true"
                />
                <PhotoFrame
                  arch
                  ratio="4 / 5"
                  label="Foto Mempelai Pria"
                  className="relative z-10 -translate-y-3"
                  src={weddingData.pria.foto || undefined}
                />
              </div>
              <div className="mt-6">
                <p className="nama-panggilan">{weddingData.pria.panggilan}</p>
                <h3 className="nama-lengkap mt-1">{weddingData.pria.namaLengkap}</h3>
                <p className="body-text mt-3 whitespace-pre-line text-cream/80">
                  {weddingData.pria.orangTua}
                </p>
                <a
                  href={`https://instagram.com/${weddingData.pria.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="body-text mt-3 inline-block text-gold underline underline-offset-4"
                >
                  {weddingData.pria.instagram}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
