import React from 'react';
import PropTypes from 'prop-types';


const HomePage = () => (
  <div id="home-view">
    {/* Featured Products Panel */}
    <div id="carouselExampleCaptions" className="carousel slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
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
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="./images/home/iphone15_pro.jpg" className="d-block w-100" />
          <div className="carousel-caption d-none d-md-block">
            <h1>iPhone 15 Pro</h1>
            <h6>Some representative placeholder content for the first slide.</h6>
          </div>
        </div>
        <div className="carousel-item carousel-dark">
          <img src="./images/home/iphone15.jpg" className="d-block w-100" />
          <div className="carousel-caption d-none d-md-block">
            <h1>iPhone 15</h1>
            <h6>Some representative placeholder content for the second slide.</h6>
          </div>
        </div>
        <div className="carousel-item">
          <img src="./images/home/galaxy-z-fold5.jpg" className="d-block w-100" />
          <div className="carousel-caption d-none d-md-block">
            <h1>Galaxy Z Fold5</h1>
            <h6>Some representative placeholder content for the third slide.</h6>
          </div>
        </div>
        <div className="carousel-item carousel-dark">
          <img src="./images/home/xps15.jpg" className="d-block w-100" />
          <div className="carousel-caption d-none d-md-block">
            <h1>XPS 15</h1>
            <h6>Some representative placeholder content for the fourth slide.</h6>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

    {/* Smartphones, Tablets, Watches, VRs */}
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col-6 card text-bg-light" style={{ padding: 0, border: 0 }}>
          <img src="./images/home/smartphones.jpg" className="card-img"></img>
          <div className="card-img-overlay">
            <h2 className="card-title">Phones</h2>
            <h6>Cutting-edge companions for the modern maven.</h6>
          </div>
        </div>
        <div className="col-6 card text-bg-light" style={{ padding: 0, border: 0 }}>
          <img src="./images/home/laptops2.jpg" className="card-img"></img>
          <div className="card-img-overlay">
            <h2 className="card-title">Laptops</h2>
            <h6>Freshly minted laptops, for students on the tech block.</h6>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-6 card text-bg-light" style={{ padding: 0, border: 0 }}>
          <img src="./images/home/smartwatches.jpg" className="card-img"></img>
          <div className="card-img-overlay">
            <h2 className="card-title">Watches</h2>
            <h6>Wristwear with IQ, available for your savvy self.</h6>
          </div>
        </div>
        <div className="col-6 card text-bg-light" style={{ padding: 0, border: 0 }}>
          <img src="./images/home/vr_headsets.jpg" className="card-img"></img>
          <div className="card-img-overlay">
            <h2 className="card-title">VRs</h2>
            <h6>Glasses for peering into a new dimension.</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
);

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default HomePage;
