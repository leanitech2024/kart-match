"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Logo from "../../../public/assets/logo.png";
import { FaBars } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { FiSun } from "react-icons/fi";
import { motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false); // initially false

  // Handle scroll for sticky effect
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    const handleResize = () => {
      setShowHamburger(window.innerWidth < 1000);
    };

    handleScroll();
    handleResize(); // check on load

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavClick = (index) => {
    setActiveItem(index);
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 bg-white transition-all duration-300 ${
        isSticky ? "shadow-lg" : ""
      }`}
    >
      {/* Desktop Header */}
      {!showHamburger && (
        <div className="flex items-center justify-between w-[90%] mx-auto py-2">
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo"
              className="w-20 h-20 transition-all duration-300"
            />
          </Link>
          <Navigation activeItem={activeItem} onNavClick={handleNavClick} />
          <FiSun size="25" color="black" />
        </div>
      )}

      {/* Mobile Header */}
      {showHamburger && (
        <div className="w-full flex items-center justify-between px-5 py-3">
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo"
              className="w-16 h-16 transition-all duration-300"
            />
          </Link>
          <button
            className="text-black p-2 border border-gray-300 rounded-md"
            onClick={() => setIsOpen(true)}
          >
            <FaBars size={34} />
          </button>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-white bg-opacity-50 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-[80%] max-w-md p-6 rounded-lg shadow-lg relative"
          >
            <button
              className="absolute top-4 right-4 text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              <RxCross1 size={24} />
            </button>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={menuVariants}
            >
              <Navigation activeItem={activeItem} onNavClick={handleNavClick} />
            </motion.div>
          </motion.div>
        </div>
      )}
    </header>
  );
};

const menuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export default Header;
