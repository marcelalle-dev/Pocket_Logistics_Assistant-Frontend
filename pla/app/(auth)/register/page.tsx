'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logique d'inscription ici
    router.push('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#07101d] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-8">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-[0_40px_120px_rgba(15,23,42,0.35)] backdrop-blur-xl">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Rejoindre l'aventure</p>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white">Créer votre compte</h1>
            <p className="mt-2 text-sm text-slate-300">Commencez à gérer votre logistique intelligemment.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Nom complet ou Entreprise</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Ex: Jean Dupont"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Adresse email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                placeholder="nom@exemple.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Mot de passe</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                placeholder="••••••••••••"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Confirmer le mot de passe</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="mt-3 w-full rounded-3xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                placeholder="••••••••••••"
              />
            </div>

            <button className="w-full rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-white shadow-xl shadow-blue-500/25 transition hover:brightness-110" type="submit">
              S'inscrire maintenant
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-400">
            <span>Déjà un compte ? </span>
            <Link href="/auth" className="text-blue-400 hover:text-white transition font-bold">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
