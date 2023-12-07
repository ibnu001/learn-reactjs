import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-5xl text-red-700 font-bold mb-6">Oops!!!</h1>
      <p className="text-xl font-semibold mb-3">
        Sorry, an unexpected error has ocurred.
      </p>
      <p className="text-xl">
        {error.statusText || error.message}
      </p>
    </div>
  );
};

export default ErrorPage;
