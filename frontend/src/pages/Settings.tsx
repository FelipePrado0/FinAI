import React, { useState } from 'react';

const Settings = () => {
    // Estado para campos de formulário (apenas visual por enquanto)
    const [salary, setSalary] = useState('');
    const [payDay, setPayDay] = useState('');
    const [currency, setCurrency] = useState('BRL');
    const [theme, setTheme] = useState('dark');

    return (
        <div className="w-full max-w-[1200px] mx-auto p-4 md:p-8">
            <div className="mb-10">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1">
                        <span>Configurações</span>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        <span className="text-slate-900 dark:text-slate-100 font-medium">Exportação e Dados</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Configurações e Exportação</h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg">Gerencie suas preferências de conta e exporte seus dados financeiros para análise externa.</p>
                </div>
            </div>

            <section className="mb-12">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">cloud_download</span>
                    Exportação de Dados
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card PDF */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="h-32 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 relative">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#2b6cee 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                            <div className="absolute bottom-4 left-6 p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
                                <span className="material-symbols-outlined text-red-500 text-3xl">picture_as_pdf</span>
                            </div>
                        </div>
                        <div className="p-6 pt-4">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Exportar como PDF</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Gere um relatório formatado adequado para impressão.</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="block">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">Selecione o Período</span>
                                    <div className="relative">
                                        <select className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                                            <option>Mês Atual (Outubro)</option>
                                            <option>Últimos 3 Meses</option>
                                            <option>Ano Até a Data</option>
                                            <option>Ano Passado</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                            <span className="material-symbols-outlined">expand_more</span>
                                        </div>
                                    </div>
                                </label>
                                <button className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold py-3 px-4 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-700 cursor-pointer">
                                    <span className="material-symbols-outlined text-[20px]">download</span>
                                    Exportar como PDF
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Card CSV */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="h-32 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-slate-700 dark:to-slate-800 relative">
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #10b981 25%, transparent 25%, transparent 50%, #10b981 50%, #10b981 75%, transparent 75%, transparent)', backgroundSize: '20px 20px' }}></div>
                            <div className="absolute bottom-4 left-6 p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
                                <span className="material-symbols-outlined text-emerald-600 text-3xl">table_view</span>
                            </div>
                        </div>
                        <div className="p-6 pt-4">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Exportar como CSV</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Exportação de dados brutos para análise em planilhas.</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="block">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 block">Selecione o Período</span>
                                    <div className="relative">
                                        <select className="w-full appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                                            <option>Mês Atual (Outubro)</option>
                                            <option>Últimos 3 Meses</option>
                                            <option>Todo o Período</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                            <span className="material-symbols-outlined">expand_more</span>
                                        </div>
                                    </div>
                                </label>
                                <button className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white font-semibold py-3 px-4 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:ring-4 focus:ring-slate-100 dark:focus:ring-slate-700 cursor-pointer">
                                    <span className="material-symbols-outlined text-[20px]">download</span>
                                    Exportar como CSV
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                    Configurações de Renda
                </h2>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Salário/Renda Mensal
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-slate-500 sm:text-sm">R$</span>
                                </div>
                                <input
                                    type="text"
                                    name="salary"
                                    id="salary"
                                    className="block w-full rounded-md border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 py-3 pl-10 pr-12 text-slate-900 dark:text-white focus:border-primary focus:ring-primary sm:text-sm"
                                    placeholder="0,00"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                />
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="text-slate-500 sm:text-sm">BRL</span>
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Insira sua renda mensal líquida.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Dia do Recebimento
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full appearance-none bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-md py-3 pl-3 pr-10 sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    value={payDay}
                                    onChange={(e) => setPayDay(e.target.value)}
                                >
                                    <option value="" disabled>Selecione um dia</option>
                                    {[...Array(31)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                    <span className="material-symbols-outlined text-[18px]">expand_more</span>
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Dia em que sua renda é creditada.</p>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button className="bg-primary hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors shadow-sm cursor-pointer">
                            Salvar Alterações
                        </button>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">manage_accounts</span>
                    Conta e Preferências
                </h2>
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">

                    {/* Perfil */}
                    <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="size-16 rounded-full bg-cover bg-center ring-4 ring-slate-50 dark:ring-slate-700 bg-slate-200 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-3xl text-slate-400">person</span>
                                </div>
                                <div className="absolute bottom-0 right-0 p-1 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-600">
                                    <div className="size-4 bg-red-500 rounded-full"></div> {/* Mock Google Logo */}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Alex Johnson</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">alex@finai.com</p>
                            </div>
                        </div>
                        <button className="text-sm font-semibold text-primary hover:text-blue-700 dark:hover:text-blue-400 transition-colors flex items-center gap-1 group cursor-pointer">
                            Gerenciar Conta Google
                            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">open_in_new</span>
                        </button>
                    </div>

                    {/* Tema */}
                    <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-indigo-50 dark:bg-slate-700 rounded-lg text-primary dark:text-indigo-300">
                                <span className="material-symbols-outlined">dark_mode</span>
                            </div>
                            <div>
                                <h4 class="font-semibold text-slate-900 dark:text-white">Aparência</h4>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Personalize a aparência do FinAl.</p>
                            </div>
                        </div>
                        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
                            <button
                                onClick={() => setTheme('light')}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${theme === 'light' ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-300'}`}
                            >
                                <span className="material-symbols-outlined text-[18px]">light_mode</span>
                                Claro
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${theme === 'dark' ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-300'}`}
                            >
                                <span className="material-symbols-outlined text-[18px]">dark_mode</span>
                                Escuro
                            </button>
                            <button
                                onClick={() => setTheme('system')}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${theme === 'system' ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-300'}`}
                            >
                                <span className="material-symbols-outlined text-[18px]">settings_brightness</span>
                                Sistema
                            </button>
                        </div>
                    </div>

                    {/* Moeda */}
                    <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-50 dark:bg-slate-700 rounded-lg text-green-600 dark:text-green-300">
                                <span className="material-symbols-outlined">attach_money</span>
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white">Moeda e Formato</h4>
                                <p className="text-slate-500 dark:text-slate-400 text-sm">Defina sua moeda de exibição preferida.</p>
                            </div>
                        </div>
                        <div className="relative w-full sm:w-48">
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="w-full appearance-none bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                <option value="BRL">BRL (R$)</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                                <span className="material-symbols-outlined text-[18px]">expand_more</span>
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="p-6 bg-red-50/50 dark:bg-red-900/10 rounded-b-xl">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                                    <span className="material-symbols-outlined">delete_forever</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-red-700 dark:text-red-400">Zona de Perigo</h4>
                                    <p className="text-red-600/70 dark:text-red-400/70 text-sm">Exclua permanentemente seus dados e conta.</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800 transition-colors cursor-pointer">
                                Excluir Conta
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Settings;
