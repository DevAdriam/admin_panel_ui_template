import AuthForm from "./components/auth-form";
import logo from "../../assets/logo.png";

const Login = () => {
  return (
    <section className="min-w-screen min-h-screen flex items-center justify-center ">
      {/* logo */}
      <div className="none lg:w-2/3 w-0 h-screen shadow-md bg-custom-secondary flex items-center justify-center">
        <img src={logo} alt="logo" width={300} height={300} />
      </div>
      {/* form */}
      <div className="lg:w-2/3 w-full h-screen flex items-center justify-center flex-col ">
        <div className="grid gap-2 min-w-[55%]">
          <h1 className="font-bold text-2xl my-5 ">Sign In</h1>
          <AuthForm />
        </div>
      </div>
    </section>
  );
};

export default Login;
