

const Dashboard = () => {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="grid gap-6 md:grid-cols-3">
                {/* Saldo Total */}
                <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-[#151c2b] dark:ring-slate-800 transition-all hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Saldo Total</p>
                            <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white tracking-tight">R$ 14.250,50</h3>
                        </div>
                        <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                            <span className="material-symbols-outlined">account_balance</span>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <span className="flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                            2,5%
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">vs mês anterior</span>
                    </div>
                </div>

                {/* Receitas */}
                <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-[#151c2b] dark:ring-slate-800 transition-all hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Receitas</p>
                            <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white tracking-tight">R$ 4.200,00</h3>
                        </div>
                        <div className="rounded-lg bg-blue-50 p-3 text-primary dark:bg-primary/10 dark:text-blue-400">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <span className="flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            <span className="material-symbols-outlined text-sm mr-1">trending_up</span>
                            1,2%
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">vs mês anterior</span>
                    </div>
                </div>

                {/* Despesas */}
                <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-[#151c2b] dark:ring-slate-800 transition-all hover:shadow-md">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Despesas</p>
                            <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white tracking-tight">R$ 1.150,00</h3>
                        </div>
                        <div className="rounded-lg bg-orange-50 p-3 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                            <span className="material-symbols-outlined">credit_card</span>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        <span className="flex items-center text-sm font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10 px-2 py-0.5 rounded-full">
                            <span className="material-symbols-outlined text-sm mr-1">trending_down</span>
                            0,8%
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">vs mês anterior</span>
                    </div>
                </div>
            </div>

            {/* Insight IA */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-blue-600 p-6 shadow-lg text-white">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
                <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                        <div className="rounded-lg bg-white/20 p-3 backdrop-blur-sm">
                            <span className="material-symbols-outlined text-2xl">auto_awesome</span>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold">Insight IA</h4>
                            <p className="mt-1 text-blue-100 max-w-2xl">Você gastou 15% a menos em restaurantes comparado à semana passada. Bom trabalho mantendo seu orçamento! Considere mover o excedente para sua poupança.</p>
                        </div>
                    </div>
                    <button className="shrink-0 whitespace-nowrap rounded-lg bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-blue-50 transition-colors cursor-pointer">
                        Ver Detalhes
                    </button>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Gastos por Categoria */}
                <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-[#151c2b] dark:ring-slate-800 lg:col-span-1">
                    <div className="mb-6 flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 dark:text-white">Gastos por Categoria</h3>
                        <button className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer">
                            <span className="material-symbols-outlined text-xl">more_horiz</span>
                        </button>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="relative h-48 w-48 rounded-full border-[24px] border-slate-100 dark:border-slate-800 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full" style={{ background: "conic-gradient(#2b6cee 0% 35%, #0ea5e9 35% 65%, #6366f1 65% 85%, #cbd5e1 85% 100%)", WebkitMask: "radial-gradient(transparent 56%, black 57%)", mask: "radial-gradient(transparent 56%, black 57%)" }}></div>
                            <div className="text-center z-10">
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Total</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white">R$ 1.150</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-primary"></div>
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Moradia</span>
                            </div>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">35%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-sky-500"></div>
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Alimentação</span>
                            </div>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">30%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Transporte</span>
                            </div>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">20%</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Outros</span>
                            </div>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">15%</span>
                        </div>
                    </div>
                </div>

                {/* Evolução Diária */}
                <div className="flex flex-col rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-[#151c2b] dark:ring-slate-800 lg:col-span-2">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">Evolução Diária</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Despesas diárias nos últimos 7 dias</p>
                        </div>
                        <select className="rounded-lg border-slate-200 bg-slate-50 py-1.5 px-3 text-sm font-medium text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 cursor-pointer">
                            <option>Últimos 7 Dias</option>
                            <option>Últimos 30 Dias</option>
                            <option>Este Ano</option>
                        </select>
                    </div>
                    <div className="flex-1 flex items-end justify-between gap-4 pt-4 pb-2 px-2 h-64 border-b border-slate-100 dark:border-slate-700/50">
                        {/* Barras do Gráfico (Mock) */}
                        <div className="group relative flex h-full w-full flex-col justify-end gap-2">
                            <div className="relative w-full rounded-t-lg bg-primary/20 dark:bg-primary/10 transition-all hover:bg-primary/40" style={{ height: "45%" }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">R$ 120</div>
                            </div>
                            <span className="text-center text-xs font-medium text-slate-500 dark:text-slate-400">Seg</span>
                        </div>
                        <div className="group relative flex h-full w-full flex-col justify-end gap-2">
                            <div className="relative w-full rounded-t-lg bg-primary/20 dark:bg-primary/10 transition-all hover:bg-primary/40" style={{ height: "65%" }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">R$ 180</div>
                            </div>
                            <span className="text-center text-xs font-medium text-slate-500 dark:text-slate-400">Ter</span>
                        </div>
                        <div className="group relative flex h-full w-full flex-col justify-end gap-2">
                            <div className="relative w-full rounded-t-lg bg-primary/20 dark:bg-primary/10 transition-all hover:bg-primary/40" style={{ height: "30%" }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">R$ 85</div>
                            </div>
                            <span className="text-center text-xs font-medium text-slate-500 dark:text-slate-400">Qua</span>
                        </div>
                        <div className="group relative flex h-full w-full flex-col justify-end gap-2">
                            <div className="relative w-full rounded-t-lg bg-primary/20 dark:bg-primary/10 transition-all hover:bg-primary/40" style={{ height: "85%" }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">R$ 240</div>
                            </div>
                            <span className="text-center text-xs font-medium text-slate-500 dark:text-slate-400">Qui</span>
                        </div>
                        <div className="group relative flex h-full w-full flex-col justify-end gap-2">
                            <div className="relative w-full rounded-t-lg bg-primary transition-all shadow-[0_0_15px_rgba(43,108,238,0.3)]" style={{ height: "55%" }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-100">R$ 150</div>
                            </div>
                            <span className="text-center text-xs font-bold text-primary">Sex</span>
                        </div>
                        <div className="group relative flex h-full w-full flex-col justify-end gap-2">
                            <div className="relative w-full rounded-t-lg bg-primary/20 dark:bg-primary/10 transition-all hover:bg-primary/40" style={{ height: "75%" }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">R$ 210</div>
                            </div>
                            <span className="text-center text-xs font-medium text-slate-500 dark:text-slate-400">Sáb</span>
                        </div>
                        <div className="group relative flex h-full w-full flex-col justify-end gap-2">
                            <div className="relative w-full rounded-t-lg bg-primary/20 dark:bg-primary/10 transition-all hover:bg-primary/40" style={{ height: "40%" }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">R$ 110</div>
                            </div>
                            <span className="text-center text-xs font-medium text-slate-500 dark:text-slate-400">Dom</span>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-primary"></div>
                                <span className="text-slate-500 dark:text-slate-400">Período Atual</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                                <span className="text-slate-400 dark:text-slate-500">Média</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-slate-400 text-xs">Total esta semana: </span>
                            <span className="font-bold text-slate-900 dark:text-white">R$ 1.095,00</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transações Recentes */}
            <div className="rounded-xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-[#151c2b] dark:ring-slate-800">
                <div className="border-b border-slate-100 dark:border-slate-800 p-6 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900 dark:text-white">Transações Recentes</h3>
                    <a className="text-sm font-medium text-primary hover:text-blue-700 dark:text-blue-400" href="#">Ver Tudo</a>
                </div>
                <div className="p-2">
                    <div className="flex items-center justify-between rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                <span className="material-symbols-outlined">shopping_cart</span>
                            </div>
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">Supermercado Silva</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Compras • Hoje às 16:30</p>
                            </div>
                        </div>
                        <p className="font-bold text-slate-900 dark:text-white">-R$ 124,50</p>
                    </div>
                    <div className="flex items-center justify-between rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                <span className="material-symbols-outlined">directions_car</span>
                            </div>
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">Uber Viagem</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Transporte • Ontem</p>
                            </div>
                        </div>
                        <p className="font-bold text-slate-900 dark:text-white">-R$ 24,00</p>
                    </div>
                    <div className="flex items-center justify-between rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                <span className="material-symbols-outlined">attach_money</span>
                            </div>
                            <div>
                                <p className="font-medium text-slate-900 dark:text-white">Pagamento Freelance</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Receita • Ontem</p>
                            </div>
                        </div>
                        <p className="font-bold text-emerald-600 dark:text-emerald-400">+R$ 850,00</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
