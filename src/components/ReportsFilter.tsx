"use client";

import { useState } from "react";
import AppIcon from "./AppIcon";
import { AppDatePicker, AppSelect, useToast } from "./ui";

const marketers = [
  { value: "all", label: "همه بازاریاب‌ها" },
  { value: "1", label: "علی رضایی" },
  { value: "2", label: "مریم کریمی" },
];

const regions = [
  { value: "all", label: "همه مناطق" },
  { value: "1", label: "منطقه ۱" },
  { value: "2", label: "منطقه ۲" },
  { value: "3", label: "منطقه ۳" },
];

export default function ReportsFilter() {
  const [fromDate, setFromDate] = useState("1405/07/01");
  const [toDate, setToDate] = useState("1405/07/30");
  const [marketer, setMarketer] = useState("all");
  const [region, setRegion] = useState("all");
  const { showToast } = useToast();

  return (
    <section className="filter-panel filter-panel-components">
      <div className="filter-title"><AppIcon name="reports" size={20}/><b>فیلتر گزارش</b></div>
      <AppDatePicker label="از تاریخ" value={fromDate} onChange={setFromDate}/>
      <AppDatePicker label="تا تاریخ" value={toDate} onChange={setToDate}/>
      <AppSelect label="بازاریاب" value={marketer} options={marketers} onChange={setMarketer}/>
      <AppSelect label="منطقه" value={region} options={regions} onChange={setRegion}/>
      <button type="button" className="primary-button small" onClick={() => showToast("فیلتر گزارش اعمال شد.", "success")}>اعمال فیلتر</button>
    </section>
  );
}
