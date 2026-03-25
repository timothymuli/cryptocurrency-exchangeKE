import { useState } from 'react';
import { apiFetch } from './api';

function Login({ onLogin }) {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [msg, setMsg] = useState('');
    const [busy, setBusy] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();
        setMsg('');
        setBusy(true);
        try {
            const data = await apiFetch('/api/login/', {
                method: 'POST',
                body: JSON.stringify({ username: user.trim(), password: pass }),
            });
            await onLogin({
                token: data.token,
                username: data.username,
                balances: data.balances,
            });
        } catch (err) {
            const d = err.payload && err.payload.detail;
            setMsg(typeof d === 'string' ? d : 'Could not sign in. Check backend is running.');
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="min-h-screen app-bg flex flex-col lg:flex-row">
            <div className="lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-16 border-b lg:border-b-0 lg:border-r border-[var(--border-line)]">
                <p className="font-mono text-[var(--gold)] text-sm mb-2">Jianni · Spot</p>
                <h1 className="text-3xl sm:text-4xl font-semibold text-[var(--text-main)] max-w-md leading-tight">
                    Trade crypto against Kenyan Shillings from one screen.
                </h1>
                <p className="mt-4 text-[var(--text-dim)] max-w-md text-sm leading-relaxed">
                    Order book, tape, and chart are laid out like a real spot terminal. Balances and fills are stored on
                    the Django API in this repo.
                </p>
                <ul className="mt-8 space-y-2 text-sm text-[var(--text-dim)]">
                    <li>- Run the Python server + React app together (see README).</li>
                    <li>- Rates are fixed in code for now.</li>
                </ul>
            </div>

            <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-sm border border-[var(--border-line)] rounded-lg bg-[var(--bg-panel)] p-8 shadow-[0_0_0_1px_rgba(252,213,53,0.06)]">
                    <h2 className="text-lg font-semibold mb-1">Sign in</h2>
                    <p className="text-xs text-[var(--text-dim)] mb-6">Accounts are created by the seed script in /backend</p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs text-[var(--text-dim)] mb-1">Username</label>
                            <input
                                value={user}
                                onChange={(e) => {
                                    setUser(e.target.value);
                                    setMsg('');
                                }}
                                autoComplete="username"
                                className="w-full px-3 py-2.5 rounded border border-[var(--border-line)] bg-[var(--bg-deep)] text-sm focus:outline-none focus:border-[var(--gold)]"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-[var(--text-dim)] mb-1">Password</label>
                            <input
                                type="password"
                                value={pass}
                                onChange={(e) => {
                                    setPass(e.target.value);
                                    setMsg('');
                                }}
                                autoComplete="current-password"
                                className="w-full px-3 py-2.5 rounded border border-[var(--border-line)] bg-[var(--bg-deep)] text-sm focus:outline-none focus:border-[var(--gold)]"
                            />
                        </div>
                        {msg && <p className="text-sm text-[var(--sell)]">{msg}</p>}
                        <button
                            type="submit"
                            disabled={busy}
                            className="w-full py-3 rounded font-semibold bg-[var(--gold)] text-[#0b0e11] hover:brightness-110 text-sm disabled:opacity-50"
                        >
                            {busy ? 'Signing in…' : 'Continue'}
                        </button>
                    </form>
                    <p className="mt-6 text-[11px] text-[var(--text-dim)] leading-relaxed">
                        Examples: <code className="font-mono text-[var(--text-main)]">muli</code> /{' '}
                        <code className="font-mono text-[var(--text-main)]">jianni</code>
                        {' · '}
                        <code className="font-mono text-[var(--text-main)]">masai</code> /{' '}
                        <code className="font-mono text-[var(--text-main)]">demo123</code>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
