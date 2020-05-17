import React from "react";

const Footer = () => {

    return (
      <footer className="footer has-cards">
        <div className="container">
          <hr/>
          <div className="row align-items-center justify-content-md-between">
            <div className="col-md-6">
              <div className="copyright">
                &copy; 2020 RentSIT.
              </div>
            </div>
            <div className="col-md-6">
              <ul className="nav nav-footer justify-content-end">
                <li className="nav-item">
                  <a href="https://github.com/Hughli3/CS554_Fincal_Project" rel="noopener noreferrer" className="nav-link" target="_blank">Project Code</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer;