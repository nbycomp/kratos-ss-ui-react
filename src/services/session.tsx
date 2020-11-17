import React, { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@oryd/kratos-client";
import { kratos } from "./kratos";

interface SessionState {
  session: Session | undefined;
  isInit: boolean;
  isFetching: boolean;
}

const SessionContext = createContext<SessionState>({
  session: undefined,
  isInit: true,
  isFetching: false,
});

export const useSession = () => useContext(SessionContext);

const getSession = () => kratos().whoami();

export const SessionProvider: React.FunctionComponent = ({ children }) => {
  const [isInit, setIsInit] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [session, setSession] = useState<Session | undefined>();

  useEffect(() => {
    setIsFetching(true);
    setIsInit(false);
    getSession()
      .then(({ data }) => {
        setSession(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsFetching(false));
  }, []);

  return (
    <SessionContext.Provider value={{ session, isInit, isFetching }}>
      {children}
    </SessionContext.Provider>
  );
};
