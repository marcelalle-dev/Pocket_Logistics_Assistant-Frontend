'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BarChart3,
  Camera,
  LogOut,
  Package,
  PencilLine,
  Search,
  User,
  type LucideIcon,
} from 'lucide-react';

type TabId = 'tableau' | 'scanner' | 'colis' | 'profil';

interface Colis {
  id: number;
  nom: string;
  statut: 'En transit' | 'Arrivé' | 'Transit';
}

interface TabItem {
  id: TabId;
  label: string;
  Icon: LucideIcon;
}

export default function Home() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<TabId>('tableau');

  const budgetActuel = 3240000;
  const budgetTotal = 5000000;
  const pourcentageBudget = Math.min((budgetActuel / budgetTotal) * 100, 100);

  const colisListe: Colis[] = [
    { id: 1, nom: 'Valise A', statut: 'En transit' },
    { id: 2, nom: 'Carton B', statut: 'Arrivé' },
    { id: 3, nom: 'Transit', statut: 'Transit' },
  ];

  const tabs: TabItem[] = [
    { id: 'tableau', label: 'Tableau', Icon: BarChart3 },
    { id: 'scanner', label: 'Scanner', Icon: Search },
    { id: 'colis', label: 'Colis', Icon: Package },
    { id: 'profil', label: 'Profil', Icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col pb-24 antialiased">
      <div className="p-4 flex justify-between items-center bg-[#111420]/70 border-b border-gray-800/40 sticky top-0 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-[10px] font-black shadow-md">
            LA
          </div>
          <h1 className="text-sm font-bold tracking-tight">Tableau de bord</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-gray-800 border border-gray-700/50 flex items-center justify-center text-xs">
            <User className="h-3.5 w-3.5 text-gray-300" />
          </div>
          <button
            onClick={() => router.push('/login')}
            className="inline-flex items-center gap-1.5 text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-lg font-bold hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="h-3 w-3" />
            Quitter
          </button>
        </div>
      </div>

      {currentTab === 'tableau' && (
        <div className="p-4 space-y-4 max-w-md mx-auto w-full flex-1">
          <div className="bg-[#111420]/80 p-5 rounded-2xl border border-gray-800/60 shadow-xl relative overflow-hidden">
            <div className="flex justify-between items-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Budget voyage
              </p>
              <span className="bg-orange-500/10 text-orange-400 text-[9px] px-2.5 py-0.5 rounded-full font-bold border border-orange-500/20">
                65% &bull; Alertes actives
              </span>
            </div>
            <h2 className="text-2xl font-black mt-2 tracking-tight">
              {budgetActuel.toLocaleString('fr-FR')}{' '}
              <span className="text-xs text-gray-500 font-normal">
                / {budgetTotal.toLocaleString('fr-FR')} FCFA
              </span>
            </h2>
            <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden mt-4 relative border border-gray-800/30">
              <div
                className="bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 h-full rounded-full"
                style={{ width: `${pourcentageBudget}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setCurrentTab('scanner')}
              className="bg-[#111420]/80 hover:bg-[#161a29]/80 border border-gray-800/60 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-md group"
            >
              <span className="bg-[#07090e] w-10 h-10 rounded-xl flex items-center justify-center border border-gray-800/40 text-blue-400 group-hover:scale-105 transition-transform">
                <Camera className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold text-gray-300">Section photo</span>
            </button>

            <button className="bg-[#111420]/80 hover:bg-[#161a29]/80 border border-gray-800/60 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-md group">
              <span className="bg-[#07090e] w-10 h-10 rounded-xl flex items-center justify-center border border-gray-800/40 text-purple-400 group-hover:scale-105 transition-transform">
                <PencilLine className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold text-gray-300">Ajout manuel</span>
            </button>
          </div>

          <div className="bg-[#111420]/80 rounded-2xl border border-gray-800/60 shadow-xl overflow-hidden">
            <div className="p-3.5 border-b border-gray-800/40 bg-[#161a29]/20">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Suivi des colis
              </h3>
            </div>
            <div className="divide-y divide-gray-800/40">
              {colisListe.map((colis) => (
                <div
                  key={colis.id}
                  className="p-3.5 flex justify-between items-center hover:bg-[#161a29]/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-[#07090e] w-8 h-8 rounded-lg flex items-center justify-center border border-gray-800/30">
                      <Package className="h-4 w-4 text-blue-300" />
                    </span>
                    <span className="text-xs font-bold text-gray-200">{colis.nom}</span>
                  </div>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${
                      colis.statut === 'Arrivé'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}
                  >
                    {colis.statut}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentTab === 'scanner' && (
        <div className="p-4 flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-64 h-64 border-2 border-dashed border-gray-700 rounded-3xl flex items-center justify-center mb-6">
            <Camera className="h-14 w-14 text-gray-600" />
          </div>
          <h2 className="text-xl font-bold mb-2">Scanner un colis</h2>
          <p className="text-gray-400 text-sm px-8">
            {"Placez le code-barres ou l'étiquette dans le cadre pour l'identifier automatiquement."}
          </p>
        </div>
      )}

      {currentTab === 'colis' && (
        <div className="p-4 flex-1">
          <h2 className="text-lg font-bold mb-4">Mes colis</h2>
          <div className="space-y-3">
            {colisListe.map((colis) => (
              <div
                key={colis.id}
                className="bg-[#111420]/80 p-4 rounded-xl border border-gray-800/60 flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-blue-300" />
                  <span className="font-bold">{colis.nom}</span>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full font-bold border bg-blue-500/10 text-blue-400 border-blue-500/20">
                  {colis.statut}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentTab === 'profil' && (
        <div className="p-4 flex-1 text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl">
            <User className="h-9 w-9" />
          </div>
          <h2 className="text-xl font-bold">Utilisateur Démo</h2>
          <p className="text-gray-400 text-sm mb-6">demo@pla.local</p>
          <button className="w-full max-w-xs bg-gray-800 border border-gray-700 py-3 rounded-xl text-sm font-bold">
            Modifier le profil
          </button>
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 bg-[#111420]/90 backdrop-blur-lg border-t border-gray-800/60 p-2 flex justify-around items-center z-20 max-w-md mx-auto rounded-t-2xl shadow-xl">
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setCurrentTab(id)}
            className={`flex flex-col items-center gap-0.5 py-1 px-3.5 rounded-xl transition-all ${
              currentTab === id
                ? 'text-blue-400 bg-blue-500/5 font-bold border border-blue-500/10'
                : 'text-gray-500'
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className="text-[9px]">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
