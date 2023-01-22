import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth }: any = useAuth();

  const refresh = async () => {
    const response = await axios.get("/clients/refresh", {
      withCredentials: true,
    });
    setAuth((prev: any) => {
      return {
        ...prev,
        user: response?.data?.data?.username,
        token: response?.data?.data?.token,
        expiry: response?.data?.data?.expires_at,
      };
    });
    return response?.data?.data?.token;
  };
  return refresh;
};

export default useRefreshToken;
