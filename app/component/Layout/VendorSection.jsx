import Image from "next/image";
import Vendor1 from '../../../public/assets/Vendor1.png'
import Vendor2 from '../../../public/assets/Vendor2.png'
import Vendor3 from '../../../public/assets/Vendor3.png'
import Vendor4 from '../../../public/assets/Vendor4.png'
import Vendor5 from '../../../public/assets/Vendor5.png'
const vendors = [
  {
    image: Vendor1,
    title: "VADA PAU SELLER",
    item: "Vada Pau",

  },
  {
    image: Vendor2,
    title: "GOOGHNI SELLER",
    item: "Googhni",

  },
  {
    image: Vendor3,
    title: "DOSA SELLER",
    item: "Dosa and Idli",
  
  },
  {
    image: Vendor4,
    title: "PUCHKA",
    item: "Chanachur Garam",
 
  },
  {
    image: Vendor5,
    title: "CHANACHUR",
    item: "Chanachur Garam",
   
  },
];

const VendorSection = () => {
  return (
    <div className=" py-12 px-6 p-4">
      {/* Title Section */}
      <h2 className="text-3xl font-bold text-gray-600  mb-8">
        MEET THE <span className="text-green-600">VENDORS</span>
      </h2>

      {/* Vendor Cards */}
      <div className="flex flex-wrap  justify-evenly gap-2 ">
        {vendors.map((vendor, index) => (
          <div key={index} className="text-center ">
            {/* Vendor Image */}
            <div className="w-34 h-44 mx-auto ">
              <Image
                src={vendor.image}
                alt={vendor.title}
            
                className="rounded-full object-cover"
              />
            </div>
            {/* Vendor Card */}
            <div
              className={`p-8 rounded-2xl text-white  font-semibold shadow-3xl bg-[#22343D]`}
            >
              <h3 className="font-xl">{vendor.title}</h3>
              <p className="text-lg font-medium">{vendor.item}</p>
              <p className="text-md">HYGIENE RATING: 4</p>
              <p className="text-md">TASTE RATING: 4</p>
              <p className="text-md">HOSPITALITY: 4</p>
              <button className="mt-2 text-sm ">GET DIRECTIONS</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorSection;
