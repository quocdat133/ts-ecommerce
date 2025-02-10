import { TagsOutlined } from "@ant-design/icons";
import { Product } from "../../api/productApi/type";
import Breadcrumb from "../../components/BreadcrumbComponent/BreadcrumbComponent";
import HeaderComponent from "../../components/Header/HeaderComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import OrderCart from "../../components/OrderCart/OrderCart";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const CartPage = () => {
  const sampleItems: Product[] = [
    {
      id: "1",
      name: "Gradient Graphic T-shirt",
      urlName: "gradient-graphic-tshirt",
      picture: "/images/cart1.png",
      basePrice: 145,
      discountPercentage: 10,
      stock: 5,
      description: "A beautiful gradient graphic t-shirt",
      createdAt: new Date().toISOString(),
      categories: [],
    },
    {
      id: "2",
      name: "Checkered Shirt",
      urlName: "checkered-shirt",
      picture: "/images/cart2.png",
      basePrice: 180,
      discountPercentage: 0,
      stock: 3,
      description: "Classic checkered shirt",
      createdAt: new Date().toISOString(),
      categories: [],
    },
    {
      id: "3",
      name: "Skinny Fit Jeans",
      urlName: "skinny-fit-jeans",
      picture: "/images/cart3.png",
      basePrice: 240,
      discountPercentage: 15,
      stock: 8,
      description: "Comfortable skinny fit jeans",
      createdAt: new Date().toISOString(),
      categories: [],
    },
  ];

  const handleOnChange = () => {};

  return (
    <>
      <HeaderComponent />
      <section className="mx-0 w-full max-w-full mb-[20px] lg:mx-[100px]">
        <Breadcrumb />
      </section>
      {/* your cart */}
      <div className="block md:flex lg:flex">
        <section className="mx-0 w-full max-w-full">
          <div className="mx-[15px]">
            <h2 className="text-[32px] leading-[38.4px] font-bold text-[#000000] mb-[20px] mt-2">
              YOUR CART
            </h2>
            <div className="border-2 rounded-[20px]">
              <OrderCart items={sampleItems} />
            </div>
          </div>
        </section>
        {/* order Summary */}
        <section className="mx-0 w-full max-w-full">
          <div className="mx-[15px] mb-[50px]">
            <div className="border-[#0000001A] border border-opacity-10 rounded-[20px] py-4 mt-[20px] ">
              <p className="text-[20px] leading-[27px] font-bold text-[#000000] mt-[20px] ml-[20px] mb-[16px]">
                Order Summary
              </p>
              <div className="flex justify-between">
                <p className="text-[16px] leading-[21.6px] font-normal text-[#00000099] text-opacity-60 ml-[20px]">
                  Subtotal
                </p>
                <p className="text-[16px] leading-[21.6px] font-bold text-[#000000] mr-[20px]">
                  $565
                </p>
              </div>
              <div className="flex justify-between my-[20px]">
                <p className="text-[16px] leading-[21.6px] font-normal text-[#00000099] text-opacity-60 ml-[20px]">
                  Discount (-20%)
                </p>
                <p className="text-[16px] leading-[21.6px] font-bold text-[#FF3333] mr-[20px]">
                  -113$
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[16px] leading-[21.6px] font-normal text-[#00000099] text-opacity-60 ml-[20px]">
                  Delivery Fee
                </p>
                <p className="text-[16px] leading-[21.6px] font-bold text-[#000000] mr-[20px]">
                  -15$
                </p>
              </div>
              <hr className="my-[20px]" />
              <div className="flex justify-between my-[16px]">
                <p className="text-[16px] leading-[21.6px] font-normal text-[#00000099] text-opacity-60 ml-[20px]">
                  Total
                </p>
                <p className="text-[20px] leading-[27px] font-bold text-[#000000] mr-[20px]">
                  $467
                </p>
              </div>
              <div className="flex justify-between items-center mb-[16px] px-[20px]">
                <InputComponent
                  className="bg-[#F0F0F0] w-[318px] rounded-full h-[48px]"
                  onChange={handleOnChange}
                  isSearch={false}
                  placeholder=" Add promo code"
                  icon={<TagsOutlined />}
                />
                <ButtonComponent className="text-[14px]  leading-[18.9px] font-medium text-[#fff] px-[25.5px] py-[14.5px] bg-[#000000] hover:text-[#000000] hover:bg-[#fff] cursor-pointer">
                  Apply
                </ButtonComponent>
              </div>
              <ButtonComponent className="text-[14px] leading-[18.9px] font-medium text-[#fff] px-[25.5px] py-[14.5px] w-[92%] bg-[#000000] hover:text-[#000000] hover:bg-[#fff] cursor-pointer mx-[20px]">
                Go to Checkout
              </ButtonComponent>
            </div>
          </div>
        </section>
      </div>
      {/* footer */}
      <FooterComponent />
    </>
  );
};

export default CartPage;
