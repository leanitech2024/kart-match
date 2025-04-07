import Image from "next/image";
import Hand from "../../../public/assets/Hand.png";
import Tongue from "../../../public/assets/Tongue.png";
import Man from "../../../public/assets/Man.png";

const cardData = [
  {
    image: Hand,
    title: "HYGIENE",
    description: "Good hygiene is the secret ingredient in every perfect plate of chaat!",
    color: "#3FA025",
  },
  {
    image: Tongue,
    title: "TASTE",
    description: "It's the ultimate balance of flavors, isn't it?",
    color: "#3FA025",
    scaleUp: true,
  },
  {
    image: Man,
    title: "HOSPITALITY",
    description: "Chaat vendor’s stall feels like the calm in the storm.",
    color: "#3FA025",
  },
];

const Preferences = () => {
  return (
    <div className=" w-full py-10 px-6 ">
      {/* Title Section */}
      <h1 className="text-4xl font-semibold text-gray-600">
        PICK <span className="text-green-600">ANY 2</span> Preferences
      </h1>

      {/* Card Section */}
      <div className="mt-10 flex flex-wrap justify-around text-center gap-6">
        {cardData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center h-60 w-70 rounded-4xl shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300"
            style={{ backgroundColor: item.color }}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={item.title === "TASTE" ? 80 : 40}
              height={item.title === "TASTE" ? 20 : 40}
              className="object-contain"
            />
            <h2 className="text-xl text-white font-semibold mt-4">{item.title}</h2>
            <p className="text-lg text-white px-4 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preferences;
