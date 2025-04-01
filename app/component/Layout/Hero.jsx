import Link from 'next/link';
import Image from 'next/image';
import Hero1 from '../../../public/assets/Hero1.png';
import Hero2 from '../../../public/assets/Hero2.png';
import Hero3 from '../../../public/assets/speech-bubble.png';

const Hero = () => {
    return (
        <section className="bg-[#F51F1F] min-h-screen flex items-center justify-center px-6 md:px-16 text-black w-full overflow-hidden">
    <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full mx-auto">
                
                {/* Left Side Content */}
                <div className="md:w-1/2 flex flex-col items-start text-left space-y-4">
                    <Image src={Hero1} alt="Hero 1" width={250} height={400} className="mb-2 absolute top-25" />
                    <h1 className="text-7xl mt-4 font-bold font-serif">It's a MATCH!</h1>
                    <h2 className="text-xl  max-w-md">
                        Street food is a love affair—hot, spicy, and oh-so-satisfying.
                    </h2>
                    <Link href="/blog">
                        <button className="bg-[#FF9534] text-black py-3 px-6 rounded-md hover:bg-gray-100 transition duration-300">
                            More info →
                        </button>
                    </Link>
                </div>

                {/* Right Side Content */}
                <div className="md:w-1/2 flex items-center justify-end relative">
                    {/* Speech Bubble with Text Inside */}
                    <div className="absolute -top-20 -right-50 flex items-center justify-center">
                        <Image src={Hero3} alt="Speech Bubble" width={350}  />
                        <h1 className="absolute top-20 text-3xl font-bold font-serif text-black text-center">
                            Always <br /> Hungry!
                        </h1>
                    </div>
                    
                    {/* Character Image */}
                    <Image src={Hero2} alt="Hero 2" width={500} height={400} className="mt-4" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
