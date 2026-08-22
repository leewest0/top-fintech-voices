import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { stories } from "@/lib/content";

export function Stories() {
  return (
    <section id="stories" className="mx-auto max-w-[1240px] px-5 py-16 md:px-10">
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-bold tracking-[-0.03em] md:text-4xl">
          From the News Hub
        </h2>
        <Link
          href="/spotlight"
          className="btn btn-ghost inline-flex items-center gap-2 px-5 py-3 text-sm"
        >
          All articles <ArrowRight size={14} />
        </Link>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-3">
        {stories.map((story, i) => (
          <Reveal key={story.title} delay={i * 100}>
            <Link href={story.href} className="card flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="frame h-44">
                <Image
                  src={story.image}
                  alt={story.title}
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 380px"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p
                  className="font-mono text-[11px] tracking-widest uppercase"
                  style={{ color: "var(--accent)" }}
                >
                  {story.category} · {story.date}
                </p>
                <h3 className="font-display mt-3 text-lg leading-snug font-semibold tracking-[-0.02em]">
                  {story.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {story.excerpt}
                </p>
                <span
                  className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold"
                  style={{ color: "var(--muted)" }}
                >
                  Read the story <ArrowRight size={14} aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
