import React, { useState } from 'react';

const Subscription = () => {
    const [isAnnual, setIsAnnual] = useState(false);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 animate-fade-in">
            <section className="relative pb-12 pt-8 px-4 sm:px-6 lg:px-8 text-center bg-geometric-pattern">
                <div className="max-w-4xl mx-auto space-y-6">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                        Escolha o seu plano de <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">crescimento financeiro</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        Desbloqueie ferramentas essenciais para sua organização financeira. Evolua de acordo com suas necessidades.
                    </p>

                    {/* Toggle */}
                    <div className="mt-10 flex justify-center items-center gap-4">
                        <span className={`text-sm font-semibold transition-colors ${!isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>Mensal</span>
                        <label className="relative inline-flex items-center cursor-pointer group">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={isAnnual}
                                onChange={() => setIsAnnual(!isAnnual)}
                            />
                            <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/40 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                        <span className={`text-sm font-semibold flex items-center gap-2 transition-colors ${isAnnual ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
                            Anual
                            <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-bold text-green-700 dark:text-green-400 ring-1 ring-inset ring-green-600/20">
                                20% OFF
                            </span>
                        </span>
                    </div>
                </div>
            </section>

            <section className="pb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                    {/* Plano Semente */}
                    <div className="relative flex flex-col p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="mb-5">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Plano Semente</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Para os primeiros passos.</p>
                        </div>
                        <div className="mb-6 flex items-baseline gap-1">
                            <span className="text-xl font-bold text-slate-900 dark:text-white">R$</span>
                            <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">0,00</span>
                            <span className="text-slate-500 font-medium">{isAnnual ? "/ano" : "/mês"}</span>
                        </div>
                        <button className="w-full py-2.5 px-4 bg-transparent border-2 border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 font-semibold rounded-xl cursor-default mb-8">
                            Plano Atual
                        </button>
                        <div className="space-y-4 flex-1">
                            {[
                                "10 lançamentos/mês",
                                "2 perguntas para IA",
                                "IA Básica (Perguntas padrão)",
                                "Visualização Básica"
                            ].map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-slate-400 shrink-0 text-[20px]">check_circle</span>
                                    <span className="text-sm text-slate-600 dark:text-slate-300">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Plano Florescer */}
                    <div className="relative flex flex-col p-8 bg-white dark:bg-slate-800 rounded-2xl border-2 border-primary shadow-2xl shadow-primary/10 z-10 scale-105 transform hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            Recomendado
                        </div>
                        <div className="mb-5">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Plano Florescer</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Crescimento acelerado.</p>
                        </div>
                        <div className="mb-6 flex items-baseline gap-1">
                            <span className="text-xl font-bold text-slate-900 dark:text-white">R$</span>
                            <span className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                {isAnnual ? "200,00" : "19,90"}
                            </span>
                            <span className="text-slate-500 font-medium">{isAnnual ? "/ano" : "/mês"}</span>
                        </div>
                        <button className="w-full py-2.5 px-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors mb-8 shadow-md hover:shadow-lg cursor-pointer">
                            Assinar Agora
                        </button>
                        <div className="space-y-4 flex-1">
                            {[
                                "60 lançamentos/mês",
                                "5 Metas financeiras",
                                "50 perguntas para IA",
                                "IA Avançada (Contextual)"
                            ].map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-primary shrink-0 text-[20px]">check_circle</span>
                                    <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">{feature}</span>
                                </div>
                            ))}
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary shrink-0 text-[20px]">auto_awesome</span>
                                <span className="text-sm text-slate-600 dark:text-slate-300">IA Avançada (Contextual)</span>
                            </div>
                        </div>
                    </div>

                    {/* Plano Colheita */}
                    <div className="relative flex flex-col p-8 bg-slate-900 dark:bg-black rounded-2xl border border-slate-800 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-[50px] pointer-events-none"></div>
                        <div className="mb-5 relative z-10">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                Plano Colheita
                                <span className="material-symbols-outlined text-amber-500 text-lg">workspace_premium</span>
                            </h3>
                            <p className="text-sm text-slate-400 mt-1">Controle total e sem limites.</p>
                        </div>
                        <div className="mb-6 flex items-baseline gap-1 relative z-10">
                            <span className="text-xl font-bold text-white">R$</span>
                            <span className="text-4xl font-black text-white tracking-tight">
                                {isAnnual ? "400,00" : "39,90"}
                            </span>
                            <span className="text-slate-500 font-medium">{isAnnual ? "/ano" : "/mês"}</span>
                        </div>
                        <button className="relative z-10 w-full py-2.5 px-4 bg-gradient-to-r from-yellow-600 to-amber-500 text-white font-bold rounded-xl hover:from-yellow-500 hover:to-amber-400 transition-all mb-8 shadow-lg shadow-yellow-900/20 cursor-pointer">
                            Seja Premium
                        </button>
                        <div className="space-y-4 flex-1 relative z-10">
                            {[
                                "Lançamentos ilimitados",
                                "Perguntas para IA ilimitadas",
                                "Metas ilimitadas",
                                "Exportação PDF/CSV"
                            ].map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <span className="material-symbols-outlined text-amber-500 shrink-0 text-[20px]">check_circle</span>
                                    <span className="text-sm text-slate-300">{feature}</span>
                                </div>
                            ))}
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-amber-500 shrink-0 text-[20px]">auto_awesome</span>
                                <span className="text-sm text-slate-300">IA Premium + Insights</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Subscription;
