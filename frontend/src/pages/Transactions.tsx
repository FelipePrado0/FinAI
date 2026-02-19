import React, { useState } from 'react';

const Transactions = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas as Categorias');
    const [filterType, setFilterType] = useState('Todos'); // Todos, Receita, Despesa

    // Mock Data
    const transactions = [
        {
            id: 1,
            date: '24 Out, 2023',
            time: '10:42 AM',
            description: 'Spotify Premium',
            category: 'Assinatura',
            type: 'expense',
            amount: 21.90,
            isAuto: true
        },
        {
            id: 2,
            date: '23 Out, 2023',
            time: '04:15 PM',
            description: 'Projeto Freelance X',
            category: 'Renda',
            type: 'income',
            amount: 2500.00,
            isAuto: false
        },
        {
            id: 3,
            date: '22 Out, 2023',
            time: '08:30 PM',
            description: 'Viagem Uber',
            category: 'Transporte',
            type: 'expense',
            amount: 14.50,
            isAuto: true
        },
        {
            id: 4,
            date: '21 Out, 2023',
            time: '02:12 PM',
            description: 'Supermercado',
            category: 'Alimentação',
            type: 'expense',
            amount: 450.00,
            isAuto: true
        },
        {
            id: 5,
            date: '20 Out, 2023',
            time: '11:00 AM',
            description: 'Conta de Luz',
            category: 'Utilidades',
            type: 'expense',
            amount: 120.00,
            isAuto: false
        }
    ];

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Assinatura': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
            case 'Renda': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
            case 'Transporte': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
            case 'Alimentação': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
            default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Histórico de Transações</h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Visualize, edite e gerencie seus registros financeiros.</p>
                </div>
                <button className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-primary to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:to-indigo-500 hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark cursor-pointer">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    <span>Nova Transação</span>
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/50 lg:flex-row lg:items-center mb-8">
                <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400">search</span>
                    <input
                        type="text"
                        placeholder="Buscar por descrição..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-lg border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-primary outline-none transition-all"
                    />
                </div>
                <div className="flex flex-wrap gap-3">
                    <div className="relative">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="h-10 appearance-none rounded-lg border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 cursor-pointer"
                        >
                            <option>Todas as Categorias</option>
                            <option>Alimentação</option>
                            <option>Transporte</option>
                            <option>Utilidades</option>
                            <option>Entretenimento</option>
                            <option>Renda</option>
                            <option>Assinatura</option>
                        </select>
                        <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[20px] text-slate-400">expand_more</span>
                    </div>
                    <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
                        {['Todos', 'Receita', 'Despesa'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${filterType === type
                                        ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white font-semibold'
                                        : 'text-slate-500 hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white'
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
                <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    <span>Out 2023</span>
                </button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:bg-slate-950 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Data</th>
                                <th className="px-6 py-4">Descrição</th>
                                <th className="px-6 py-4">Categoria</th>
                                <th className="px-6 py-4 text-right">Valor (BRL)</th>
                                <th className="px-6 py-4 text-center w-20">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {transactions.map((transaction) => (
                                <tr key={transaction.id} className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="whitespace-nowrap px-6 py-4 text-slate-500 dark:text-slate-400">
                                        {transaction.date}
                                        <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{transaction.time}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-slate-900 dark:text-slate-100">{transaction.description}</span>
                                            {transaction.isAuto && (
                                                <div className="group/tooltip relative flex items-center justify-center cursor-help">
                                                    <span className="material-symbols-outlined text-[16px] text-primary" title="Categorizado automaticamente pela IA">auto_awesome</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(transaction.category)}`}>
                                            {transaction.category}
                                        </span>
                                    </td>
                                    <td className={`whitespace-nowrap px-6 py-4 text-right font-bold ${transaction.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'
                                        }`}>
                                        {transaction.type === 'income' ? '+ ' : '- '}
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.amount)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                            <button className="rounded p-1 text-slate-400 hover:bg-slate-200 hover:text-primary dark:text-slate-500 dark:hover:bg-slate-700 transition-colors cursor-pointer" title="Editar">
                                                <span className="material-symbols-outlined text-[18px]">edit</span>
                                            </button>
                                            <button className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600 dark:text-slate-500 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors cursor-pointer" title="Excluir">
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-3 dark:border-slate-800 dark:bg-slate-950">
                    <div className="hidden text-sm text-slate-500 dark:text-slate-400 sm:block">
                        Mostrando <span className="font-medium text-slate-900 dark:text-white">1</span> a <span className="font-medium text-slate-900 dark:text-white">5</span> de <span className="font-medium text-slate-900 dark:text-white">42</span> resultados
                    </div>
                    <div className="flex flex-1 justify-between sm:justify-end sm:gap-2">
                        <button disabled className="rounded border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                            Anterior
                        </button>
                        <button className="rounded border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                            Próximo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transactions;
