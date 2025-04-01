import Image from "next/image";
import Header from '../app/component/Layout/Header'
import Hero from '../app/component/Layout/Hero'
import Preferences from '../app/component/Layout/Preferences'
import BlogSection from '../app/component/Layout/BlogSection'
import VendorSection from '../app/component/Layout/VendorSection'
import Swipe from '../app/component/Layout/Swipe'
import Footer from '../app/component/Layout/Footer'
import Gallery from '../app/component/Layout/Gallery'
export default function Home() {
  return (
    <div className=''>
       <Header/>
       <Hero/>
       <Preferences/>
       <BlogSection/>
       <VendorSection/>
       <Gallery/>
       <Swipe/>
       <Footer/>
    </div>
  );
}
