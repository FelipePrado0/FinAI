

const Header = () => {
    return (
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#151c2b]/80 px-8 backdrop-blur-md">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Bom dia, Alex</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Aqui está seu resumo financeiro de hoje.</p>
            </div>
            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary dark:border-slate-700 dark:bg-slate-900">
                    <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
                    <input
                        className="bg-transparent text-sm text-slate-700 focus:outline-none dark:text-slate-200 w-48 border-none p-0 focus:ring-0 placeholder:text-slate-400"
                        placeholder="Buscar transações..."
                        type="text"
                    />
                </div>
                <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-primary dark:text-slate-400 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#151c2b]"></span>
                </button>
                <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-700">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Alex Johnson</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Plano Pro</p>
                    </div>
                    <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white shadow-sm ring-1 ring-slate-200 dark:border-slate-700 dark:ring-slate-700">
                        <img
                            alt="User profile photo"
                            className="h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6IQ1DtxZdZQv_bFF9vUxOlP6GbsghPnxmScr2-RuRAl2stO8kxlmBHvn1JNTOFhdGPjwCHJAvTJBNdNq_4GisY3BZ7tS090b8OkGpOUGxSjeK1G4DOT6gLCZmUJ-Q_q737E55kLNaeYG6jvWCVqrK8Z27sizFcxEsvwl6C_4bezn7EPsw6f5rgq8HeDk4EMHjfV_CyUcqmNOFFHgZVi2yrq5d2lJJdRpOOlk5ej_TWfEEa_LR1jX0JcvxsI3tk7rT8SBAZMj5b7o"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
