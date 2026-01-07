import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from 'axios';
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import NewLogo from '../assets/LogoNew.png';

function Login() {
  const navigate = useNavigate();
  const { setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState("login");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [isLoading,setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      if (state === 'Sign Up') {

        setIsLoading(true)

        const { data } = await axios.post('http://localhost:4000/api/auth/register', {
          name,
          email,
          password,
          age,
          phone,
          address
        });

        setIsLoading(false);

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/');
        } else {
          toast.error(data.message);
        }


      } else {

        setIsLoading(true);
        const { data } = await axios.post('http://localhost:4000/api/auth/login', {
          email,
          password
        });

        setIsLoading(false);

        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (

    isLoading ? <LoadingSpinner/> :

    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-white">
      <img
        onClick={() => navigate('/')}
        src={NewLogo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-black/90 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up" ? "Create your account" : "Login to your account"}
        </p>

        <form onSubmit={onSubmitHandler} className="text-sm mb-6">
          {state === "Sign Up" && (
            <div className="flex mb-4 items-center gap-3 w-full px-5 py-2.5 rounded-xl bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                className="bg-transparent outline-none"
                type="text"
                placeholder="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="flex mb-4 items-center gap-3 w-full px-5 py-2.5 rounded-xl bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              className="bg-transparent outline-none"
              type="email"
              placeholder="Email id"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex mb-4 items-center gap-3 w-full px-5 py-2.5 rounded-xl bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              className="bg-transparent outline-none"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {state === "Sign Up" && (
            <>
              <div className="flex mb-4 items-center gap-3 w-full px-5 py-2.5 rounded-xl bg-[#333A5C]">
                <img src={assets.person_icon} alt="" />
                <input
                  className="bg-transparent outline-none"
                  type="number"
                  placeholder="Age"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="flex mb-4 items-center gap-3 w-full px-5 py-2.5 rounded-xl bg-[#333A5C]">
                <img src={assets.person_icon} alt="" />
                <input
                  className="bg-transparent outline-none"
                  type="text"
                  placeholder="Phone Number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="flex mb-4 items-center gap-3 w-full px-5 py-2.5 rounded-xl bg-[#333A5C]">
                <img src={assets.person_icon} alt="" />
                <input
                  className="bg-transparent outline-none"
                  type="text"
                  placeholder="Address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </>
          )}

          <p onClick={() => navigate('/reset-password')} className="mb-4 text-indigo-300 cursor-pointer">
            Forgot password?
          </p>

          <button className="w-full py-2.5 rounded-xl cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium">
            {state}
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-4">
          {state === "Sign Up" ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
            className="cursor-pointer underline text-blue-400"
          >
            {state === "Sign Up" ? "Login here" : "Sign Up"}
          </span>
        </p>

        <p className="text-center text-gray-400 text-xs mt-4">
          Staff Member?{" "}
          <span onClick={() => navigate('/admin/login')} className="cursor-pointer underline text-red-700">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
