import { useState } from 'react';
import Login from './Login';
import Header from './Header';
import Exchange from './Exchange';
import Faq from './Faqs';

function App() {
    // one must login to use the app
    const [loggedIn, setLoggedIn] = useState(false);
    // if not logged in, only show login
    if (!loggedIn) {
        return <Login onLogin={() => setLoggedIn(true)} />;
    }

    //if user loggs in, show the app
    return (
        <div className="bg-green-500 min-h-screen">
            <Header />
            <div className="mt-10"> 
                <Exchange />
            </div>
            <Faq />
        </div>
    );
}

export default App;
