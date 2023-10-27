import React, { useState } from "react";
import style from "./signin.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/Auth";
import logo from "../../assets/dark.png";

const universities = [
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

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/users/login`,
        {
          email,
          password,
        }
      );
      console.log(res);
      if (res.data.success) {
        console.log(res);
        const { user, token } = res.data;
        setAuth({
          token: token,
          user: user,
        });
        localStorage.setItem("auth", JSON.stringify({ token, user }));
        toast.success("Sign in successful");
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.container}>
      <div>
        <Link to="/">
          <img src={logo} height="50" width="150" alt="logo" />
        </Link>
      </div>
      <h1 style={{ color: "white" }}>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className={style.form_group}>
          <label style={{ color: "white", fontSize: "19px" }} htmlFor="email">
            College Email:
          </label>
          <div className={style.clg}>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={style.error} id="email-error">
            {emailError}
          </div>
        </div>
        <div className={style.form_group}>
          <label
            style={{ color: "white", fontSize: "19px" }}
            htmlFor="password"
          >
            Password:
          </label>
          <div className={style.password_container}>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className={style.error} id="password-error">
          {passwordError}
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SigninForm;
