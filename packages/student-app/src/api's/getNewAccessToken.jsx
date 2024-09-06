import axios from "axios";

const getNewAccessToken = async () => {
  const token = sessionStorage.getItem("refreshToken");

  console.log("INSIDE TOKEN API");
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/auth/realms/hasura-app/protocol/openid-connect/token`,
      new URLSearchParams({
        client_id: "hasura-app",
        refresh_token: token,
        grant_type: "refresh_token",
        client_secret: "9ca6e96d-f72e-4208-91f4-a2d8e681f767",
      })
    );
    
    console.log(response.data); 
    return response.data; 
  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export default getNewAccessToken;
