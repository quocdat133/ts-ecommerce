import { useState } from "react";
import ProductSearch from "../SearchComponent/SearchComponent";
import PopoverLogin from "../PopoverLogin/PopoverLogin";
import { MenuOutlined, SearchOutlined, CloseOutlined } from "@ant-design/icons";

const HeaderComponent = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSearch = () => {};
  const handleOnClickSearch = () => setShowSearch(!showSearch);
  const handleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  return (
    <header className="w-full relative">
      {/* Main header */}
      <div className="px-4 lg:pr-8 lg:pl-0 md:px-4 lg:max-w-full max-w-[1200px] lg:mx-[100px] mx-auto py-3 md:py-4 lg:py-6">
        <div className="flex justify-between items-center">
          {/* Mobile menu button */}
          <button
            className="block md:block text-2xl lg:hidden"
            onClick={handleMobileMenu}
          >
            {showMobileMenu ? <CloseOutlined /> : <MenuOutlined />}
          </button>

          {/* Logo */}
          <img
            src="/images/logo_header.png"
            alt="logo"
            className="w-[100px] md:w-[130px] lg:w-[160px] h-[16px] md:h-[18px] lg:h-[22px] cursor-pointer"
          />

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex lg:space-x-6 text-base items-center">
              <li className="hover:text-red-500">
                <select className="bg-transparent cursor-pointer outline-none">
                  <option value="1">Shop</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </li>
              <li className="hover:text-red-500">
                <a href="">On Sale</a>
              </li>
              <li className="hover:text-red-500">
                <a href="">New Arrivals</a>
              </li>
              <li className="hover:text-red-500">
                <a href="">Brands</a>
              </li>
            </ul>
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* Desktop search */}
            <div
              className={`hidden lg:block ${showSearch ? "block" : "hidden"}`}
            >
              <ProductSearch
                onSearch={handleSearch}
                className="lg:w-[500px] md:w-[200px] h-[36px] rounded-full bg-[#F0F0F0]"
              />
            </div>

            <SearchOutlined
              className="lg:hidden md:block cursor-pointer hover:text-red-500"
              onClick={handleOnClickSearch}
            />

            {/* Login */}
            <PopoverLogin />
          </div>
        </div>

        {/* Mobile search */}
        <div
          className={`lg:hidden md:hidden ${showSearch ? "block" : "hidden"}`}
        >
          <ProductSearch
            onSearch={handleSearch}
            className="w-full px-4 my-5 lg:w-[500px] md:w-[200px] h-[36px] rounded-full bg-[#F0F0F0]"
          />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-white z-50 lg:hidden">
          <div className="px-4 py-3 md:py-4 border-b">
            <div className="flex justify-between items-center">
              <img
                src="/images/logo_header.png"
                alt="logo"
                className="w-[100px] md:w-[130px] h-[16px] md:h-[18px] cursor-pointer"
              />
              <button className="text-2xl" onClick={handleMobileMenu}>
                <CloseOutlined />
              </button>
            </div>
          </div>
          <nav className="px-4 py-6">
            <ul className="space-y-6">
              <li className="hover:text-red-500">
                <select className="bg-transparent cursor-pointer outline-none w-full text-lg">
                  <option value="1">Shop</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </li>
              <li className="hover:text-red-500">
                <a href="" className="block text-lg">
                  On Sale
                </a>
              </li>
              <li className="hover:text-red-500">
                <a href="" className="block text-lg">
                  New Arrivals
                </a>
              </li>
              <li className="hover:text-red-500">
                <a href="" className="block text-lg">
                  Brands
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;
