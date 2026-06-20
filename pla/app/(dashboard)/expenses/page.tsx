"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  Download,
  Plus,
  Receipt,
  Search,
  TrendingUp,
  Wallet,
} from "lucide-react";

type ExpenseType = "Tous" | "Transport" | "Douane" | "Achat" | "Service";

const expenses = [
  {
    id: "EXP-301",
    label: "Fret Guangzhou",
    type: "Transport",
    amount: 1180000,
    date: "18 juin",
    status: "Paye",
    parcel: "PLA-2401",
  },
  {
    id: "EXP-302",
    label: "Declaration douane",
    type: "Douane",
    amount: 420000,
    date: "17 juin",
    status: "En attente",
    parcel: "PLA-2402",
  },
  {
    id: "EXP-303",
    label: "Achat accessoires",
    type: "Achat",
    amount: 890000,
    date: "16 juin",
    status: "Paye",
    parcel: "PLA-2403",
  },
  {
    id: "EXP-304",
    label: "Manutention depot",
    type: "Service",
    amount: 75000,
    date: "15 juin",
    status: "Paye",
    parcel: "PLA-2404",
  },
  {
    id: "EXP-305",
    label: "Assurance colis",
    type: "Service",
    amount: 675000,
    date: "14 juin",
    status: "En attente",
    parcel: "PLA-2401",
  },
];

const types: ExpenseType[] = ["Tous", "Transport", "Douane", "Achat", "Service"];
const budgetTotal = 5000000;

function formatAmount(value: number) {
  return `${value.toLocaleString("fr-FR")} FCFA`;
}

function typeColor(type: string) {
  if (type === "Transport") return "bg-blue-500";
  if (type === "Douane") return "bg-orange-500";
  if (type === "Achat") return "bg-purple-500";
  return "bg-emerald-500";
}

export default function ExpensesPage() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<ExpenseType>("Tous");

  const filteredExpenses = useMemo(
    () =>
      expenses.filter((expense) => {
        const matchesType = activeType === "Tous" || expense.type === activeType;
        const matchesQuery = `${expense.id} ${expense.label} ${expense.type} ${expense.parcel}`
          .toLowerCase()
          .includes(query.toLowerCase());

        return matchesType && matchesQuery;
      }),
    [activeType, query],
  );

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const pendingAmount = expenses
    .filter((expense) => expense.status === "En attente")
    .reduce((sum, expense) => sum + expense.amount, 0);
  const budgetPercent = Math.min((totalSpent / budgetTotal) * 100, 100);

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
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-500">
              Budget
            </p>
            <h1 className="text-xl font-black">Depenses</h1>
          </div>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm transition-colors hover:bg-emerald-700">
            <Plus className="h-5 w-5" />
          </button>
        </div>

        <section className="mb-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-[#1e3248] dark:bg-[#111d2e]">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-slate-500">Budget utilise</p>
              <p className="mt-1 text-2xl font-black">{formatAmount(totalSpent)}</p>
              <p className="mt-1 text-xs text-slate-500">
                sur {formatAmount(budgetTotal)}
              </p>
            </div>
            <span className="rounded-xl bg-emerald-50 p-2 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
              <Wallet className="h-5 w-5" />
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-[#1e3248]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-orange-500"
              style={{ width: `${budgetPercent}%` }}
            />
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-slate-50 p-3 dark:bg-[#162233]">
              <TrendingUp className="mb-2 h-4 w-4 text-orange-500" />
              <p className="text-sm font-bold">{Math.round(budgetPercent)}%</p>
              <p className="text-[0.68rem] text-slate-500">Consomme</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 dark:bg-[#162233]">
              <CreditCard className="mb-2 h-4 w-4 text-blue-500" />
              <p className="text-sm font-bold">{formatAmount(pendingAmount)}</p>
              <p className="text-[0.68rem] text-slate-500">En attente</p>
            </div>
          </div>
        </section>

        <section className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <button className="rounded-xl border border-slate-200 bg-white p-4 text-left transition-colors hover:bg-slate-50 dark:border-[#1e3248] dark:bg-[#111d2e] dark:hover:bg-[#162233]">
            <Receipt className="mb-3 h-5 w-5 text-emerald-500" />
            <p className="text-sm font-bold">Ajouter une depense</p>
            <p className="mt-1 text-xs text-slate-500">Frais, achat, douane</p>
          </button>
          <button className="rounded-xl border border-slate-200 bg-white p-4 text-left transition-colors hover:bg-slate-50 dark:border-[#1e3248] dark:bg-[#111d2e] dark:hover:bg-[#162233]">
            <Download className="mb-3 h-5 w-5 text-blue-500" />
            <p className="text-sm font-bold">Rapport</p>
            <p className="mt-1 text-xs text-slate-500">Exporter le budget</p>
          </button>
        </section>

        <section className="mb-4 rounded-xl border border-slate-200 bg-white p-3 dark:border-[#1e3248] dark:bg-[#111d2e]">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-[#1e3248] dark:bg-[#162233]">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher une depense"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            <CalendarDays className="h-4 w-4 text-slate-400" />
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeType === type
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-[#1e3248] dark:text-slate-400 dark:hover:bg-[#162233]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {filteredExpenses.map((expense) => (
            <article
              key={expense.id}
              className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-[#1e3248] dark:bg-[#111d2e] dark:shadow-none"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${typeColor(expense.type)}`} />
                    <p className="text-xs font-semibold text-slate-500">
                      {expense.type} - {expense.date}
                    </p>
                  </div>
                  <h2 className="truncate text-base font-bold">{expense.label}</h2>
                </div>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-1 text-[0.68rem] font-bold ${
                    expense.status === "Paye"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-300"
                      : "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-300"
                  }`}
                >
                  {expense.status}
                </span>
              </div>

              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="break-words text-xl font-black">{formatAmount(expense.amount)}</p>
                  <Link
                    href="/parcels"
                    className="mt-1 inline-flex text-xs font-semibold text-emerald-600 hover:underline dark:text-emerald-300"
                  >
                    Colis lie: {expense.parcel}
                  </Link>
                </div>
                <p className="text-xs font-semibold text-slate-400">{expense.id}</p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
