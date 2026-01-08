import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import NewLogo from "../assets/LogoNew.png";
import BgImg from "../assets/backgroundImage.png";

import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Calendar
} from "lucide-react";

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

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BgImg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/10 via-blue-900 to-blue-100/10 backdrop-blur-md" />

      <img
        src={NewLogo}
        alt="logo"
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 w-28 cursor-pointer z-10"
      />

      <div
        className="relative z-10 w-full max-w-md rounded-2xl p-8
        bg-white/10 backdrop-blur-xl border border-white/20
        shadow-[0_20px_50px_rgba(0,0,0,0.4)]
        text-white mt-20 mb-10"
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
              Icon={User}
              placeholder="Full Name"
              value={name}
              onChange={setName}
            />
          )}

          <InputField
            Icon={Mail}
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
          />

          <InputField
            Icon={Lock}
            placeholder="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />

          {state === "Sign Up" && (
            <>
              <InputField
                Icon={Calendar}
                placeholder="Age"
                type="number"
                value={age}
                onChange={setAge}
              />

              <InputField
                Icon={Phone}
                placeholder="Phone Number"
                value={phone}
                onChange={setPhone}
              />

              <InputField
                Icon={MapPin}
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
            hover:scale-[1.02] transition font-semibold"
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

const InputField = ({
  Icon,
  placeholder,
  type = "text",
  value,
  onChange
}) => (
  <div
    className="group flex items-center gap-3 mb-4
    px-4 py-3 rounded-xl
    bg-white/10 border border-white/20
    focus-within:border-indigo-400 transition"
  >
    <Icon
      size={20}
      className="text-gray-400 group-focus-within:text-indigo-400"
    />
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
