"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Download,
  FileText,
  Fingerprint,
  HardDrive,
  Lock,
  LogOut,
  RefreshCw,
  Shield,
  Smartphone,
  User,
} from "lucide-react";

interface SecurityLog {
  id: string;
  type: "success" | "warning";
  label: string;
  device: string;
  time: string;
}

interface RecentExport {
  id: string;
  name: string;
  meta: string;
  type: "pdf" | "csv";
}

function ProfileMenuItem({
  icon,
  label,
  sub,
  onClick,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3 px-4 py-3.5
        border-b border-[#1e3248] last:border-0
        transition-colors text-left
        ${danger ? "hover:bg-red-950/30 group" : "hover:bg-[#1a2d45]"}
      `}
    >
      <span className={`shrink-0 ${danger ? "text-red-400" : "text-blue-400"}`}>
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${danger ? "text-red-400" : "text-slate-200"}`}>
          {label}
        </p>
        {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
      </div>
      {!danger && <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />}
    </button>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#111d2e] border border-[#1e3248] rounded-xl overflow-hidden mb-3">
      {children}
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const [vaultLocked, setVaultLocked] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const user = {
    name: "Utilisateur Démo",
    email: "demo@logistique.app",
    country: "Côte d'Ivoire",
    storageUsed: 42.3,
    storageTotal: 256,
    pendingSync: 12,
    lastSync: "21 mai",
    totalProducts: 47,
  };

  const inventory = [
    { label: "Textiles", count: 142, value: "1 240 000 FCFA", color: "bg-blue-500" },
    { label: "Électronique", count: 38, value: "890 000 FCFA", color: "bg-purple-500" },
    { label: "Chaussures", count: 67, value: "756 000 FCFA", color: "bg-orange-500" },
    { label: "Accessoires", count: 24, value: "342 000 FCFA", color: "bg-pink-500" },
  ];

  const recentExports: RecentExport[] = [
    { id: "1", name: "Inventaire_Guangzhou_Mai2026", meta: "24 articles • 1.2 Mo • il y a 21h", type: "pdf" },
    { id: "2", name: "Produits_Istanbul_Mai2026", meta: "47 articles • 340 Ko • il y a 2j", type: "csv" },
    { id: "3", name: "Rapport_Douane_2026", meta: "12 articles • 890 Ko • il y a 3j", type: "pdf" },
  ];

  const securityLogs: SecurityLog[] = [
    { id: "1", type: "success", label: "Déverrouillage biométrique", device: "iPhone 15 Pro", time: "il y a 1h" },
    { id: "2", type: "success", label: "Export PDF généré", device: "iPhone 15 Pro", time: "il y a 21h" },
    { id: "3", type: "warning", label: "Tentative de code PIN échouée", device: "Inconnu", time: "il y a 3j" },
  ];

  const handleLogout = () => {
    // TODO: clear session/store
    router.push("/login");
  };

  const storagePercent = Math.round((user.storageUsed / user.storageTotal) * 100);

  return (
    <div className="min-h-screen bg-[#0d1b2a] pb-24">
      <div className="bg-[#111d2e] border-b border-[#1e3248] px-4 pt-14 pb-6">
        <h1 className="text-lg font-bold text-slate-100 mb-5">Profil</h1>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-[#1a2d45] border-2 border-[#1e3248] flex items-center justify-center mb-3">
            <User className="w-8 h-8 text-blue-400" />
          </div>
          <p className="text-base font-bold text-slate-100">{user.name}</p>
          <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
          <p className="text-xs text-slate-500 mt-0.5">{user.country}</p>
          <span className="inline-flex items-center gap-1.5 bg-green-950 text-green-400 text-[0.7rem] font-semibold px-2.5 py-1 rounded-full mt-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            Compte actif
          </span>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-1">
        <SectionCard>
          <ProfileMenuItem
            icon={<Shield className="w-4 h-4" />}
            label="Coffre-fort sécurisé"
            sub="Données chiffrées localement"
            onClick={() => router.push("/profile/vault")}
          />
          <ProfileMenuItem
            icon={<Fingerprint className="w-4 h-4" />}
            label="Authentification biométrique"
            sub="Face ID / Empreinte"
            onClick={() => router.push("/profile/biometric")}
          />
        </SectionCard>

        <SectionCard>
          <ProfileMenuItem
            icon={<FileText className="w-4 h-4" />}
            label="Exporter inventaire PDF"
            sub="Génération rapide"
          />
          <ProfileMenuItem
            icon={<Download className="w-4 h-4" />}
            label="Exporter CSV"
            sub="Données brutes"
          />
        </SectionCard>

        <SectionCard>
          <ProfileMenuItem
            icon={<HardDrive className="w-4 h-4" />}
            label="Stockage local"
            sub={`${user.totalProducts} produits, ${user.pendingSync} en attente`}
          />
          <ProfileMenuItem
            icon={<RefreshCw className="w-4 h-4" />}
            label="Synchronisation"
            sub={`Dernière sync : ${user.lastSync}`}
          />
        </SectionCard>

        <div className="bg-[#111d2e] border border-[#1e3248] rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-200">Inventaire rapide</p>
            <button className="text-xs text-blue-400 hover:underline">Tout voir</button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {inventory.map((category) => (
              <div key={category.label} className="bg-[#162233] rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`w-2 h-2 rounded-full ${category.color}`} />
                  <p className="text-xs text-slate-400">{category.label}</p>
                </div>
                <p className="text-sm font-bold text-slate-100">
                  {category.count} <span className="text-xs font-normal text-slate-500">articles</span>
                </p>
                <p className="text-xs text-green-400 mt-0.5">{category.value}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#1e3248]">
            <p className="text-xs text-slate-500">Total inventaire</p>
            <p className="text-sm font-bold text-slate-100">3 228 000 FCFA</p>
          </div>
        </div>

        <div className="bg-[#111d2e] border border-[#1e3248] rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-200">Exports récents</p>
            <Download className="w-4 h-4 text-slate-500" />
          </div>

          <div className="space-y-2">
            {recentExports.map((exp) => (
              <div key={exp.id} className="flex items-center gap-3 py-2 border-b border-[#1e3248] last:border-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${exp.type === "pdf" ? "bg-orange-950" : "bg-blue-950"}`}>
                  <FileText className={`w-4 h-4 ${exp.type === "pdf" ? "text-orange-400" : "text-blue-400"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-200 truncate">{exp.name}</p>
                  <p className="text-[0.68rem] text-slate-500 mt-0.5">{exp.meta}</p>
                </div>
                <button
                  className="shrink-0 text-green-400 hover:text-green-300 transition-colors"
                  aria-label={`Télécharger ${exp.name}`}
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111d2e] border border-[#1e3248] rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-slate-200">Journal de sécurité</p>
            <Shield className="w-4 h-4 text-slate-500" />
          </div>

          <div className="space-y-2">
            {securityLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 py-2 border-b border-[#1e3248] last:border-0">
                <div className="mt-0.5 shrink-0">
                  {log.type === "success" && <CheckCircle className="w-4 h-4 text-green-400" />}
                  {log.type === "warning" && <AlertTriangle className="w-4 h-4 text-orange-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-200">{log.label}</p>
                  <p className="text-[0.68rem] text-slate-500 mt-0.5 inline-flex items-center gap-1">
                    <Smartphone className="w-3 h-3" />
                    {log.device} • {log.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#1e3248]">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs text-slate-500">AES-256 • Stockage local</p>
              <span className="text-xs font-medium text-green-400">Actif</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-[#1e3248] rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all"
                  style={{ width: `${storagePercent}%` }}
                />
              </div>
              <p className="text-[0.68rem] text-slate-500 shrink-0">
                {user.storageUsed} / {user.storageTotal} Mo
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setVaultLocked((value) => !value)}
          className="
            w-full flex items-center justify-center gap-2
            bg-[#162233] hover:bg-[#1a2a3e] border border-[#1e3248]
            text-slate-400 text-sm font-medium
            rounded-xl py-3.5 mb-3 transition-colors
          "
        >
          <Lock className="w-4 h-4" />
          {vaultLocked ? "Déverrouiller le coffre-fort" : "Verrouiller le coffre-fort"}
        </button>

        {!showLogoutConfirm ? (
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium py-3 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </button>
        ) : (
          <div className="bg-red-950/40 border border-red-900/50 rounded-xl p-4 text-center">
            <p className="text-sm text-slate-200 mb-3">Confirmer la déconnexion ?</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 bg-[#162233] border border-[#1e3248] text-slate-400 text-sm font-medium rounded-lg py-2.5 hover:bg-[#1a2a3e] transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg py-2.5 transition-colors"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
