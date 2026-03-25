import { useState, useEffect, useCallback } from 'react';
import Login from './Login';
import Header from './Header';
import Exchange from './Exchange';
import Faq from './Faqs';
import TransactionHistory from './TransactionHistory';
import Account from './Account';
import { getToken, setToken, apiFetch } from './api';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [page, setPage] = useState('exchange');
    const [balances, setBalances] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [booting, setBooting] = useState(true);

    const loadTrades = useCallback(async () => {
        try {
            const rows = await apiFetch('/api/trades/');
            setTransactions(rows);
        } catch (e) {
            setTransactions([]);
        }
    }, []);

    useEffect(() => {
        let cancelled = false;

        async function boot() {
            const t = getToken();
            if (!t) {
                setBooting(false);
                return;
            }
            try {
                const me = await apiFetch('/api/me/');
                if (cancelled) return;
                setUsername(me.username);
                setBalances(me.balances);
                setLoggedIn(true);
                const rows = await apiFetch('/api/trades/');
                if (!cancelled) setTransactions(rows);
            } catch (e) {
                setToken(null);
                setLoggedIn(false);
            } finally {
                if (!cancelled) setBooting(false);
            }
        }

        boot();
        return () => {
            cancelled = true;
        };
    }, []);

    async function handleLogin({ token, username: u, balances: b }) {
        setToken(token);
        setUsername(u);
        setBalances(b);
        setLoggedIn(true);
        setTransactions([]);
        await loadTrades();
    }

    async function handleLogout() {
        try {
            await apiFetch('/api/logout/', { method: 'POST', body: '{}' });
        } catch (ignore) {
            //
        }
        setToken(null);
        setLoggedIn(false);
        setUsername('');
        setBalances(null);
        setTransactions([]);
    }

    if (booting) {
        return (
            <div className="min-h-screen app-bg flex items-center justify-center text-[var(--text-dim)] text-sm">
                Loading…
            </div>
        );
    }

    if (!loggedIn) {
        return <Login onLogin={handleLogin} />;
    }

    return (
        <div className="min-h-screen app-bg">
            <Header page={page} setPage={setPage} onLogout={handleLogout} username={username} />
            <main>
                {page === 'exchange' && (
                    <Exchange
                        balances={balances}
                        setBalances={setBalances}
                        recentFills={transactions.slice(0, 10)}
                        onConverted={loadTrades}
                    />
                )}
                {page === 'history' && <TransactionHistory transactions={transactions} />}
                {page === 'account' && <Account username={username} balances={balances} />}
                {page === 'exchange' && <Faq />}
            </main>
        </div>
    );
}

export default App;
