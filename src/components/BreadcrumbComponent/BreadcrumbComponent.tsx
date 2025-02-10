import { RightOutlined } from "@ant-design/icons";

const Breadcrumb = () => {
  return (
    <nav aria-label="Breadcrumb" className="w-full px-4 py-3 md:px-6 lg:px-0 lg:py-6">
      <ol className="flex flex-wrap items-center text-sm md:text-base">
        <li className="flex items-center">
          <a href="/" className="text-gray-600 hover:text-black">
            Home
          </a>
          <span className="mx-2 text-gray-400">
            <RightOutlined />
          </span>
        </li>
        <li className="flex items-center">
          <a href="/shop" className="text-gray-600 hover:text-black">
            Shop
          </a>
          <span className="mx-2 text-gray-400">
            <RightOutlined />
          </span>
        </li>
        <li className="flex items-center">
          <a href="/shop/men" className="text-gray-600 hover:text-black">
            Men
          </a>
          <span className="mx-2 text-gray-400">
            <RightOutlined />
          </span>
        </li>
        <li className="flex items-center">
          <span className="text-black font-medium">T-shirts</span>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
