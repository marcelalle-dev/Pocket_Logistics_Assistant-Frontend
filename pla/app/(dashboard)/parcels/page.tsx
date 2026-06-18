"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Filter,
  MapPin,
  Package,
  Plus,
  Search,
  Truck,
} from "lucide-react";

type ParcelStatus = "Tous" | "En transit" | "Arrive" | "Preparation";

const parcels = [
  {
    id: "PLA-2401",
    name: "Valise A",
    route: "Guangzhou -> Cotonou",
    status: "En transit",
    owner: "Awa Import",
    eta: "22 juin",
    weight: "18 kg",
    value: "840 000 FCFA",
  },
  {
    id: "PLA-2402",
    name: "Carton B",
    route: "Istanbul -> Cotonou",
    status: "Arrive",
    owner: "Marcel Store",
    eta: "Disponible",
    weight: "12 kg",
    value: "520 000 FCFA",
  },
  {
    id: "PLA-2403",
    name: "Lot accessoires",
    route: "Dubai -> Cotonou",
    status: "Preparation",
    owner: "PLA Depot",
    eta: "25 juin",
    weight: "9 kg",
    value: "315 000 FCFA",
  },
  {
    id: "PLA-2404",
    name: "Chaussures sport",
    route: "Yiwu -> Cotonou",
    status: "En transit",
    owner: "Kemi Fashion",
    eta: "28 juin",
    weight: "22 kg",
    value: "1 120 000 FCFA",
  },
];

const filters: ParcelStatus[] = ["Tous", "En transit", "Arrive", "Preparation"];

function statusStyle(status: string) {
  if (status === "Arrive") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-300";
  }

  if (status === "Preparation") {
    return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300";
  }

  return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/25 dark:bg-blue-500/10 dark:text-blue-300";
}

export default function ParcelsPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ParcelStatus>("Tous");

  const filteredParcels = useMemo(
    () =>
      parcels.filter((parcel) => {
        const matchesFilter =
          activeFilter === "Tous" || parcel.status === activeFilter;
        const matchesQuery = `${parcel.id} ${parcel.name} ${parcel.route} ${parcel.owner}`
          .toLowerCase()
          .includes(query.toLowerCase());

        return matchesFilter && matchesQuery;
      }),
    [activeFilter, query],
  );

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
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-500">
              Logistique
            </p>
            <h1 className="text-xl font-black">Colis</h1>
          </div>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition-colors hover:bg-blue-700">
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <section className="mb-4 grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-[#1e3248] dark:bg-[#111d2e]">
            <Package className="mb-2 h-4 w-4 text-blue-500" />
            <p className="text-lg font-black">{parcels.length}</p>
            <p className="text-[0.68rem] text-slate-500">Total</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-[#1e3248] dark:bg-[#111d2e]">
            <Truck className="mb-2 h-4 w-4 text-orange-500" />
            <p className="text-lg font-black">
              {parcels.filter((parcel) => parcel.status === "En transit").length}
            </p>
            <p className="text-[0.68rem] text-slate-500">Transit</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-[#1e3248] dark:bg-[#111d2e]">
            <CheckCircle className="mb-2 h-4 w-4 text-emerald-500" />
            <p className="text-lg font-black">
              {parcels.filter((parcel) => parcel.status === "Arrive").length}
            </p>
            <p className="text-[0.68rem] text-slate-500">Arrives</p>
          </div>
        </section>

        <section className="mb-4 rounded-xl border border-slate-200 bg-white p-3 dark:border-[#1e3248] dark:bg-[#111d2e]">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-[#1e3248] dark:bg-[#162233]">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un colis"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            <Filter className="h-4 w-4 text-slate-400" />
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeFilter === filter
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-[#1e3248] dark:text-slate-400 dark:hover:bg-[#162233]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filteredParcels.map((parcel) => (
            <Link
              key={parcel.id}
              href={`/parcels/${parcel.id}`}
              className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:bg-slate-50 dark:border-[#1e3248] dark:bg-[#111d2e] dark:shadow-none dark:hover:bg-[#162233]"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-500">{parcel.id}</p>
                  <h2 className="truncate text-base font-bold">{parcel.name}</h2>
                </div>
                <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.68rem] font-bold ${statusStyle(parcel.status)}`}>
                  {parcel.status}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <p className="flex min-w-0 items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {parcel.route}
                </p>
                <p className="flex min-w-0 items-center gap-2">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  {parcel.eta} - {parcel.weight} - {parcel.value}
                </p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
