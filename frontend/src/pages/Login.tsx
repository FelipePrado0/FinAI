
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('alex@finai.com');
    const [password, setPassword] = useState('demo123');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            // Mock simples de sucesso
            navigate('/dashboard');
        } else {
            setError('Por favor, preencha todos os campos.');
        }
    };

    const handleGoogleLogin = () => {
        // Mock de login social
        navigate('/dashboard');
    }

    return (
        <div className="font-display antialiased text-slate-900 bg-background-dark text-slate-100 h-full w-full overflow-y-auto">
            {/* Forçando bg-background-dark e text-slate-100 para simular o dark mode fixo do screenshot por enquanto, 
          ou podemos implementar um toggle real depois. O problema "preto e branco" ocorre quando o height não é 100% 
          e o body é branco enquanto a div é escura. Com h-full no body (feito no CSS) e aqui, deve resolver. 
          Também removi as classes condicionais 'dark:' para garantir consistência visual imediata conforme o design Stitch dark. */}

            <div className="relative flex min-h-full w-full flex-col justify-center items-center py-12 sm:px-6 lg:px-8 bg-background-dark">
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    <div aria-hidden="true" className="absolute left-[calc(50%-11rem)] top-[calc(50%-30rem)] transform-gpu blur-3xl sm:left-[calc(50%-30rem)]">
                        <div className="aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/20 to-primary/10 opacity-30 rotate-[30deg]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
                    </div>
                    <div aria-hidden="true" className="absolute right-[calc(50%-11rem)] top-[calc(50%+10rem)] transform-gpu blur-3xl sm:left-[calc(50%+30rem)]">
                        <div className="aspect-[1155/678] w-[36.125rem] translate-x-1/2 bg-gradient-to-tr from-primary/20 to-primary/10 opacity-30" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
                    </div>
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="flex justify-center mb-8">
                        <div className="flex flex-col items-center gap-2">
                            <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                            </div>
                            <h2 className="mt-4 text-center text-4xl font-black tracking-tight text-white">
                                Fin<span className="text-primary">Al</span>
                            </h2>
                            <p className="text-center text-sm font-medium text-slate-400">
                                Finanças inteligentes para pessoas inteligentes
                            </p>
                        </div>
                    </div>
                    <div className="bg-[#1e293b] py-10 px-6 shadow-xl shadow-slate-900/50 rounded-xl sm:px-12 border border-slate-800">
                        <div className="mb-8 text-center">
                            <h3 className="text-xl font-bold text-white">Bem-vindo ao FinAl</h3>
                            <p className="mt-2 text-sm text-slate-400">
                                Gerencie suas finanças de forma inteligente.
                            </p>
                        </div>
                        <div className="mt-6">
                            <div className="space-y-6">
                                <div>
                                    <button
                                        onClick={handleGoogleLogin}
                                        className="w-full flex justify-center items-center gap-3 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-200 shadow-sm hover:bg-slate-700 hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 cursor-pointer"
                                        type="button"
                                    >
                                        <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
                                            <path d="M12.0003 20.45c4.648 0 8.5522-3.1856 9.8708-7.5503h-9.8708v-3.7997h14.3725c.134.6896.208 1.407.208 2.1466 0 6.6275-5.3725 12-12 12-6.6275 0-12-5.3725-12-12s5.3725-12 12-12c3.0583 0 5.8453 1.1342 7.9622 3.0044l-3.3216 3.1973c-1.1213-1.0254-2.7303-1.6888-4.6406-1.6888-3.9576 0-7.166 3.2084-7.166 7.166s3.2084 7.166 7.166 7.166z" fill="currentColor"></path>
                                        </svg>
                                        <span>Entrar com Google</span>
                                    </button>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-slate-700"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-[#1e293b] px-2 text-slate-400">Ou continue com e-mail</span>
                                    </div>
                                </div>
                                <form className="space-y-4" onSubmit={handleLogin}>
                                    {error && (
                                        <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-400 text-center">
                                            {error}
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-slate-200" htmlFor="email">Endereço de e-mail</label>
                                        <div className="mt-2">
                                            <input
                                                autoComplete="email"
                                                className="block w-full rounded-lg border-0 py-2.5 text-white shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-slate-900"
                                                id="email"
                                                name="email"
                                                required
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium leading-6 text-slate-200" htmlFor="password">Senha</label>
                                        <div className="mt-2">
                                            <input
                                                autoComplete="current-password"
                                                className="block w-full rounded-lg border-0 py-2.5 text-white shadow-sm ring-1 ring-inset ring-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 bg-slate-900"
                                                id="password"
                                                name="password"
                                                required
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button className="flex w-full justify-center rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors duration-200 cursor-pointer" type="submit">
                                            Continuar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-slate-800">
                            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                                <span className="material-symbols-outlined text-sm" style={{ fontSize: "16px" }}>lock</span>
                                <p>Segurança e Privacidade</p>
                            </div>
                            <p className="mt-3 text-center text-xs text-slate-500">
                                Ao continuar, você concorda com nossos <a className="font-medium text-primary hover:text-blue-500 underline decoration-transparent hover:decoration-current transition-all" href="#">Termos de Uso</a> e <a className="font-medium text-primary hover:text-blue-500 underline decoration-transparent hover:decoration-current transition-all" href="#">Política de Privacidade</a>.
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-600">© 2026 FinAl Inc. Todos os direitos reservados.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

