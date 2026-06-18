import Link from "next/link";
import { ArrowLeft, Fingerprint } from "lucide-react";

export default function BiometricPage() {
  return (
    <main className="min-h-screen bg-[#0d1b2a] px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-md">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Link>

        <section className="mt-8 rounded-xl border border-[#1e3248] bg-[#111d2e] p-5">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-950 text-blue-400">
            <Fingerprint className="h-6 w-6" />
          </div>
          <h1 className="text-lg font-bold">Authentification biométrique</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            {"Activez l'authentification biométrique pour protéger l'accès au coffre-fort et aux exports sensibles."}
          </p>
        </section>
      </div>
    </main>
  );
}
