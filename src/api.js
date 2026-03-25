// small helper so we are not pasting fetch() everywhere
const BASE = process.env.REACT_APP_API_URL || '';

export function getToken() {
    return localStorage.getItem('token');
}

export function setToken(t) {
    if (t) localStorage.setItem('token', t);
    else localStorage.removeItem('token');
}

function fullUrl(path) {
    if (BASE) return `${BASE.replace(/\/$/, '')}${path}`;
    return path;
}

export async function apiFetch(path, opts = {}) {
    const headers = { 'Content-Type': 'application/json', ...opts.headers };
    const t = getToken();
    if (t) headers.Authorization = `Token ${t}`;
    const res = await fetch(fullUrl(path), { ...opts, headers });
    let data = null;
    const text = await res.text();
    try {
        data = text ? JSON.parse(text) : null;
    } catch (ignore) {
        data = { raw: text };
    }
    if (!res.ok) {
        const msg =
            (data && data.detail) ||
            (typeof data === 'string' ? data : null) ||
            res.statusText ||
            'request failed';
        const err = new Error(msg);
        err.status = res.status;
        err.payload = data;
        throw err;
    }
    return data;
}
