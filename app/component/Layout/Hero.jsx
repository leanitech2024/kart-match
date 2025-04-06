import Link from 'next/link';
import Image from 'next/image';
import Hero1 from '../../../public/assets/Hero1.png';
import Hero2 from '../../../public/assets/Hero2.png';
import Hero3 from '../../../public/assets/speech-bubble.png';

const Hero = () => {
  return (
    <section className="bg-[#F51F1F] min-h-screen w-full flex items-center justify-center px-4 md:px-10 lg:px-16 py-12 overflow-hidden">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-6xl mx-auto relative">
        {/* Left Side Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start space-y-4  lg:mt-0 relative">
          <div className="absolute top-0 left-0 -mt-44 mb-4 z-0 hidden md:block">
            <Image src={Hero1} alt="Hero 1" width={200} height={200} />
          </div>

          <h1 className="text-4xl mt-6 md:text-5xl lg:text-6xl font-bold font-serif z-10">It's a MATCH!</h1>
          <h2 className="text-base md:text-lg lg:text-xl max-w-md z-10">
            Street food is a love affair—hot, spicy, and oh-so-satisfying.
          </h2>
          <Link href="/blog">
            <button className="bg-[#FF9534] text-black py-3 px-6 rounded-md hover:bg-white hover:text-black transition duration-300 z-10">
              More info →
            </button>
          </Link>
        </div>

        {/* Right Side Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative md:mt-30 lg:mt-0">
          {/* Speech Bubble with Text */}
          <div className="absolute top-0 right-0 mt-[-60px] mr-[-40px] hidden md:block">
            <Image src={Hero3} alt="Speech Bubble" width={350} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h1 className="text-xl mb-8 md:text-2xl lg:text-3xl font-bold font-serif text-black">
                Always <br /> Hungry!
              </h1>
            </div>
          </div>

          {/* Character Image */}
          <Image src={Hero2} alt="Hero 2" width={450} height={350} className="relative z-10 md:mr-40" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
