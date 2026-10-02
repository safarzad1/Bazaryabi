"use client";

import {
  type CSSProperties,
  type SVGProps,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import styles from "./Dropdown.module.css";
import type { CommonDropdownProps, DropdownValue } from "./types";
import {
  createDropdownMenuStyle,
  getDropdownPosition,
  normalizeDropdownSearch,
  type DropdownPosition,
} from "./dropdownUtils";

function Icon({
  children,
  size = 16,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

function SearchGlyph({ size = 16 }: { size?: number }) {
  return (
    <Icon size={size}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </Icon>
  );
}

function ChevronGlyph({ size = 16 }: { size?: number }) {
  return (
    <Icon size={size}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

function CheckGlyph({ size = 15 }: { size?: number }) {
  return (
    <Icon size={size}>
      <path d="m5 12 4 4 10-10" />
    </Icon>
  );
}

function CloseGlyph({ size = 15 }: { size?: number }) {
  return (
    <Icon size={size}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Icon>
  );
}

function LoaderGlyph({ size = 16 }: { size?: number }) {
  return (
    <Icon size={size}>
      <path d="M21 12a9 9 0 1 1-3-6.7" />
    </Icon>
  );
}

export type SearchableDropdownProps<T extends DropdownValue = string> =
  CommonDropdownProps<T> & {
    searchPlaceholder?: string;
    noResultText?: string;
    menuWidth?: number;
    itemFontSize?: string;
  };

export default function SearchableDropdown<
  T extends DropdownValue = string,
>({
  value,
  options,
  onChange,
  placeholder = "جست‌وجو و انتخاب کنید",
  searchPlaceholder = "جست‌وجو...",
  emptyText = "گزینه‌ای برای انتخاب وجود ندارد.",
  noResultText = "موردی پیدا نشد.",
  disabled = false,
  loading = false,
  loadingText = "در حال دریافت...",
  compact = false,
  className = "",
  ariaLabel = "جست‌وجو و انتخاب گزینه",
  leadingIcon,
  dropdownZIndex = 2147483000,
  menuWidth,
  itemFontSize = "13.5px",
}: SearchableDropdownProps<T>) {
  const generatedId = useId().replace(/:/g, "");
  const listId = `searchable-dropdown-list-${generatedId}`;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState<DropdownPosition>({
    top: 0,
    left: 0,
    width: 300,
    maxHeight: 310,
  });

  const normalizedOptions = useMemo(() => {
    const unique = new Map<T, (typeof options)[number]>();
    for (const option of options) unique.set(option.value, option);
    return Array.from(unique.values());
  }, [options]);

  const selectedOption = useMemo(
    () => normalizedOptions.find((option) => option.value === value),
    [normalizedOptions, value],
  );

  const filteredOptions = useMemo(() => {
    const normalizedQuery = normalizeDropdownSearch(query);
    if (!normalizedQuery) return normalizedOptions;

    return normalizedOptions.filter((option) =>
      normalizeDropdownSearch(
        `${option.label} ${option.description ?? ""} ${option.searchText ?? ""}`,
      ).includes(normalizedQuery),
    );
  }, [normalizedOptions, query]);

  const updatePosition = () => {
    setPosition(getDropdownPosition(rootRef, menuWidth ?? 390));
  };

  const closeDropdown = () => {
    setOpen(false);
    setQuery("");
  };

  const openDropdown = () => {
    if (disabled || loading) return;
    updatePosition();
    setOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const closeOnOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        !rootRef.current?.contains(target) &&
        !menuRef.current?.contains(target)
      ) {
        closeDropdown();
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDropdown();
    };

    const handleViewportChange = () => updatePosition();

    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("touchstart", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);

    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("touchstart", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [open, menuWidth]);

  useEffect(() => {
    if (disabled || loading) closeDropdown();
  }, [disabled, loading]);

  const menu =
    open && mounted && !disabled && !loading
      ? createPortal(
          <div
            ref={menuRef}
            id={listId}
            className={styles.searchMenu}
            role="listbox"
            aria-label={ariaLabel}
            style={{
              ...createDropdownMenuStyle(position, dropdownZIndex),
              "--dropdown-item-font-size": itemFontSize,
            } as CSSProperties}
            dir="rtl"
          >
            <div className={styles.searchBox}>
              <SearchGlyph size={16} />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
              />
              {query && (
                <button
                  type="button"
                  className={styles.clearButton}
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  aria-label="پاک‌کردن عبارت جست‌وجو"
                >
                  <CloseGlyph size={15} />
                </button>
              )}
            </div>

            <div className={styles.optionList}>
              {normalizedOptions.length === 0 ? (
                <div className={styles.empty}>{emptyText}</div>
              ) : filteredOptions.length === 0 ? (
                <div className={styles.empty}>{noResultText}</div>
              ) : (
                filteredOptions.map((option) => {
                  const selected = option.value === value;

                  return (
                    <button
                      key={String(option.value)}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className={`${styles.option} ${
                        selected ? styles.optionSelected : ""
                      }`}
                      disabled={option.disabled}
                      onClick={() => {
                        if (option.disabled) return;
                        onChange(option.value);
                        closeDropdown();
                      }}
                    >
                      <span className={styles.optionText}>
                        <strong>{option.label}</strong>
                        {option.description && (
                          <small>{option.description}</small>
                        )}
                      </span>
                      {selected && <CheckGlyph size={15} />}
                    </button>
                  );
                })
              )}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${compact ? styles.compact : ""} ${className}`}
      style={{
        "--dropdown-item-font-size": itemFontSize,
      } as CSSProperties}
      dir="rtl"
    >
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
        onClick={() => (open ? closeDropdown() : openDropdown())}
        disabled={disabled || loading}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-expanded={open}
        aria-label={ariaLabel}
      >
        {loading ? (
          <span className={styles.spin}>
            <LoaderGlyph size={16} />
          </span>
        ) : (
          leadingIcon ?? <SearchGlyph size={16} />
        )}

        <span
          className={`${styles.triggerText} ${
            selectedOption ? "" : styles.placeholder
          }`}
        >
          {loading ? loadingText : selectedOption?.label ?? placeholder}
        </span>

        <span className={open ? styles.chevronOpen : styles.chevron}>
          <ChevronGlyph size={16} />
        </span>
      </button>

      {menu}
    </div>
  );
}
