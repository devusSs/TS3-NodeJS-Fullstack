import { useEffect, useRef } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth }: any = useAuth();

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      const requestIntercept = axiosPrivate.interceptors.request.use(
        (config) => {
          if (!config.headers["Authorization"]) {
            config.headers["Authorization"] = `Bearer ${auth?.token}`;
          }
          return config;
        },
        (error) => {
          Promise.reject(error);
        }
      );

      const responseIntercept = axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
          const prevRequest = error?.config;
          if (error?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const refreshedToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${refreshedToken}`;
            return axiosPrivate(prevRequest);
          }
          return Promise.reject(error);
        }
      );
      return () => {
        effectRan.current = true;
        axiosPrivate.interceptors.request.eject(requestIntercept);
        axiosPrivate.interceptors.response.eject(responseIntercept);
      };
    }
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
