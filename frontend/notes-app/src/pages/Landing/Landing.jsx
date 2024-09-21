import React from 'react';
import { Link } from 'react-router-dom';
import notesImage from '../../assets/images/notes.jpg';

const Landing = () => {
  return (
    <>
      <div
        className="relative flex flex-col min-h-screen bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${notesImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <nav className="relative bg-gray-800 bg-opacity-25 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">Notely</h1>
            <div>
              <Link to="/Login" className="px-4 py-2 mr-2 bg-gray-700 hover:bg-gray-800 rounded">Login</Link>
              <Link to="/signUp" className="px-4 py-2 bg-black hover:bg-gray-800 rounded">Sign Up</Link>
            </div>
          </div>
        </nav>

        <div className="relative flex flex-grow items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Notely</h1>
            <p className="text-xl mb-6">Your personal space to jot down ideas and keep track of your thoughts.</p>
            <Link to="/signUp" className="px-4 py-2 bg-black hover:bg-gray-800 rounded">Get Started</Link>
          </div>
        </div>

        <footer className="relative bg-gray-800 bg-opacity-25 text-white p-4">
          <div className="container mx-auto text-center">
            <p className="mb-4">&copy; 2024 Notely. All rights reserved.</p>
            <div className="flex justify-center space-x-6 mt-2">
              <a href="https://www.facebook.com" className="text-blue-400" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <a href="https://www.twitter.com" className="text-blue-400" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <a href="https://www.instagram.com" className="text-pink-400" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Landing;