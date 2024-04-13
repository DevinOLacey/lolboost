import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import login from "./Auth";


export default function CreateAccountForm() {
  const { setToken, baseUrl } = useAuthContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };


  const [password, setPassword] = useState("");
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const handlePasswordConfirmationChange = (event) => {
    const value = event.target.value;
    setPasswordConfirmation(value);
  };


  const [riotId, setRiotId] = useState("");
  const handleRiotIdChange = (event) => {
    const value = event.target.value;
    setRiotId(value);
  };


  const [u_gg, setU_gg] = useState("");
  const handleU_ggChange = (event) => {
    const value = event.target.value;
    setU_gg(value);
  };

  const [alert, setAlert] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.username = username;
    data.password = password;
    data.password_confirmation = passwordConfirmation;
    data.riot_id = riotId;
    data.u_gg = u_gg;

    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const url = `${process.env.REACT_APP_API_HOST}/accounts`;
    const response = await fetch(url, fetchConfig);
    let responseMessage = await response.json();

    if (response.status === 400) {
      setAlert(responseMessage);
    } else if (response.ok) {
      setUsername("");
      setPassword("");
      setPasswordConfirmation("");
      const token = await login(username, password, baseUrl);
      setToken(token);
      navigate("/home");
    }
  };

  return (
    <div className="flex py-10 justify-center">
      <form onSubmit={handleSubmit} id="loginform">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              onChange={handleUsernameChange}
              required
              type="email"
              id="username"
              name="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={username}
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
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="passwordconf"
            >
              Confirm password
            </label>
            <input
              onChange={handlePasswordConfirmationChange}
              required
              type="password"
              id="passwordconf"
              name="passwordconf"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={passwordConfirmation}
              placeholder="******************"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="riotid"
            >
              Riot ID
            </label>
            <input
              onChange={handleRiotIdChange}
              required
              type="text"
              id="riotid"
              name="riotid"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={riotId}
              placeholder="Riot ID"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="u_gg"
            >
              U.gg
            </label>
            <input
              onChange={handleU_ggChange}
              required
              type="url"
              id="u_gg"
              name="u_gg"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={u_gg}
              placeholder="U.gg"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create account
            </button>
          </div>
          {alert ? (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Yikes!</strong>
              <span className="block sm:inline"> {alert.detail}.</span>
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
        </div>
      </form>
    </div>
  );
}
