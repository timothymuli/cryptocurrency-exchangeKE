const RATES = { BTC: 9000000, ETH: 350000, USDT: 129, KES: 1 };

function Account({ username, balances }) {
    function kesValue(sym, n) {
        if (sym === 'KES') return n;
        return n * RATES[sym];
    }

    const rows = [
        { sym: 'BTC', name: 'Bitcoin', n: balances.BTC, dec: 6 },
        { sym: 'ETH', name: 'Ethereum', n: balances.ETH, dec: 6 },
        { sym: 'USDT', name: 'USDT', n: balances.USDT, dec: 2 },
        { sym: 'KES', name: 'Kenyan Shilling', n: balances.KES, dec: 0 },
    ];

    let totalKes = 0;
    rows.forEach((r) => {
        totalKes += kesValue(r.sym, r.n);
    });

    return (
        <div className="max-w-3xl mx-auto px-3 py-4 app-bg">
            <div className="border border-[var(--border-line)] rounded-lg bg-[var(--bg-panel)] overflow-hidden">
                <div className="px-4 py-4 border-b border-[var(--border-line)]">
                    <h1 className="text-lg font-semibold">Wallet overview</h1>
                    <p className="text-xs text-[var(--text-dim)] mt-1">
                        User <span className="font-mono text-[var(--text-main)]">{username}</span>
                    </p>
                </div>
                <div className="px-4 py-4 bg-[var(--bg-deep)] border-b border-[var(--border-line)]">
                    <p className="text-xs text-[var(--text-dim)]">Rough total in KES (using the same fixed rates)</p>
                    <p className="text-2xl font-mono text-[var(--gold)] mt-1">
                        {totalKes.toLocaleString('en-KE', { maximumFractionDigits: 0 })}
                    </p>
                </div>
                <div className="divide-y divide-[var(--border-line)]">
                    {rows.map((r) => (
                        <div key={r.sym} className="px-4 py-3 flex items-center justify-between gap-4">
                            <div>
                                <div className="font-medium">{r.sym}</div>
                                <div className="text-xs text-[var(--text-dim)]">{r.name}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-mono text-sm">{r.n.toFixed(r.dec)}</div>
                                <div className="text-[11px] text-[var(--text-dim)] font-mono">
                                    ≈ {kesValue(r.sym, r.n).toLocaleString('en-KE', { maximumFractionDigits: 0 })} KES
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="px-4 py-3 text-[11px] text-[var(--text-dim)] border-t border-[var(--border-line)]">
                    Display only — not connected to real funds.
                </p>
            </div>
        </div>
    );
}

export default Account;
