import { CheckOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import Breadcrumb from "../../components/BreadcrumbComponent/BreadcrumbComponent";
import HeaderComponent from "../../components/Header/HeaderComponent";
import ProductCard from "../../components/ProductCard/ProductCard";
import RateComponent from "../../components/RateComponent/RateComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import TestimonialGrid from "../../components/TestimonialCard/TestimonialCard";
import FooterComponent from "../../components/FooterComponent/FooterComponent";


const ProductDetailPage = () => {
  const testimonialData = [
    {
      name: "Samantha D.",
      verified: true,
      rating: 4.5,
      content:
        "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
      date: "Posted on August 14, 2023",
    },
    {
      name: "Samantha D.",
      verified: true,
      rating: 4.5,
      content:
        "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
      date: "Posted on August 14, 2023",
    },
    {
      name: "Samantha D.",
      verified: true,
      rating: 4.5,
      content:
        "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
      date: "Posted on August 14, 2023",
    },
  ];



  return (
    <div className="h-screen">
      <HeaderComponent />
      <hr className="mx-[15px] lg:mx-[100px]" />
      {/* navigate link */}
      <section className="mx-0 w-full max-w-full mb-[20px] lg:mx-[100px] ">
        <Breadcrumb />
      </section>
      {/* product */}
      <section className="mx-0 w-full max-w-full">
        <div className="mx-[15px] mb-[20px] lg:flex lg:mx-[100px] ">
          <div className="lg:mr-[14px] ">
            <div className="hidden lg:flex lg:flex-col mt-[12px] space-x-[12px] lg:space-x-0 justify-between">
              <ProductCard
                image="/images/t-shirts.png"
                showRating={false}
                imageClassName="w-full h-[106px] md:w-[250px] md:h-[250px] lg:w-[160px]  lg:h-[158px] object-cover rounded-[20px]" // image size and style
              />
              <ProductCard
                image="/images/t-shirts2.png"
                showRating={false}
                imageClassName="w-full h-[106px] md:w-[250px] md:h-[250px] lg:w-[160px] lg:h-[158px] object-cover rounded-[20px] lg:my-[14px] "
              />

              <ProductCard
                image="/images/t-shirts3.png"
                showRating={false}
                imageClassName="w-full h-[106px] md:w-[250px] md:h-[250px] lg:w-[160px] lg:h-[158px] object-cover rounded-[20px]"
              />
            </div>
          </div>
          <div className="lg:mr-[40px] lg:pt-3">
            <ProductCard
              image="/images/t-shirts.png"
              showRating={false}
              imageClassName="w-full h-[500px] object-cover rounded-[20px]"
            />
          </div>
          <div className="lg:hidden flex mt-[12px] space-x-[12px] justify-between">
            <ProductCard
              image="/images/t-shirts.png"
              showRating={false}
              imageClassName="w-full h-[106px] md:w-[150px] md:h-[150px] object-cover rounded-[20px]" // image size and style
            />
            <ProductCard
              image="/images/t-shirts2.png"
              showRating={false}
              imageClassName="w-full h-[106px] md:w-[150px] md:h-[150px] object-cover rounded-[20px]"
            />

            <ProductCard
              image="/images/t-shirts3.png"
              showRating={false}
              imageClassName="w-full h-[106px] md:w-[150px] md:h-[150px] object-cover rounded-[20px]"
            />
          </div>
          <div>
            {/* One Life Graphic T-shirt */}
            <div className="border-b-2">
              <div className="mb-[12px] mt-[20px]">
                <h2 className="lg:text-[40px] lg:leading-[48px] font-bold text-[#000000] text-[24px] leading-[28px] mb-[12px]">
                  ONE LIFE GRAPHIC T-SHIRT
                </h2>
                <div className="lg:my-[14px]">
                  <RateComponent />
                  <span className="ml-4 text-[#000000] text-[14px] leading-[28px] font-bold">
                    2.5/5
                  </span>
                </div>
              </div>
              <div className="mb-[20px] flex space-x-[10px] lg:text-[32px] text-[24px] leading-[32.4px]">
                <p className="text-[#000000]  font-bold ">$260</p>
                <p className="text-[#0000004D] text-opacity-30  font-bold line-through">
                  $300
                </p>
                <p className="text-[14px] leading-[20px] text-[#FF3333] font-medium bg-[#FF3333] bg-opacity-10 md:py-[6px] px-[12px] rounded-full lg:py-0">
                  -40%
                </p>
              </div>
              <p className="text-[#00000099] text-opacity-60 text-[14px] leading-[20px] font-normal mb-[24px] lg:text-[16px] lg:leading-[22px]">
                This graphic t-shirt which is perfect for any occasion. Crafted
                from a soft and breathable fabric, it offers superior comfort
                and style.
              </p>
            </div>
            {/* Select Color */}
            <div className="mt-[24px] border-b-2">
              <p className="text-[#00000099] text-opacity-60 text-[14px] leading-[18.9px] font-normal mb-4">
                Select Colors
              </p>
              <div className="flex space-x-[12.3px] mb-[24px]">
                <p className="bg-[#4F4631] rounded-full px-[12px] py-[6px] text-[#fff] cursor-pointer">
                  <CheckOutlined />
                </p>
                <p className="bg-[#314F4A] rounded-full px-[12px] py-[6px] text-[#314F4A] hover:text-[#fff] cursor-pointer">
                  <CheckOutlined />
                </p>
                <p className="bg-[#314F4A] rounded-full px-[12px] py-[6px] text-[#314F4A] hover:text-[#fff] cursor-pointer">
                  <CheckOutlined />
                </p>
              </div>
            </div>
            {/* Choose Size */}

            <div className="mt-[24px] border-b-2">
              <p className="text-[#00000099] text-opacity-60 text-[14px] leading-[18.9px] font-normal mb-4">
                Choose Size
              </p>
              <div className="flex space-x-[12.3px] mb-[24px]">
                <p className=" text-[14px] leading-[18.9px] font-normal text-[#00000099] text-opacity-60 rounded-full px-[20px] py-[10px] bg-[#F0F0F0]  cursor-pointer">
                  Small
                </p>
                <p className=" text-[14px] leading-[18.9px] font-normal text-[#00000099] text-opacity-60 rounded-full px-[20px] py-[10px] bg-[#F0F0F0]  cursor-pointer">
                  Medium
                </p>
                <p className=" text-[14px] leading-[18.9px] font-normal text-[#00000099] text-opacity-60 rounded-full px-[20px] py-[10px] bg-[#F0F0F0]  cursor-pointer">
                  Large
                </p>
                <p className=" text-[14px] leading-[18.9px] font-normal text-[#00000099] text-opacity-60 rounded-full px-[20px] py-[10px] bg-[#F0F0F0]  cursor-pointer">
                  X-Large
                </p>
              </div>
            </div>
            {/* add to cart */}
            <div className="flex items-center justify-between  mt-[24px] mb-[50px] ">
              <div className="flex space-x-[16px] items-center bg-[#F0F0F0] rounded-full px-5 py-4 w-fit h-[44px] text-[#000000] font-bold">
                <MinusOutlined className="cursor-pointer" />
                <p>1</p>
                <PlusOutlined className="cursor-pointer" />
              </div>
              <div>
                <ButtonComponent className="text-[14px] leading-[18.9px] font-medium text-[#fff] bg-[#000000] py-[12px] px-[81px] h-[44px] md:w-[500px] lg:w-[300px] lg:px-[40px] lg:mb-0 lg:py-3 hover:text-[#000000] hover:bg-[#8C8C8C] ">
                  Add to Cart
                </ButtonComponent>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* tabs */}
      <section className="mx-0 w-full max-w-full border-b-2 lg:border-none">
        <div className="mx-[15px] mb-[26px] lg:mx-[100px] lg:mb-0 ">
          <div className="flex justify-between">
            <div className="text-[16px] lg:w-[300px] lg:px-20 leading-[22px] font-normal text-[#00000099] text-opacity-60 hover:border-b-2 border-[#000000] pb-[20px] lg:pb-[50px] cursor-pointer">
              Product Details
            </div>
            <div className="text-[16px] lg:w-[300px] lg:px-20 leading-[22px] font-normal text-[#00000099] text-opacity-60 hover:border-b-2 border-[#000000] pb-[20px] cursor-pointer">
              Rating & Reviews
            </div>
            <div className="text-[16px] lg:w-[300px] lg:px-28 leading-[22px] font-normal text-[#00000099] text-opacity-60 hover:border-b-2 border-[#000000] pb-[20px] cursor-pointer">
              FAQs
            </div>
          </div>
        </div>
        {/* reviews */}
        <div className="mx-[15px] pb-[50px] lg:mx-[100px]">
          <div className="flex items-center justify-between lg:my-[32px]">
            <p className="lg:text-[24px] lg:leading-[32.4px] font-bold text-[#000000] text-[20px] leading-[27px] my-[27px]">
              All Reviews{" "}
              <span className="text-[#00000099] text-opacity-60">(451)</span>
            </p>
            <div className="flex justify-between items-center space-x-5 lg:text-[16px] lg:leading-[21.6px]">
              <ButtonComponent className="lg:py-[13px] lg:w-[120px] px-[20px] py-[8px]  text-[#000000] bg-[#F0F0F0]">
                <select name="" id="" className="bg-[#F0F0F0] lg:ml-[-30px]">
                  <option value="">Lastest</option>
                  <option value="">New</option>
                </select>
              </ButtonComponent>
              <ButtonComponent className="text-[#fff] lg:py-[13px] lg:px-[30px] px-[10px] py-[8px] bg-[#000000]">
                Write a Review
              </ButtonComponent>
            </div>
          </div>
          <div className="mb-[20px]">
            <TestimonialGrid testimonials={testimonialData} />
          </div>
          <ButtonComponent className="mx-[115px] md:mx-[300px] text-[#000000] text-[14px] leading-[18.9px] font-medium px-[36px] py-[14px] border bg-[#0000001A] bg-opacity-10 md:mt-[30px] hover:text-[#fff] hover:bg-[#000000] lg:px-[30px] lg:py-[15px] lg:mx-[550px]">
            Load More Reviews
          </ButtonComponent>
        </div>
      </section>
      {/* You might also like */}
      <section className="mx-0 w-full max-w-full">
        <div className="mx-[15px]">
          <h2 className="text-[32px] mx-[100px] mt-[20px] leading-[36px] font-bold text-center mb-[40px] text-[#000000] lg:text-[48px] lg:leading-[57.6px] lg:mb-[55px]">
            YOU MIGHT ALSO LIKE
          </h2>
          <div className="flex justify-between md:justify-evenly items-center">
            <ProductCard
              image="/images/like1.png"
              title="Polo with Contrast Trims"
              titleClassName="text-[16px] leading-[21.6px] font-bold text-[#000000] mt-[10px] mb-[4px]"
              price="$242"
              priceClassName="text-[20px] leading-[27px] line-through font-bold text-[#00000066] text-opacity-40"
              discount="-20%"
              discountClassName="text-[10px] leading-[13.5px] font-medium text-[#FF3333] rounded-full py-2 px-3 bg-[#FF33331A] bg-opacity-10"
              discountPrice="$212"
              discountPriceClassName="text-[20px] leading-[27px] font-bold text-[#000000]"
              imageClassName="h-[200px] md:w-[300px] md:h-[300px]"
            />
            <ProductCard
              image="/images/like2.png"
              title="Gradient Graphic T-short"
              titleClassName="text-[16px] leading-[21.6px] font-bold text-[#000000] mt-[10px] mb-[4px]"
              price="$212"
              priceClassName="text-[20px] leading-[27px] line-through font-bold text-[#00000066] text-opacity-40"
              discount="-20%"
              discountClassName="text-[10px] leading-[13.5px] font-medium text-[#FF3333] rounded-full py-2 px-3 bg-[#FF33331A] bg-opacity-10"
              discountPrice="$212"
              discountPriceClassName="text-[20px] leading-[27px] font-bold text-[#000000]"
              imageClassName="h-[200px] md:w-[300px] md:h-[300px]"
            />
            <ProductCard
              className="hidden lg:block"
              image="/images/like1.png"
              title="Polo with Contrast Trims"
              titleClassName="text-[16px] leading-[21.6px] font-bold text-[#000000] mt-[10px] mb-[4px]"
              price="$242"
              priceClassName="text-[20px] leading-[27px] line-through font-bold text-[#00000066] text-opacity-40"
              discount="-20%"
              discountClassName="text-[10px] leading-[13.5px] font-medium text-[#FF3333] rounded-full py-2 px-3 bg-[#FF33331A] bg-opacity-10"
              discountPrice="$212"
              discountPriceClassName="text-[20px] leading-[27px] font-bold text-[#000000]"
              imageClassName="h-[200px] md:w-[300px] md:h-[300px]"
            />
            <ProductCard
              className="hidden lg:block"
              image="/images/like2.png"
              title="Gradient Graphic T-short"
              titleClassName="text-[16px] leading-[21.6px] font-bold text-[#000000] mt-[10px] mb-[4px]"
              price="$212"
              priceClassName="text-[20px] leading-[27px] line-through font-bold text-[#00000066] text-opacity-40"
              discount="-20%"
              discountClassName="text-[10px] leading-[13.5px] font-medium text-[#FF3333] rounded-full py-2 px-3 bg-[#FF33331A] bg-opacity-10"
              discountPrice="$212"
              discountPriceClassName="text-[20px] leading-[27px] font-bold text-[#000000]"
              imageClassName="h-[200px] md:w-[300px] md:h-[300px]"
            />
          </div>
        </div>
      </section>
      {/* footer */}
      <section className="mt-[50px]">
        <FooterComponent />
      </section>
    </div>
  );
};

export default ProductDetailPage;
