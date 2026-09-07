import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Palette, Wand2, Rocket, Bot, Sparkles, LogOut, BarChart3, LayoutDashboard } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('glowbby_token');
    navigate('/login');
  };

  const apps = [
    {
      title: '💬 Send Messages',
      desc: 'Gestionează comunicarea și mesajele automate.',
      href: 'https://chat.glowbby.online',
      icon: <MessageSquare className="w-8 h-8 text-blue-400" />,
      gradient: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:border-blue-500/50'
    },
    {
      title: '🎨 Creează Content',
      desc: 'Management media, editare și generare conținut.',
      href: 'https://media.glowbby.online',
      icon: <Palette className="w-8 h-8 text-purple-400" />,
      gradient: 'from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-500/50'
    },
    {
      title: '🖌️ Profile Designer',
      desc: 'Optimizează și personalizează profilul camerei.',
      href: 'https://profile.glowbby.online',
      icon: <Wand2 className="w-8 h-8 text-emerald-400" />,
      gradient: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 hover:border-emerald-500/50'
    },
    {
      title: '🚀 Get Traffic',
      desc: 'Unelte și strategii pentru creșterea vizibilității.',
      href: 'https://studio.glowbby.online',
      icon: <Rocket className="w-8 h-8 text-indigo-400" />,
      gradient: 'from-indigo-500/10 to-blue-500/10 border-indigo-500/20 hover:border-indigo-500/50'
    },
    {
      title: '🤖 GlowBot',
      desc: 'Dashboard AI, statistici live și automatizări smart.',
      href: 'https://app.glowbby.online',
      icon: <Bot className="w-8 h-8 text-fuchsia-400" />,
      gradient: 'from-fuchsia-500/10 to-violet-500/10 border-fuchsia-500/20 hover:border-fuchsia-500/50'
    },
    {
      title: '✨ I want to Glow',
      desc: 'Management modele, job-uri și obiective de studio.',
      href: 'https://jobs.glowbby.online',
      icon: <Sparkles className="w-8 h-8 text-amber-400" />,
      gradient: 'from-amber-500/10 to-orange-500/10 border-amber-500/20 hover:border-amber-500/50'
    }
  ];

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 font-sans">
      {/* --- BARA DE NAVIGARE DE SUS --- */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#090b10]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Partea Stângă: Link-uri Principale */}
            <div className="flex items-center gap-6">
              <span className="text-lg font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                ✨ Glowbby CRM
              </span>
              <div className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-400">
                <a href="https://app.glowbby.online" className="hover:text-white transition-colors flex items-center gap-1">
                  <BarChart3 className="w-4 h-4" /> Analiză Cross-Model
                </a>
                <a href="https://jobs.glowbby.online" className="hover:text-white transition-colors flex items-center gap-1">
                  <LayoutDashboard className="w-4 h-4" /> Overview Studio
                </a>
              </div>
            </div>

            {/* Partea Dreaptă: User & Logout */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-300">Bun venit, <span className="text-white font-semibold">Oana</span></span>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                Deconectare
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* --- CONȚINUTUL PRINCIPAL (CELE 6 LINKURI) --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Centrul de Comandă Glowbby</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Accesează toate uneltele studio-ului tău dintr-un singur loc. 
            Fiecare aplicație este optimizată pentru a-ți crește veniturile și eficiența.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, index) => (
            <a 
              key={index}
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col p-6 rounded-2xl border bg-gradient-to-br ${app.gradient} transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}
            >
              <div className="mb-4 p-3 bg-white/5 rounded-xl w-fit group-hover:bg-white/10 transition-colors">
                {app.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                {app.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {app.desc}
              </p>
              <div className="mt-auto pt-4 flex items-center text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                Deschide aplicația 
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
