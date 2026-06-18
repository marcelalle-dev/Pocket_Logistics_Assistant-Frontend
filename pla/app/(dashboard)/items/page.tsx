"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Boxes,
  Download,
  Loader2,
  PackagePlus,
  PencilLine,
  Plus,
  Search,
  ShoppingBag,
  Tags,
  X,
} from "lucide-react";
import { itemsApi } from "@/lib/api/items";
import type { CreateInventoryItemPayload, InventoryItem } from "@/types/api";

type Category =
  | "Tous"
  | "Textiles"
  | "Electronique"
  | "Chaussures"
  | "Accessoires";

type ItemFormState = {
  name: string;
  category: Exclude<Category, "Tous">;
  quantity: string;
  unitCost: string;
  parcel: string;
};

type DisplayItem = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unitCost: number;
  total: number;
  parcel: string;
};

const demoItems: InventoryItem[] = [
  {
    id: "IT-101",
    name: "T-shirts coton premium",
    category: "Textiles",
    quantity: 142,
    unit_cost: 4800,
    parcel: "PLA-2401",
  },
  {
    id: "IT-102",
    name: "Ecouteurs bluetooth",
    category: "Electronique",
    quantity: 38,
    unit_cost: 23400,
    parcel: "PLA-2402",
  },
  {
    id: "IT-103",
    name: "Sneakers mixtes",
    category: "Chaussures",
    quantity: 67,
    unit_cost: 11200,
    parcel: "PLA-2404",
  },
  {
    id: "IT-104",
    name: "Sacs bandouliere",
    category: "Accessoires",
    quantity: 24,
    unit_cost: 14250,
    parcel: "PLA-2403",
  },
];

const categories: Category[] = [
  "Tous",
  "Textiles",
  "Electronique",
  "Chaussures",
  "Accessoires",
];

const categoryColors: Record<string, string> = {
  Textiles: "bg-blue-500",
  Electronique: "bg-purple-500",
  Chaussures: "bg-orange-500",
  Accessoires: "bg-pink-500",
};

const emptyForm: ItemFormState = {
  name: "",
  category: "Textiles",
  quantity: "",
  unitCost: "",
  parcel: "",
};

function getItemUnitCost(item: InventoryItem) {
  return Number(item.unit_cost ?? item.unitCost ?? item.unit_price ?? 0);
}

function normalizeItem(item: InventoryItem): DisplayItem {
  const quantity = Number(item.quantity ?? 0);
  const unitCost = getItemUnitCost(item);

  return {
    id: String(item.id),
    name: item.name,
    category: item.category,
    quantity,
    unitCost,
    total: Number(item.total ?? quantity * unitCost),
    parcel: item.parcel ?? (item.parcel_id ? `#${item.parcel_id}` : "Non lie"),
  };
}

function formatAmount(value: number) {
  return `${value.toLocaleString("fr-FR")} FCFA`;
}

function parseMoneyInput(value: string) {
  return Number(value.replace(/\s/g, "").replace(",", "."));
}

export default function ItemsPage() {
  const [items, setItems] = useState<InventoryItem[]>(demoItems);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("Tous");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState<ItemFormState>(emptyForm);

  useEffect(() => {
    let isMounted = true;

    itemsApi
      .list()
      .then((backendItems) => {
        if (!isMounted) return;
        setItems(Array.isArray(backendItems) ? backendItems : []);
        setLoadError("");
      })
      .catch((error) => {
        if (!isMounted) return;
        setLoadError(
          error instanceof Error
            ? error.message
            : "Impossible de charger les produits depuis le backend.",
        );
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const displayItems = useMemo(() => items.map(normalizeItem), [items]);

  const filteredItems = useMemo(
    () =>
      displayItems.filter((item) => {
        const matchesCategory =
          activeCategory === "Tous" || item.category === activeCategory;
        const matchesQuery = `${item.id} ${item.name} ${item.category} ${item.parcel}`
          .toLowerCase()
          .includes(query.toLowerCase());

        return matchesCategory && matchesQuery;
      }),
    [activeCategory, displayItems, query],
  );

  const totalQuantity = displayItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const inventoryValue = displayItems.reduce((sum, item) => sum + item.total, 0);

  const updateForm = (key: keyof ItemFormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
    setFormError("");
    setSuccessMessage("");
  };

  const handleCreateItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const quantity = Number(form.quantity);
    const unitCost = parseMoneyInput(form.unitCost);

    if (!form.name.trim()) {
      setFormError("Le nom du produit est obligatoire.");
      return;
    }

    if (!Number.isFinite(quantity) || quantity <= 0) {
      setFormError("La quantite doit etre superieure a zero.");
      return;
    }

    if (!Number.isFinite(unitCost) || unitCost < 0) {
      setFormError("Le cout unitaire doit etre valide.");
      return;
    }

    const payload: CreateInventoryItemPayload = {
      name: form.name.trim(),
      category: form.category,
      quantity,
      unit_cost: unitCost,
      parcel: form.parcel.trim() || undefined,
    };

    setIsSaving(true);
    setFormError("");
    setSuccessMessage("");

    try {
      const createdItem = await itemsApi.create(payload);
      setItems((current) => [createdItem, ...current]);
      setForm(emptyForm);
      setIsFormOpen(false);
      setSuccessMessage("Produit ajoute avec succes.");
      setLoadError("");
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Impossible d'ajouter le produit.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-24 pt-14 text-slate-950 transition-colors dark:bg-[#0d1b2a] dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-5 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 dark:border-[#1e3248] dark:bg-[#111d2e] dark:text-slate-300 dark:hover:bg-[#1a2d45]"
            aria-label="Retour au tableau de bord"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-purple-500">
              Inventaire
            </p>
            <h1 className="text-xl font-black">Articles</h1>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white shadow-sm transition-colors hover:bg-purple-700"
            aria-label="Ajouter un produit"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {loadError && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-200">
            Backend indisponible: {loadError}. Les produits de demonstration
            restent visibles.
          </div>
        )}

        {successMessage && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-200">
            {successMessage}
          </div>
        )}

        <section className="mb-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-[#1e3248] dark:bg-[#111d2e]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500">Valeur inventaire</p>
              <p className="mt-1 text-2xl font-black">
                {formatAmount(inventoryValue)}
              </p>
            </div>
            <span className="rounded-xl bg-purple-50 p-2 text-purple-600 dark:bg-purple-500/10 dark:text-purple-300">
              <Boxes className="h-5 w-5" />
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
            <div className="rounded-lg bg-slate-50 p-3 dark:bg-[#162233]">
              <p className="text-lg font-black">{totalQuantity}</p>
              <p className="text-[0.68rem] text-slate-500">Pieces suivies</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 dark:bg-[#162233]">
              <p className="text-lg font-black">{displayItems.length}</p>
              <p className="text-[0.68rem] text-slate-500">Produits</p>
            </div>
          </div>
        </section>

        {isFormOpen && (
          <section className="mb-4 rounded-xl border border-purple-200 bg-white p-4 shadow-sm dark:border-purple-500/25 dark:bg-[#111d2e]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-purple-500">
                  Ajout manuel
                </p>
                <h2 className="text-base font-bold">Nouveau produit</h2>
              </div>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setFormError("");
                }}
                className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-50 dark:border-[#1e3248] dark:text-slate-400 dark:hover:bg-[#162233]"
                aria-label="Fermer le formulaire"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-500">
                  Nom du produit
                </label>
                <input
                  value={form.name}
                  onChange={(event) => updateForm("name", event.target.value)}
                  placeholder="Ex: T-shirts coton"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-purple-500 dark:border-[#1e3248] dark:bg-[#162233]"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-500">
                    Categorie
                  </label>
                  <select
                    value={form.category}
                    onChange={(event) =>
                      updateForm("category", event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-purple-500 dark:border-[#1e3248] dark:bg-[#162233]"
                  >
                    {categories
                      .filter((category) => category !== "Tous")
                      .map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-500">
                    Quantite
                  </label>
                  <input
                    value={form.quantity}
                    onChange={(event) =>
                      updateForm("quantity", event.target.value)
                    }
                    inputMode="numeric"
                    placeholder="0"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-purple-500 dark:border-[#1e3248] dark:bg-[#162233]"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-500">
                    Cout unitaire
                  </label>
                  <input
                    value={form.unitCost}
                    onChange={(event) =>
                      updateForm("unitCost", event.target.value)
                    }
                    inputMode="decimal"
                    placeholder="0"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-purple-500 dark:border-[#1e3248] dark:bg-[#162233]"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-500">
                    Colis
                  </label>
                  <input
                    value={form.parcel}
                    onChange={(event) => updateForm("parcel", event.target.value)}
                    placeholder="PLA-2401"
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition-colors focus:border-purple-500 dark:border-[#1e3248] dark:bg-[#162233]"
                  />
                </div>
              </div>

              {formError && (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700 dark:border-red-500/25 dark:bg-red-500/10 dark:text-red-200">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 py-2.5 text-sm font-bold text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <PackagePlus className="h-4 w-4" />
                )}
                Enregistrer le produit
              </button>
            </form>
          </section>
        )}

        <section className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <button
            onClick={() => setIsFormOpen(true)}
            className="rounded-xl border border-slate-200 bg-white p-4 text-left transition-colors hover:bg-slate-50 dark:border-[#1e3248] dark:bg-[#111d2e] dark:hover:bg-[#162233]"
          >
            <PackagePlus className="mb-3 h-5 w-5 text-purple-500" />
            <p className="text-sm font-bold">Nouvel article</p>
            <p className="mt-1 text-xs text-slate-500">Ajouter au stock</p>
          </button>
          <button className="rounded-xl border border-slate-200 bg-white p-4 text-left transition-colors hover:bg-slate-50 dark:border-[#1e3248] dark:bg-[#111d2e] dark:hover:bg-[#162233]">
            <Download className="mb-3 h-5 w-5 text-emerald-500" />
            <p className="text-sm font-bold">Exporter</p>
            <p className="mt-1 text-xs text-slate-500">CSV ou PDF</p>
          </button>
        </section>

        <section className="mb-4 rounded-xl border border-slate-200 bg-white p-3 dark:border-[#1e3248] dark:bg-[#111d2e]">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-[#1e3248] dark:bg-[#162233]">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un article"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            <Tags className="h-4 w-4 text-slate-400" />
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeCategory === category
                    ? "border-purple-600 bg-purple-600 text-white"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-[#1e3248] dark:text-slate-400 dark:hover:bg-[#162233]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {isLoading && (
            <div className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500 dark:border-[#1e3248] dark:bg-[#111d2e]">
              <Loader2 className="h-4 w-4 animate-spin" />
              Chargement des produits
            </div>
          )}

          {!isLoading &&
            filteredItems.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-[#1e3248] dark:bg-[#111d2e] dark:shadow-none"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          categoryColors[item.category] ?? "bg-slate-400"
                        }`}
                      />
                      <p className="text-xs font-semibold text-slate-500">
                        {item.category}
                      </p>
                    </div>
                    <h2 className="truncate text-base font-bold">{item.name}</h2>
                  </div>
                  <button className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-50 dark:border-[#1e3248] dark:text-slate-400 dark:hover:bg-[#162233]">
                    <PencilLine className="h-4 w-4" />
                  </button>
                </div>

                <div className="grid gap-2 sm:grid-cols-3">
                  <div className="rounded-lg bg-slate-50 p-2 dark:bg-[#162233]">
                    <ShoppingBag className="mb-1 h-3.5 w-3.5 text-blue-500" />
                    <p className="text-sm font-bold">{item.quantity}</p>
                    <p className="text-[0.65rem] text-slate-500">Quantite</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-2 dark:bg-[#162233]">
                    <p className="break-words text-sm font-bold">
                      {formatAmount(item.unitCost)}
                    </p>
                    <p className="text-[0.65rem] text-slate-500">Unitaire</p>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-2 dark:bg-[#162233]">
                    <p className="break-words text-sm font-bold">{formatAmount(item.total)}</p>
                    <p className="text-[0.65rem] text-slate-500">Total</p>
                  </div>
                </div>

                <Link
                  href="/parcels"
                  className="mt-3 inline-flex text-xs font-semibold text-purple-600 hover:underline dark:text-purple-300"
                >
                  Colis lie: {item.parcel}
                </Link>
              </article>
            ))}
        </section>
      </div>
    </main>
  );
}
