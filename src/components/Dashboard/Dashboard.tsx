import {
  DollarOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import TinyBarChart from "../TinyBarChart/TinyBarChart";
import SimpleLineChart from "../SimpleLineChart/SimpleLineChart";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import PopoverLogin from "../PopoverLogin/PopoverLogin";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="flex lg:my-[10px] lg:mr-[20px] lg:py-4 lg:pl-4 lg:pr-8">
        {/* left  */}
        <div className="lg:w-1/3">
          <p className="text-[14px]">
            <span className="text-[#8C8C8C]">Page /</span>{" "}
            <span>Dashboard</span>
          </p>
          <p className="lg:mt-2 font-bold">Dashboard</p>
        </div>
        {/* right */}
        <div className="flex justify-end lg:w-2/3 space-x-5 items-center">
          <LanguageSwitcher />
          <PopoverLogin />
        </div>
      </div>
      <div className="p-4">
        {/* Cards */}
        <div className="flex justify-between gap-4 mb-6">
          <div className="flex items-center border rounded-xl p-4 flex-1">
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium mb-1">
                Today's Sales
              </p>
              <p>
                <span className="text-3xl font-bold">$53,000</span>
                <span className="ml-2 text-sm font-bold text-green-500">
                  +30%
                </span>
              </p>
            </div>
            <div>
              <DollarOutlined className="text-blue-500 text-2xl" />
            </div>
          </div>

          <div className="flex items-center border rounded-xl p-4 flex-1">
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium mb-1">
                Today's Users
              </p>
              <p>
                <span className="text-3xl font-bold">$3,200</span>
                <span className="ml-2 text-sm font-bold text-green-500">
                  +20%
                </span>
              </p>
            </div>
            <div>
              <UsergroupAddOutlined className="text-blue-500 text-2xl" />
            </div>
          </div>

          <div className="flex items-center border rounded-xl p-4 flex-1">
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium mb-1">
                New Clients
              </p>
              <p>
                <span className="text-3xl font-bold">+1,200</span>
                <span className="ml-2 text-sm font-bold text-red-500">
                  -20%
                </span>
              </p>
            </div>
            <div>
              <HeartOutlined className="text-blue-500 text-2xl" />
            </div>
          </div>

          <div className="flex items-center border rounded-xl p-4 flex-1">
            <div className="flex-1">
              <p className="text-sm text-gray-500 font-medium mb-1">
                New Orders
              </p>
              <p>
                <span className="text-3xl font-bold">$13,200</span>
                <span className="ml-2 text-sm font-bold text-green-500">
                  +10%
                </span>
              </p>
            </div>
            <div>
              <ShoppingCartOutlined className="text-blue-500 text-2xl" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="flex gap-6 ">
          {/* Bar Chart */}
          <div className="border rounded-xl p-4 lg:w-[450px]">
            <div className="lg:h-[250px]">
              <TinyBarChart />
            </div>
            <div className="lg:ml-3">
              <h3 className="text-[16px] lg:mt-3 text-[#141414] font-bold">
                Active Users
              </h3>
              <p className="text-[#8C8C8C] font-semibold text-[14px] lg:mb-[14px]">
                than last week{" "}
                <span className="lg:ml-[5p] text-[#52c41a]">+23%</span>
              </p>
              <p className="text-[14px] lg:mb-[14px] text-[#000000A6]">
                We have created multiple options for you to put together and
                customise into pixel perfect pages.
              </p>
              <div className="flex space-x-20 font-bold">
                <div>
                  <p>3.6K</p>
                  <p className="font-semibold text-[#000000A6]">Users</p>
                </div>
                <div>
                  <p>2m</p>
                  <p className="font-semibold text-[#000000A6]">Clicks</p>
                </div>

                <div>
                  <p>$772</p>
                  <p className="font-semibold text-[#000000A6]">Sales</p>
                </div>
                <div>
                  <p>82</p>
                  <p className="font-semibold text-[#000000A6]">Items</p>
                </div>
              </div>
            </div>
          </div>

          {/* Line Chart */}
          <div className="border rounded-xl p-4 lg:w-full">
            <div className="lg:ml-8 lg:mb-8">
              <h3 className="text-[16px] text-[#141414] font-bold">
                Sales Overview
              </h3>
              <p className="text-[#8C8C8C] font-semibold text-[14px] lg:mb-[14px]">
                than last week{" "}
                <span className="lg:ml-[5p] text-[#52c41a]">+23%</span>
              </p>
            </div>
            <div className="h-[300px]">
              <SimpleLineChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
