function Header({ page, setPage, onLogout, username }) {
    return (
        <header className="border-b border-[var(--border-line)] bg-[var(--bg-panel)]">
            <div className="max-w-[1600px] mx-auto px-3 sm:px-4">
                <div className="flex h-14 items-center justify-between gap-3">
                    <div className="flex items-center gap-6 min-w-0">
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="font-mono text-sm font-semibold tracking-tight text-[var(--gold)]">
                                Jianni
                            </span>
                            <span className="hidden sm:inline text-xs text-[var(--text-dim)] border border-[var(--border-line)] rounded px-1.5 py-0.5">
                                Spot
                            </span>
                        </div>
                        <nav className="hidden sm:flex items-center gap-1 text-sm">
                            <button
                                type="button"
                                onClick={() => setPage('exchange')}
                                className={
                                    page === 'exchange'
                                        ? 'px-3 py-1.5 rounded text-[var(--gold)] bg-[var(--bg-raised)]'
                                        : 'px-3 py-1.5 rounded text-[var(--text-dim)] hover:text-[var(--text-main)]'
                                }
                            >
                                Trade
                            </button>
                            <button
                                type="button"
                                onClick={() => setPage('history')}
                                className={
                                    page === 'history'
                                        ? 'px-3 py-1.5 rounded text-[var(--gold)] bg-[var(--bg-raised)]'
                                        : 'px-3 py-1.5 rounded text-[var(--text-dim)] hover:text-[var(--text-main)]'
                                }
                            >
                                Orders
                            </button>
                            <button
                                type="button"
                                onClick={() => setPage('account')}
                                className={
                                    page === 'account'
                                        ? 'px-3 py-1.5 rounded text-[var(--gold)] bg-[var(--bg-raised)]'
                                        : 'px-3 py-1.5 rounded text-[var(--text-dim)] hover:text-[var(--text-main)]'
                                }
                            >
                                Wallet
                            </button>
                        </nav>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 text-sm">
                        <span className="hidden md:inline text-xs text-[var(--text-dim)]">WS</span>
                        <span className="w-2 h-2 rounded-full bg-[var(--buy)]" title="connected" />
                        <span className="font-mono text-xs text-[var(--text-dim)] truncate max-w-[100px] sm:max-w-none">
                            {username}
                        </span>
                        <button
                            type="button"
                            onClick={onLogout}
                            className="text-xs sm:text-sm text-[var(--sell)] hover:underline px-1"
                        >
                            Log out
                        </button>
                    </div>
                </div>
                <div className="sm:hidden flex gap-1 pb-2 text-xs">
                    <button
                        type="button"
                        onClick={() => setPage('exchange')}
                        className={page === 'exchange' ? 'flex-1 py-1.5 rounded bg-[var(--bg-raised)] text-[var(--gold)]' : 'flex-1 py-1.5 rounded text-[var(--text-dim)]'}
                    >
                        Trade
                    </button>
                    <button
                        type="button"
                        onClick={() => setPage('history')}
                        className={page === 'history' ? 'flex-1 py-1.5 rounded bg-[var(--bg-raised)] text-[var(--gold)]' : 'flex-1 py-1.5 rounded text-[var(--text-dim)]'}
                    >
                        Orders
                    </button>
                    <button
                        type="button"
                        onClick={() => setPage('account')}
                        className={page === 'account' ? 'flex-1 py-1.5 rounded bg-[var(--bg-raised)] text-[var(--gold)]' : 'flex-1 py-1.5 rounded text-[var(--text-dim)]'}
                    >
                        Wallet
                    </button>
                </div>
            </div>
            <div className="border-t border-[var(--border-line)] bg-[var(--bg-deep)] px-3 py-1 text-center text-[10px] text-[var(--text-dim)]">
                Sandbox — not a live market
            </div>
        </header>
    );
}

export default Header;
