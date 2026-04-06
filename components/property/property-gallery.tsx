"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type PropertyGalleryProps = {
  images: string[];
  title: string;
};

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setLightboxOpen(false);
        return;
      }

      if (images.length < 2) {
        return;
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % images.length);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + images.length) % images.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length, lightboxOpen]);

  const activeImage = images[activeIndex] ?? images[0];

  function openImage(index: number) {
    setActiveIndex(index);
    setLightboxOpen(true);
  }

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % images.length);
  }

  return (
    <>
      <div className="space-y-4">
        <button
          type="button"
          className="group panel relative block w-full overflow-hidden rounded-[1.9rem] text-left"
          onClick={() => openImage(activeIndex)}
        >
          <div className="relative aspect-[1.35] w-full">
            <Image
              src={activeImage}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
              priority
            />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-[rgba(7,21,33,0.72)] via-[rgba(7,21,33,0.18)] to-transparent p-5 text-white">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/72">Gallery</p>
              <p className="mt-1 text-sm text-white/88">Click to preview full size</p>
            </div>
            <span className="rounded-full border border-white/18 bg-white/12 px-3 py-2 text-xs font-semibold">
              {activeIndex + 1} / {images.length}
            </span>
          </div>
        </button>

        {images.length > 1 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {images.map((imageUrl, index) => (
              <button
                key={`${imageUrl}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative overflow-hidden rounded-[1.25rem] border transition ${
                  activeIndex === index
                    ? "border-[var(--brand-green)] ring-2 ring-[rgba(73,132,102,0.18)]"
                    : "border-[var(--brand-line)]"
                }`}
                aria-label={`Preview image ${index + 1}`}
              >
                <div className="relative aspect-[1.08] w-full bg-[var(--surface-soft)]">
                  <Image
                    src={imageUrl}
                    alt={`${title} preview ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    className="object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {lightboxOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(7,21,33,0.88)] p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image preview`}
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute right-3 top-3 z-10 rounded-full border border-white/18 bg-[rgba(7,21,33,0.82)] px-3 py-2 text-sm font-semibold text-white"
            >
              Close
            </button>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={showPrevious}
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/18 bg-[rgba(7,21,33,0.82)] px-4 py-3 text-sm font-semibold text-white"
                  aria-label="Show previous image"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/18 bg-[rgba(7,21,33,0.82)] px-4 py-3 text-sm font-semibold text-white"
                  aria-label="Show next image"
                >
                  Next
                </button>
              </>
            ) : null}

            <div className="overflow-hidden rounded-[2rem] border border-white/12 bg-black/30">
              <div className="relative aspect-[1.35] w-full">
                <Image
                  src={activeImage}
                  alt={`${title} full preview ${activeIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {images.length > 1 ? (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/78">
                <span>{activeIndex + 1} of {images.length}</span>
                <span>Use arrow keys to move</span>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
