import type { Dimensions, RoomFit } from "@/lib/types";
import { toBanglaDigits } from "@/lib/format";
import { cx } from "@/lib/format";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

/* ==========================================================================
   পণ্যের মাপ — visual dimension diagram
   দৈর্ঘ্য × প্রস্থ × উচ্চতা বাংলায়, সাথে একটি SVG ডায়াগ্রাম
   ========================================================================== */
export function DimensionDiagram({
  dimensions,
  productName,
}: {
  dimensions: Dimensions;
  productName: string;
}) {
  const { length, width, height, unit, seatHeight, noteBn } = dimensions;
  /* ডায়াগ্রামে সবচেয়ে বড় মাপ ২২০px ধরে scale করা হয় */
  const max = Math.max(length, width, height);
  const scale = 220 / max;
  const boxLength = Math.max(60, length * scale);
  const boxHeight = Math.max(40, height * scale);
  const boxDepth = Math.max(20, width * scale * 0.42);

  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
      {/* SVG diagram */}
      <div className="rounded-md border border-ink/8 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
          মাপের ডায়াগ্রাম
        </p>
        <div className="mt-4 flex justify-center">
          <svg viewBox="0 0 320 240" className="h-auto w-full max-w-[360px]" role="img" aria-label={`${productName} এর মাপের ডায়াগ্রাম`}>
            {/* floor line */}
            <line x1="20" y1="205" x2="300" y2="205" stroke="#c3b29a" strokeWidth="1" strokeDasharray="4 4" />
            {/* box */}
            <g transform="translate(50 40)">
              {/* top face */}
              <polygon
                points={`0,${boxHeight * 0.35} ${boxDepth},0 ${boxLength + boxDepth},0 ${boxLength},${boxHeight * 0.35}`}
                fill="#ece3d6"
                stroke="#7a5a33"
                strokeWidth="1.1"
              />
              {/* front face */}
              <rect x="0" y={boxHeight * 0.35} width={boxLength} height={boxHeight} fill="#f4eee4" stroke="#7a5a33" strokeWidth="1.1" />
              {/* side face */}
              <polygon
                points={`${boxLength},${boxHeight * 0.35} ${boxLength + boxDepth},0 ${boxLength + boxDepth},${boxHeight} ${boxLength},${boxHeight * 1.35}`}
                fill="#dfd2be"
                stroke="#7a5a33"
                strokeWidth="1.1"
              />
              {/* length arrow */}
              <g>
                <line x1="0" y1={boxHeight * 1.35 + 16} x2={boxLength} y2={boxHeight * 1.35 + 16} stroke="#a9853f" strokeWidth="1" />
                <line x1="0" y1={boxHeight * 1.35 + 10} x2="0" y2={boxHeight * 1.35 + 22} stroke="#a9853f" strokeWidth="1" />
                <line x1={boxLength} y1={boxHeight * 1.35 + 10} x2={boxLength} y2={boxHeight * 1.35 + 22} stroke="#a9853f" strokeWidth="1" />
                <text
                  x={boxLength / 2}
                  y={boxHeight * 1.35 + 34}
                  textAnchor="middle"
                  fill="#7d6128"
                  fontSize="11"
                  fontWeight="600"
                >
                  দৈর্ঘ্য {length} {unit}
                </text>
              </g>
              {/* height arrow */}
              <g>
                <line x1="-16" y1={boxHeight * 0.35} x2="-16" y2={boxHeight * 1.35} stroke="#a9853f" strokeWidth="1" />
                <line x1="-22" y1={boxHeight * 0.35} x2="-10" y2={boxHeight * 0.35} stroke="#a9853f" strokeWidth="1" />
                <line x1="-22" y1={boxHeight * 1.35} x2="-10" y2={boxHeight * 1.35} stroke="#a9853f" strokeWidth="1" />
                <text
                  x="-24"
                  y={boxHeight * 0.85}
                  textAnchor="end"
                  fill="#7d6128"
                  fontSize="11"
                  fontWeight="600"
                >
                  উচ্চতা {height} {unit}
                </text>
              </g>
              {/* width arrow (depth) */}
              <g>
                <line
                  x1={boxLength + 4}
                  y1={boxHeight * 0.42}
                  x2={boxLength + boxDepth + 10}
                  y2={boxHeight * 0.42 - 20}
                  stroke="#a9853f"
                  strokeWidth="1"
                />
                <text
                  x={boxLength + boxDepth + 14}
                  y={boxHeight * 0.42 - 24}
                  fill="#7d6128"
                  fontSize="11"
                  fontWeight="600"
                >
                  প্রস্থ {width} {unit}
                </text>
              </g>
            </g>
          </svg>
        </div>
        <p className="mt-2 text-center text-[11px] text-ink-muted">
          ডায়াগ্রামটি অনুপাতে আঁকা — বাস্তব মাপ নিচে দেওয়া আছে
        </p>
      </div>

      {/* Numbers */}
      <div>
        <dl className="grid grid-cols-3 gap-3">
          {[
            { labelBn: "দৈর্ঘ্য", value: length },
            { labelBn: "প্রস্থ", value: width },
            { labelBn: "উচ্চতা", value: height },
          ].map((item) => (
            <div key={item.labelBn} className="rounded-md border border-ink/8 bg-white p-3 text-center">
              <dt className="text-[11px] font-medium text-ink-muted">{item.labelBn}</dt>
              <dd className="mt-1 font-display text-xl font-semibold">
                {item.value}
                <span className="ml-1 text-xs font-normal text-ink-muted">{unit}</span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-4 space-y-2 text-sm text-ink-soft">
          <li>
            <span className="text-ink-muted">দৈর্ঘ্য × প্রস্থ × উচ্চতা:</span>{" "}
            <strong className="font-semibold text-ink">
              {toBanglaDigits(length)} × {toBanglaDigits(width)} × {toBanglaDigits(height)} {unit}
            </strong>
          </li>
          {seatHeight && (
            <li>
              <span className="text-ink-muted">সিটের উচ্চতা:</span>{" "}
              <strong className="font-semibold text-ink">
                {toBanglaDigits(seatHeight)} {unit}
              </strong>
            </li>
          )}
        </ul>

        {noteBn && (
          <p className="mt-3 rounded-sm bg-linen px-3.5 py-2.5 text-xs text-ink-soft">💡 {noteBn}</p>
        )}

        <p className="mt-4 text-xs text-ink-muted">
          দরজা ও লিফটের মাপ মিলিয়ে নিন — প্রয়োজনে WhatsApp-এ ঘরের মাপ পাঠান, আমরা পরামর্শ দেব।
        </p>
      </div>
    </div>
  );
}

/* ==========================================================================
   কোন জায়গার জন্য উপযুক্ত? — room fit information
   ========================================================================== */
const LEVEL_LABEL: Record<RoomFit["level"], string> = {
  suitable: "উপযুক্ত",
  moderate: "মোটামুটি উপযুক্ত",
  "not-suitable": "উপযুক্ত নয়",
};

export function RoomFitSection({ roomFit }: { roomFit: RoomFit[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {roomFit.map((fit, index) => (
        <Reveal key={fit.labelBn} delay={index * 60}>
          <div
            className={cx(
              "h-full rounded-md border p-4",
              fit.level === "suitable" && "border-success/25 bg-success/[0.06]",
              fit.level === "moderate" && "border-warn/25 bg-warn/[0.06]",
              fit.level === "not-suitable" && "border-danger/25 bg-danger/[0.05]",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">{fit.labelBn}</p>
              <span
                className={cx(
                  "badge",
                  fit.level === "suitable" && "bg-success/12 text-success",
                  fit.level === "moderate" && "bg-warn/14 text-warn",
                  fit.level === "not-suitable" && "bg-danger/10 text-danger",
                )}
              >
                {LEVEL_LABEL[fit.level]}
              </span>
            </div>
            {fit.noteBn && <p className="mt-2 text-xs leading-relaxed text-ink-soft">{fit.noteBn}</p>}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ==========================================================================
   পণ্যের বিবরণ — responsive specifications table
   ========================================================================== */
export function SpecificationsTable({
  specifications,
}: {
  specifications: { labelBn: string; valueBn: string }[];
}) {
  return (
    <div>
      {/* Desktop table */}
      <table className="hidden w-full border-collapse overflow-hidden rounded-md border border-ink/8 md:table">
        <caption className="sr-only">পণ্যের বিবরণ</caption>
        <tbody>
          {specifications.map((spec, index) => (
            <tr
              key={spec.labelBn + index}
              className={cx("border-b border-ink/8 last:border-0", index % 2 === 1 && "bg-cream/60")}
            >
              <th
                scope="row"
                className="w-1/3 px-4 py-3 text-left text-sm font-medium text-ink-muted"
              >
                {spec.labelBn}
              </th>
              <td className="px-4 py-3 text-sm font-medium text-ink">{spec.valueBn}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile stacked */}
      <dl className="space-y-2 md:hidden">
        {specifications.map((spec, index) => (
          <div
            key={spec.labelBn + index}
            className="flex items-start justify-between gap-4 rounded-sm border border-ink/8 bg-white px-3.5 py-3"
          >
            <dt className="text-xs font-medium text-ink-muted">{spec.labelBn}</dt>
            <dd className="max-w-[62%] text-right text-xs font-semibold text-ink">{spec.valueBn}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ==========================================================================
   Refresh helper exports
   ========================================================================== */
export { SectionHeading };
