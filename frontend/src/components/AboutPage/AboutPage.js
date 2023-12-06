import React from 'react';
import PropTypes from 'prop-types';


const AboutPage = () => (
  <div id="about-view">
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
  </div>
);

AboutPage.propTypes = {};

AboutPage.defaultProps = {};

export default AboutPage;
