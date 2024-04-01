import { getToken } from "@galvanize-inc/jwtdown-for-react";

/**
 * Login to set API token.
 * @param username - Username of existing account
 * @param password - Password of existing account
 */
const login = async (username, password, baseUrl) => {
  const url = `${baseUrl}/token`;
  const form = new FormData();
  form.append("username", username);
  form.append("password", password);
  let result = await fetch(url, {
    method: "post",
    credentials: "include",
    body: form,
  });
  const data = await result.json();
  if (result.ok) {
    return await getToken(baseUrl)
  } else {
    throw new Error(data.detail);
  }
};

export default login;
