"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

// Static Product Data
const productData = [
  {
    id: "1",
    name: 'Hoodie For Mens',
    price: 212,
    rating: 5,
    description: "Stylish hoodie made for comfort and durability.",
    image: "/cloth1.jpg",
  },
  {
    id: "2",
    name: 'T-Shirts For Mens',
    price: 145,
    rating: 3,
    description: "Casual t-shirt for everyday wear.",
    image: "/cloth2.jpeg",
  },
  {
    id: "3",
    name: 'Trousers For Women',
    price: 80,
    rating: 4,
    description: "Stylish hoodie made for comfort and durability.",
    image: "/5.jpeg",
  },
  {
    id: "4",
    name: 'Fits Bermuda T-Shirts',
    price: 210,
    rating: 5,
    description: "Stylish hoodie made for comfort and durability.",
    image: "/2.jpg",
  },
  {
    id: "5",
    name: "Hoodie For Mens",
    price: 212,
    rating: 5,
    description: "Stylish hoodie made for comfort and durability.",
    image: "/1.jpg",
  },
  {
    id: "6",
    name: "T-Shirts For Mens",
    price: 145,
    rating: 3,
    description: "Casual t-shirt for everyday wear.",
    image: "/cloth2.jpeg",
  },
  {
    id: "7",
    name: "Loose Fits Bermuda Shorts",
    price: 80,
    rating: 4,
    description: "Comfortable shorts perfect for summer.",
    image: "/3.jpeg",
  },
  {
    id: "8",
    name: "Fits Bermuda T-Shirts",
    price: 210,
    rating: 5,
    description: "High-quality t-shirt for a relaxed fit.",
    image: "/2.jpg",
  },
  {
    id: "9",
    name: "Fits Bermuda T-Shirts",
    price: 189,
    rating: 5,
    description: "High-quality t-shirt for a relaxed fit.",
    image: "/6.jpeg",
  },
  {
    id: "10",
    name: "Fits Bermuda T-Shirts",
    price: 110,
    rating: 5,
    description: "High-quality t-shirt for a relaxed fit.",
    image: "/7.jpeg",
  },
];

const reviews = [
  {
    id: 1,
    name: "Samantha D.",
    rating: 5,
    comment: "I love this product! The design is unique and fits perfectly.",
    date: "August 14, 2023",
  },
  {
    id: 2,
    name: "Alex M.",
    rating: 4,
    comment: "Great quality! Comfortable and stylish.",
    date: "August 10, 2023",
  },
];

export default function ProductPage() {
  const { id } = useParams(); // Get the product ID from the URL
  const router = useRouter(); // For navigation
  const product = productData.find((p) => p.id === id);

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (!product) {
    return <div>Product not found!</div>;
  }

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleSuggestionClick = (suggestedId: string) => {
    router.push(`/shop/${suggestedId}`); // Navigate to the suggested product's detail page
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Details */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="rounded-lg"
        />

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-700 mt-4">{product.description}</p>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-2xl font-bold text-green-600">${product.price}</span>
            <span className="text-yellow-500">★ {product.rating}/5</span>
          </div>

          {/* Size Selector */}
          <div className="mt-6">
            <h2 className="font-semibold text-gray-700">Select Size</h2>
            <div className="flex gap-4 mt-2">
              {["Small", "Medium", "Large", "X-Large"].map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size ? "bg-black text-white" : "bg-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize && (
              <p className="text-sm text-green-600 mt-2">
                Selected Size: {selectedSize}
              </p>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex gap-4 mt-6">
            <div className="flex items-center border rounded">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-2 text-xl"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-2 text-xl"
              >
                +
              </button>
            </div>
            <button className="px-6 py-2 bg-black text-white rounded-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <div className="flex flex-col gap-4 mt-4">
          {reviews.map((review) => (
            <div key={review.id} className="p-4 border rounded-md shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">{review.name}</span>
                <span className="text-yellow-500">★ {review.rating}/5</span>
              </div>
              <p className="text-gray-600 mt-2">{review.comment}</p>
              <span className="text-sm text-gray-400">Posted on {review.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested Products */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {productData
            .filter((p) => p.id !== product.id) // Exclude the current product
            .map((suggestedProduct) => (
              <div
                key={suggestedProduct.id}
                onClick={() => handleSuggestionClick(suggestedProduct.id)}
                className="border rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-lg transition-shadow"
              >
              <Link href={`/product/${product.id}`}>
                <Image
                  src={suggestedProduct.image}
                  alt={suggestedProduct.name}
                  className="object-cover w-[300px] h-[300px] rounded-[20px]"
                width={300}
                height={300}
                />
                <h3 className="text-md font-medium mt-2">{suggestedProduct.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-green-600">
                    ${suggestedProduct.price}
                  </span>
                  <span className="text-yellow-500">
                    ★ {suggestedProduct.rating}/5
                  </span>
                </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}


