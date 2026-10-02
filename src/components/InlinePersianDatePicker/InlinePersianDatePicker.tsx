"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./InlinePersianDatePicker.module.css";

type InlinePersianDatePickerProps = {
  value?: string | null;
  disabled?: boolean;
  ariaLabel?: string;
  placeholder?: string;
  allowPastDates?: boolean;
  onChange: (date: string) => void;
};

type PersianParts = { year: number; month: number; day: number };

const monthNames = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
];
const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const faDigits = "۰۱۲۳۴۵۶۷۸۹";
const enDigits = "0123456789";
const dateCache = new Map<string, Date>();

const persianFormatter = new Intl.DateTimeFormat("en-US-u-ca-persian", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
});

function toEnglishDigits(value: string | number | null | undefined) {
  return String(value ?? "")
    .replace(/[۰-۹]/g, (digit) => String(faDigits.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)));
}

function toPersianDigits(value: string | number) {
  return String(value).replace(/\d/g, (digit) => faDigits[enDigits.indexOf(digit)]);
}

function getPersianParts(date: Date): PersianParts {
  const result: Partial<PersianParts> = {};
  for (const part of persianFormatter.formatToParts(date)) {
    if (part.type === "year") result.year = Number(part.value);
    if (part.type === "month") result.month = Number(part.value);
    if (part.type === "day") result.day = Number(part.value);
  }
  return result as PersianParts;
}

function dateKey(year: number, month: number, day: number) {
  return `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`;
}

function findGregorianDate(year: number, month: number, day: number) {
  const key = dateKey(year, month, day);
  const cached = dateCache.get(key);
  if (cached) return new Date(cached.getTime());

  // Persian year starts around March of Gregorian year + 621.
  const start = new Date(year + 621, 1, 20);
  for (let offset = 0; offset < 410; offset += 1) {
    const candidate = new Date(start.getFullYear(), start.getMonth(), start.getDate() + offset);
    const parts = getPersianParts(candidate);
    if (parts.year === year && parts.month === month && parts.day === day) {
      candidate.setHours(0, 0, 0, 0);
      dateCache.set(key, candidate);
      return new Date(candidate.getTime());
    }
  }
  return null;
}

function parseValue(value?: string | null): PersianParts | null {
  const normalized = toEnglishDigits(value).trim();
  const match = normalized.match(/^(\d{4})\/(\d{2})\/(\d{2})$/);
  if (!match) return null;
  const parts = { year: Number(match[1]), month: Number(match[2]), day: Number(match[3]) };
  if (parts.month < 1 || parts.month > 12 || parts.day < 1 || parts.day > 31) return null;
  return parts;
}

function nextMonth(year: number, month: number, direction: 1 | -1) {
  let y = year;
  let m = month + direction;
  if (m > 12) { m = 1; y += 1; }
  if (m < 1) { m = 12; y -= 1; }
  return { year: y, month: m };
}

function monthInfo(year: number, month: number) {
  const first = findGregorianDate(year, month, 1);
  const next = nextMonth(year, month, 1);
  const nextFirst = findGregorianDate(next.year, next.month, 1);
  if (!first || !nextFirst) return { first: null as Date | null, days: 30, offset: 0 };
  const dayMs = 24 * 60 * 60 * 1000;
  const days = Math.round((nextFirst.getTime() - first.getTime()) / dayMs);
  const offset = (first.getDay() + 1) % 7; // Saturday = 0
  return { first, days, offset };
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3v3M17 3v3M4.5 9h15" />
      <rect x="4" y="5" width="16" height="15" rx="3" />
      <path d="M8 13h.01M12 13h.01M16 13h.01M8 16.5h.01M12 16.5h.01" />
    </svg>
  );
}

export default function InlinePersianDatePicker({
  value,
  disabled = false,
  ariaLabel = "تاریخ",
  placeholder = "انتخاب تاریخ",
  allowPastDates = true,
  onChange,
}: InlinePersianDatePickerProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const selected = useMemo(() => parseValue(value), [value]);
  const today = useMemo(() => getPersianParts(new Date()), []);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => selected ? { year: selected.year, month: selected.month } : { year: today.year, month: today.month });
  const info = useMemo(() => monthInfo(view.year, view.month), [view]);

  useEffect(() => {
    if (!open) return;
    const onOutside = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("touchstart", onOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("touchstart", onOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (selected) setView({ year: selected.year, month: selected.month });
  }, [selected?.year, selected?.month]);

  const todayGregorian = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const displayValue = selected ? toPersianDigits(dateKey(selected.year, selected.month, selected.day)) : "";

  return (
    <div ref={rootRef} className={styles.wrapper} aria-label={ariaLabel}>
      <button
        type="button"
        className={`${styles.input} ${!displayValue ? styles.placeholder : ""}`}
        disabled={disabled}
        onClick={() => !disabled && setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <span>{displayValue || placeholder}</span>
      </button>
      <span className={styles.icon}><CalendarIcon /></span>

      {open ? (
        <div className={styles.panel} role="dialog" aria-label={`تقویم ${ariaLabel}`}>
          <div className={styles.header}>
            <button type="button" onClick={() => setView(nextMonth(view.year, view.month, -1))} aria-label="ماه قبل">›</button>
            <strong>{monthNames[view.month - 1]} {toPersianDigits(view.year)}</strong>
            <button type="button" onClick={() => setView(nextMonth(view.year, view.month, 1))} aria-label="ماه بعد">‹</button>
          </div>
          <div className={styles.weekDays}>
            {weekDays.map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className={styles.days}>
            {Array.from({ length: info.offset }, (_, index) => <span key={`empty-${index}`} className={styles.emptyDay} />)}
            {Array.from({ length: info.days }, (_, index) => index + 1).map((day) => {
              const gregorian = info.first ? new Date(info.first.getFullYear(), info.first.getMonth(), info.first.getDate() + day - 1) : null;
              gregorian?.setHours(0, 0, 0, 0);
              const isDisabled = Boolean(!allowPastDates && gregorian && gregorian < todayGregorian);
              const isSelected = selected?.year === view.year && selected?.month === view.month && selected?.day === day;
              const isToday = today.year === view.year && today.month === view.month && today.day === day;
              return (
                <button
                  type="button"
                  key={day}
                  disabled={isDisabled}
                  className={`${styles.day} ${isSelected ? styles.selectedDay : ""} ${isToday ? styles.today : ""}`}
                  onClick={() => {
                    onChange(dateKey(view.year, view.month, day));
                    setOpen(false);
                  }}
                >
                  {toPersianDigits(day)}
                </button>
              );
            })}
          </div>
          <div className={styles.footer}>
            <button type="button" onClick={() => setView({ year: today.year, month: today.month })}>امروز</button>
            {selected ? <button type="button" onClick={() => { onChange(""); setOpen(false); }}>پاک کردن</button> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
