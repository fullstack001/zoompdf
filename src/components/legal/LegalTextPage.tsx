import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type LegalTextPageProps = {
  title: string;
  content: string;
};

type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseLegalContent(content: string) {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const effectiveDateLine = lines.find((line) =>
    line.toLowerCase().startsWith("effective date:")
  );
  const websiteLine = lines.find((line) =>
    line.toLowerCase().startsWith("website:")
  );

  const sectionHeadingPattern = /^(\d+)\.\s+(.+)$/;
  const sections: LegalSection[] = [];
  let currentSection: LegalSection | null = null;

  for (const line of lines) {
    if (line === effectiveDateLine || line === websiteLine) {
      continue;
    }

    const headingMatch = line.match(sectionHeadingPattern);
    if (headingMatch) {
      if (currentSection) {
        sections.push(currentSection);
      }

      const heading = `${headingMatch[1]}. ${headingMatch[2]}`;
      currentSection = {
        id: slugify(heading),
        title: heading,
        paragraphs: [],
      };
      continue;
    }

    if (!currentSection) {
      currentSection = {
        id: "overview",
        title: "Overview",
        paragraphs: [],
      };
    }

    currentSection.paragraphs.push(line);
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return {
    effectiveDate: effectiveDateLine?.replace("Effective Date:", "").trim(),
    website: websiteLine?.replace("Website:", "").trim(),
    sections,
  };
}

export default function LegalTextPage({ title, content }: LegalTextPageProps) {
  const { effectiveDate, website, sections } = parseLegalContent(content);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="bg-gradient-to-b from-[#edf0ff] to-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-indigo-100 bg-white/80 p-8 shadow-sm backdrop-blur-sm sm:p-10">
            <p className="mb-3 inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
              Legal Information
            </p>
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {title}
            </h1>
            <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-600">
              {effectiveDate && (
                <span className="rounded-md border border-gray-200 bg-white px-3 py-1.5">
                  Effective Date: <strong>{effectiveDate}</strong>
                </span>
              )}
              {website && (
                <span className="rounded-md border border-gray-200 bg-white px-3 py-1.5">
                  Website: <strong>{website}</strong>
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              On This Page
            </h2>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-gray-700 transition-colors hover:text-indigo-700"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="space-y-8">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="mb-3 text-xl font-semibold text-gray-900">
                    {section.title}
                  </h2>
                  <div className="space-y-3 text-sm leading-7 text-gray-700 sm:text-base">
                    {section.paragraphs.map((paragraph, index) => (
                      <p key={`${section.id}-${index}`}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}
