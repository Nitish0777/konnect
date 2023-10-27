import React, { useState } from "react";
import "./contact.css"; // Import your CSS file here
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faMapLocationDot,
  faPhone,
  faEnvelope,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here using formData object
    console.log(formData); // You can perform form submission or validation here
  };
  return (
    <section className="container3" id="contact">
      <h1 className="section-header">Contact Us</h1>

      <div className="contact-wrapper">
        {/* Left contact page */}
        <form className="form-horizontal" role="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="NAME"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="email"
                className="form-control"
                placeholder="EMAIL"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <textarea
            className="form-control"
            rows="10"
            placeholder="MESSAGE"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
          <button className="btn btn-primary send-button snd-btn" type="submit">
            <div className="alt-send-button">
              <FontAwesomeIcon icon={faPaperPlane} />
              <span className="send-text">SEND</span>
            </div>
          </button>
        </form>
        {/* Left contact page */}
        <div className="direct-contact-container">
          <ul className="contact-list">
            <li className="list-item">
              <FontAwesomeIcon icon={faMapLocationDot} />
              <span className="contact-text place">Pune, Maharashtra</span>
            </li>
            <li className="list-item">
              <FontAwesomeIcon icon={faPhone} />
              <span className="contact-text phone">
                <a href="tel:1-212-555-5555" title="Give me a call">
                  (+91) 1234567892
                </a>
              </span>
            </li>
            <li className="list-item">
              <FontAwesomeIcon icon={faEnvelope} />
              <span className="contact-text gmail">
                <a href="mailto:#" title="Send me an email">
                  konnect@gmail.com
                </a>
              </span>
            </li>
          </ul>
          <hr />
          <ul className="social-media-list">
            <li>
              <a href="#" target="_blank" className="contact-icon">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a href="#" target="_blank" className="contact-icon">
                {/* <i className="fa fa-codepen" aria-hidden="true"></i> */}
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a href="#" target="_blank" className="contact-icon">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
          </ul>
          <hr />
          <div className="copyright">&copy; All of the rights reserved</div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
