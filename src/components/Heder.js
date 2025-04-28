import React, { useState, useEffect } from "react";
import { PlusIcon, UserIcon, MenuIcon, XIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/footer/logo1.png";

const Header = () => {
    const navigate = useNavigate();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) setUser(JSON.parse(userData));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setShowLogoutConfirm(false);
        navigate("/login");
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-blue-950 text-white flex items-center justify-between px-4 md:px-8 h-16">
                {/* Logo */}
                <div className="flex items-center space-x-2 text-xl font-bold">
                    <Link to="/">
                        <img src={logo} alt="Accomate Logo" className="h-10 w-auto" />
                    </Link>
                    <span>ACCOMATE</span>
                </div>

                {/* Mobile menu toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(v => !v)}
                    className="md:hidden p-2"
                >
                    {isMobileMenuOpen ? (
                        <XIcon className="h-6 w-6 text-white" />
                    ) : (
                        <MenuIcon className="h-6 w-6 text-white" />
                    )}
                </button>

                {/* Nav links */}
                <nav
                    className={`
            absolute top-16 left-0 w-full bg-blue-950 md:bg-transparent
            ${isMobileMenuOpen ? "block" : "hidden"} 
            md:static md:block md:w-auto md:flex md:space-x-6
          `}
                >
                    {["Home", "Rooms", "Annex", "House"].map((label) => (
                        <Link
                            key={label}
                            to={`/${label.toLowerCase()}`}
                            className="block px-4 py-2 hover:text-yellow-400 md:py-0"
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Right actions */}
                <div className="flex items-center space-x-4">
                    <Link
                        to="/post-ad"
                        className="hidden md:flex items-center space-x-1 bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-medium py-2 px-4 rounded-full"
                    >
                        <PlusIcon className="h-5 w-5" />
                        <span>Post Ad</span>
                    </Link>

                    <div className="relative">
                        <button
                            onClick={() => setIsProfileMenuOpen(v => !v)}
                            className="flex items-center space-x-2 bg-white text-blue-950 px-3 py-1 rounded-full"
                        >
                            <UserIcon className="h-5 w-5" />
                            <span className="truncate max-w-[6rem]">
                {user?.email ?? "Profile"}
              </span>
                        </button>

                        {isProfileMenuOpen && (
                            <div className="absolute right-0 mt-2 w-44 bg-white text-blue-950 rounded shadow-md overflow-hidden">
                                {user ? (
                                    <>
                                        <button
                                            onClick={() => setShowLogoutConfirm(true)}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                        <Link
                                            to="/my-ads"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            My Ads
                                        </Link>
                                        <Link
                                            to="/saved-ads"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Saved Ads
                                        </Link>
                                        <Link
                                            to="/user-dashboard"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Dashboard
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/admin-dashboard"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="block px-4 py-2 hover:bg-gray-100"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Logout Confirmation */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 text-center">
                        <p className="mb-4 font-semibold text-gray-800">
                            Are you sure you want to logout?
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Yes, Logout
                            </button>
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
