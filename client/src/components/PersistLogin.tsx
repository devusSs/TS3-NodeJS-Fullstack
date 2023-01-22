import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useRefreshToken();
  const { auth }: any = useAuth();

  const effectRan = useRef(false);

  useEffect((): any => {
    if (effectRan.current === false) {
      let isMounted = true;

      const verifyRefreshToken = async () => {
        try {
          await refresh();
        } catch (err) {
          console.error(err);
        } finally {
          effectRan.current = true;
          isMounted && setIsLoading(false);
        }
      };

      !auth?.token ? verifyRefreshToken() : setIsLoading(false);

      return () => (isMounted = false);
    }
  }, []);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
