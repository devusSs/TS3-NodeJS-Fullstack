import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth }: any = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await axios("/clients/logout", {
        method: "DELETE",
        withCredentials: true,
      });
    } catch (err) {}
  };

  return logout;
};

export default useLogout;
