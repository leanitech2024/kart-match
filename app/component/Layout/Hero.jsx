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
        <div className="w-full lg:w-1/2 flex flex-col  md:justify-center gap-5 items-start relative h-[500px] lg:h-[550px]">
      
          <div className="z-10 mt-[-80px] -ml-[50px] hidden md:block">
            <Image src={Hero1} alt="Hero 1" width={200} height={250} />
          </div>

          <h1 className="text-4xl  md:text-6xl lg:text-7xl font-bold font-serif z-10">
            It's a MATCH!
          </h1>

          <h2 className="text-base md:text-lg lg:text-xl max-w-md z-10">
            Street food is a love affair—hot, spicy, and oh-so-satisfying.
          </h2>

          <Link href="/blog">
            <button className="bg-[#FF9534] md:mt-10 text-white text-xl py-4 px-10 rounded-md hover:bg-white hover:text-black transition duration-300 z-10">
              More info →
            </button>
          </Link>
        </div>

        <div className="w-full lg:w-1/2 flex items-end justify-center relative md:mt-80 lg:mt-0">
          {/* Speech Bubble with Text */}
          <div className="absolute top-0 right-0 mt-[95px] mr-[-150px] hidden md:block">
            <Image src={Hero3} alt="Speech Bubble" width={400} />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <h1 className="text-xl mb-8 md:text-2xl lg:text-4xl font-bold font-serif text-black">
                Always <br /> Hungry!
              </h1>
            </div>
          </div>

          <Image src={Hero2} alt="Hero 2" width={550} height={850} className="relative z-10 mt-30 md:mt-45 md:mr-20" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
