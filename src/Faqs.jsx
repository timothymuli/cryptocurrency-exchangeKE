function Faq() {
    return (
        <footer className="max-w-[1600px] mx-auto px-3 sm:px-4 py-8 border-t border-[var(--border-line)] mt-4">
            <div className="grid sm:grid-cols-2 gap-6 text-xs text-[var(--text-dim)]">
                <div>
                    <p className="font-mono text-[var(--gold)] mb-2">What this is</p>
                    <p className="leading-relaxed">
                        A small full-stack sample: React UI + Django REST API + SQLite. Rates are fixed in code. No bank
                        or blockchain hooks.
                    </p>
                </div>
                <div>
                    <p className="font-mono text-[var(--gold)] mb-2">Notes</p>
                    <ul className="space-y-1 leading-relaxed">
                        <li>KES is there so numbers feel local if you work in Kenya.</li>
                        <li>Change the brand string in Header / Login if you want your own name on the bar.</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Faq;
