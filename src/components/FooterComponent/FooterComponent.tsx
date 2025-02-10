import {
  FacebookFilled,
  GithubFilled,
  InstagramFilled,
  TwitterOutlined,
} from "@ant-design/icons";

const FooterComponent = () => {
  return (
    <section className="container w-full max-w-full bg-[#0000001A] bg-opacity-10 pb-[80px]">
      {/* Main footer content */}
      <div className="px-4 py-8 md:px-16 lg:px-24 md:py-16 ">
        {/* Logo and content section - Stack on mobile, grid on desktop */}
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-12 md:gap-8">
          {/* Logo section - Full width on mobile */}
          <div className="space-y-4 md:col-span-3">
            <img
              src="/images/logo_header.png"
              alt="logo"
              className="w-[120px] md:w-[167px] h-auto"
            />
            <p className="text-sm text-[#00000099] text-opacity-60 max-w-[300px]">
              We have clothes that suits your style and which you're proud to
              wear, From women to men
            </p>
            <div className="flex space-x-5">
              <TwitterOutlined className="cursor-pointer hover:text-red-500" />
              <FacebookFilled className="cursor-pointer hover:text-red-500" />
              <InstagramFilled className="cursor-pointer hover:text-red-500" />
              <GithubFilled className="cursor-pointer hover:text-red-500" />
            </div>
          </div>

          {/* Navigation sections - 2x2 grid on mobile, spread on desktop */}
          <div className="grid grid-cols-2 gap-8 md:col-span-9 md:grid-cols-4">
            <div>
              <h2 className="text-base font-medium text-black mb-4 md:mb-6">
                COMPANY
              </h2>
              <ul className="space-y-3 md:space-y-4 text-[#00000099] text-opacity-60">
                <li className="cursor-pointer hover:text-red-500">About</li>
                <li className="cursor-pointer hover:text-red-500">Features</li>
                <li className="cursor-pointer hover:text-red-500">Works</li>
                <li className="cursor-pointer hover:text-red-500">Career</li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-medium text-black mb-4 md:mb-6">
                HELP
              </h2>
              <ul className="space-y-3 md:space-y-4 text-[#00000099] text-opacity-60">
                <li className="cursor-pointer hover:text-red-500">
                  Customer Support
                </li>
                <li className="cursor-pointer hover:text-red-500">
                  Delivery Details
                </li>
                <li className="cursor-pointer hover:text-red-500">
                  Terms & Conditions
                </li>
                <li className="cursor-pointer hover:text-red-500">
                  Privacy Policy
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-medium text-black mb-4 md:mb-6">
                FAQ
              </h2>
              <ul className="space-y-3 md:space-y-4 text-[#00000099] text-opacity-60">
                <li className="cursor-pointer hover:text-red-500">Account</li>
                <li className="cursor-pointer hover:text-red-500">
                  Manage Deliveries
                </li>
                <li className="cursor-pointer hover:text-red-500">Orders</li>
                <li className="cursor-pointer hover:text-red-500">Payments</li>
              </ul>
            </div>

            <div>
              <h2 className="text-base font-medium text-black mb-4 md:mb-6">
                RESOURCES
              </h2>
              <ul className="space-y-3 md:space-y-4 text-[#00000099] text-opacity-60">
                <li className="cursor-pointer hover:text-red-500">
                  Free eBooks
                </li>
                <li className="cursor-pointer hover:text-red-500">
                  Development Tutorial
                </li>
                <li className="cursor-pointer hover:text-red-500">
                  How to - Blog
                </li>
                <li className="cursor-pointer hover:text-red-500">
                  Youtube Playlist
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section - Stack on mobile, row on desktop */}
      <div className="border-t border-[#0000001A] border-opacity-10">
        <div className="px-4 py-6 md:px-16 lg:px-24">
          <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
            <p className="text-sm text-[#00000099] text-opacity-60 text-center md:text-left">
              Shop.co © 2000-2023, All Rights Reserved
            </p>
            <div className="flex space-x-2 md:space-x-4">
              <img
                src="/images/visa.png"
                alt="visa"
                className="h-8 md:h-10 lg:h-14 cursor-pointer"
              />
              <img
                src="/images/mastercard.png"
                alt="master card"
                className="h-8 md:h-10 lg:h-14 cursor-pointer"
              />
              <img
                src="/images/paypal.png"
                alt="paypal"
                className="h-8 md:h-10 lg:h-14 cursor-pointer"
              />
              <img
                src="/images/apay.png"
                alt="apple pay"
                className="h-8 md:h-10 lg:h-14 cursor-pointer"
              />
              <img
                src="/images/gpay.png"
                alt="google pay"
                className="h-8 md:h-10 lg:h-14 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterComponent;
