"use client";

import { hours } from "@/content/hours";
import { formatHoursRange } from "@/lib/hours";
import { useOpenStatus } from "@/lib/useOpenStatus";

// Monday first, the way the week reads on a timetable.
const order = [1, 2, 3, 4, 5, 6, 0];

/** Weekly hours with tonight's shift highlighted (Canton time). */
export function HoursTable() {
  const status = useOpenStatus();

  return (
    <table className="w-full font-mono text-base sm:text-lg">
      <caption className="sr-only">Opening hours, Canton time</caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Day</th>
          <th scope="col">Hours</th>
        </tr>
      </thead>
      <tbody>
        {order.map((index) => {
          const day = hours[index];
          const today = status?.serviceDay === index;
          return (
            <tr
              key={day.day}
              aria-current={today ? "date" : undefined}
              className="border-b border-dashed border-ink/20 last:border-0 aria-[current=date]:bg-depot aria-[current=date]:text-cream"
            >
              <th scope="row" className="py-2 pl-2 text-left font-normal">
                {day.day}
                {today ? (
                  <span className="ml-2 rounded bg-brass px-1.5 py-0.5 text-xs font-bold tracking-wider text-ink uppercase">
                    {status?.state === "open" ? "Now" : "Today"}
                  </span>
                ) : null}
              </th>
              <td className={`py-2 pr-2 text-right font-bold ${day.open || today ? "" : "text-scarlet"}`}>
                {formatHoursRange(day)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
