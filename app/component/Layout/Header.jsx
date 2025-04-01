'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Navigation from './Navigation';
import Logo from '../../../public/assets/logo.png';
import { FaBars } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-full  border-b border-b-[#ffffff32] bg-white shadow-md">
            {/* Desktop Header */}
            <div className="hidden md:flex items-center justify-between w-[90%] mx-auto">
                <Link href="/">
                    <Image src={Logo} alt="Logo" className="w-25 h-25" />
                </Link>
                <Navigation activeItem={0} />
            </div>
            
            {/* Mobile Header */}
            <div className="w-full md:hidden flex items-center justify-between px-4">
                <Link href="/">
                    <Image src={Logo} alt="Logo" className="w-10 h-10" />
                </Link>
                <button className="text-black  p-2 rounded-full" onClick={() => setIsOpen(true)}>
                    <FaBars size={24} />
                </button>
            </div>
            
            {/* Mobile Navigation Menu */}
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white w-[80%] max-w-md p-6 rounded-lg shadow-lg relative">
                        <button className="absolute top-4 right-4 text-blue-500 p-2" onClick={() => setIsOpen(false)}>
                            <RxCross1 size={24} />
                        </button>
                        <Navigation activeItem={1} />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
