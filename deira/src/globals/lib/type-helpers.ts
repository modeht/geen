export type Primitive = string | number | boolean | Date;

export type TranslatableFields<T> = {
  [K in keyof T as T[K] extends string ? K : never]: boolean;
};

export type PrimitiveFields<T> = {
  [K in keyof T as T[K] extends Primitive
    ? K extends 'createdAt' | 'updatedAt'
      ? never
      : K
    : never]: boolean;
};

export type ComplexFields<T> = {
  [K in keyof T as T[K] extends Primitive
    ? never
    : K extends 'translations'
      ? never
      : K]: boolean;
};

export type ClassFields<T> = {
  [K in keyof T]: K extends 'createdAt' | 'updatedAt' ? never : T[K];
};
