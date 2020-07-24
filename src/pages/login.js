import React, { useContext } from 'react';

import Auth from '../utils/auth';

function SplashPage() {
    const { handleSignOn } = useContext(Auth);

    return (
        <div className="App" style={{ height: '100vh' }}>
            <h1 className="Logo">TritonTalk</h1>
            <h3 className="SubText">The Virtual Library Walk</h3>
            <div className="vertical">
                <button className="button" onClick={handleSignOn}>LOGIN</button>
            </div>
        </div>
    );
}

export default SplashPage;