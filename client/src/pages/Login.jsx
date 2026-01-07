import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import NewLogo from "../assets/LogoNew.png";
import BgImg from "../assets/backgroundImage.png";

function Login() {
  const navigate = useNavigate();
  const { setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      setIsLoading(true);

      const url =
        state === "Sign Up"
          ? "http://localhost:4000/api/auth/register"
          : "http://localhost:4000/api/auth/login";

      const payload =
        state === "Sign Up"
          ? { name, email, password, age, phone, address }
          : { email, password };

      const { data } = await axios.post(url, payload);
      setIsLoading(false);

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message || "Something went wrong");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BgImg})` }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      {/* Logo */}
      <img
        src={NewLogo}
        alt="logo"
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 w-28 cursor-pointer z-10"
      />

      {/* Form Card */}
      <div
        className="relative z-10 w-full max-w-md
        rounded-2xl p-8
        bg-white/10 backdrop-blur-xl
        border border-white/20
        shadow-[0_20px_50px_rgba(0,0,0,0.4)]
        text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-2">
          {state === "Sign Up" ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-sm text-gray-300 mb-8">
          {state === "Sign Up"
            ? "Sign up to get started"
            : "Login to continue"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <InputField
              icon={assets.person_icon}
              placeholder="Full Name"
              value={name}
              onChange={setName}
            />
          )}

          <InputField
            icon={assets.mail_icon}
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
          />

          <InputField
            icon={assets.lock_icon}
            placeholder="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />

          {state === "Sign Up" && (
            <>
              <InputField
                icon={assets.person_icon}
                placeholder="Age"
                type="number"
                value={age}
                onChange={setAge}
              />
              <InputField
                icon={assets.person_icon}
                placeholder="Phone Number"
                value={phone}
                onChange={setPhone}
              />
              <InputField
                icon={assets.person_icon}
                placeholder="Address"
                value={address}
                onChange={setAddress}
              />
            </>
          )}

          <p
            onClick={() => navigate("/reset-password")}
            className="text-sm text-indigo-400 hover:text-indigo-300 cursor-pointer mb-6"
          >
            Forgot password?
          </p>

          <button
            type="submit"
            className="w-full py-3 rounded-xl
            bg-gradient-to-r from-indigo-500 to-indigo-900
            hover:scale-[1.02] transition
            font-semibold"
          >
            {state}
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-6">
          {state === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            onClick={() =>
              setState(state === "Sign Up" ? "Login" : "Sign Up")
            }
            className="text-indigo-400 underline cursor-pointer"
          >
            {state === "Sign Up" ? "Login" : "Sign Up"}
          </span>
        </p>

        <p className="text-center text-xs text-gray-400 mt-4">
          Staff member?{" "}
          <span
            onClick={() => navigate("/admin/login")}
            className="text-red-400 underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

/* 🔹 Reusable Modern Input */
const InputField = ({ icon, placeholder, type = "text", value, onChange }) => (
  <div
    className="flex items-center gap-3 mb-4
    px-4 py-3 rounded-xl
    bg-white/10 border border-white/20
    focus-within:border-indigo-400
    transition"
  >
    <img src={icon} alt="" className="w-5 opacity-80" />
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      className="w-full bg-transparent outline-none
      text-sm text-white placeholder-gray-400"
    />
  </div>
);

export default Login;
