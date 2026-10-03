export type CompanyTypeCode = "MANUFACTURER" | "DISTRIBUTOR" | "SUPPLIER";

export type CompanyRow = {
  id: number;
  code: string;
  title: string;
  type: CompanyTypeCode;
  nationalId: string;
  mobile: string;
  city: string;
  active: boolean;
  brandsCount: number;
  productsCount: number;
};

export type CategoryRow = {
  id: number;
  code: string;
  title: string;
  parentId: number | null;
  sortOrder: number;
  active: boolean;
  productsCount: number;
};

export type BrandRow = {
  id: number;
  code: string;
  title: string;
  companyId: number | null;
  description: string;
  featured: boolean;
  isNew: boolean;
  active: boolean;
  productsCount: number;
};

export type ProductRow = {
  id: number;
  code: string;
  barcode: string;
  title: string;
  categoryId: number;
  brandId: number;
  unitId: number;
  weightValue: string;
  weightUnit: string;
  packageType: string;
  qtyPerCarton: string;
  imageUrl: string;
  approvalStatus: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED";
  active: boolean;
};

export const companyTypeOptions = [
  { value: "MANUFACTURER", label: "تولیدکننده" },
  { value: "DISTRIBUTOR", label: "شرکت پخش" },
  { value: "SUPPLIER", label: "تأمین‌کننده" },
] as const;

export const unitOptions = [
  { value: 1, label: "عدد" },
  { value: 2, label: "بسته" },
  { value: 3, label: "کارتن" },
  { value: 4, label: "کیلوگرم" },
  { value: 5, label: "لیتر" },
];

export const approvalOptions = [
  { value: "DRAFT", label: "پیش‌نویس" },
  { value: "PENDING", label: "در انتظار تأیید" },
  { value: "APPROVED", label: "تأییدشده" },
  { value: "REJECTED", label: "ردشده" },
] as const;

export const companySeed: CompanyRow[] = [
  { id: 1, code: "CMP-001", title: "صنایع غذایی سپهر", type: "MANUFACTURER", nationalId: "14012345678", mobile: "09121234567", city: "تهران", active: true, brandsCount: 2, productsCount: 18 },
  { id: 2, code: "CMP-002", title: "پخش آرمان", type: "DISTRIBUTOR", nationalId: "14022345679", mobile: "09123334455", city: "کرج", active: true, brandsCount: 0, productsCount: 84 },
  { id: 3, code: "CMP-003", title: "تأمین کالای نگین", type: "SUPPLIER", nationalId: "14032345670", mobile: "09125556677", city: "قم", active: true, brandsCount: 1, productsCount: 36 },
  { id: 4, code: "CMP-004", title: "فرآورده‌های بهار", type: "MANUFACTURER", nationalId: "14042345671", mobile: "09127778899", city: "قزوین", active: false, brandsCount: 1, productsCount: 11 },
];

export const categorySeed: CategoryRow[] = [
  { id: 1, code: "FOOD", title: "مواد غذایی", parentId: null, sortOrder: 10, active: true, productsCount: 129 },
  { id: 2, code: "CANNED", title: "کنسرو و رب", parentId: 1, sortOrder: 20, active: true, productsCount: 34 },
  { id: 3, code: "PACKAGED", title: "محصولات بسته‌بندی", parentId: 1, sortOrder: 30, active: true, productsCount: 42 },
  { id: 4, code: "SNACK", title: "تنقلات", parentId: null, sortOrder: 40, active: true, productsCount: 58 },
  { id: 5, code: "DAIRY", title: "لبنیات", parentId: null, sortOrder: 50, active: true, productsCount: 31 },
  { id: 6, code: "HYGIENE", title: "شوینده و بهداشتی", parentId: null, sortOrder: 60, active: true, productsCount: 47 },
];

export const brandSeed: BrandRow[] = [
  { id: 1, code: "BR-001", title: "سپهر", companyId: 1, description: "برند محصولات غذایی و کنسروی", featured: true, isNew: false, active: true, productsCount: 18 },
  { id: 2, code: "BR-002", title: "خورشید", companyId: 1, description: "محصولات بسته‌بندی و مواد اولیه", featured: false, isNew: true, active: true, productsCount: 12 },
  { id: 3, code: "BR-003", title: "نگین", companyId: 3, description: "محصولات منتخب بازار", featured: true, isNew: false, active: true, productsCount: 21 },
  { id: 4, code: "BR-004", title: "بهار", companyId: 4, description: "محصولات خوراکی روزمره", featured: false, isNew: false, active: false, productsCount: 11 },
];

export const productSeed: ProductRow[] = [
  { id: 1, code: "PR-1001", barcode: "626100000001", title: "رب گوجه‌فرنگی ۸۰۰ گرمی", categoryId: 2, brandId: 1, unitId: 1, weightValue: "800", weightUnit: "گرم", packageType: "قوطی", qtyPerCarton: "12", imageUrl: "", approvalStatus: "APPROVED", active: true },
  { id: 2, code: "PR-1002", barcode: "626100000002", title: "تن ماهی ۱۸۰ گرمی", categoryId: 2, brandId: 1, unitId: 1, weightValue: "180", weightUnit: "گرم", packageType: "قوطی", qtyPerCarton: "24", imageUrl: "", approvalStatus: "APPROVED", active: true },
  { id: 3, code: "PR-1003", barcode: "626100000003", title: "عدس بسته ۹۰۰ گرمی", categoryId: 3, brandId: 2, unitId: 2, weightValue: "900", weightUnit: "گرم", packageType: "پاکت", qtyPerCarton: "10", imageUrl: "", approvalStatus: "PENDING", active: true },
  { id: 4, code: "PR-1004", barcode: "626100000004", title: "چیپس نمکی ۶۰ گرمی", categoryId: 4, brandId: 3, unitId: 2, weightValue: "60", weightUnit: "گرم", packageType: "پاکت", qtyPerCarton: "40", imageUrl: "", approvalStatus: "APPROVED", active: true },
  { id: 5, code: "PR-1005", barcode: "626100000005", title: "شیر کم‌چرب یک لیتری", categoryId: 5, brandId: 3, unitId: 1, weightValue: "1", weightUnit: "لیتر", packageType: "تتراپک", qtyPerCarton: "12", imageUrl: "", approvalStatus: "DRAFT", active: false },
];
