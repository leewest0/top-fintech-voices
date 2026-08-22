import Image from "next/image";
import { moreVoices, voices } from "@/lib/content";

const entries = [...voices, ...moreVoices].map((v) => ({
  name: v.name,
  org: v.org,
  image: v.image,
}));

/**
 * A continuous strip of the people in the issue. Duplicated once so the
 * -50% translate loops seamlessly; the copy is hidden from assistive tech.
 */
export function Ticker() {
  return (
    <div
      className="marquee overflow-hidden py-4"
      style={{ borderBottom: "1px solid var(--line)", ["--marquee-duration" as string]: "60s" }}
    >
      <div className="marquee-track">
        {[0, 1].map((pass) => (
          <ul key={pass} className="flex shrink-0 items-center" aria-hidden={pass === 1 || undefined}>
            {entries.map((entry) => (
              <li key={`${pass}-${entry.name}`} className="mx-5 flex shrink-0 items-center gap-3">
                <Image
                  src={entry.image}
                  alt=""
                  width={64}
                  height={64}
                  sizes="32px"
                  className="h-8 w-8 rounded-full object-cover object-top grayscale"
                  style={{ border: "1px solid var(--line)" }}
                />
                <span className="font-mono text-xs whitespace-nowrap" style={{ color: "var(--muted)" }}>
                  {entry.name}
                  <span className="mx-2" style={{ color: "var(--accent)" }}>
                    ✦
                  </span>
                  {entry.org}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
