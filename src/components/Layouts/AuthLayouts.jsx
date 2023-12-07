import { Link } from "react-router-dom";

const AuthLayout = (props) => {
  const { title, children, type } = props;
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xs">
        <h1 className="text-3xl font-bold mb-2 text-blue-600">{title}</h1>
        <p className="font-medium text-slate-600 mb-6">
          Welcome, please enter your details
        </p>

        {children}

        {/* ########## CARA 1 */}
        <Navigation type={type} />

        {/* ########## CARA 2 */}
        {/* <p className=" text-sm text-center mt-5">
          {type === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
            
          <Link
            to={type === "login" ? "/register" : "/login"}
            className="font-bold text-blue-600"
          >
            {type === "login" ? "Sign Up" : "Login"}
          </Link>
        </p> */}

        {/* ########## CARA 3 */}
        {/* <p className=" text-sm text-center mt-5">
          {type === "login"
            ? "Don't have an account? "
            : "Already have an account? "}

          {type === "login" && (
            <Link
              to="/register"
              className="font-bold text-blue-600"
            >
              Sign Up
            </Link>
          )}

          {type === "register" && (
            <Link
              to="/login"
              className="font-bold text-blue-600"
            >
              Login
            </Link>
          )}
        </p> */}
      </div>
    </div>
  );
};

const Navigation = ({ type }) => {
  if (type === "login") {
    return (
      <p className=" text-sm text-center mt-5">
        Don't have an account?{" "}
        <Link to="/register" className="font-bold text-blue-600">
          Sign Up
        </Link>
      </p>
    );
  } else {
    return (
      <p className=" text-sm text-center mt-5">
        Already have an account?{" "}
        <Link to="/login" className="font-bold text-blue-600">
          Login
        </Link>
      </p>
    );
  }
};

export default AuthLayout;
