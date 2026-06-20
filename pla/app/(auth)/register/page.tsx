"use client";

import { FormEvent, ReactNode, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  PackageCheck,
  ShieldCheck,
  Smartphone,
  User,
} from "lucide-react";
import { authApi } from "@/lib/api/auth";

type RegisterField = "name" | "email" | "phone" | "password" | "confirm";

type RegisterInputProps = {
  id: RegisterField;
  label: string;
  type: "email" | "password" | "tel" | "text";
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete: string;
  required?: boolean;
  icon: ReactNode;
};

const initialForm = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirm: "",
};

function BrandMark() {
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

function RegisterInput({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  required = false,
  icon,
}: RegisterInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="flex items-center justify-between gap-3 text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        <span>{label}</span>
        {!required && (
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
            Optionnel
          </span>
        )}
      </label>
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
          required={required}
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

function BenefitItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-center gap-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
        <Check className="h-3.5 w-3.5" />
      </span>
      {children}
    </li>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordStrength = useMemo(() => {
    let score = 0;
    if (form.password.length >= 8) score += 1;
    if (/[A-Z]/.test(form.password)) score += 1;
    if (/\d/.test(form.password)) score += 1;
    if (/[^A-Za-z0-9]/.test(form.password)) score += 1;
    return score;
  }, [form.password]);

  const updateField = (key: RegisterField) => (value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const validate = () => {
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return false;
    }

    if (!form.email.includes("@")) {
      setError("Veuillez saisir une adresse email valide.");
      return false;
    }

    if (form.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return false;
    }

    if (form.password !== form.confirm) {
      setError("Les deux mots de passe ne correspondent pas.");
      return false;
    }

    return true;
  };

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!validate()) return;

    setIsLoading(true);
    try {
      await authApi.register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      router.push("/");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Création impossible pour le moment. Réessayez dans un instant.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f8fb] px-4 py-10 text-slate-950 transition-colors duration-500 dark:bg-[#080a0f] dark:text-white sm:px-6">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.92),rgba(247,248,251,0.72)),radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.13),transparent_34%)] dark:bg-[linear-gradient(to_bottom,rgba(8,10,15,0.9),rgba(8,10,15,0.98)),radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.18),transparent_36%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-white/20" />

      <section className="relative w-full max-w-[500px] animate-[auth-enter_620ms_cubic-bezier(0.22,1,0.36,1)_both]">
        <Link
          href="/login"
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/75 px-3.5 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-white/10 dark:bg-white/[0.055] dark:text-slate-300 dark:hover:border-white/20 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Connexion
        </Link>

        <div className="rounded-[28px] border border-white/80 bg-white/86 p-2 shadow-[0_32px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.055] dark:shadow-[0_32px_90px_rgba(0,0,0,0.45)]">
          <div className="rounded-[22px] border border-slate-200/80 bg-white px-6 py-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:border-white/10 dark:bg-[#0d1018]/88 dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:px-8 sm:py-9">
            <BrandMark />

            <div className="mt-7 text-center">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                Créer votre espace
              </h1>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
                Centralisez vos opérations logistiques avec une interface rapide,
                claire et prête pour le terrain.
              </p>
            </div>

            <form onSubmit={handleRegister} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <RegisterInput
                  id="name"
                  label="Nom complet"
                  type="text"
                  value={form.name}
                  onChange={updateField("name")}
                  placeholder="Jean Kouassi"
                  autoComplete="name"
                  required
                  icon={<User className="h-4 w-4" />}
                />
                <RegisterInput
                  id="phone"
                  label="Téléphone"
                  type="tel"
                  value={form.phone}
                  onChange={updateField("phone")}
                  placeholder="+225 01 23 45 67 89"
                  autoComplete="tel"
                  icon={<Smartphone className="h-4 w-4" />}
                />
              </div>

              <RegisterInput
                id="email"
                label="Adresse email"
                type="email"
                value={form.email}
                onChange={updateField("email")}
                placeholder="vous@entreprise.com"
                autoComplete="email"
                required
                icon={<Mail className="h-4 w-4" />}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <RegisterInput
                  id="password"
                  label="Mot de passe"
                  type="password"
                  value={form.password}
                  onChange={updateField("password")}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  icon={<LockKeyhole className="h-4 w-4" />}
                />
                <RegisterInput
                  id="confirm"
                  label="Confirmation"
                  type="password"
                  value={form.confirm}
                  onChange={updateField("confirm")}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  icon={<LockKeyhole className="h-4 w-4" />}
                />
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4].map((level) => (
                    <span
                      key={level}
                      className={`h-1.5 rounded-full transition-colors ${
                        passwordStrength >= level
                          ? "bg-slate-950 dark:bg-white"
                          : "bg-slate-200 dark:bg-white/10"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
                  Utilisez au moins 8 caractères. Une majuscule, un chiffre et
                  un symbole renforcent la sécurité.
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="animate-[auth-error_220ms_ease-out_both] rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700 dark:border-red-500/25 dark:bg-red-500/10 dark:text-red-200"
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
                    Création en cours
                  </>
                ) : (
                  <>
                    Créer mon compte
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-white/10 dark:bg-white/[0.035]">
              <div className="flex gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold tracking-tight text-slate-950 dark:text-white">
                    Prêt pour une utilisation professionnelle
                  </p>
                  <ul className="mt-3 space-y-2">
                    <BenefitItem>Données protégées et accès sécurisé.</BenefitItem>
                    <BenefitItem>Expérience optimisée mobile, tablette et desktop.</BenefitItem>
                    <BenefitItem>Conçu pour les opérations logistiques quotidiennes.</BenefitItem>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-7 text-center text-sm text-slate-500 dark:text-slate-400">
          Déjà un compte ?{" "}
          <Link
            href="/login"
            className="font-semibold text-slate-950 transition hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:text-white dark:hover:text-blue-300"
          >
            Se connecter
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

        @keyframes auth-error {
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
