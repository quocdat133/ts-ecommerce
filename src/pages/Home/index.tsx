import ButtonComponent from "../../components/Button";
import Header from "../../components/Header";
import { formatPrice } from "../../utils";

const HomePage = () => {
  return (
    <div className="max-w-full w-screen">
      <Header />
      <section>
        <div className="bg-[#F2F0F1] bg-cover w-full lg:h-[663px] lg:flex lg:px-[100px] font-satoshi">
          <div className="mx-4">
            <h2 className="pt-10 text-[36px] font-integral leading-[34px] font-bold text-[#000000]">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h2>
            <p className="mt-5 mb-6 text-[14px] leading-[20px] font-normal text-[#00000099] text-opacity-60">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>
            <ButtonComponent
              text="Shop Now"
              className="bg-[#000000] text-[#FFFFFF] text-[16px] leading-[21.6px] font-medium w-full h-[52px] mb-5"
            ></ButtonComponent>
            <div>
              <div className="flex gap-x-[27.5px] items-center mx-8">
                <div>
                  <p className="custom-text">200+</p>
                  <p className="custom-p">International Brands</p>
                </div>
                <hr className="w-px h-[50px] bg-[#0000001A] bg-opacity-10 border-none" />
                <div>
                  <p className="custom-text">{formatPrice(2000)}+</p>
                  <p className="custom-p">High-Quality Products</p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-1  place-items-center">
                <p className="custom-text">{formatPrice(30000)}+</p>
                <p className="custom-p">Happy Customers</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src="./Rectangle-2.png" alt="rectangle" />
            <img src="/start1.png" alt="start 1" className="absolute "/>
            <img src="/start2.png" alt="start 2" className="absolute "/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
