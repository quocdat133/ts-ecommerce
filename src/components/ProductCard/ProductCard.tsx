import React from "react";
import RateComponent from "../RateComponent/RateComponent";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image?: string;
  title?: string;
  price?: string;
  showRating?: boolean;
  discountPrice?: string;
  discount?: string;
  className?: string;
  imageClassName?: string; // Thêm class riêng cho image
  titleClassName?: string;
  priceClassName?: string;
  discountClassName?: string;
  discountPriceClassName?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  titleClassName,
  price,
  priceClassName,
  discount,
  discountClassName,
  discountPrice,
  discountPriceClassName,
  showRating = true,
  className, // Class cho container
  imageClassName = "w-full h-auto", // Class cho image
  ...rest
}) => {
  return (
    <div className={className} {...rest}>
      <img src={image} alt={title} className={imageClassName} />
      {title && <p className={titleClassName}>{title}</p>}
      {showRating && (
        <p className="my-5">
          <RateComponent />
        </p>
      )}
      <div className="flex space-x-5">
        {discountPrice && (
          <p className={discountPriceClassName}>{discountPrice}</p>
        )}
        {price && <p className={priceClassName}>{price}</p>}
        {discount && <p className={discountClassName}>{discount}</p>}
      </div>
    </div>
  );
};

export default ProductCard;
