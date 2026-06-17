'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AuthPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'connecter' | 'compte'>('connecter');
  const [email, setEmail] = useState('demo@pla.local');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0c14] via-[#0f121d] to-[#07090e] text-white flex flex-col items-center justify-center p-4 antialiased selection:bg-purple-500/30">
      
      {/* Effet lumineux d'arrière-plan */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* En-tête avec Logo */}
      <div className="text-center mb-6 z-10">
        <div className="relative w-16 h-16 mx-auto mb-3 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-purple-600/20 to-blue-500/20 blur-md animate-pulse"></div>
          <div className="absolute inset-0 rounded-2xl border border-gray-800/80 bg-[#121622]/60 backdrop-blur-md shadow-xl"></div>
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute w-1.5 h-6 bg-gradient-to-t from-purple-600 to-indigo-400 rounded-sm transform -rotate-[30deg] translate-x-[-3px] shadow-md"></div>
            <div className="absolute w-1.5 h-6 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-sm transform rotate-[30deg] translate-x-[3px] shadow-md"></div>
            <div className="absolute h-1 w-3.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-sm top-[55%]"></div>
          </div>
        </div>

        <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          Assistant Logistique
        </h1>
        <p className="text-[11px] text-gray-400 mt-1 font-medium tracking-wide">Gestion logistique intelligente</p>
      </div>

      {/* Boîte de connexion style "Verre Fumé" */}
      <div className="w-full max-w-sm bg-[#161b26]/60 backdrop-blur-xl rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-gray-800/60 z-10">
        <div className="flex bg-[#0f121d]/80 p-1 rounded-xl mb-5 border border-gray-800/80">
          {['connecter', 'compte'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab as 'connecter' | 'compte')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-200 ${
                activeTab === tab ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'connecter' ? 'Se connecter' : 'Créer un compte'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 pl-1">Adresse email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-[#0f121d]/70 border border-gray-800 focus:border-blue-500/80 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none text-white transition-all focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 pl-1">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mot de passe</label>
              <Link href="#" className="text-[10px] text-blue-400 hover:underline font-medium">Oublié ?</Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full bg-[#0f121d]/70 border border-gray-800 focus:border-blue-500/80 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none text-white transition-all focus:ring-2 focus:ring-blue-500/10"
            />
          </div>

          <button
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs shadow-lg shadow-blue-900/20 transition-all transform active:scale-[0.99] mt-2"
            type="submit"
          >
            {activeTab === 'connecter' ? 'Se connecter' : 'Créer un compte'} &rarr;
          </button>
        </form>

        <div className="relative flex py-4 items-center justify-center">
          <div className="flex-grow border-t border-gray-800/60"></div>
          <span className="flex-shrink mx-3 text-gray-500 text-[10px] font-bold tracking-widest">OU</span>
          <div className="flex-grow border-t border-gray-800/60"></div>
        </div>

        <button
          type="button"
          onClick={() => router.push('/')}
          className="w-full bg-purple-950/10 text-purple-300 py-2.5 rounded-xl text-xs font-semibold border border-purple-500/20 hover:bg-purple-950/30 transition-all"
        >
          Utiliser le compte démo
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
