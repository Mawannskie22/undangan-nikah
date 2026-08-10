import Image from "next/image";

type PhotoFrameProps = {
  /** Path foto di `public/images/`, mis. "/images/foto-1.jpg". Kosongkan untuk menampilkan placeholder. */
  src?: string;
  alt?: string;
  /** Bingkai lengkung (arch) khas foto adat. */
  arch?: boolean;
  /** Rasio bingkai, mis. "4 / 5". Pakai false bila tinggi diatur dari luar (grid). */
  ratio?: string | false;
  /** Label placeholder foto. */
  label?: string;
  className?: string;
  children?: React.ReactNode;
};

export function PhotoFrame({
  src,
  alt = "",
  arch = false,
  ratio = "3 / 4",
  label = "Foto",
  className = "",
  children,
}: PhotoFrameProps) {
  return (
    <figure
      className={`photo-frame ${arch ? "arch" : "square"} ${className}`}
      style={ratio === false ? undefined : { aspectRatio: ratio }}
    >
      {children}
      {!children && src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 90vw, 600px"
          className="object-cover"
          priority={false}
        />
      ) : null}
      {!children && !src ? (
        <div className="photo-empty">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="16" rx="2.5" />
            <circle cx="9" cy="10" r="1.6" />
            <path d="M21 15.5 L16.5 11 L6.5 20.5" />
          </svg>
          <span className="photo-label">{label}</span>
        </div>
      ) : null}
    </figure>
  );
}
