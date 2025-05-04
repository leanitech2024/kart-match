import Link from 'next/link';
import Image from 'next/image';
import Hero1 from '../../../public/assets/Hero1.png';
import banner from '../../../public/assets/banner.png';

const Hero = () => {
  return (
    <section className="relative bg-[#F51F1F] min-h-screen flex items-center justify-center px-4 md:px-10 lg:px-16 overflow-hidden">
      {/* Optional: Background Banner Image */}
      {/* <div className="absolute inset-0 opacity-30 z-0">
        <Image src={banner} alt="Banner Background" layout="fill" objectFit="cover" />
      </div> */}

      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-6xl mx-auto">
        {/* Left Side Content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-5 items-start justify-center relative lg:h-[550px]">
          {/* Decorative Image */}
          <div className="absolute -top-16 -left-12 hidden md:block z-20">
            <Image src={Hero1} alt="Hero Decorative" width={200} height={250} />
          </div>

          <h1 className="text-4xl sm:mt-14 md:text-6xl lg:text-7xl font-bold font-serif z-10">
            It's a MATCH!
          </h1>

          <p className="text-base md:text-lg lg:text-xl max-w-md z-10">
            Street food is a love affair—hot, spicy, and oh-so-satisfying.
          </p>

          <Link href="/blog" passHref className="py-2">
            <div className="bg-[#FF9534] mt-4 md:mt-10  text-white text-xl py-4 px-10 rounded-md hover:bg-white hover:text-black transition duration-300 z-10">
              More info →
            </div>
          </Link>
        </div>

        {/* Right Side Content - Lottie Animation */}
        <div className="w-full lg:w-1/2 flex items-end justify-center relative  md:mt-10 lg:mt-0 z-10">
          <iframe
            src="https://lottie.host/embed/4b9ce18c-2165-4f73-9d33-7fcd67b65620/asJHwsbvBb.lottie"
            style={{ width: 550, height: 850 }}
            frameBorder="0"
            allowFullScreen
            title="Street Food Animation"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Hero;
