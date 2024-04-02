import { useNavigate } from "react-router";
import { useState } from "react";
import login from "./Auth";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setToken, baseUrl } = useAuthContext();
  const [email, setEmail] = useState("");
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const [alert, setAlert] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    // custom login logic to allow for returning error messages that we can display
    try {
      const token = await login(email, password, baseUrl);
      setToken(token);
      navigate("/home");
    } catch (error) {
      let errormessage = error["message"];
      setAlert(errormessage);
      setEmail("");
      setPassword("");
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    navigate("/accounts/create");
  };

  return (
    <div className="flex py-10 justify-center">
      <form onSubmit={handleSubmit} id="loginform">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              onChange={handleEmailChange}
              required
              type="text"
              id="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              onChange={handlePasswordChange}
              required
              type="password"
              id="password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              placeholder="******************"
            />
          </div>
          {alert ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Yikes!</strong>
              <span className="block sm:inline"> {alert}.</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          ) : (
            <></>
          )}
          <div className="flex items-center justify-between">
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Login
            </button>
            <button onClick={handleRegister} className="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-gray-800" type="">
              Create account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
