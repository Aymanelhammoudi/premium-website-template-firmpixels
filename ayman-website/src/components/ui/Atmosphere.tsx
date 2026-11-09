import Image from "next/image";

export type AtmosphereImage = { src: string; alt: string; caption: string };

/** Sfeerbeeld van aymanzakelijk.nl met lichte parallax en een eerlijk bijschrift. */
export function Atmosphere({
  img,
  className = "",
  aspect = "aspect-[4/3]",
  sizes = "(max-width: 1024px) 92vw, 46vw",
}: {
  img: AtmosphereImage;
  className?: string;
  aspect?: string;
  sizes?: string;
}) {
  return (
    <figure className={`reveal-clip relative overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_40px_80px_-50px_rgb(7_20_38/0.6)] ${aspect} ${className}`}>
      <Image src={img.src} alt={img.alt} fill sizes={sizes} className="parallax-img object-cover" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#071426]/70 via-[#071426]/5 to-transparent" />
      <figcaption className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-[#071426]/45 px-3 py-1 text-xs text-[#e8e2d4] backdrop-blur-md">
        {img.caption}
      </figcaption>
    </figure>
  );
}
