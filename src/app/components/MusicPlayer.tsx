"use client";

type MusicPlayerProps = {
  playing: boolean;
  onToggle: () => void;
};

/** Tombol play/pause musik melayang di kanan bawah. */
export function MusicPlayer({ playing, onToggle }: MusicPlayerProps) {
  return (
    <button
      type="button"
      className="floating-btn bottom-6 right-4"
      onClick={onToggle}
      aria-label={playing ? "Jeda musik" : "Putar musik"}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-5 w-5 ${playing ? "music-spin" : ""}`}
        fill="currentColor"
        aria-hidden="true"
      >
        {playing ? (
          <path d="M12 3v10.6A3.5 3.5 0 1 0 14 17V7h5V3h-7z" />
        ) : (
          <path d="M12 3v10.6A3.5 3.5 0 1 0 14 17V7h5V3h-7zM4 12a8 8 0 0 0 4 6.9v2.1A10 10 0 0 1 2 12h2zm18 0a10 10 0 0 1-6 9v-2.1a8 8 0 0 0 4-6.9h2z" />
        )}
      </svg>
    </button>
  );
}
