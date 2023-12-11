import { useEffect, useState } from 'react';
import HomePage from './components/HomePage/HomePage';
import PhoneCatalogPage from './components/PhoneCatalogPage/PhoneCatalogPage';
import WatchCatalogPage from './components/WatchCatalogPage/WatchCatalogPage';
import AboutPage from './components/AboutPage/AboutPage';
import LogInPage from './components/LogInPage/LogInPage';
import CreateAccountPage from './components/CreateAccountPage/CreateAccountPage';
import UserPage from './components/UserPage/UserPage';

const isLoggedIn = () => {
    console.log("Has token:", !(sessionStorage.getItem("token") == null || sessionStorage.getItem("token") == ""));
    return !(sessionStorage.getItem("token") == null || sessionStorage.getItem("token") == "");
};

const getToken = () => {
    console.log(sessionStorage.getItem("token"));
    return sessionStorage.getItem("token");
};

function App() {
    const View = {
        home: "home-view",
        phone: "phone-view",
        watch: "watch-view",
        about: "about-view",
        login: "login-view"
    };
    const [view, setView] = useState(View.home);

    return (
        <div className='App'>
            {/* NavBar */}
            <nav className="navbar navbar-expand-lg bg-body-tertiary vertical-center">
                <div className="container-fluid bg-invert">
                    <a className="navbar-brand" href="index.html">
                        <img src="./images/icons/cherry-logo.svg" className="d-inline-block align-text-top" alt="Cherry Logo" />
                        <strong style={{ fontSize: 'x-large' }}>Cherry</strong>
                    </a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item"><a className="nav-link" onClick={() => setView(View.phone)}>SMARTPHONES</a></li>
                            <li className="nav-item"><a className="nav-link" onClick={() => setView(View.watch)}>WATCHES</a></li>
                            <li className="nav-item"><a className="nav-link" onClick={() => setView(View.tablet)}>TABLETS</a></li>
                            <li className="nav-item"><a className="nav-link" onClick={() => setView(View.laptop)}>LAPTOPS</a></li>
                            <li className="nav-item"><a className="nav-link" onClick={() => setView(View.vr)}>VRs</a></li>
                            <li className="nav-item"><a className="nav-link" onClick={() => setView(View.about)}>ABOUT US</a></li>
                        </ul>
                        <ul className="collapse navbar-collapse justify-content-end list-unstyled" style={{ margin: 0 }}>
                            <li className="ms-3"><a className="text-body-secondary" href="#"><img src="./images/icons/person.svg" width="30" height="30" alt="Person Icon" onClick={() => setView(View.login)} /></a></li>
                            <li className="ms-3"><a className="text-body-secondary" href="#"><img src="./images/icons/bag.svg" width="25" height="25" alt="Bag Icon" /></a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {view === View.home && <HomePage />}

            {view === View.phone && (isLoggedIn() ? <PhoneCatalogPage /> : <><LogInPage /><hr /><CreateAccountPage /></>)}

            {view === View.watch && (isLoggedIn() ? <WatchCatalogPage /> : <><LogInPage /><hr /><CreateAccountPage /></>)}

            {view === View.about && (isLoggedIn() ? <AboutPage /> : <><LogInPage /><hr /><CreateAccountPage /></>)}

            {view === View.login && (isLoggedIn() ? <UserPage userToken={getToken()}/> : <><LogInPage /><hr /><CreateAccountPage /></>)}

            {/* Footer */}
            <div className="container">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div className="col-md-4 d-flex align-items-center">
                        <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                            {/* <svg className="bi" width="30" height="24"><use xlink:href="#bootstrap"/></svg> */}
                        </a>
                        <span className="mb-3 mb-md-0 text-body-secondary">&copy; Cherry LLC (2023)</span>
                    </div>

                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li className="ms-3"><a className="text-body-secondary" href="#"><img src="./images/icons/facebook.svg" width="24" height="24" /></a></li>
                        <li className="ms-3"><a className="text-body-secondary" href="#"><img src="./images/icons/twitter-x.svg" width="24" height="24" /></a></li>
                        <li className="ms-3"><a className="text-body-secondary" href="#"><img src="./images/icons/instagram.svg" width="24" height="24" /></a></li>
                    </ul>
                </footer>
            </div>
        </div>
    );
}

export default App;