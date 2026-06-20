"use client";

import { FormEvent, ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { authApi } from "@/lib/api/auth";

const demoAccount = {
  email: "test.local@example.com",
  password: "password123",
};

function AuthLogo() {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative mb-5">
        <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-white text-slate-950 shadow-[0_18px_45px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-slate-900 dark:text-white dark:shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
          <PackageCheck className="h-7 w-7" strokeWidth={1.8} />
        </div>
      </div>
      <p className="text-sm font-semibold tracking-tight text-slate-950 dark:text-white">
        PLA
      </p>
    </div>
  );
}

type AuthInputProps = {
  id: string;
  label: string;
  type: "email" | "password" | "text";
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete: string;
  icon: ReactNode;
};

function AuthInput({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  icon,
}: AuthInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          {label}
        </label>
      )}
      <div className="group relative">
        <span className="pointer-events-none absolute left-4 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-slate-400 transition-colors group-focus-within:text-blue-600 dark:text-slate-500 dark:group-focus-within:text-blue-400">
          {icon}
        </span>
        <input
          id={id}
          type={isPassword && isPasswordVisible ? "text" : type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
          className="h-12 w-full rounded-xl border border-slate-200 bg-white/80 pl-12 pr-12 text-[15px] text-slate-950 shadow-[0_1px_1px_rgba(15,23,42,0.03)] outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:hover:border-white/20 dark:focus:border-blue-400 dark:focus:bg-white/[0.06] dark:focus:ring-blue-400/10"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((current) => !current)}
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:text-slate-500 dark:hover:bg-white/10 dark:hover:text-slate-200"
            aria-label={
              isPasswordVisible
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"
            }
          >
            {isPasswordVisible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.includes("@") || password.length < 4) {
      setError("Vérifiez votre email et votre mot de passe.");
      return;
    }

    setIsLoading(true);
    try {
      await authApi.login({ email, password });
      router.push("/");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Connexion impossible pour le moment. Réessayez dans un instant.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const useDemoAccount = () => {
    setEmail(demoAccount.email);
    setPassword(demoAccount.password);
    setError("");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f8fb] px-4 py-10 text-slate-950 transition-colors duration-500 dark:bg-[#080a0f] dark:text-white sm:px-6">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.92),rgba(247,248,251,0.72)),radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.13),transparent_34%)] dark:bg-[linear-gradient(to_bottom,rgba(8,10,15,0.9),rgba(8,10,15,0.98)),radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.18),transparent_36%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-white/20" />

      <section className="relative w-full max-w-[440px] animate-[auth-enter_620ms_cubic-bezier(0.22,1,0.36,1)_both]">
        <div className="rounded-[28px] border border-white/80 bg-white/86 p-2 shadow-[0_32px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055] dark:shadow-[0_32px_90px_rgba(0,0,0,0.45)]">
          <div className="rounded-[22px] border border-slate-200/80 bg-white px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:border-white/10 dark:bg-[#0d1018]/88 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:px-8 sm:py-9">
            <AuthLogo />

            <div className="mt-7 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                Content de vous revoir
              </h1>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
                Connectez-vous à votre espace pour gérer vos opérations
                logistiques en toute sérénité.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <AuthInput
                id="email"
                label="Adresse email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="vous@entreprise.com"
                autoComplete="email"
                icon={<Mail className="h-4 w-4" />}
              />

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-700 dark:text-slate-200"
                  >
                    Mot de passe
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-blue-600 transition hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <AuthInput
                  id="password"
                  label=""
                  type="password"
                  value={password}
                  onChange={setPassword}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  icon={<LockKeyhole className="h-4 w-4" />}
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="animate-[auth-fade_220ms_ease-out_both] rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700 dark:border-red-500/25 dark:bg-red-500/10 dark:text-red-200"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(15,23,42,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-[0_16px_36px_rgba(15,23,42,0.22)] focus:outline-none focus:ring-4 focus:ring-slate-900/15 active:translate-y-0 disabled:pointer-events-none disabled:opacity-70 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 dark:focus:ring-white/20"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Connexion en cours
                  </>
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={useDemoAccount}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-500/10 active:translate-y-0 dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-white/[0.07]"
              >
                <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                Utiliser le compte de démonstration
              </button>
            </form>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.035]">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Accès sécurisé avec une expérience optimisée pour ordinateur,
                  tablette et mobile.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
          Pas encore de compte ?{" "}
          <Link
            href="/register"
            className="font-semibold text-slate-950 transition hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:text-white dark:hover:text-blue-300"
          >
            Créer un compte
          </Link>
        </p>
      </section>

      <style jsx global>{`
        @keyframes auth-enter {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes auth-fade {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
