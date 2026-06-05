'use client';

import { useState } from 'react';

export default function Home() {
  // 'login' pour la connexion, 'register' pour la création de compte
  const [mode, setMode] = useState('login');

  // États pour stocker les saisies de l'utilisateur
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="min-h-screen bg-[#0f121d] text-white flex flex-col items-center justify-center p-4">
      
      {/* Conteneur principal de la carte */}
      <div className="w-full max-w-md bg-[#161b26] rounded-2xl p-6 shadow-xl border border-gray-800">
        
        {/* En-tête */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-blue-500">Assistant Logistique</h1>
          <p className="text-xs text-gray-400 mt-1">Connectez vous pour accéder à vos données</p>
          <div className="inline-block bg-green-900/30 text-green-400 text-[11px] px-2 py-0.5 rounded-full mt-2 font-medium">
            ● Mode hors-ligne disponible
          </div>
        </div>

        {/* Onglets de navigation Interne */}
        <div className="flex bg-[#0f121d] p-1 rounded-lg mb-6 border border-gray-800">
          <button 
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === 'login' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
          >
            Se connecter
          </button>
          <button 
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${mode === 'register' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}
          >
            Créer un compte
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          
          {/* Champ Nom Complet (uniquement en mode inscription) */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Nom complet</label>
              <input 
                type="text" 
                placeholder="Ex: Jean Kouassi" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0f121d] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors text-white"
              />
            </div>
          )}

          {/* Champ Adresse Email (commun) */}
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Adresse email</label>
            <input 
              type="email" 
              placeholder="ex: contact@boutique.cl" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0f121d] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors text-white"
            />
          </div>

          {/* Champ Téléphone (uniquement en mode inscription) */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Téléphone</label>
              <input 
                type="tel" 
                placeholder="Ex: 225 01 23 45 67 89" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#0f121d] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors text-white"
              />
            </div>
          )}

          {/* Champ Mot de passe (commun) */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-gray-400">Mot de passe</label>
              {mode === 'login' && (
                <a href="#" className="text-[11px] text-blue-400 hover:underline">Mot de passe oublié ?</a>
              )}
            </div>
            <input 
              type="password" 
              placeholder={mode === 'register' ? "Min. 6 caractères" : "••••••••"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0f121d] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors text-white"
            />
          </div>

          {/* Bouton de Soumission Principal */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors mt-4 flex items-center justify-center gap-2"
          >
            {mode === 'login' ? '→ Se connecter' : 'Créer mon compte'}
          </button>
        </form>

      </div>
    </div>
  );
}