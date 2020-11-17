import React, { useEffect } from "react";
import { useSession } from "services/session";
import { Header } from "components/Header";
import { login } from "services/redirect";

export const Dashboard = () => {
  const { session, isInit, isFetching } = useSession();

  useEffect(() => {
    if (!isInit && !isFetching && !session) {
      login();
    }
  }, [isFetching, isInit, session]);

  const user = session?.identity?.traits as any;
  if (!user) return null;

  return (
    <div className="content">
      <Header />
      <div className="container">
        <h2 className="greeting">
          Welcome back, <span className="user-identifier">{user.email}</span>!
        </h2>
        <h3>This example app is secure by default</h3>
        <p>Hello, nice to have you! You signed up with this data:</p>
        <pre>
          <code>{JSON.stringify(user, null, "  ")}</code>
        </pre>
        <p>Your current session:</p>
        <pre>
          <code>{JSON.stringify(session, null, "  ")}</code>
        </pre>
      </div>
    </div>
  );
};
