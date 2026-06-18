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
  KeyRound,
  Loader2,
  LockKeyhole,
  Mail,
  MessageSquareText,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";

type Step = 1 | 2 | 3;

type ResetInputProps = {
  id: string;
  label: string;
  type: "email" | "password" | "text";
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoComplete?: string;
  inputMode?: "email" | "numeric" | "text";
  icon: ReactNode;
};

const steps = [
  { id: 1, label: "Email" },
  { id: 2, label: "Code" },
  { id: 3, label: "Sécurité" },
] as const;

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

function ResetInput({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  inputMode,
  icon,
}: ResetInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        {label}
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
          inputMode={inputMode}
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

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="mt-7">
      <div className="grid grid-cols-3 gap-2">
        {steps.map((step) => {
          const isActive = step.id === current;
          const isDone = step.id < current;

          return (
            <div key={step.id} className="min-w-0">
              <div
                className={`h-1.5 rounded-full transition-colors duration-300 ${
                  isDone || isActive
                    ? "bg-slate-950 dark:bg-white"
                    : "bg-slate-200 dark:bg-white/10"
                }`}
              />
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold transition duration-300 ${
                    isDone
                      ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950"
                      : isActive
                        ? "border-blue-500 bg-blue-500 text-white shadow-[0_8px_22px_rgba(37,99,235,0.22)]"
                        : "border-slate-200 bg-white text-slate-400 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-500"
                  }`}
                >
                  {isDone ? <Check className="h-3.5 w-3.5" /> : step.id}
                </span>
                <span
                  className={`truncate text-xs font-medium ${
                    isActive
                      ? "text-slate-950 dark:text-white"
                      : "text-slate-500 dark:text-slate-500"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ContextPanel({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-white/10 dark:bg-white/[0.035]">
      <div className="flex gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-300">
          {icon}
        </span>
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-slate-950 dark:text-white">
            {title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const content = useMemo(() => {
    if (step === 1) {
      return {
        title: "Réinitialiser le mot de passe",
        description:
          "Entrez l’adresse email associée à votre compte. Nous vous enverrons un code de vérification sécurisé.",
      };
    }

    if (step === 2) {
      return {
        title: "Vérifier votre identité",
        description:
          "Saisissez le code reçu par email pour confirmer que vous êtes bien à l’origine de la demande.",
      };
    }

    return {
      title: "Créer un nouveau mot de passe",
      description:
        "Choisissez un mot de passe fiable pour sécuriser votre espace PLA.",
    };
  }, [step]);

  const runLoading = async (callback: () => void, duration = 1000) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, duration));
      callback();
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Veuillez saisir une adresse email valide.");
      return;
    }

    await runLoading(() => setStep(2), 1100);
  };

  const handleCodeSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (code.length < 6) {
      setError("Le code de vérification doit contenir 6 chiffres.");
      return;
    }

    await runLoading(() => setStep(3), 850);
  };

  const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    await runLoading(() => router.push("/login?reset=1"), 1000);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f8fb] px-4 py-10 text-slate-950 transition-colors duration-500 dark:bg-[#080a0f] dark:text-white sm:px-6">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.92),rgba(247,248,251,0.72)),radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.13),transparent_34%)] dark:bg-[linear-gradient(to_bottom,rgba(8,10,15,0.9),rgba(8,10,15,0.98)),radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.18),transparent_36%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-white/20" />

      <section className="relative w-full max-w-[460px] animate-[auth-enter_620ms_cubic-bezier(0.22,1,0.36,1)_both]">
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
                {content.title}
              </h1>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
                {content.description}
              </p>
            </div>

            <StepIndicator current={step} />

            <div className="mt-7">
              {step === 1 && (
                <form onSubmit={handleEmailSubmit} className="space-y-5">
                  <ContextPanel
                    icon={<Mail className="h-5 w-5" />}
                    title="Lien sécurisé"
                    description="Le code expire rapidement et ne peut être utilisé qu’une seule fois."
                  />
                  <ResetInput
                    id="email"
                    label="Adresse email"
                    type="email"
                    value={email}
                    onChange={setEmail}
                    placeholder="vous@entreprise.com"
                    autoComplete="email"
                    inputMode="email"
                    icon={<Mail className="h-4 w-4" />}
                  />
                  {error && <ErrorMessage message={error} />}
                  <PrimaryButton loading={isLoading} loadingText="Envoi du code">
                    Envoyer le code
                  </PrimaryButton>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleCodeSubmit} className="space-y-5">
                  <ContextPanel
                    icon={<MessageSquareText className="h-5 w-5" />}
                    title="Code de vérification"
                    description={`Nous avons envoyé un code à ${email || "votre adresse email"}.`}
                  />
                  <ResetInput
                    id="code"
                    label="Code reçu"
                    type="text"
                    value={code}
                    onChange={(value) =>
                      setCode(value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="123456"
                    autoComplete="one-time-code"
                    inputMode="numeric"
                    icon={<KeyRound className="h-4 w-4" />}
                  />
                  {error && <ErrorMessage message={error} />}
                  <PrimaryButton loading={isLoading} loadingText="Vérification">
                    Vérifier le code
                  </PrimaryButton>
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setStep(1);
                    }}
                    className="w-full text-center text-sm font-medium text-slate-500 transition hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:text-slate-400 dark:hover:text-white"
                  >
                    Modifier l’adresse email
                  </button>
                </form>
              )}

              {step === 3 && (
                <form onSubmit={handlePasswordSubmit} className="space-y-5">
                  <ContextPanel
                    icon={<ShieldCheck className="h-5 w-5" />}
                    title="Protection du compte"
                    description="Utilisez au moins 8 caractères avec une combinaison difficile à deviner."
                  />
                  <ResetInput
                    id="new-password"
                    label="Nouveau mot de passe"
                    type="password"
                    value={newPassword}
                    onChange={setNewPassword}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    icon={<LockKeyhole className="h-4 w-4" />}
                  />
                  <ResetInput
                    id="confirm-password"
                    label="Confirmer le mot de passe"
                    type="password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    icon={<LockKeyhole className="h-4 w-4" />}
                  />
                  {error && <ErrorMessage message={error} />}
                  <PrimaryButton
                    loading={isLoading}
                    loadingText="Réinitialisation"
                  >
                    Réinitialiser le mot de passe
                  </PrimaryButton>
                </form>
              )}
            </div>
          </div>
        </div>
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
      `}</style>
    </main>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="animate-[auth-error_220ms_ease-out_both] rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700 dark:border-red-500/25 dark:bg-red-500/10 dark:text-red-200"
    >
      {message}
      <style jsx global>{`
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
    </div>
  );
}

function PrimaryButton({
  children,
  loading,
  loadingText,
}: {
  children: ReactNode;
  loading: boolean;
  loadingText: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(15,23,42,0.18)] transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-[0_16px_36px_rgba(15,23,42,0.22)] focus:outline-none focus:ring-4 focus:ring-slate-900/15 active:translate-y-0 disabled:pointer-events-none disabled:opacity-70 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 dark:focus:ring-white/20"
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          {children}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </>
      )}
    </button>
  );
}
