
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="flex w-64 flex-col justify-between border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151c2b] px-4 py-6">
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-3 px-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                        <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">FinAl</h1>
                </div>
                <nav className="flex flex-col gap-2">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${isActive
                                ? "bg-primary/10 text-primary dark:text-blue-400"
                                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                            }`
                        }
                    >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                        <span className="text-sm font-medium">Dashboard</span>
                    </NavLink>
                    <NavLink
                        to="/transactions"
                        className={({ isActive }) =>
                            `group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${isActive
                                ? "bg-primary/10 text-primary dark:text-blue-400"
                                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                            }`
                        }
                    >
                        <span className="material-symbols-outlined">receipt_long</span>
                        <span className="text-sm font-medium">Transações</span>
                    </NavLink>
                    <NavLink
                        to="/chat"
                        className={({ isActive }) =>
                            `group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${isActive
                                ? "bg-primary/10 text-primary dark:text-blue-400"
                                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                            }`
                        }
                    >
                        <span className="material-symbols-outlined">psychology</span>
                        <span className="text-sm font-medium">IA Consultor</span>
                        <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">NOVO</span>
                    </NavLink>
                    <NavLink
                        to="/goals"
                        className={({ isActive }) =>
                            `group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${isActive
                                ? "bg-primary/10 text-primary dark:text-blue-400"
                                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                            }`
                        }
                    >
                        <span className="material-symbols-outlined">flag</span>
                        <span className="text-sm font-medium">Metas</span>
                    </NavLink>
                    <NavLink
                        to="/automations"
                        className={({ isActive }) =>
                            `group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${isActive
                                ? "bg-primary/10 text-primary dark:text-blue-400"
                                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                            }`
                        }
                    >
                        <span className="material-symbols-outlined">bolt</span>
                        <span className="text-sm font-medium">Automações</span>
                    </NavLink>
                    <NavLink
                        to="/subscription"
                        className={({ isActive }) =>
                            `group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${isActive
                                ? "bg-primary/10 text-primary dark:text-blue-400"
                                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                            }`
                        }
                    >
                        <span className="material-symbols-outlined">workspace_premium</span>
                        <span className="text-sm font-medium">Assinatura</span>
                    </NavLink>
                    <NavLink
                        to="/settings"
                        className={({ isActive }) =>
                            `group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${isActive
                                ? "bg-primary/10 text-primary dark:text-blue-400"
                                : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                            }`
                        }
                    >
                        <span className="material-symbols-outlined">settings</span>
                        <span className="text-sm font-medium">Configurações</span>
                    </NavLink>
                </nav>
            </div>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white p-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-red-600 dark:border-slate-700 dark:bg-transparent dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-red-400 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-lg">logout</span>
                Sair
            </button>
        </aside>
    );
};

export default Sidebar;
