import Image from "next/image";
import Gallery1 from '../../../public/assets/Gallery1.png';
import Gallery2 from '../../../public/assets/Gallery2.png';
import Gallery3 from '../../../public/assets/Gallery3.png';
import Gallery4 from '../../../public/assets/Gallery4.png';
import Gallery5 from '../../../public/assets/Gallery5.png';
import Gallery6 from '../../../public/assets/Gallery6.png';

const images = [
  Gallery1,
  Gallery2,
  Gallery3,
  Gallery4,
  Gallery5,
  Gallery6
];

const Gallery = () => {
  return (
    <div className=" py-10 px-6 w-full">
      {/* Title Section */}
      <h1 className="text-3xl font-semibold text-gray-600 text-left">
        FROM OUR USER <span className="text-green-600">GALLERY</span>
      </h1>
      
      {/* Image Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-3xl shadow-lg w-full h-80">
            <Image 
              src={src} 
              alt={`Gallery Image ${index + 1}`} 
              width={300} 
              height={300} 
              className="object-cover w-full h-full" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
