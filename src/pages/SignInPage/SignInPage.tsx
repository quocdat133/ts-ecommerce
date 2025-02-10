import { useForm } from "react-hook-form";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutationHook } from "../../hooks/useMutation";
import * as userApi from "../../api/userApi/userApi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";
import { loginData, LoginResponse } from "../../api/userApi/type";
import SwitchComponent from "../../components/SwitchComponent/SwitchComponent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const SignInPage = () => {
  const schema = yup.object({
    email: yup
      .string()
      .required("Email là bắt buộc")
      .email("Email không hợp lệ"),
    password: yup
      .string()
      .required("Mật khẩu là bắt buộc")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const email = watch("email");
  const password = watch("password");
  const [isShowPassword, setIsShowPassword] = useState(false);

  // api user
  const mutation = useMutationHook<LoginResponse, loginData>(
    (data: loginData) => {
      return userApi.loginUser(data);
    }
  );
  const { data, isSuccess, isPending, isError } = mutation;
  useEffect(() => {
    if (isSuccess && data) {
      try {
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("refresh_token", data.refreshToken);

        toast.success("Đăng nhập thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // Gọi API lấy thông tin user
        const fetchUserDetails = async () => {
          try {
            const userDetails = await userApi.getDetailsUser();
            // Cập nhật redux store với thông tin đầy đủ
            dispatch(
              updateUser({
                ...userDetails, // spread tất cả thông tin từ API
                access_token: data.accessToken,
                refresh_token: data.refreshToken,
              })
            );

            // Điều hướng dựa trên role
            if (userDetails.role === "ADMIN") {
              navigate("/admin");
            } else {
              navigate(location?.state || "/");
            }
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        };

        fetchUserDetails();
      } catch (error) {
        console.error("Error handling login response:", error);
      }
    }
  }, [isSuccess, data, location.state, navigate, dispatch]);

  const onSubmit = () => {
    mutation.mutate({
      email,
      password,
    });
  };

  return (
    <div className="container mx-auto w-full h-full   ">
      <ToastContainer />
      <div className="flex justify-between lg:mx-32">
        {/* form */}
        <section className="lg:w-2/5 lg:h-full ">
          {/* Left Container */}
          <div className="flex-1 p-6 lg:p-10 flex flex-col">
            <h1 className="text-[48px] font-semibold lg:mb-[15px]">Sign In</h1>
            <p className="text-[20px] text-[#8C8C8C]">
              Enter your email and password to sign in
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-3 relative">
              <div className="lg:h-[80px]">
                <label
                  htmlFor={email}
                  className="text-[13px] font-medium text-[#141414] leading-7 py-3"
                >
                  Email
                </label>
                <input
                  value={email}
                  type="text"
                  placeholder="Email"
                  {...register("email")}
                  className="w-full h-[30px] px-3 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor=""
                  className="text-[13px] font-medium text-[#141414] leading-7 py-3"
                >
                  Password
                </label>
                <input
                  value={password}
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className="w-full h-[30px] px-3 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <span
                  onClick={() => setIsShowPassword(!isShowPassword)}
                  className="absolute right-3 top-[125px] -translate-y-1/2 text-gray-500 cursor-pointer flex justify-center items-center"
                >
                  {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                </span>
                {errors.password && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="flex space-x-2 lg:py-4">
                <SwitchComponent />
                <p className="text-[14px] text-[#8C8C8C]">Remember Me</p>
              </div>

              <button
                disabled={isPending}
                type="submit"
                className="w-full bg-[#1890ff] text-white text-[13px] font-medium px-[15px] py-2 rounded-lg text-sm hover:bg-[#40a9ff] transition-colors disabled:opacity-50"
              >
                {isPending ? "Đang đăng nhập..." : "SIGN IN"}
              </button>

              {isError && (
                <p className="text-red-500 text-sm text-center">
                  Đăng nhập thất bại. Vui lòng thử lại.
                </p>
              )}

              <p className="text-sm text-left lg:mt-4">
                <span className="text-[#8C8C8C]">Don't have an account?</span>
                <span
                  className=" cursor-pointer hover:underline ml-1 font-bold"
                  onClick={() => navigate("/sign-up")}
                >
                  Sign Up
                </span>
              </p>
            </form>
          </div>
        </section>
        {/* image */}
        <section className="lg:w-3/5">
          <img src="/images/rabbit.jpg" alt="rabbit" className="h-[666px]" />
        </section>
      </div>
      {/* footer */}
      <FooterComponent />
    </div>
  );
};

export default SignInPage;
