import axios from "axios";

const getNewAccessToken = async () => {
  const token = localStorage.getItem("refreshToken");
  let result;
  await axios.post(
    "https://alt.uniteframework.io/auth/realms/hasura-app/protocol/openid-connect/token",
    new URLSearchParams({
      client_id: "hasura-app",
      refresh_token: token,
      grant_type: "refresh_token",
      client_secret: "ixoAI89JICldF5xF9Y8cgDGJrbOu6SGw",
    }).then((response) => {
      return response;
    })
  );
};

export default getNewAccessToken;
