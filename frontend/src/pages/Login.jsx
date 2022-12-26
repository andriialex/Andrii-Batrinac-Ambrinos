import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGGED_IN } from "../features/auth/authSlice";
import { USER_DATA } from "../features/auth/authSlice";
import useRedirectLoggedIn from "../hooks/useRedirectLoggedIn";
import { toast } from "react-toastify";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useRedirectLoggedIn();

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = {
      email: event.target.elements.email.value,
      pass: event.target.elements.password.value,
    };
    // console.log(JSON.stringify(body))
    fetch("/api/login", {
      credentials: 'include',
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message, {
          position: "bottom-center",
          autoClose: 5000,
        });
        dispatch(LOGGED_IN(true));
        dispatch(USER_DATA(data.user));
        navigate("/");
      })
      .catch((error) => {
        toast.error(error, {
          position: "bottom-center",
          autoClose: 5000,
        });
        dispatch(LOGGED_IN(false));
        dispatch(USER_DATA(null));
      });
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Autentificare
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Nu ai cont?{" "}
              <a
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Înregistrează-te aici
              </a>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md pb-8">
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Adresă email"
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Parolă"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                AUTENTIFICARE
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#600AFF"
            fillOpacity="1"
            d="M0,224L16,229.3C32,235,64,245,96,234.7C128,224,160,192,192,154.7C224,117,256,75,288,53.3C320,32,352,32,384,69.3C416,107,448,181,480,197.3C512,213,544,171,576,160C608,149,640,171,672,192C704,213,736,235,768,234.7C800,235,832,213,864,192C896,171,928,149,960,154.7C992,160,1024,192,1056,181.3C1088,171,1120,117,1152,112C1184,107,1216,149,1248,170.7C1280,192,1312,192,1344,170.7C1376,149,1408,107,1424,85.3L1440,64L1440,320L1424,320C1408,320,1376,320,1344,320C1312,320,1280,320,1248,320C1216,320,1184,320,1152,320C1120,320,1088,320,1056,320C1024,320,992,320,960,320C928,320,896,320,864,320C832,320,800,320,768,320C736,320,704,320,672,320C640,320,608,320,576,320C544,320,512,320,480,320C448,320,416,320,384,320C352,320,320,320,288,320C256,320,224,320,192,320C160,320,128,320,96,320C64,320,32,320,16,320L0,320Z"
          ></path>
        </svg>
      </div>
    </>
  );
}
