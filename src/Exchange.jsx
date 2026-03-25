import { useState } from 'react';
import { apiFetch } from './api';

const RATES = {
    BTC: 9000000,
    ETH: 350000,
    USDT: 129,
    KES: 1,
};

const BOOK_ASKS = [
    { p: '9,000,450', q: '0.0421', sum: '38.1%' },
    { p: '9,000,380', q: '0.0310', sum: '27.9%' },
    { p: '9,000,290', q: '0.0288', sum: '19.4%' },
    { p: '9,000,120', q: '0.0194', sum: '12.1%' },
    { p: '9,000,050', q: '0.0112', sum: '6.2%' },
];

const BOOK_BIDS = [
    { p: '8,999,920', q: '0.0334', sum: '8.4%' },
    { p: '8,999,840', q: '0.0410', sum: '17.2%' },
    { p: '8,999,710', q: '0.0521', sum: '29.8%' },
    { p: '8,999,600', q: '0.0389', sum: '39.5%' },
    { p: '8,999,480', q: '0.0455', sum: '51.0%' },
];

const TAPE = [
    { t: '14:32:01', side: 'buy', px: '8,999,950', amt: '0.012' },
    { t: '14:31:58', side: 'sell', px: '9,000,110', amt: '0.008' },
    { t: '14:31:55', side: 'buy', px: '8,999,900', amt: '0.105' },
    { t: '14:31:51', side: 'buy', px: '8,999,880', amt: '0.022' },
    { t: '14:31:48', side: 'sell', px: '9,000,200', amt: '0.031' },
];

function PriceChart() {
    const pts = '0,80 40,55 80,62 120,35 160,45 200,28 240,38 280,22 320,30 360,18 400,25';
    return (
        <div className="bg-[var(--bg-deep)] border border-[var(--border-line)] rounded overflow-hidden shadow-inner">
            <div className="flex items-center justify-between px-3 py-2 border-b border-[var(--border-line)] text-xs text-[var(--text-dim)]">
                <div className="flex gap-2">
                    <button type="button" className="text-[var(--gold)] border-b border-[var(--gold)] pb-0.5">
                        1H
                    </button>
                    <span className="opacity-50">4H</span>
                    <span className="opacity-50">1D</span>
                </div>
                <span className="font-mono text-[var(--buy)]">+0.18%</span>
            </div>
            <svg viewBox="0 0 400 100" className="w-full h-[160px] block bg-[#0a0c0f]" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="fillG" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0ecb81" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#0ecb81" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <line x1="0" y1="25" x2="400" y2="25" stroke="#2b3139" strokeWidth="0.5" />
                <line x1="0" y1="50" x2="400" y2="50" stroke="#2b3139" strokeWidth="0.5" />
                <line x1="0" y1="75" x2="400" y2="75" stroke="#2b3139" strokeWidth="0.5" />
                <polyline fill="none" stroke="#0ecb81" strokeWidth="1.5" points={pts} />
                <polygon fill="url(#fillG)" points={`0,100 ${pts} 400,100`} />
            </svg>
        </div>
    );
}

function Exchange({ balances, setBalances, recentFills, onConverted }) {
    const [from, setFrom] = useState('BTC');
    const [to, setTo] = useState('KES');
    const [amount, setAmount] = useState('');
    const [out, setOut] = useState('');
    const [work, setWork] = useState(false);

    async function convertIt(e) {
        e.preventDefault();
        setOut('');
        if (amount === '' || isNaN(amount) || Number(amount) <= 0) {
            setOut('Enter a valid amount');
            return;
        }
        if (from === to) {
            setOut('Pick two different assets');
            return;
        }
        const amt = Number(amount);
        if (balances[from] < amt) {
            setOut(`Not enough ${from}. You have ${balances[from]}`);
            return;
        }
        setWork(true);
        try {
            const data = await apiFetch('/api/convert/', {
                method: 'POST',
                body: JSON.stringify({
                    from_asset: from,
                    to_asset: to,
                    amount: amount,
                }),
            });
            setBalances(data.balances);
            setOut(data.message);
            await onConverted();
        } catch (err) {
            const d = err.payload && err.payload.detail;
            setOut(typeof d === 'string' ? d : err.message || 'Request failed');
        } finally {
            setWork(false);
        }
    }

    function swapAssets() {
        setFrom(to);
        setTo(from);
        setAmount('');
        setOut('');
    }

    let estimatedOut = null;
    if (amount && !isNaN(amount) && Number(amount) > 0 && from !== to) {
        const amt = Number(amount);
        const kes = from === 'KES' ? amt : amt * RATES[from];
        estimatedOut = to === 'KES' ? kes : kes / RATES[to];
    }

    return (
        <div className="max-w-[1600px] mx-auto px-2 sm:px-4 py-3 app-bg">
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-[var(--border-line)] pb-3 mb-3">
                <div className="flex items-baseline gap-2">
                    <span className="text-lg font-semibold font-mono tracking-tight">BTC/KES</span>
                    <span className="font-mono text-xl text-[var(--buy)]">9,000,000.00</span>
                </div>
                <div className="text-xs text-[var(--text-dim)] flex flex-wrap gap-x-4 gap-y-1">
                    <span>
                        24h high <span className="font-mono text-[var(--text-main)]">9,124,000</span>
                    </span>
                    <span>
                        24h low <span className="font-mono text-[var(--text-main)]">8,891,200</span>
                    </span>
                    <span>
                        24h vol <span className="font-mono text-[var(--text-main)]">142.06 BTC</span>
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-3">
                <div className="xl:col-span-3 order-2 xl:order-1">
                    <div className="border border-[var(--border-line)] rounded bg-[var(--bg-panel)] text-xs">
                        <div className="px-2 py-2 border-b border-[var(--border-line)] text-[var(--text-dim)] flex justify-between">
                            <span>Order book</span>
                            <span className="font-mono">KES</span>
                        </div>
                        <div className="grid grid-cols-3 gap-0 px-2 py-1 text-[10px] text-[var(--text-dim)]">
                            <span>Price</span>
                            <span className="text-right">Amount</span>
                            <span className="text-right">Sum</span>
                        </div>
                        <div className="px-1 pb-1 space-y-0.5">
                            {BOOK_ASKS.map((row, i) => (
                                <div key={`a-${i}`} className="relative grid grid-cols-3 font-mono py-0.5 text-[11px]">
                                    <span
                                        className="absolute inset-y-0 right-0 bg-[var(--sell-bg)] rounded-sm"
                                        style={{ width: row.sum }}
                                    />
                                    <span className="relative z-[1] text-[var(--sell)]">{row.p}</span>
                                    <span className="relative z-[1] text-right text-[var(--text-main)]">{row.q}</span>
                                    <span className="relative z-[1] text-right text-[var(--text-dim)]">{row.sum}</span>
                                </div>
                            ))}
                        </div>
                        <div className="text-center text-[var(--gold)] font-mono py-1 border-y border-[var(--border-line)] text-sm">
                            9,000,000.00
                        </div>
                        <div className="px-1 pt-1 pb-2 space-y-0.5">
                            {BOOK_BIDS.map((row, i) => (
                                <div key={`b-${i}`} className="relative grid grid-cols-3 font-mono py-0.5 text-[11px]">
                                    <span
                                        className="absolute inset-y-0 right-0 bg-[var(--buy-bg)] rounded-sm"
                                        style={{ width: row.sum }}
                                    />
                                    <span className="relative z-[1] text-[var(--buy)]">{row.p}</span>
                                    <span className="relative z-[1] text-right text-[var(--text-main)]">{row.q}</span>
                                    <span className="relative z-[1] text-right text-[var(--text-dim)]">{row.sum}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-6 order-1 xl:order-2 space-y-3">
                    <PriceChart />
                    <div className="border border-[var(--border-line)] rounded bg-[var(--bg-panel)]">
                        <div className="px-3 py-2 border-b border-[var(--border-line)] text-sm flex justify-between items-center">
                            <span>Convert</span>
                            <span className="text-[10px] text-[var(--text-dim)]">sends to API</span>
                        </div>
                        <form onSubmit={convertIt} className="p-3 space-y-3">
                            <div className="rounded border border-[var(--border-line)] bg-[var(--bg-deep)] p-3">
                                <div className="flex justify-between text-xs text-[var(--text-dim)] mb-1">
                                    <span>From</span>
                                    <span>
                                        Avail{' '}
                                        <span className="font-mono text-[var(--text-main)]">{balances[from]}</span> {from}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="flex-1 min-w-0 bg-transparent text-lg font-mono focus:outline-none"
                                    />
                                    <select
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                        className="bg-[var(--bg-raised)] border border-[var(--border-line)] rounded px-2 py-1 text-sm font-mono"
                                    >
                                        <option value="BTC">BTC</option>
                                        <option value="ETH">ETH</option>
                                        <option value="USDT">USDT</option>
                                        <option value="KES">KES</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-center -my-1">
                                <button
                                    type="button"
                                    onClick={swapAssets}
                                    className="w-9 h-9 rounded border border-[var(--border-line)] bg-[var(--bg-raised)] text-[var(--text-dim)] hover:text-[var(--gold)] text-sm"
                                >
                                    ⇅
                                </button>
                            </div>

                            <div className="rounded border border-[var(--border-line)] bg-[var(--bg-deep)] p-3">
                                <div className="flex justify-between text-xs text-[var(--text-dim)] mb-1">
                                    <span>To</span>
                                    {estimatedOut != null && (
                                        <span className="font-mono text-[var(--text-main)]">
                                            ≈ {estimatedOut.toFixed(6)} {to}
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex-1 text-lg font-mono text-[var(--text-dim)] min-h-[28px]">
                                        {work ? '…' : estimatedOut != null ? estimatedOut.toFixed(6) : '—'}
                                    </div>
                                    <select
                                        value={to}
                                        onChange={(e) => setTo(e.target.value)}
                                        className="bg-[var(--bg-raised)] border border-[var(--border-line)] rounded px-2 py-1 text-sm font-mono"
                                    >
                                        <option value="BTC">BTC</option>
                                        <option value="ETH">ETH</option>
                                        <option value="USDT">USDT</option>
                                        <option value="KES">KES</option>
                                    </select>
                                </div>
                            </div>

                            {out && !work && (
                                <div className="text-xs font-mono text-[var(--buy)] border border-[var(--buy)]/30 bg-[var(--buy-bg)] rounded px-3 py-2">
                                    {out}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={work}
                                className="w-full py-3 rounded font-semibold bg-[var(--gold)] text-[#0b0e11] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            >
                                {work ? 'Converting…' : 'Convert'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="xl:col-span-3 order-3 space-y-3">
                    <div className="border border-[var(--border-line)] rounded bg-[var(--bg-panel)] text-xs">
                        <div className="px-2 py-2 border-b border-[var(--border-line)] text-[var(--text-dim)]">
                            Market trades
                        </div>
                        <div className="grid grid-cols-3 px-2 py-1 text-[10px] text-[var(--text-dim)]">
                            <span>Time</span>
                            <span className="text-right">Price</span>
                            <span className="text-right">Amount</span>
                        </div>
                        <ul className="max-h-[220px] overflow-y-auto font-mono text-[11px] px-1 pb-2">
                            {TAPE.map((row, i) => (
                                <li key={i} className="grid grid-cols-3 py-0.5">
                                    <span className="text-[var(--text-dim)]">{row.t}</span>
                                    <span
                                        className={`text-right ${
                                            row.side === 'buy' ? 'text-[var(--buy)]' : 'text-[var(--sell)]'
                                        }`}
                                    >
                                        {row.px}
                                    </span>
                                    <span className="text-right text-[var(--text-main)]">{row.amt}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border border-[var(--border-line)] rounded bg-[var(--bg-panel)] text-xs">
                        <div className="px-2 py-2 border-b border-[var(--border-line)] text-[var(--text-dim)]">
                            Your fills
                        </div>
                        <ul className="max-h-[200px] overflow-y-auto font-mono p-2 space-y-1 text-[11px]">
                            {recentFills.length === 0 ? (
                                <li className="text-[var(--text-dim)] py-4 text-center">No fills yet</li>
                            ) : (
                                recentFills.map((it, i) => (
                                    <li key={i} className="border-b border-[var(--border-line)] last:border-0 pb-1">
                                        <span className="text-[var(--text-dim)]">{it.time}</span>
                                        <div className="text-[var(--text-main)] mt-0.5">{it.ans}</div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Exchange;
