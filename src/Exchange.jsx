import { useState } from 'react';

function Exchange() {
    const [from, setFrom] = useState('BTC');
    const [to, setTo] = useState('KES');
    const [amount, setAmount] = useState('');
    const [out, setOut] = useState('');
    const [work, setWork] = useState(false);
    const [old, setOld] = useState([]);

    // rates
    const rates = {
        BTC: 9000000,
        ETH: 350000,
        USDT: 129,
        KES: 1,
    };
    
    function convertIt(e) {
        e.preventDefault();
        setOut('');  //usedto clear old msg
        if (amount === '' || isNaN(amount) || Number(amount) <= 0) {
            setOut('Put a real number');
            return;
        }
        if (from === to) {
            setOut('Pick two different coins');
            return;
        }
        setWork(true);

        setTimeout(() => {
            let kes = from === 'KES' ? Number(amount) : Number(amount) * rates[from];
            let answer = to === 'KES' ? kes : (kes/rates[to]);
            let ans = amount + '' + from + ' = ' + answer.toFixed(2) + '' + to;
            setOut(ans);
            setWork(false);
            setOld([{ans, time: new Date().toLocaleTimeString()}, ...old].slice(0.5));
        }, 700);
    }

    function startAgain() {
        setFrom('BTC');
        setTo('KES');
        setAmount('');
        setOut('');
        setOld([]);
    }

    return (
        <div className='bg-white rounded-md max-w-xs mx-auto p-5 shadow-md'>
            <div className='font-bold text-base mb-2 text-green-800'>Rates (per one):</div>
            <div className='mb-4'>
                <div>BTC: 9,000,000 KES</div>
                <div>ETH: 350,000 KES</div>
                 <div>USDT: 129 KES</div>
            </div>
            <form onSubmit={convertIt} className='flex flex-col gap-3'>
                <div>
                    <label>From: </label>
                    <select value={from} onChange={(e) => setFrom(e.target.value)} className='border rounded p-1'>
                        <option value='BTC'>BTC</option>
                        <option value='ETH'>ETH</option>
                        <option value='USDT'>USDT</option>
                        <option value='KES'>KES</option>
                    </select>  
                </div>
                <div>
                    <label>To: </label>
                    <select value={to} onChange={(e) => setTo(e.target.value)} className='border rounded p-1'>
                        <option value='BTC'>BTC</option>
                        <option value='ETH'>ETH</option>
                        <option value='USDT'>USDT</option>
                        <option value='KES'>KES</option>
                    </select>  
                </div>
                <div>
                    <label>Amount: </label>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} className='border rounded p-1 w-2/3' />
                </div>
                <button type='submit' className='bg-green-700 text-white py-2 rounded hover:bg-green-800' disabled={work}>Convert</button>
                <button type='button' onClick={startAgain} className='bg-gray-100 text-green-700 rounded py-2 mt-2'>Start Again</button>

            </form>
            {work && <div className='text-center text-green-700 font-semibold mt-3'>Converting...</div>}
            <div className='text-center font-semibold text-green-800 min-h-[2em] mt-2'>{out}</div>
            <div className='font-bold text-sm mt-4'>Previous</div>
            <ul className='bg-gray-50 rounded p-2 text-xs min-h-[30px]'>
                {old.length === 0 && <li>None yet</li>}
                {old.map((it,i)=>
                <li key={i}>{it.time}:
                {it.ans}</li>
                )}
            </ul>
        </div>
    );
}

export default Exchange; 