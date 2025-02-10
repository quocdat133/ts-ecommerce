import {
  CloseOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { convertUpperCase } from "../../utils";
import Icon from "../Icon";
import InputSearch from "../InputSearch";

const Header = () => {
  return (
    <>
      <section>
        <div className="bg-[#000000] font-satoshi">
          <div className="py-[9px] text-[12px] leading-[16.2px] font-normal flex justify-center items-center text-[#FFFFFF] lg:mx-[100px] lg:flex lg:justify-end lg:gap-[500px] lg:text-[14px] lg:leading-[18.9px]">
            <div className="lg:justify-center lg:items-center">
              <span>Sign up and get 20% off to your first order. &nbsp;</span>
              <span className="underline underline-offset-2 font-medium ">
                Sign Up Now
              </span>
            </div>
            <div className="hidden lg:block">
              <Icon icon={<CloseOutlined />}></Icon>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center px-4 py-[23px] lg:mx-[100px] lg:px-0  lg:py-6">
          <div className="flex gap-x-4 lg:justify-between lg:items-center">
            <Icon icon={<MenuOutlined />} className="block lg:hidden"></Icon>
            <p className="font-integral font-bold text-[25.2px] leading-[30.24px] text-[#000000] lg:text-[30px] lg:leading-[38.4px]">
              {convertUpperCase("shop.co")}
            </p>
          </div>
          <div className="hidden lg:block">
            <ul className="lg:flex lg:gap-x-6">
              <li>
                <select name="" id="">
                  <option value="">Shop 1</option>
                  <option value="">Shop 2</option>
                </select>
              </li>
              <li>
                <a href="#">On Sale</a>
              </li>
              <li>
                <a href="#">New Arrivals</a>
              </li>
              <li>
                <a href="#">Brands</a>
              </li>
            </ul>
          </div>
          <div>
            <InputSearch
              className="hidden lg:flex lg:bg-[#F0F0F0] lg:text-[#00000066] lg:text-opacity-40 w-[577px] lg:rounded-[62px] lg:h-12"
              placehoder="Search for products..."
              icon={<SearchOutlined />}
            ></InputSearch>
          </div>
          <div className="flex gap-x-3">
            <Icon icon={<SearchOutlined />} className="block lg:hidden"></Icon>
            <Icon icon={<ShoppingCartOutlined />}></Icon>
            <Icon icon={<UserOutlined />}></Icon>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
