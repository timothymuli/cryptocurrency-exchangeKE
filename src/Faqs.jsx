function Faq() {
    // a simple help box
    return (
        <div className='bg-white rounded max-w-sm mx-auto mt-10 mb-10 p-5 shadow'>
            <div className='font-bold mb-2 p-5 shadow'>FAQ - Questions People Ask</div>
            <div className='text-gray-700 text-sm'>
                <div>- Is it real? <b>No</b>. Everything here is for practice only.</div>
                <div>- Can I lose money? <b>Nope</b>, it's all fake.</div>
                <div>- Why KES? Because we are in Kenya and it's easier to relate to.</div>
                <div>- How to use? Choose coins, enter amount, and click Convert.</div>
                <div>- Why keep 'Previous'? Shows what you tried before.</div>
                <div>- What rates? See above.</div>
            </div>
        </div>
    );
}

export default Faq;