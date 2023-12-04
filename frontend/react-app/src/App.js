import { useEffect, useState } from 'react';

function App() {
    const View = {
        home: "home-view",
        phone: "phone-view",
        watch: "watch-view",
        about: "about-view"
    };
    const [view, setView] = useState(View.home);
    useEffect(() => {
        if (view === View.phone) {
            getPhoneData();
        }
        if (view === View.watch) {
            getWatchData();
        }
    }, [view]);

    function getPhoneData() {
        fetch('http://localhost:8081/listPhones')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                loadPhones(data);
            });
    }

    function loadPhones(myPhones) {
        var mainContainer = document.getElementById("showPhones");
        for (var i = 0; i < myPhones.length; i++) {
            if (i==2)
                mainContainer.innerHTML += "<br />"
            let { productId, brand, price, title, text, image } = myPhones[i];
            let div = document.createElement("div");
            div.classList = "bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden";
            div.innerHTML = `
                <div className="my-3 py-3">
                    <h2 id="iphone11" className="display-5">${brand} ${title}</h2>
                    <p id="phoneDesc1">${text}</p>
                    <h3 id="phonePrice1">${price}</h3>
                    <img src=${image} width="200" alt="Phone ${title}" /> <br /> <br />
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <!--
                            <button type="button" className="btn btn-sm btn-outline-secondary">Add to Cart</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Reviews</button>
                            -->
                        </div>
                    </div>
                </div>
            `.trim();
            mainContainer.appendChild(div);
            console.log(div);
        }
    }

    function getWatchData() {
        fetch('http://localhost:8081/listWatches')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                loadWatches(data);
            });
    }

    function loadWatches(myWatches) {
        var mainContainer = document.getElementById("showWatches");
        for (var i = 0; i < myWatches.length; i++) {
            let { productId, brand, price, title, text, image } = myWatches[i];

            let div = document.createElement("div");
            div.classList = "bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden";
            div.innerHTML = `
                <div className="my-3 py-3">
                    <h2 id="iphone11" className="display-5">${brand} ${title}</h2>
                    <p id="phoneDesc1">${text}</p>
                    <h3 id="phonePrice1">${price}</h3>
                    <img src=${image} width="200" alt="Phone ${title}" /> <br /> <br />
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <!--
                            <button type="button" className="btn btn-sm btn-outline-secondary">Add to Cart</button>
                            <button type="button" className="btn btn-sm btn-outline-secondary">Reviews</button>
                            -->
                        </div>
                    </div>
                </div>
            `.trim();
            mainContainer.appendChild(div);
            console.log(div);
        }
    }

    return (
        <div className='App'>
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
                            {/* <li className="nav-item"><a className="nav-link" onClick={() => setView(View.tablet)}>TABLETS</a></li>
                            <li className="nav-item"><a className="nav-link" onClick={() => setView(View.laptop)}>LAPTOPS</a></li>
                            <li className="nav-item"><a className="nav-link" onClick={() => setView(View.vr)}>VRs</a></li> */}
                            <li className="nav-item"><a className="nav-link" onClick={() => setView(View.about)}>ABOUT US</a></li>
                        </ul>
                        {/* <ul className="collapse navbar-collapse justify-content-end list-unstyled" style={{ margin: 0 }}>
                            <li className="ms-3"><a className="text-body-secondary" href="#"><img src="./images/icons/person.svg" width="30" height="30" alt="Person Icon" /></a></li>
                            <li className="ms-3"><a className="text-body-secondary" href="#"><img src="./images/icons/bag.svg" width="25" height="25" alt="Bag Icon" /></a></li>
                        </ul> */}
                    </div>
                </div>
            </nav>

            {view === View.home && <div id="home-view">

                {/* Featured Products Panel */}
                <div id="carouselExampleCaptions" className="carousel slide">
                    <div class="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="0"
                            class="active"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to="3"
                        ></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="./images/home/iphone15_pro.jpg" class="d-block w-100" />
                            <div class="carousel-caption d-none d-md-block">
                                <h1>iPhone 15 Pro</h1>
                                <h6>Some representative placeholder content for the first slide.</h6>
                            </div>
                        </div>
                        <div class="carousel-item carousel-dark">
                            <img src="./images/home/iphone15.jpg" class="d-block w-100" />
                            <div class="carousel-caption d-none d-md-block">
                                <h1>iPhone 15</h1>
                                <h6>Some representative placeholder content for the second slide.</h6>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src="./images/home/galaxy-z-fold5.jpg" class="d-block w-100" />
                            <div class="carousel-caption d-none d-md-block">
                                <h1>Galaxy Z Fold5</h1>
                                <h6>Some representative placeholder content for the third slide.</h6>
                            </div>
                        </div>
                        <div class="carousel-item carousel-dark">
                            <img src="./images/home/xps15.jpg" class="d-block w-100" />
                            <div class="carousel-caption d-none d-md-block">
                                <h1>XPS 15</h1>
                                <h6>Some representative placeholder content for the fourth slide.</h6>
                            </div>
                        </div>
                    </div>
                    <button
                        class="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="prev"
                    >
                        <span class="carousel-control-prev-icon"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button
                        class="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide="next"
                    >
                        <span class="carousel-control-next-icon"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

                {/* Smartphones, Tablets, Watches, VRs */}
                <div className="container-fluid text-center">
                    <div className="row">
                        <div className="col-6 card text-bg-light" style={{ padding: 0, border: 0 }}>
                            <img src="./images/home/smartphones.jpg" class="card-img"></img>
                            <div class="card-img-overlay">
                                <h2 class="card-title">Phones</h2>
                                <h6>Cutting-edge companions for the modern maven.</h6>
                            </div>
                        </div>
                        <div className="col-6 card text-bg-light" style={{ padding: 0, border: 0 }}>
                            <img src="./images/home/laptops2.jpg" class="card-img"></img>
                            <div class="card-img-overlay">
                                <h2 class="card-title">Laptops</h2>
                                <h6>Freshly minted laptops, for students on the tech block.</h6>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6 card text-bg-light" style={{ padding: 0, border: 0 }}>
                            <img src="./images/home/smartwatches.jpg" class="card-img"></img>
                            <div class="card-img-overlay">
                                <h2 class="card-title">Watches</h2>
                                <h6>Wristwear with IQ, available for your savvy self.</h6>
                            </div>
                        </div>
                        <div className="col-6 card text-bg-light" style={{ padding: 0, border: 0 }}>
                            <img src="./images/home/vr_headsets.jpg" class="card-img"></img>
                            <div class="card-img-overlay">
                                <h2 class="card-title">VRs</h2>
                                <h6>Glasses for peering into a new dimension.</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

            {view === View.phone && <div id="phone-view">
                <h1>Phones:</h1>
                <div id="showPhones" className='d-md-flex flex-md-equal w-100 my-md-3 pl-md-3'> 
                </div>
            </div>}

            {view === View.watch && <div id="watch-view">
                <h1>Watches:</h1>
                <div id="showWatches" className='d-md-flex flex-md-equal w-100 my-md-3 pl-md-3'> </div>
            </div>}

            {view === View.about && <div id="about-view">
                <div className="mt-3 ml-2" style={{ textAlign: 'center' }}>
                    <h5 id="acknowledgements">Acknowledgements</h5>
                    Course: SE/ComS319 Construction of User Interfaces, Spring 2023 <br />
                    Instructor: Dr. Abraham N. Aldaco Gastelum - aaldaco@iastate.edu <br />
                    Date: December 1st, 2023
                </div>

                <div className="row">
                    <div className="col-sm-3" style={{ marginLeft: '400px', marginTop: '50px' }}>
                        <div className="card" style={{ width: '18rem' }}>
                            <img className="card-img-top" src="./images/aboutpfps/coms319roba.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h6>Roba Abbajabal</h6>
                                <ul className="mt-1">
                                    <li>Major: Computer Science</li>
                                    <li>Minor: Data Science</li>
                                    <li>Classification: Senior</li>
                                    <li>Email: robaa@iastate.edu</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3" style={{ marginTop: '50px' }}>
                        <div className="card" style={{ width: '18rem' }}>
                            <img className="card-img-top" src="./images/aboutpfps/coms319conor.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h6>Conor O'Shea</h6>
                                <ul>
                                    <li>Major: Computer Science</li>
                                    <li>Minor: Data Science</li>
                                    <li>Classification: Junior</li>
                                    <li>Email: coshea@iastate.edu</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}

            <div className="container">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div class="col-md-4 d-flex align-items-center">
                        <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                            {/* <svg class="bi" width="30" height="24"><use xlink:href="#bootstrap"/></svg> */}
                        </a>
                        <span class="mb-3 mb-md-0 text-body-secondary">&copy; Cherry LLC (2023)</span>
                    </div>

                    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <li class="ms-3"><a class="text-body-secondary" href="#"><img src="./images/icons/facebook.svg" width="24" height="24" /></a></li>
                        <li class="ms-3"><a class="text-body-secondary" href="#"><img src="./images/icons/twitter-x.svg" width="24" height="24" /></a></li>
                        <li class="ms-3"><a class="text-body-secondary" href="#"><img src="./images/icons/instagram.svg" width="24" height="24" /></a></li>
                    </ul>
                </footer>
            </div>
        </div>
    );
}

export default App;