

const PlaceholderPage = ({ title }: { title: string }) => {
    return (
        <div className="flex h-full flex-col items-center justify-center p-8 text-center animate-fade-in">
            <div className="rounded-full bg-primary/10 p-6 text-primary mb-4">
                <span className="material-symbols-outlined text-4xl">construction</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
            <p className="text-slate-400 max-w-md">
                Esta funcionalidade ainda está em desenvolvimento. Em breve você poderá acessá-la!
            </p>
        </div>
    );
};

export default PlaceholderPage;
