import { apiClient } from "@/lib/api/client";
import type { CreateInventoryItemPayload, InventoryItem } from "@/types/api";

export const itemsApi = {
  list() {
    return apiClient.get<InventoryItem[]>("/items", { auth: true });
  },

  create(payload: CreateInventoryItemPayload) {
    return apiClient.post<InventoryItem>("/items", payload, { auth: true });
  },
};
