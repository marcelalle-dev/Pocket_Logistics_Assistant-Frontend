import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Plane,
  Plus,
  Ship,
  Truck,
} from "lucide-react";

const trips = [
  {
    id: "TR-1001",
    title: "Guangzhou - Cotonou",
    mode: "Air",
    date: "18 juin 2026",
    status: "En cours",
    parcels: 12,
    value: "3 240 000 FCFA",
    icon: Plane,
  },
  {
    id: "TR-1002",
    title: "Istanbul - Cotonou",
    mode: "Route",
    date: "22 juin 2026",
    status: "Planifie",
    parcels: 8,
    value: "1 890 000 FCFA",
    icon: Truck,
  },
  {
    id: "TR-1003",
    title: "Dubai - Lagos",
    mode: "Mer",
    date: "28 juin 2026",
    status: "Preparation",
    parcels: 5,
    value: "980 000 FCFA",
    icon: Ship,
  },
];

export default function TripsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-24 pt-14 text-slate-950 transition-colors dark:bg-[#0d1b2a] dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-5 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 dark:border-[#1e3248] dark:bg-[#111d2e] dark:text-slate-300 dark:hover:bg-[#162233]"
            aria-label="Retour au tableau de bord"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-500">
              Logistique
            </p>
            <h1 className="truncate text-xl font-black sm:text-2xl">Voyages</h1>
          </div>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm transition-colors hover:bg-blue-700">
            <Plus className="h-5 w-5" />
          </button>
        </header>

        <section className="mb-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-[#1e3248] dark:bg-[#111d2e]">
            <p className="text-2xl font-black">{trips.length}</p>
            <p className="text-xs text-slate-500">Voyages actifs</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-[#1e3248] dark:bg-[#111d2e]">
            <p className="text-2xl font-black">25</p>
            <p className="text-xs text-slate-500">Colis planifies</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-[#1e3248] dark:bg-[#111d2e]">
            <p className="text-2xl font-black">6 110 000</p>
            <p className="text-xs text-slate-500">FCFA suivis</p>
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {trips.map((trip) => {
            const Icon = trip.icon;

            return (
              <Link
                key={trip.id}
                href={`/trips/${trip.id}`}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:bg-slate-50 dark:border-[#1e3248] dark:bg-[#111d2e] dark:shadow-none dark:hover:bg-[#162233]"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[0.68rem] font-bold text-blue-700 dark:border-blue-500/25 dark:bg-blue-500/10 dark:text-blue-300">
                    {trip.status}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-500">{trip.id}</p>
                <h2 className="mt-1 truncate text-base font-black">{trip.title}</h2>
                <div className="mt-3 space-y-2 text-xs text-slate-500">
                  <p className="flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                    {trip.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {trip.mode} - {trip.parcels} colis - {trip.value}
                  </p>
                </div>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
