"use client";

export default function Pagination({
  page,
  pageCount,
  onChange,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}) {
  if (pageCount <= 1) return null;
  const pages = Array.from({ length: Math.min(pageCount, 7) }, (_, index) => index + 1);
  return (
    <div className="app-pagination" aria-label="صفحه‌بندی">
      <button type="button" disabled={page <= 1} onClick={() => onChange(page - 1)}>قبلی</button>
      {pages.map((item) => (
        <button
          type="button"
          key={item}
          className={item === page ? "active" : ""}
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
      <button type="button" disabled={page >= pageCount} onClick={() => onChange(page + 1)}>بعدی</button>
    </div>
  );
}
