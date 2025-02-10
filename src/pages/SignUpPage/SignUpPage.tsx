import { useForm } from "react-hook-form";
import CheckboxComponent from "../../components/CheckboxComponent/CheckboxComponent";
import FooterComponent from "../../components/FooterComponent/FooterComponent";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const schema = yup.object({
    name: yup.string().required("Name là bắt buộc"),
    email: yup
      .string()
      .required("Email là bắt buộc")
      .email("Email không hợp lệ"),
    password: yup
      .string()
      .required("Mật khẩu là bắt buộc")
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const name = watch("name");
  const email = watch("email");
  const password = watch("password");

  const onSubmit = () => {};

  return (
    <div className="container lg:w-full mx-auto">
      <div className="relative">
        <img
          src="/images/bg-signup.jpg"
          alt="sign up"
          className="lg:h-[400px] lg:w-full lg:px-3 rounded-[30px] lg:py-4"
        />
        <p className="text-[48px] text-[#fff] lg:mb-[5px] font-bold absolute lg:top-[20%] lg:right-[45%]">
          Sign Up
        </p>
        <p className="text-[16px] text-[#fff] lg:mb-[5px] font-medium absolute lg:top-[40%] lg:right-[42%]">
          "Join us today – Simple, Fast, and Free!"
        </p>
      </div>
      <div className="flex flex-col absolute lg:top-[30%] lg:right-[35%] lg:w-[468px] lg:px-4 lg:pb-4 lg:rounded-xl bg-slate-100">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:mt-10">
            <input
              value={name}
              type="text"
              placeholder="Name"
              {...register("name")}
              className="lg:w-full rounded-lg lg:h-[40px] lg:py-1 text-[#8C8C8C] lg:px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="lg:my-5">
            <input
              value={email}
              type="text"
              placeholder="Email"
              {...register("email")}
              className="lg:w-full rounded-lg lg:h-[40px] lg:py-1 text-[#8C8C8C] lg:px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="lg:my-5">
            <input
              value={password}
              type="text"
              placeholder="Password"
              {...register("password")}
              className="lg:w-full rounded-lg lg:h-[40px] lg:py-1 text-[#8C8C8C] lg:px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </span>
            )}
          </div>
        </form>
        <div className="lg:mt-5 lg:mb-5">
          <CheckboxComponent text="I agree the" />
          <span className="font-bold">Terms and Conditions</span>
        </div>
        <button
          //   disabled={isPending}
          type="submit"
          className="w-full lg:my-5 bg-[#1890ff] text-white text-[13px] font-medium px-[15px] py-2 rounded-lg text-sm hover:bg-[#40a9ff] transition-colors disabled:opacity-50"
        >
          SIGN UP
        </button>
        <p className="text-center ">
          <span className="text-[#8C8C8C] font-medium">
            Already have an account?{" "}
          </span>
          <span
            className="text-[#14141] font-bold hover:text-[#1890ff] cursor-pointer "
            onClick={() => navigate("/sign-in")}
          >
            Sign In
          </span>
        </p>
      </div>
      {/* footer */}
      <div className="lg:mt-80">
        <FooterComponent />
      </div>
    </div>
  );
};

export default SignUpPage;
