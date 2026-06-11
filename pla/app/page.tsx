'use client';

import { useState } from 'react';

interface Colis {
  id: number;
  nom: string;
  statut: 'En transit' | 'Arrivé' | 'Transit';
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<'tableau' | 'scanner' | 'colis' | 'profil'>('tableau');
  const [activeAuthTab, setActiveAuthTab] = useState<'connecter' | 'compte'>('connecter');
  const [email, setEmail] = useState<string>('denalaglassa35@gmail.com');
  const [password, setPassword] = useState<string>('••••••••••••');

  const budgetActuel = 3240000;
  const budgetTotal = 5000000;
  const pourcentageBudget = Math.min((budgetActuel / budgetTotal) * 100, 100);

  const colisListe: Colis[] = [
    { id: 1, nom: 'Valise A', statut: 'En transit' },
    { id: 2, nom: 'Carton B', statut: 'Arrivé' },
    { id: 3, nom: 'Transit', statut: 'Transit' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  // ==========================================
  // 1. ÉCRAN DE CONNEXION (GLASSMORPHISM PREMIUM)
  // ==========================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0c14] via-[#0f121d] to-[#07090e] text-white flex flex-col items-center justify-center p-4 antialiased selection:bg-purple-500/30">
        
        {/* Effet lumineux d'arrière-plan */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* En-tête avec Logo épuré et compact */}
        <div className="text-center mb-6 z-10">
          <div className="relative w-16 h-16 mx-auto mb-3 flex items-center justify-center">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-600/20 to-blue-500/20 blur-md animate-pulse"></div>
            <div className="absolute inset-0 rounded-2xl border border-gray-800/80 bg-[#121622]/60 backdrop-blur-md shadow-xl"></div>
            
            {/* Icône Géométrique Minimaliste */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute w-1.5 h-6 bg-gradient-to-t from-purple-600 to-indigo-400 rounded-sm transform -rotate-[30deg] translate-x-[-3px] shadow-md"></div>
              <div className="absolute w-1.5 h-6 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-sm transform rotate-[30deg] translate-x-[3px] shadow-md"></div>
              <div className="absolute h-1 w-3.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-sm top-[55%]"></div>
            </div>
          </div>

          <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Assistant Logistique
          </h1>
          <p className="text-[11px] text-gray-400 mt-1 font-medium tracking-wide">Gestion logistique intelligente et budgétaire</p>
          
          <div className="mt-3 inline-flex items-center bg-[#111827]/60 text-emerald-400 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/20 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 shadow-[0_0_6px_#34d399]"></span>
            Mode hors-ligne disponible
          </div>
        </div>

        {/* Boîte de connexion style "Verre Fumé" */}
        <div className="w-full max-w-sm bg-[#161b26]/60 backdrop-blur-xl rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-gray-800/60 z-10">
          <div className="flex bg-[#0f121d]/80 p-1 rounded-xl mb-5 border border-gray-800/80">
            <button 
              type="button"
              onClick={() => setActiveAuthTab('connecter')} 
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${activeAuthTab === 'connecter' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              Se connecter
            </button>
            <button 
              type="button"
              onClick={() => setActiveAuthTab('compte')} 
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${activeAuthTab === 'compte' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
            >
              Créer un compte
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 pl-1">Adresse email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full bg-[#0f121d]/70 border border-gray-800 focus:border-blue-500/80 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none text-white transition-all focus:ring-2 focus:ring-blue-500/10" 
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1.5 pl-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mot de passe</label>
                <a href="#" className="text-[10px] text-blue-400 hover:underline font-medium">Oublié ?</a>
              </div>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full bg-[#0f121d]/70 border border-gray-800 focus:border-blue-500/80 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none text-white transition-all focus:ring-2 focus:ring-blue-500/10" 
              />
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs shadow-lg shadow-blue-900/20 transition-all transform active:scale-[0.99] mt-2">
              Se connecter &rarr;
            </button>
          </form>

          <div className="relative flex py-4 items-center justify-center">
            <div className="flex-grow border-t border-gray-800/60"></div>
            <span className="flex-shrink mx-3 text-gray-500 text-[10px] font-bold tracking-widest">OU</span>
            <div className="flex-grow border-t border-gray-800/60"></div>
          </div>

          <button 
            type="button" 
            onClick={() => setIsLoggedIn(true)} 
            className="w-full bg-purple-950/10 text-purple-300 py-2.5 rounded-xl text-xs font-semibold border border-purple-500/20 hover:bg-purple-950/30 transition-all"
          >
            Utiliser le compte démo
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. ÉCRAN INTERNE (TABLEAU DE BORD OPTIMISÉ)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#07090e] text-white flex flex-col pb-24 antialiased">
      {/* Navbar Haute */}
      <div className="p-4 flex justify-between items-center bg-[#111420]/70 border-b border-gray-800/40 sticky top-0 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-[10px] font-black shadow-md">LA</div>
          <h1 className="text-sm font-bold tracking-tight">Tableau de Bord</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-gray-800 border border-gray-700/50 flex items-center justify-center text-xs">👤</div>
          <button onClick={() => setIsLoggedIn(false)} className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-lg font-bold hover:bg-red-500/20 transition-colors">
            Quitter
          </button>
        </div>
      </div>

      {/* Contenu Dashboard */}
      <div className="p-4 space-y-4 max-w-md mx-auto w-full flex-1">
        
        {/* CARTE BUDGET */}
        <div className="bg-[#111420]/80 p-5 rounded-2xl border border-gray-800/60 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Budget Voyage</p>
            <span className="bg-orange-500/10 text-orange-400 text-[9px] px-2.5 py-0.5 rounded-full font-bold border border-orange-500/20">
              65% &bull; Alertes actives
            </span>
          </div>
          <h2 className="text-2xl font-black mt-2 tracking-tight">
            {budgetActuel.toLocaleString()} <span className="text-xs text-gray-500 font-normal">/ {budgetTotal.toLocaleString()} FCFA</span>
          </h2>
          
          <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden mt-4 relative border border-gray-800/30">
            <div className="bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 h-full rounded-full" style={{ width: `${pourcentageBudget}%` }}></div>
          </div>
        </div>

        {/* GRILLE D'ACTIONS */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-[#111420]/80 hover:bg-[#161a29]/80 border border-gray-800/60 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-md group">
            <span className="text-xl bg-[#07090e] w-10 h-10 rounded-xl flex items-center justify-center border border-gray-800/40 text-blue-400 group-hover:scale-105 transition-transform">📷</span>
            <span className="text-xs font-semibold text-gray-300">Section Photo</span>
          </button>
          <button className="bg-[#111420]/80 hover:bg-[#161a29]/80 border border-gray-800/60 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-all shadow-md group">
            <span className="text-xl bg-[#07090e] w-10 h-10 rounded-xl flex items-center justify-center border border-gray-800/40 text-purple-400 group-hover:scale-105 transition-transform">✍️</span>
            <span className="text-xs font-semibold text-gray-300">Ajout Manuel</span>
          </button>
        </div>

        {/* SECTION COLIS */}
        <div className="bg-[#111420]/80 rounded-2xl border border-gray-800/60 shadow-xl overflow-hidden">
          <div className="p-3.5 border-b border-gray-800/40 bg-[#161a29]/20">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Suivi des Colis</h3>
          </div>
          <div className="divide-y divide-gray-800/40">
            {colisListe.map((colis) => (
              <div key={colis.id} className="p-3.5 flex justify-between items-center hover:bg-[#161a29]/10 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-base bg-[#07090e] w-8 h-8 rounded-lg flex items-center justify-center border border-gray-800/30">📦</span>
                  <span className="text-xs font-bold text-gray-200">{colis.nom}</span>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${
                  colis.statut === 'Arrivé' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                }`}>
                  {colis.statut}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BARRE DE NAV MOBILE FIXE */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#111420]/90 backdrop-blur-lg border-t border-gray-800/60 p-2 flex justify-around items-center z-20 max-w-md mx-auto rounded-t-2xl shadow-xl">
        {[
          { id: 'tableau', label: 'Tableau', icon: '📊' },
          { id: 'scanner', label: 'Scanner', icon: '🔍' },
          { id: 'colis', label: 'Colis', icon: '📦' },
          { id: 'profil', label: 'Profil', icon: '👤' },
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => setCurrentTab(item.id as any)} 
            className={`flex flex-col items-center gap-0.5 py-1 px-3.5 rounded-xl transition-all ${
              currentTab === item.id ? 'text-blue-400 bg-blue-500/5 font-bold border border-blue-500/10' : 'text-gray-500'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span className="text-[9px]">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}