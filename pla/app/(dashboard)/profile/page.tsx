"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  CheckCircle,
  ChevronRight,
  Download,
  FileText,
  Fingerprint,
  HardDrive,
  IdCard,
  Lock,
  LogOut,
  Mail,
  Package,
  RefreshCw,
  Shield,
  Smartphone,
  User,
} from "lucide-react";
import { authApi } from "@/lib/api/auth";
import { session } from "@/lib/auth/session";
import type { AuthUser } from "@/types/api";

type SecurityLog = {
  id: string;
  type: "success" | "warning";
  label: string;
  device: string;
  time: string;
};

type RecentExport = {
  id: string;
  name: string;
  meta: string;
  type: "pdf" | "csv";
};

function ShellCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`rounded-xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-[#1e3248] dark:bg-[#111d2e] dark:shadow-none ${className}`}
    >
      {children}
    </section>
  );
}

function CardHeader({
  title,
  icon,
}: {
  title: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-[#1e3248]">
      <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
        {title}
      </h2>
      {icon && <span className="text-slate-400">{icon}</span>}
    </div>
  );
}

function ProfileMenuItem({
  icon,
  label,
  sub,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 border-b border-slate-200 px-4 py-3.5 text-left transition-colors last:border-0 hover:bg-slate-50 dark:border-[#1e3248] dark:hover:bg-[#162233]"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-slate-800 dark:text-slate-100">
          {label}
        </span>
        {sub && (
          <span className="mt-0.5 block text-xs text-slate-500">{sub}</span>
        )}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
    </button>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 dark:border-[#1e3248] dark:bg-[#162233]">
      <span className="mt-0.5 shrink-0 text-blue-500 dark:text-blue-300">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-semibold text-slate-800 dark:text-slate-100">
          {value}
        </p>
      </div>
    </div>
  );
}

function formatDate(value?: string) {
  if (!value) return "Non disponible";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Non disponible";

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getInitials(name?: string) {
  if (!name) return "U";

  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "U"
  );
}

function getRoleLabel(role?: string) {
  if (role === "ADMIN") return "Administrateur";
  if (role === "AGENT") return "Agent logistique";
  return role ?? "Utilisateur";
}

export default function ProfilePage() {
  const router = useRouter();
  const [vaultLocked, setVaultLocked] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [profile, setProfile] = useState<AuthUser | null>(null);
  const [profileError, setProfileError] = useState("");
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const logistics = {
    storageUsed: 42.3,
    storageTotal: 256,
    pendingSync: 12,
    lastSync: "21 mai",
    totalProducts: 47,
  };

  useEffect(() => {
    const currentSession = session.get();

    if (!currentSession) {
      router.replace("/login");
      return;
    }

    let isMounted = true;

    authApi
      .me()
      .then((user) => {
        if (!isMounted) return;

        setProfile(user);
        session.set({
          accessToken: currentSession.accessToken,
          user,
        });
      })
      .catch((error) => {
        if (!isMounted) return;
        setProfile(currentSession.user);
        setProfileError(
          error instanceof Error
            ? error.message
            : "Impossible de charger les informations du profil.",
        );
      })
      .finally(() => {
        if (isMounted) {
          setIsProfileLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [router]);

  const user = useMemo(
    () => ({
      id: profile?.id ? String(profile.id) : "Non disponible",
      name: profile?.name ?? "Utilisateur",
      email: profile?.email ?? "Non disponible",
      role: getRoleLabel(profile?.role),
      createdAt: formatDate(profile?.created_at),
      updatedAt: formatDate(profile?.updated_at),
      initials: getInitials(profile?.name),
    }),
    [profile],
  );

  const inventory = [
    { label: "Textiles", count: 142, value: "1 240 000 FCFA", color: "bg-blue-500" },
    { label: "Electronique", count: 38, value: "890 000 FCFA", color: "bg-purple-500" },
    { label: "Chaussures", count: 67, value: "756 000 FCFA", color: "bg-orange-500" },
    { label: "Accessoires", count: 24, value: "342 000 FCFA", color: "bg-pink-500" },
  ];

  const recentExports: RecentExport[] = [
    { id: "1", name: "Inventaire_Guangzhou_Mai2026", meta: "24 articles - 1.2 Mo - il y a 21h", type: "pdf" },
    { id: "2", name: "Produits_Istanbul_Mai2026", meta: "47 articles - 340 Ko - il y a 2j", type: "csv" },
    { id: "3", name: "Rapport_Douane_2026", meta: "12 articles - 890 Ko - il y a 3j", type: "pdf" },
  ];

  const securityLogs: SecurityLog[] = [
    { id: "1", type: "success", label: "Connexion au profil", device: "Session actuelle", time: "maintenant" },
    { id: "2", type: "success", label: "Export PDF genere", device: "Navigateur", time: "il y a 21h" },
    { id: "3", type: "warning", label: "Tentative de code PIN echouee", device: "Inconnu", time: "il y a 3j" },
  ];

  const storagePercent = Math.round(
    (logistics.storageUsed / logistics.storageTotal) * 100,
  );

  const handleLogout = () => {
    authApi.logout();
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-10 pt-16 text-slate-950 transition-colors dark:bg-[#0d1b2a] dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-5 flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href="/"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-100 dark:border-[#1e3248] dark:bg-[#111d2e] dark:text-slate-300 dark:hover:bg-[#162233]"
              aria-label="Retour au tableau de bord"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-500">
                Compte
              </p>
              <h1 className="truncate text-xl font-black sm:text-2xl">
                Profil
              </h1>
            </div>
          </div>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-100 dark:border-red-500/25 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/15"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Deconnexion</span>
          </button>
        </header>

        {profileError && (
          <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-200">
            {profileError}
          </div>
        )}

        <div className="grid gap-4 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
          <div className="space-y-4">
            <ShellCard className="overflow-hidden">
              <div className="bg-white px-5 pb-5 pt-6 text-center dark:bg-[#111d2e]">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-100 bg-gradient-to-br from-blue-600 to-purple-600 shadow-sm dark:border-[#1e3248]">
                  <span className="text-xl font-black text-white">
                    {user.initials}
                  </span>
                </div>
                <h2 className="break-words text-lg font-black">{user.name}</h2>
                <p className="mt-1 break-words text-sm text-slate-500">
                  {user.email}
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300">
                    <Shield className="h-3.5 w-3.5" />
                    {user.role}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {isProfileLoading ? "Chargement" : "Compte actif"}
                  </span>
                </div>
              </div>
            </ShellCard>

            <ShellCard className="overflow-hidden">
              <ProfileMenuItem
                icon={<Shield className="h-4 w-4" />}
                label="Coffre-fort securise"
                sub="Donnees chiffrees localement"
                onClick={() => router.push("/profile/vault")}
              />
              <ProfileMenuItem
                icon={<Fingerprint className="h-4 w-4" />}
                label="Authentification biometrique"
                sub="Face ID / Empreinte"
                onClick={() => router.push("/profile/biometric")}
              />
              <ProfileMenuItem
                icon={<HardDrive className="h-4 w-4" />}
                label="Stockage local"
                sub={`${logistics.totalProducts} produits, ${logistics.pendingSync} en attente`}
              />
              <ProfileMenuItem
                icon={<RefreshCw className="h-4 w-4" />}
                label="Synchronisation"
                sub={`Derniere sync : ${logistics.lastSync}`}
              />
            </ShellCard>

            <button
              onClick={() => setVaultLocked((value) => !value)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-[#1e3248] dark:bg-[#111d2e] dark:text-slate-300 dark:hover:bg-[#162233]"
            >
              <Lock className="h-4 w-4" />
              {vaultLocked ? "Deverrouiller le coffre-fort" : "Verrouiller le coffre-fort"}
            </button>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <ShellCard className="xl:col-span-2">
              <CardHeader
                title="Informations utilisateur"
                icon={<BadgeCheck className="h-4 w-4 text-emerald-500" />}
              />
              <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
                <DetailItem icon={<IdCard className="h-4 w-4" />} label="Identifiant" value={`#${user.id}`} />
                <DetailItem icon={<User className="h-4 w-4" />} label="Nom complet" value={user.name} />
                <DetailItem icon={<Mail className="h-4 w-4" />} label="Adresse email" value={user.email} />
                <DetailItem icon={<Shield className="h-4 w-4" />} label="Role" value={user.role} />
                <DetailItem icon={<CalendarDays className="h-4 w-4" />} label="Cree le" value={user.createdAt} />
                <DetailItem icon={<RefreshCw className="h-4 w-4" />} label="Derniere mise a jour" value={user.updatedAt} />
              </div>
            </ShellCard>

            <ShellCard>
              <CardHeader title="Inventaire rapide" icon={<Package className="h-4 w-4" />} />
              <div className="grid grid-cols-2 gap-3 p-4">
                {inventory.map((category) => (
                  <div
                    key={category.label}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-[#1e3248] dark:bg-[#162233]"
                  >
                    <div className="mb-1 flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${category.color}`} />
                      <p className="truncate text-xs text-slate-500">
                        {category.label}
                      </p>
                    </div>
                    <p className="text-sm font-black">
                      {category.count}{" "}
                      <span className="text-xs font-normal text-slate-500">
                        articles
                      </span>
                    </p>
                    <p className="mt-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                      {category.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 px-4 py-3 dark:border-[#1e3248]">
                <Link
                  href="/items"
                  className="inline-flex text-sm font-bold text-blue-600 hover:underline dark:text-blue-300"
                >
                  {"Voir tout l'inventaire"}
                </Link>
              </div>
            </ShellCard>

            <ShellCard>
              <CardHeader title="Stockage securise" icon={<Lock className="h-4 w-4" />} />
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    AES-256 - Stockage local
                  </p>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-300">
                    Actif
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-[#1e3248]">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-all"
                      style={{ width: `${storagePercent}%` }}
                    />
                  </div>
                  <p className="shrink-0 text-xs text-slate-500">
                    {logistics.storageUsed} / {logistics.storageTotal} Mo
                  </p>
                </div>
              </div>
            </ShellCard>

            <ShellCard>
              <CardHeader title="Exports recents" icon={<Download className="h-4 w-4" />} />
              <div className="divide-y divide-slate-200 dark:divide-[#1e3248]">
                {recentExports.map((exp) => (
                  <div key={exp.id} className="flex items-center gap-3 px-4 py-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        exp.type === "pdf"
                          ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300"
                          : "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300"
                      }`}
                    >
                      <FileText className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {exp.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {exp.meta}
                      </p>
                    </div>
                    <button
                      className="shrink-0 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-50 hover:text-emerald-600 dark:hover:bg-[#162233] dark:hover:text-emerald-300"
                      aria-label={`Telecharger ${exp.name}`}
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </ShellCard>

            <ShellCard>
              <CardHeader title="Journal de securite" icon={<Shield className="h-4 w-4" />} />
              <div className="divide-y divide-slate-200 dark:divide-[#1e3248]">
                {securityLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 px-4 py-3">
                    <span className="mt-0.5 shrink-0">
                      {log.type === "success" ? (
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{log.label}</p>
                      <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-slate-500">
                        <Smartphone className="h-3 w-3" />
                        {log.device} - {log.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ShellCard>
          </div>
        </div>

        {showLogoutConfirm && (
          <div className="fixed inset-0 z-50 flex items-end bg-slate-950/40 p-4 backdrop-blur-sm sm:items-center sm:justify-center">
            <div className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-xl dark:border-[#1e3248] dark:bg-[#111d2e] sm:max-w-sm">
              <p className="text-base font-bold">Confirmer la deconnexion ?</p>
              <p className="mt-1 text-sm text-slate-500">
                Votre session locale sera fermee sur cet appareil.
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-[#1e3248] dark:bg-[#162233] dark:text-slate-300 dark:hover:bg-[#1a2d45]"
                >
                  Annuler
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700"
                >
                  Se deconnecter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
