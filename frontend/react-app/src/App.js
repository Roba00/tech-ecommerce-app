import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const View = {
        home: "home-view",
        phone: "phone-view",
        about: "about-view"
    };
    const [view, setView] = useState(View.home);

    function getMethod() {
        fetch('http://localhost:8081/listPhones')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var container = document.getElementById("showData");
                loadPhones(data);
            });
    }

    function loadPhones(myPhones) {
        var mainContainer = document.getElementById("showPhones");
        for (var i = 0; i < myPhones.length; i++) {
            let productId = myPhones[i].productId;
            let brand = myPhones[i].brand;
            let price = myPhones[i].price;
            let title = myPhones[i].title;
            let text = myPhones[i].text;
            let image = myPhones[i].image;
            let div = document.createElement("div");
            div.innerHTML = (
                <div className="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                    <div className="my-3 py-3">
                        <h2 id="iphone11" className="display-5">{brand} {title}</h2>
                        <p id="phoneDesc1">{text}</p>
                        <h3 id="phonePrice1">{price}</h3>
                        <img src={image} width="200" alt={`Phone ${title}`} /> <br /> <br />
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-outline-secondary">Add to Cart</button>
                                <button type="button" className="btn btn-sm btn-outline-secondary">Reviews</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
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
                        <li className="nav-item"><a className="nav-link" onClick={() => setView(View.tablet)}>TABLETS</a></li>
                        <li className="nav-item"><a className="nav-link" onClick={() => setView(View.laptop)}>LAPTOPS</a></li>
                        <li className="nav-item"><a className="nav-link" onClick={() => setView(View.vr)}>VRs</a></li>
                        <li className="nav-item"><a className="nav-link" onClick={() => setView(View.about)}>ABOUT US</a></li>
                    </ul>
                        <ul className="collapse navbar-collapse justify-content-end list-unstyled" style={{ margin: 0 }}>
                            <li className="ms-3"><a className="text-body-secondary" href="#"><img src="./images/icons/person.svg" width="30" height="30" alt="Person Icon" /></a></li>
                            <li className="ms-3"><a className="text-body-secondary" href="#"><img src="./images/icons/bag.svg" width="25" height="25" alt="Bag Icon" /></a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            {view === View.phone && <div id="phone-view">
            <button onClick={getMethod}>Show All Offers</button>
            <h1>Phones:</h1>
            <pre id="showData"></pre>
            <div id="showPhones"> </div>

            <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
                <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                <div class="my-3 py-3">
                    <h2 id="iphone11" class="display-5">iPhone 11</h2>
                    <p id="phoneDesc1"></p>
                    <h3 id="phonePrice1"></h3>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">Add to Cart</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Reviews</button>
                        </div>
                    </div>
                </div>
                <div id="phoneImg1"></div>
                </div>
                <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                <div class="my-3 p-3">
                    <h2 id="iphone12" class="display-5">iPhone 12</h2>
                    <p id="phoneDesc2"></p>
                    <h3 id="phonePrice2"></h3>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">Add to Cart</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Reviews</button>
                        </div>
                    </div>
                </div>
                <div id="phoneImg2"></div>
                </div>
            </div>
        
            <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
                <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                <div class="my-3 p-3">
                    <h2 id="a54" class="display-5">Samsung A54</h2>
                    <p id="phoneDesc3"></p>
                    <h3 id="phonePrice3"></h3>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">Add to Cart</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Reviews</button>
                        </div>
                    </div>
                </div>
                <div id="phoneImg3"></div>
                </div>
                <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                <div class="my-3 py-3">
                    <h2 id="samsungs21" class="display-5">Samsung S21</h2>
                    <p id="phoneDesc4"></p>
                    <h3 id="phonePrice4"></h3>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">Add to Cart</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary">Reviews</button>
                        </div>
                    </div>
                </div>
                <div id="phoneImg4"></div>
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
                    <li class="ms-3"><a class="text-body-secondary" href="#"><img src="./images/icons/facebook.svg" width="24" height="24"/></a></li>
                    <li class="ms-3"><a class="text-body-secondary" href="#"><img src="./images/icons/twitter-x.svg" width="24" height="24"/></a></li>
                    <li class="ms-3"><a class="text-body-secondary" href="#"><img src="./images/icons/instagram.svg" width="24" height="24"/></a></li>
                </ul>
                </footer>
            </div>
        </div>
    );
}

export default App;