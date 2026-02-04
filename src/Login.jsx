import { useState } from 'react';

function Login({ onLogin }) {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [msg, setMsg] = useState('');

    function handleLogin(e) {
        e.preventDefault();

        if (user === 'muli' && pass === 'moringa') {
            onLogin();
        } else {
            setMsg('Wrong username or password');
        }
    }
    
    return (
        <div className='max-w-xs-auto bg-white mt-20 p-5 rounded-md shadow-lg'>
            <div className='font-bold text-2xl mb-4 text-green-700 text-center'>Login</div>
            <form onSubmit={handleLogin} className='flex flex-col gap-2'>
                <input
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder='Username'
                    className='border rounded px-2 py-1'
                />
                <input
                    type='password'
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder='Password'
                    className='border rounded px-2 py-1'
                />
                {msg && <div className='text-red-600 text-center'>{msg}</div>}
                <button className='bg-green-700 text-white py-2 rounded mt-2 hover:bg-green-800' type='submit'>
                    Enter
                    </button>
            </form>
            <div className='mt-2 text-xs text-gray-600 text-center'>
                Hint: muli / moringa
            </div>
        </div>
    );
}

export default Login;