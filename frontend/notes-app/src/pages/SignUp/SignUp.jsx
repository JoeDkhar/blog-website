import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { validateEmail, validatePassword, confirmPassword, validateName } from "../../utils/helper";
import PasswordInput from "../../components/Input/PasswordInput";
import Confetti from 'react-confetti';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [error, setError] = useState(null);

  const [isNameValid, setIsNameValid] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(null);

  const [showConfetti, setShowConfetti] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateName(name)) {
      setIsNameValid(false);
      setError("Name must be at least 5 characters long.");
      valid = false;
    } else {
      setIsNameValid(true);
    }

    if (!validateEmail(email)) {
      setIsEmailValid(false);
      setError("Please enter a valid email address.");
      valid = false;
    } else {
      setIsEmailValid(true);
    }

    if (!validatePassword(password)) {
      setIsPasswordValid(false);
      setError("Please enter the password with minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.");
      valid = false;
    } else {
      setIsPasswordValid(true);
    } 

    if (!confirmPassword(password, confirmPasswordValue)) {
      setIsConfirmPasswordValid(false);
      setError("Passwords do not match.");
      valid = false;
    } else {
      setIsConfirmPasswordValid(true);
    }

    if (!valid) return;

    setError('');

    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });
      
      if(response.data && response.data.error){
        setError(response.data.message);
        return;
      }

      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken);
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
          navigate('/dashboard');
        }, 3000);
      }

    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
          colors={['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']}
        />
      )}
      {/* Blue Decorative Shapes */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500 to-blue-600 rounded-full blur-xl opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full blur-xl opacity-70"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isNameValid === null ? 'border-gray-300' : isNameValid ? 'border-green-500' : 'border-red-500'
              }`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setIsNameValid(validateName(e.target.value));
              }}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isEmailValid === null ? 'border-gray-300' : isEmailValid ? 'border-green-500' : 'border-red-500'
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailValid(validateEmail(e.target.value));
              }}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <PasswordInput
              id="password"
              placeholder="Enter your password"
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isPasswordValid === null ? 'border-gray-300' : isPasswordValid ? 'border-green-500' : 'border-red-500'
              }`}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsPasswordValid(validatePassword(e.target.value));
              }}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <PasswordInput
              id="confirmPassword"
              placeholder="Confirm your password"
              className={`w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isConfirmPasswordValid === null ? 'border-gray-300' : isConfirmPasswordValid ? 'border-green-500' : 'border-red-500'
              }`}
              value={confirmPasswordValue}
              onChange={(e) => {
                setConfirmPasswordValue(e.target.value);
                setIsConfirmPasswordValid(confirmPassword(password, e.target.value));
              }}
            />
          </div>

          {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

          <div className="flex items-center justify-between mb-6">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create Account
            </button>
          </div>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
