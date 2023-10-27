import React, { useState } from "react";
import style from "./signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../../assets/dark.png";

const universities = [
  "Gmail College",
  "Bharati Vidyapeeth",
  "Deccan College Post-Graduate and Research Institute",
  "Defence Institute of Advanced Technology (formerly Institute of Armament Technology)",
  "Dnyaneshwar Vidyapeeth",
  "FLAME University",
  "Gokhale Institute of Politics and Economics",
  "Indian Institute of Information Technology, Pune",
  "Indian Institute of Science Education and Research, Pune",
  "Christ University Pune Lavasa, Campus",
  "Indian Institute of Science Education and Research, Pune",
  "National Institute of Construction Management and Research",
  "National Defence Academy",
  "Tilak Maharashtra University",
  "Savitribai Phule Pune University",
  "Spicer Adventist University",
  "Symbiosis International University",
  "MIT University - MIT Art, Design and Technology University",
  "Ajeenkya DY Patil University",
  "Flame University",
  "MIT - World Peace University",
  "Spicer Adventist University",
  "Christ University Pune Lavasa, Campus",
  "Symbiosis International University",
  "Symbiosis Skills and Professional University",
];

const SignupForm = () => {
  const [prn, setPrn] = useState("");
  const [email2, setEmail2] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleUniversityChange = (e) => {
    const selectedUniversity = e.target.value;
    setSelectedUniversity(selectedUniversity);

    const universityToEmailDomain = {
      "Gmail College": "gmail.com",
      "Bharati Vidyapeeth": "bharatividyapeeth.edu.in",
      "Deccan College Post-Graduate and Research Institute":
        "deccancollege.edu.in",
      "MIT - World Peace University": "mitwpu.edu.in",
      "MIT University - MIT Art, Design and Technology University":
        "mitwpu.edu.in",
      // Add more universities and domains as needed
    };

    if (universityToEmailDomain[selectedUniversity]) {
      setEmail2(`@${universityToEmailDomain[selectedUniversity]}`);
    } else {
      setEmail2("");
    }
  };

  const handlePrn = (e) => {
    const newprn = e.target.value;
    console.log("PRN " + prn);
    setPrn(newprn);
  };
  const handleName = (e) => {
    const newname = e.target.value;
    setName(newname);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const gmail = prn.concat(email2);
      console.log("Concat Gmail " + gmail);
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/users/register`,
        {
          college: selectedUniversity,
          email: gmail,
          password,
          name,
        }
      );
      console.log("res from backend", res);
      if (res.data.success) {
        console.log(res.data);
        toast.success("Verify your mail");
        navigate("/signin");
      } else {
        console.log("Sign up error", res.data.messages);
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className={style.container}>
      <Link to="/" className="logo">
        <img
          src={logo}
          className={style.logoimg}
          height="50"
          width="150"
          alt="logo"
        />
      </Link>
      <h1 style={{ color: "white" }}>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.form_group}>
          <label
            style={{ color: "white", fontSize: "19px" }}
            htmlFor="university"
          >
            Select University:
          </label>
          <select
            className={style.university}
            name="university"
            value={selectedUniversity}
            onChange={handleUniversityChange}
          >
            <option value="" disabled>
              Select your university
            </option>
            {universities.map((university, index) => (
              <option key={index} value={university}>
                {university}
              </option>
            ))}
          </select>
        </div>
        <div className={style.form_group}>
          <label style={{ color: "white", fontSize: "19px" }} htmlFor="email">
            College Email:
          </label>
          <div>
            <input
              style={{ width: "60%" }}
              onChange={handlePrn}
              type="text"
              className={style.email1}
              name="email"
              required
            />
            <input
              style={{
                width: "40%",
                backgroundColor: "white",
                color: "black",
                marginLeft: "-3px",
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px",
                disabled: "true",
                opacity: "0.7",
              }}
              type="email"
              className={style.email2}
              name="email"
              value={email2}
              disabled
            />
          </div>
        </div>
        <div className={style.form_group}>
          <label style={{ color: "white", fontSize: "19px" }} htmlFor="name">
            Name:
          </label>
          <input
            style={{ width: "100%", padding: "10px" }}
            type="text"
            className={style.name}
            name="name"
            value={name}
            onChange={handleName}
            required
          />
        </div>
        <div className={style.form_group}>
          <label
            style={{ color: "white", fontSize: "19px" }}
            htmlFor="password"
          >
            Password:
          </label>
          <div className="password-container">
            <input
              type="password"
              style={{ width: "100%" }}
              className={style.password}
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className={style.form_group}>
          <label
            style={{ color: "white", fontSize: "19px" }}
            htmlFor="confirm-password"
          >
            Confirm Password:
          </label>
          <input
            style={{ width: "100%" }}
            type="password"
            className={style.confirm_password}
            name="confirm-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
