import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import HeaderComponent from "../../components/Header/HeaderComponent";
import { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import TestimonialCarousel from "../../components/TestimonialCarousel/TestimonialCarousel";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      name: "Sarah M.",
      rating: 5,
      verified: true,
      content:
        "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    },
    {
      name: "Alex K.",
      rating: 5,
      verified: true,
      content:
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    },
    {
      name: "James L.",
      rating: 5,
      verified: true,
      content:
        "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    },
    // Thêm testimonials để có thể scroll
    {
      name: "Emma R.",
      rating: 5,
      verified: true,
      content:
        "The customer service is exceptional and the clothing quality is outstanding. Every purchase has been perfect.",
    },
    {
      name: "Michael P.",
      rating: 5,
      verified: true,
      content:
        "Shop.co has transformed my wardrobe. Their collection is both trendy and timeless.",
    },
    {
      name: "Emma R.",
      rating: 5,
      verified: true,
      content:
        "The customer service is exceptional and the clothing quality is outstanding. Every purchase has been perfect.",
    },
    {
      name: "Michael P.",
      rating: 5,
      verified: true,
      content:
        "Shop.co has transformed my wardrobe. Their collection is both trendy and timeless.",
    },
    {
      name: "Sarah M.",
      rating: 5,
      verified: true,
      content:
        "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    },
    {
      name: "Alex K.",
      rating: 5,
      verified: true,
      content:
        "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    },
    {
      name: "James L.",
      rating: 5,
      verified: true,
      content:
        "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    },
  ];

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <section className="h-screen">
      <HeaderComponent />
      {/* banner */}
      <section className="container w-full max-w-full relative">
        <div className="bg-[url('/images/banner.png')] bg-cover bg-center h-[650px] md:h-[650px] lg:h-[750px] "></div>
        <div className="bg-transparent w-full md:w-[400px] lg:w-[600px] absolute lg:top-20 lg:left-24 md:top-20 md:left-24 top-10 left-4">
          <div className="lg:text-[64px] font-bold lg:leading-[64px] text-[#000000] md:text-[30px] text-[32px] w-[300px] lg:w-full md:w-full">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </div>
          <div className="lg:text-[16px] font-normal lg:leading-[22px] text-[#00000099] text-opacity-60 lg:my-8 md:py-5 w-[358px] py-5">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </div>
          <div>
            <ButtonComponent className="text-[#FFFFFF] bg-[#000000] hover:text-[#000000] hover:bg-opacity-40 py-[15px] px-[67px]">
              Shop now
            </ButtonComponent>
          </div>
          <div className="flex lg:justify-between lg:flex-row flex-col ">
            <div className="lg:pr-8 lg:border-r-2">
              <p className="lg:text-[40px] leading-[54px] font-bold text-[#000000]">
                200+
              </p>
              <p className="lg:text-[16px] leading-[22px] font-normal text-[#00000099] text-opacity-60 ">
                International Brands
              </p>
            </div>
            <div className="lg:pr-8 lg:border-r-2">
              <p className="lg:text-[40px] leading-[54px] font-bold text-[#000000]">
                2,000+
              </p>
              <p className="lg:text-[16px] leading-[22px] font-normal text-[#00000099] text-opacity-60 ">
                High-Quality Products
              </p>
            </div>
            <div>
              <p className="lg:text-[40px] leading-[54px] font-bold text-[#000000]">
                30,000+
              </p>
              <p className="lg:text-[16px] leading-[22px] font-normal text-[#00000099] text-opacity-60 ">
                Happy Customers
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* brand */}
      <section className="container w-full max-w-full bg-[#000000]">
        <div className="lg:mx-[100px] md:mx-[30px] flex lg:justify-between md:justify-start flex-wrap lg:py-[44px] md:space-x-16 space-y-4 items-center space-x-12 py-3 mx-[15px]">
          <a href="">
            <img
              src="/images/versace.png"
              alt="versace"
              className="lg:w-[170px] lg:h-[35px] md:w-[170px] md:h-[35px]  w-[116px] h-[23px] cursor-pointe r"
            />
          </a>
          <a href="">
            <img
              src="/images/zara.png"
              alt="zara"
              className="lg:w-[170px] lg:h-[35px] md:w-[170px] md:h-[35px] w-[116px] h-[23px] cursor-pointer "
            />
          </a>
          <a href="">
            <img
              src="/images/gucci.png"
              alt="gucci"
              className="lg:w-[170px] lg:h-[35px] md:w-[170px] md:h-[35px] w-[116px] h-[23px]  cursor-pointer "
            />
          </a>
          <a href="">
            <img
              src="/images/prada.png"
              alt="prada"
              className="lg:w-[170px] lg:h-[35px] md:w-[170px] md:h-[35px] w-[116px] h-[23px]  cursor-pointer "
            />
          </a>
          <a href="">
            <img
              src="/images/calvin-klein.png"
              alt="calvin-klein"
              className="lg:w-[170px] lg:h-[35px] md:w-[170px] md:h-[35px] w-[116px] h-[23px] cursor-pointer "
            />
          </a>
        </div>
      </section>

      {/* new arrivals */}
      {/* top selling */}
      {/* BROWSE BY dress STYLE */}
      <section className="container w-full max-w-full">
        <div className="lg:mx-[100px] md:mx-[100px] mx-[15px] lg:mt-[72px] bg-[#F0F0F0] lg:pb-[30px] pb-5 md:mt-10">
          <h2 className="text-center lg:text-[48px] md:text-[30px] text-[32px] px-[85px]  py-5 lg:leading-[57.6px] font-bold text-[#000000] lg:mb-[64px] lg:pt-[64px]">
            BROWSE BY DRESS STYLE
          </h2>
          <div className="flex lg:justify-evenly lg:mx-16 lg:mb-5 lg:px-0 md:space-x-4 md:px-8 md:mb-5 lg:space-y-0 lg:flex-row flex-col items-center space-y-4 mb-6">
            <div className="lg:w-[407px] lg:h-[289px] md:w-[407px] md:h-[289px] w-[400px] h-[300px] relative ">
              <img
                src="/images/casual.png"
                alt="style"
                className="w-full h-full object-cover rounded-[40px]"
              />
              <p className="lg:text-[36px] lg:leading-[48.6px] text-[24px] leading-[32px] font-bold text-[#000000] absolute lg:top-[25px] lg:left-[36px] top-[20px] left-[20px]">
                Casual
              </p>
            </div>
            <div className=" lg:w-[684px] lg:h-[289px] md:w-[407px] md:h-[289px] w-[400px] h-[300px] relative">
              <img
                src="/images/formal.png"
                alt="style"
                className="w-full h-full object-cover rounded-[40px]"
              />
              <p className="lg:text-[36px] lg:leading-[48.6px] text-[24px] leading-[32px] font-bold text-[#000000] absolute lg:top-[25px] lg:left-[36px] top-[20px] left-[20px]">
                Formal
              </p>
            </div>
          </div>

          <div className="flex lg:justify-evenly lg:mx-16 lg:mb-5 lg:px-0 md:space-x-4 md:px-8 md:mb-5 lg:space-y-0 lg:flex-row flex-col items-center space-y-4 mb-4">
            <div className="lg:w-[684px] lg:h-[289px] md:w-[407px] md:h-[289px] w-[400px] h-[300px] relative">
              <img
                src="/images/party.png"
                alt="style"
                className="w-full h-full object-cover rounded-[40px]"
              />
              <p className="lg:text-[36px] lg:leading-[48.6px] text-[24px] leading-[32px] font-bold text-[#000000] absolute lg:top-[25px] lg:left-[36px] top-[20px] left-[20px]">
                Party
              </p>
            </div>
            <div className="lg:w-[407px] lg:h-[289px] md:w-[407px] md:h-[289px] w-[400px] h-[300px] relative">
              <img
                src="/images/gym.png"
                alt="style"
                className="w-full h-full object-cover rounded-[40px]"
              />
              <p className="lg:text-[36px] lg:leading-[48.6px] text-[24px] leading-[32px] font-bold text-[#000000] absolute lg:top-[25px] lg:left-[36px] top-[20px] left-[20px]">
                Gym
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* OUR HAPPY CUSTOMERS */}
      <section className="container w-full max-w-full">
        <div className="lg:mx-[100px] mx-[15px] md:mx-[100px] lg:mt-[80px] lg:mb-[80px] mb-8 mt-5">
          <div className="relative">
            {/* Header with navigation */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="lg:text-[48px] lg:leading-[57.6px] text-[#000000] font-bold tracking-tight md:text-[30px] md:my-5 text-[32px]">
                OUR HAPPY CUSTOMERS
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handlePrevious}
                  className="p-2 rounded-full transition-colors "
                  aria-label="Previous testimonial"
                >
                  <ArrowLeftOutlined
                    className="w-6 h-6"
                    style={{ fontSize: "20px" }}
                  />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-full transition-colors"
                  aria-label="Next testimonial"
                >
                  <ArrowRightOutlined
                    className="w-6 h-6"
                    style={{ fontSize: "20px" }}
                  />
                </button>
              </div>
            </div>

            {/* Testimonials container */}
            <TestimonialCarousel
              testimonials={testimonials}
              currentIndex={currentIndex}
            />
          </div>
        </div>
      </section>
      {/* footer */}
      <FooterComponent />
    </section>
  );
};

export default HomePage;
