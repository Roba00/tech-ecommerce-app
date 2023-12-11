import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const GET_ACCOUNT_QUERY = "http://localhost:8081/getAccount";
const PRODUCT_ID_QUERY = "http://localhost:8081/getProductById/";
const UPDATE_ACCOUNT_QUERY = "http://localhost:8081/updateAccount/";

const getUserInformation = async (userToken, setAccountInfo, wishlist, setWishlist, recentlyPurchased, setRecentlyPurchased) => {
  console.log("User:", userToken);
  const results = await fetch(GET_ACCOUNT_QUERY, {
    headers: { 'Content-Type': 'application/json', 'authorization': userToken },
    method: 'GET'
  });
  const data = await results.json();
  if (data.statusCode != 200) {
    alert("Login information expired or failed. Please log in again.");
    sessionStorage.removeItem("token");
    window.location.reload();
  }
  const userData = data.userData;
  console.log(userData);
  setAccountInfo(userData);

  getProductInformation(userData.wishlist, setWishlist);
  console.log("Wishlist:", wishlist);

  getProductInformation(userData.recentlyPurchased, setRecentlyPurchased);
  console.log("Recently Purchased:", recentlyPurchased);
}

const getProductInformation = async (productIds, setProducts) => {
  console.log("Product IDs:", productIds);
  for (let id of productIds) {
    const results = await (await fetch(PRODUCT_ID_QUERY + id)).json();
    console.log(results);
    setProducts(existingProducts => [...existingProducts, results]);
  }
}

const updateUserInformation = async (userToken, userInfo, updateInfoField, updatedInfoValue) => {
  console.log(userToken, userInfo, updateInfoField, updatedInfoValue);
  if (!updatedInfoValue || updatedInfoValue == "") return;
  console.log("User:", userToken);

  let userInfoCopy = JSON.parse(JSON.stringify(userInfo));
  console.log("Before change:", userInfoCopy);
  userInfoCopy[updateInfoField] = updatedInfoValue;
  console.log("After change:", userInfoCopy);

  const results = await fetch(UPDATE_ACCOUNT_QUERY, {
    headers: { 'Content-Type': 'application/json', 'authorization': userToken },
    method: 'POST',
    body: userInfoCopy
  });
  const data = await results.json();
  if (data.statusCode != 200) {
    alert("Login information expired or failed. Please log in again.");
    sessionStorage.removeItem("token");
    window.location.reload();
  }
  alert("User inforamtion update successful.");
  window.location.reload();
}

const ProductItem = ({ brand, name, price, image }) => {
  console.log(brand, name, price, image);
  return (
    <li className="list-group-item d-flex justify-content-between lh-sm">
      <img src={image} className='img-fluid' style={{ maxWidth: "20%" }} />
      <div className='d-flex flex-column'>
        <h6 className="my-0 p-2">{brand} {name}</h6>
        <span className="text-body-secondary text-end mr-auto p-2">Price: ${price}</span>
      </div>
    </li>
  )
};

const UserPage = ({ userToken }) => {
  const [accountInfo, setAccountInfo] = useState({
    id: 0,
    name: "Loading name...",
    email: "Loading email...",
    password: "Loading password...",
    location: "Loading location...",
    image: "",
    wishlist: [],
    cart: [],
    recentlyPurchased: [],
    title: "Loading title...",
    phone: "Loading phone..."
  });
  const [wishlist, setWishlist] = useState([]);
  const [recentlyPurchased, setRecentlyPurchased] = useState([]);

  useEffect(() => {
    getUserInformation(userToken, setAccountInfo, wishlist, setWishlist, recentlyPurchased, setRecentlyPurchased);
    console.log("Account:", accountInfo);
    setTimeout(() => {
      console.log(wishlist);
    }, 3000)
  }, []);

  const logout = () => {
    window.sessionStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <div id="user-view">
      <h1 style={{ margin: "10px 0px 15px 0px", textAlign: "center" }}>User Page</h1>
      {/* Credit to https://mdbootstrap.com/docs/standard/extended/profiles/ for design */}
      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <img src={accountInfo.image} alt="avatar"
                className="rounded-circle img-fluid" style={{ width: "150px" }} />
              <h5 className="my-3">{accountInfo.name}</h5>
              <p className="text-muted mb-1">{accountInfo.title}</p>
              <p className="text-muted mb-4">{accountInfo.location}</p>
              <div class="d-flex justify-content-center mb-2">
                <button type="button" class="btn btn-outline-primary ms-1">View Cart</button>
                <button type="button" class="btn btn-primary" onClick={() => logout()}>Log Out</button>
              </div>
            </div>
          </div>
          <div className="card mb-4 mb-lg-0">
            <div className="card-body p-0">
              <ul className="list-group list-group-flush rounded-3">
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i className="fas fa-globe fa-lg text-warning"></i>
                  <p className="mb-0">https://mdbootstrap.com</p>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i className="fab fa-github fa-lg" style={{ color: '#333333' }}></i>
                  <p className="mb-0">mdbootstrap</p>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                  <p className="mb-0">@mdbootstrap</p>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i className="fab fa-instagram fa-lg" style={{ color: '#ac2bac' }}></i>
                  <p className="mb-0">mdbootstrap</p>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i className="fab fa-facebook-f fa-lg" style={{ color: '#3b5998' }}></i>
                  <p className="mb-0">mdbootstrap</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Full Name</p>
                </div>
                <div className="col-sm-8">
                  <input className="text-muted mb-0" style={{ border: 0 }} placeholder={accountInfo.name} id='name' />
                </div>
                <div className="col-sm-1">
                  <button className='btn btn-primary btn-sm' onClick={(e) => updateUserInformation(userToken, accountInfo, "name", document.getElementById('name').value)}>SAVE</button>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-8">
                  <input className="text-muted mb-0" style={{ border: 0 }} placeholder={accountInfo.email} id='email' />
                </div>
                <div className="col-sm-1">
                  <button className='btn btn-primary btn-sm' onClick={(e) => updateUserInformation(userToken, accountInfo, "email", document.getElementById('email').value)}>SAVE</button>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Password</p>
                </div>
                <div className="col-sm-8">
                  <input className="text-muted mb-0" style={{ border: 0 }} placeholder={accountInfo.password} id='password' />
                </div>
                <div className="col-sm-1">
                  <button className='btn btn-primary btn-sm' onClick={(e) => updateUserInformation(userToken, accountInfo, "password", document.getElementById('password').value)}>SAVE</button>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Title</p>
                </div>
                <div className="col-sm-8">
                  <input className="text-muted mb-0" style={{ border: 0 }} placeholder={accountInfo.title} id='title' />
                </div>
                <div className="col-sm-1">
                  <button className='btn btn-primary btn-sm' onClick={(e) => updateUserInformation(userToken, accountInfo, "title", document.getElementById('title').value)}>SAVE</button>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Phone</p>
                </div>
                <div className="col-sm-8">
                  <input className="text-muted mb-0" style={{ border: 0 }} placeholder={accountInfo.phone} id='phone' />
                </div>
                <div className="col-sm-1">
                  <button className='btn btn-primary btn-sm' onClick={(e) => updateUserInformation(userToken, accountInfo, "phone", document.getElementById('phone').value)}>SAVE</button>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Location</p>
                </div>
                <div className="col-sm-8">
                  <input className="text-muted mb-0" style={{ border: 0 }} placeholder={accountInfo.location} id='location' />
                </div>
                <div className="col-sm-1">
                  <button className='btn btn-primary btn-sm' onClick={(e) => updateUserInformation(userToken, accountInfo, "location", document.getElementById('location').value)}>SAVE</button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4 mb-md-0">
                <div className="card-body">
                  <p className="mb-4"><span className="text-primary font-italic me-1">Wishlist</span>
                  </p>
                  <ul id="wishlistList" className="list-group mb-3" style={{ overflowY: "auto", maxHeight: "35vh" }}>
                    {wishlist.map(product => (<ProductItem
                      key={product.productId}
                      brand={product.brand}
                      name={product.title}
                      price={product.price}
                      image={product.image}
                    />))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-4 mb-md-0">
                <div className="card-body">
                  <p className="mb-4"><span className="text-primary font-italic me-1">Recently Purchased</span>
                  </p>
                  <ul id="recentlyPurchasedList" className="list-group mb-3" style={{ overflowY: "auto", maxHeight: "35vh" }}>
                    {recentlyPurchased.map(product => (<ProductItem
                      key={product.productId}
                      brand={product.brand}
                      name={product.title}
                      price={product.price}
                      image={product.image}
                    />))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};

UserPage.propTypes = {};

UserPage.defaultProps = {};

export default UserPage;
