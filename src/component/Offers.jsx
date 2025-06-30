import React from "react";
import BuyImage from "../assets/Buy.png.jpeg";
import DairyImage from "../assets/Dairy.png.jpeg";
import FreeImage from "../assets/Free.png.jpeg";
import BakeryImage from "../assets/Bakery.png.jpeg";

const offers = [
  {
    title: "Buy 1 Get 1 Free",
    description: "On selected fresh fruits and vegetables.",
    image: BuyImage,
  },
  {
    title: "10% Off on Dairy",
    description: "Save on milk, cheese, curd & more!",
    image: DairyImage,
  },
  {
    title: "Free Delivery Over ₹199",
    description: "No delivery charges on orders above ₹199.",
    image: FreeImage,
  },
  {
    title: "Bakery Bonanza!",
    description: "Flat ₹20 off on breads, muffins & pastries.",
    image: BakeryImage,
  },
];

const Offers = () => {
  return (
    <div className="my-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        Today’s Offers & Deals
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {offers.map((offer, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-52 object-contain p-0 hover:p-2 transition-all duration-300"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-green-600">
                {offer.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1">{offer.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
