import React from "react";

const reviews = [
  {
    name: "Ayesha Khan",
    review: "Amazing quality and fast delivery! Will order again.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Rohan Mehta",
    review: "Great variety of products. Loved the fruits section.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
  },
  {
    name: "Sara Fernandes",
    review: "Affordable prices and everything was fresh.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
];

const CustomerReviews = () => {
  return (
    <div className="my-10 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-green-700">
        Customer Reviews
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-gray-100 shadow p-4 rounded-md hover:shadow-md transition">
            <div className="flex items-center gap-4 mb-3">
              <img
                src={review.image}
                alt={review.name}
                className="w-14 h-14 rounded-full border"
              />
              <div>
                <h3 className="font-semibold">{review.name}</h3>
                <div className="text-yellow-500 text-sm">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
