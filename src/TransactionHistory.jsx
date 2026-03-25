function TransactionHistory({ transactions }) {
    if (transactions.length === 0) {
        return (
            <div className="max-w-3xl mx-auto px-3 py-8 app-bg">
                <div className="border border-[var(--border-line)] rounded-lg bg-[var(--bg-panel)] p-10 text-center">
                    <p className="text-[var(--text-dim)] text-sm">No order history yet.</p>
                    <p className="text-xs text-[var(--text-dim)] mt-2">Convert something on the Trade tab first.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-3 py-4 app-bg">
            <div className="border border-[var(--border-line)] rounded-lg bg-[var(--bg-panel)] overflow-hidden">
                <div className="px-4 py-3 border-b border-[var(--border-line)] flex justify-between items-center">
                    <h1 className="text-sm font-semibold">Order history</h1>
                    <span className="text-xs text-[var(--text-dim)]">{transactions.length} rows</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-[11px] text-[var(--text-dim)] border-b border-[var(--border-line)]">
                                <th className="px-4 py-2 font-normal">Time</th>
                                <th className="px-4 py-2 font-normal">Fill</th>
                                <th className="px-4 py-2 font-normal text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="font-mono text-xs">
                            {transactions.map((t, i) => (
                                <tr key={i} className="border-b border-[var(--border-line)] last:border-0">
                                    <td className="px-4 py-3 text-[var(--text-dim)] whitespace-nowrap">{t.time}</td>
                                    <td className="px-4 py-3 text-[var(--text-main)]">{t.ans}</td>
                                    <td className="px-4 py-3 text-right text-[var(--buy)]">Filled</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TransactionHistory;
