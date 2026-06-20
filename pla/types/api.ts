export type UserRole = "ADMIN" | "USER" | string;

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  created_at?: string;
  updated_at?: string;
};

export type AuthSession = {
  accessToken: string;
  user: AuthUser;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type ForgotPasswordResponse = {
  message: string;
  devCode?: string;
};

export type ItemCategory =
  | "Textiles"
  | "Electronique"
  | "Chaussures"
  | "Accessoires"
  | string;

export type InventoryItem = {
  id: number | string;
  name: string;
  category: ItemCategory;
  quantity: number;
  unit_cost?: number;
  unitCost?: number;
  unit_price?: number;
  total?: number;
  parcel?: string;
  parcel_id?: number | string;
  created_at?: string;
  updated_at?: string;
};

export type CreateInventoryItemPayload = {
  name: string;
  category: string;
  quantity: number;
  unit_cost: number;
  parcel?: string;
};

export type ApiTypes = {
  authSession: AuthSession;
};
