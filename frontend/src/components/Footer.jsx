import React from 'react';
import '../assets/styles/footer.css'
import logo from '../assets/logo1.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      {/* <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="widget company-intro-widget">
              <img src={logo} alt='ProShop' height="40px"/>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                <ul className="company-footer-contact-list">
                  <li><i className="fas fa-phone"></i>0123456789</li>
                  <li><i className="fas fa-clock"></i>Mon - Sat 8.00 - 18.00</li>
                </ul>
              </div>
            </div>
           
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="widget newsletter-widget">
                <h5 className="widget-title">Newsletter</h5>
                <div className="footer-newsletter">
                  <p>Sign Up to Our Newsletter to Get Latest Updates & Services</p>
                  <form className="news-letter-form">
                    <input type="email" name="news-email" id="news-email" placeholder="Your email address" />
                    <input type="submit" value="Send" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 text-sm-left text-center">
              <span className="copy-right-text">© {currentYear} <a href="#"> Tajima Australia ABN 16 620 961 686</a></span>
            </div>
            <div className="col-md-6 col-sm-6">
              <ul className="terms-privacy d-flex justify-content-sm-end justify-content-center">
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
