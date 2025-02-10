import React, { useState } from "react";
import { Product } from "../../api/productApi/type";
import { DeleteFilled } from "@ant-design/icons";

interface OrderCartProps {
  items: Product[];
}

interface Quantities {
  [key: string]: number; // Changed from number to string to match Product id type
}

const OrderCart: React.FC<OrderCartProps> = ({ items }) => {
  const [quantities, setQuantities] = useState<Quantities>(
    Object.fromEntries(items.map((item) => [item.id, 1]))
  );

  const calculateFinalPrice = (
    basePrice: number,
    discountPercentage: number
  ): number => {
    return basePrice * (1 - discountPercentage / 100);
  };

  const updateQuantity = (id: string, delta: number): void => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(
        1,
        Math.min(
          prev[id] + delta,
          items.find((item) => item.id === id)?.stock || 1
        )
      ),
    }));
  };

  return (
    <div className="max-w-md mx-0 p-4 space-y-4">
      {items.map((item: Product) => {
        const finalPrice = calculateFinalPrice(
          item.basePrice,
          item.discountPercentage
        );

        return (
          <div
            key={item.id}
            className="flex items-center space-x-4 p-4 bg-white border-b-2"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
              <img
                src={item.picture}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-grow">
              <div className="flex justify-between">
                <h3 className="font-medium text-lg">{item.name}</h3>
                <DeleteFilled className="text-[#FF3333]" />
              </div>
              <div className="text-sm text-gray-600">
                <p>Stock: {item.stock}</p>
                {item.discountPercentage > 0 && (
                  <p className="text-red-500">
                    Discount: {item.discountPercentage}%
                  </p>
                )}
              </div>
              <div className="flex justify-between">
                <div className="mt-1">
                  {item.discountPercentage > 0 && (
                    <span className="line-through text-gray-500 mr-2">
                      ${item.basePrice.toFixed(2)}
                    </span>
                  )}
                  <span className="font-bold">${finalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center bg-gray-100 rounded-lg">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-l-lg"
                    disabled={quantities[item.id] <= 1}
                  >
                    −
                  </button>
                  <span className="px-4 py-1">{quantities[item.id]}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-r-lg"
                    disabled={quantities[item.id] >= item.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderCart;
