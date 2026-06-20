'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ThemeToggle, useColorMode } from '@/components/theme';
import {
  BarChart3,
  Camera,
  CreditCard,
  LogOut,
  Package,
  PencilLine,
  Search,
  User,
  type LucideIcon,
} from 'lucide-react';
import { authApi } from '@/lib/api/auth';

type TabId = 'tableau' | 'scanner' | 'colis' | 'profil';

interface Colis {
  id: number;
  nom: string;
  statut: 'En transit' | 'Arrive' | 'Transit';
}

interface TabItem {
  id: TabId;
  label: string;
  Icon: LucideIcon;
}

export default function Home() {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const [currentTab, setCurrentTab] = useState<TabId>('tableau');

  const isDark = colorMode === 'dark';

  const budgetActuel = 3240000;
  const budgetTotal = 5000000;
  const pourcentageBudget = Math.min((budgetActuel / budgetTotal) * 100, 100);

  const colisListe: Colis[] = [
    { id: 1, nom: 'Valise A', statut: 'En transit' },
    { id: 2, nom: 'Carton B', statut: 'Arrive' },
    { id: 3, nom: 'Transit', statut: 'Transit' },
  ];

  const tabs: TabItem[] = [
    { id: 'tableau', label: 'Tableau', Icon: BarChart3 },
    { id: 'scanner', label: 'Scanner', Icon: Search },
    { id: 'colis', label: 'Colis', Icon: Package },
    { id: 'profil', label: 'Profil', Icon: User },
  ];

  const theme = {
    page: isDark ? 'bg-[#07090e] text-white' : 'bg-slate-50 text-slate-950',
    header: isDark
      ? 'bg-[#111420]/70 border-gray-800/40'
      : 'bg-white/80 border-slate-200/80',
    avatar: isDark
      ? 'bg-gray-800 border-gray-700/50 text-gray-300'
      : 'bg-slate-100 border-slate-200 text-slate-600',
    card: isDark
      ? 'bg-[#111420]/80 border-gray-800/60 shadow-xl'
      : 'bg-white border-slate-200 shadow-[0_16px_40px_rgba(15,23,42,0.08)]',
    cardHeader: isDark
      ? 'border-gray-800/40 bg-[#161a29]/20'
      : 'border-slate-200 bg-slate-50/80',
    muted: isDark ? 'text-gray-400' : 'text-slate-500',
    subMuted: isDark ? 'text-gray-500' : 'text-slate-400',
    iconSurface: isDark
      ? 'bg-[#07090e] border-gray-800/40'
      : 'bg-slate-50 border-slate-200',
    buttonSurface: isDark
      ? 'bg-[#111420]/80 hover:bg-[#161a29]/80 border-gray-800/60'
      : 'bg-white hover:bg-slate-50 border-slate-200',
    divider: isDark ? 'divide-gray-800/40' : 'divide-slate-200',
    itemHover: isDark ? 'hover:bg-[#161a29]/10' : 'hover:bg-slate-50',
    bottomNav: isDark
      ? 'bg-[#111420]/90 border-gray-800/60'
      : 'bg-white/95 border-slate-200',
    navInactive: isDark ? 'text-gray-500' : 'text-slate-500',
    profileButton: isDark
      ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700'
      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50',
    scanFrame: isDark ? 'border-gray-700' : 'border-slate-300',
    scanIcon: isDark ? 'text-gray-600' : 'text-slate-400',
  };

  const openRouteFromTab = (id: TabId) => {
    if (id === 'profil') {
      router.push('/profile');
      return;
    }

    if (id === 'colis') {
      router.push('/parcels');
      return;
    }

    setCurrentTab(id);
  };

  return (
    <div className={`min-h-screen ${theme.page} flex flex-col pb-24 antialiased transition-colors duration-300`}>
      <div className={`p-4 flex justify-between items-center border-b sticky top-0 backdrop-blur-md z-10 transition-colors duration-300 ${theme.header}`}>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-[10px] font-black shadow-md">
            LA
          </div>
          <h1 className="text-sm font-bold tracking-tight">Tableau de bord</h1>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle className="h-8 w-8 rounded-lg" />
          <button
            type="button"
            onClick={() => router.push('/profile')}
            aria-label="Ouvrir le profil"
            className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs transition-transform hover:scale-105 ${theme.avatar}`}
          >
            <User className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => {
              authApi.logout();
              router.push('/login');
            }}
            className="inline-flex items-center gap-1.5 text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-lg font-bold hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="h-3 w-3" />
            Quitter
          </button>
        </div>
      </div>

      {currentTab === 'tableau' && (
        <div className="mx-auto w-full max-w-5xl flex-1 space-y-4 p-4 sm:p-6 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-4 lg:space-y-0">
          <button
            type="button"
            onClick={() => router.push('/expenses')}
            className={`w-full p-5 rounded-2xl border relative overflow-hidden text-left transition-colors duration-300 ${theme.card}`}
          >
            <div className="flex justify-between items-center">
              <p className={`text-[10px] font-bold uppercase tracking-wider ${theme.muted}`}>
                Budget voyage
              </p>
              <span className="bg-orange-500/10 text-orange-400 text-[9px] px-2.5 py-0.5 rounded-full font-bold border border-orange-500/20">
                65% &bull; Alertes actives
              </span>
            </div>
            <h2 className="text-2xl font-black mt-2 tracking-tight">
              {budgetActuel.toLocaleString('fr-FR')}{' '}
              <span className={`text-xs font-normal ${theme.subMuted}`}>
                / {budgetTotal.toLocaleString('fr-FR')} FCFA
              </span>
            </h2>
            <div className={`w-full h-2 rounded-full overflow-hidden mt-4 relative border ${isDark ? 'bg-gray-900 border-gray-800/30' : 'bg-slate-100 border-slate-200'}`}>
              <div
                className="bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 h-full rounded-full"
                style={{ width: `${pourcentageBudget}%` }}
              />
            </div>
          </button>

          <div className="grid grid-cols-2 gap-3 lg:col-start-2 lg:row-start-1">
            <button
              onClick={() => setCurrentTab('scanner')}
              className={`border rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-md group ${theme.buttonSurface}`}
            >
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center border text-blue-400 group-hover:scale-105 transition-transform ${theme.iconSurface}`}>
                <Camera className="h-5 w-5" />
              </span>
              <span className={`text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>Section photo</span>
            </button>

            <button
              onClick={() => router.push('/items')}
              className={`border rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-md group ${theme.buttonSurface}`}
            >
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center border text-purple-400 group-hover:scale-105 transition-transform ${theme.iconSurface}`}>
                <PencilLine className="h-5 w-5" />
              </span>
              <span className={`text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>Ajout manuel</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:col-start-2">
            <button
              onClick={() => router.push('/parcels')}
              className={`border rounded-2xl p-4 flex items-center gap-3 transition-all shadow-md ${theme.buttonSurface}`}
            >
              <span className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border text-blue-400 ${theme.iconSurface}`}>
                <Package className="h-5 w-5" />
              </span>
              <span className={`text-left text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>Voir les colis</span>
            </button>

            <button
              onClick={() => router.push('/expenses')}
              className={`border rounded-2xl p-4 flex items-center gap-3 transition-all shadow-md ${theme.buttonSurface}`}
            >
              <span className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border text-emerald-400 ${theme.iconSurface}`}>
                <CreditCard className="h-5 w-5" />
              </span>
              <span className={`text-left text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>Voir les depenses</span>
            </button>
          </div>

          <div className={`rounded-2xl border overflow-hidden transition-colors duration-300 lg:col-start-1 lg:row-start-2 lg:row-span-2 ${theme.card}`}>
            <div className={`p-3.5 border-b ${theme.cardHeader}`}>
              <h3 className={`text-xs font-bold uppercase tracking-wider ${theme.muted}`}>
                Suivi des colis
              </h3>
            </div>
            <div className={`divide-y ${theme.divider}`}>
              {colisListe.map((colis) => (
                <button
                  key={colis.id}
                  type="button"
                  onClick={() => router.push('/parcels')}
                  className={`w-full p-3.5 flex justify-between items-center text-left transition-colors ${theme.itemHover}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center border ${theme.iconSurface}`}>
                      <Package className="h-4 w-4 text-blue-300" />
                    </span>
                    <span className={`text-xs font-bold ${isDark ? 'text-gray-200' : 'text-slate-800'}`}>{colis.nom}</span>
                  </div>
                  <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${
                      colis.statut === 'Arrive'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}
                  >
                    {colis.statut}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentTab === 'scanner' && (
        <div className="flex flex-1 flex-col items-center justify-center p-4 text-center sm:p-6">
          <div className={`mb-6 flex aspect-square w-full max-w-72 items-center justify-center rounded-3xl border-2 border-dashed ${theme.scanFrame}`}>
            <Camera className={`h-14 w-14 ${theme.scanIcon}`} />
          </div>
          <h2 className="text-xl font-bold mb-2">Scanner un colis</h2>
          <p className={`${theme.muted} text-sm px-8`}>
            {"Placez le code-barres ou l'etiquette dans le cadre pour l'identifier automatiquement."}
          </p>
        </div>
      )}

      {currentTab === 'profil' && (
        <div className="p-4 flex-1 text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl">
            <User className="h-9 w-9" />
          </div>
          <h2 className="text-xl font-bold">Utilisateur Demo</h2>
          <p className={`${theme.muted} text-sm mb-6`}>demo@pla.local</p>
          <button
            onClick={() => router.push('/profile')}
            className={`w-full max-w-xs border py-3 rounded-xl text-sm font-bold transition-colors ${theme.profileButton}`}
          >
            Modifier le profil
          </button>
        </div>
      )}

      <div className={`fixed bottom-0 left-0 right-0 z-20 mx-auto flex max-w-md items-center justify-around rounded-t-2xl border-t p-2 shadow-xl backdrop-blur-lg transition-colors duration-300 sm:bottom-4 sm:rounded-2xl sm:border ${theme.bottomNav}`}>
        {tabs.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => openRouteFromTab(id)}
            className={`flex flex-col items-center gap-0.5 py-1 px-3.5 rounded-xl transition-all ${
              currentTab === id
                ? 'text-blue-400 bg-blue-500/5 font-bold border border-blue-500/10'
                : theme.navInactive
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
