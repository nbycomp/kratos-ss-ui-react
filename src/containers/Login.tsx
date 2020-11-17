import React, { useEffect, useState } from "react";
import { LoginFlow } from "@oryd/kratos-client";
import { IconLogo } from "components/IconLogo";
import { KratosMessages } from "components/KratosMessages";
import { KratosForm } from "components/KratosForm";
import { endpoints, login } from "services/redirect";
import { fetchLoginFlow } from "services/flow";
import { useSession } from "services/session";

export const Login = () => {
  const [requestResponse, setRequestResponse] = useState<LoginFlow>();

  const { session } = useSession();
  useEffect(() => {
    if (!session) {
      const params = new URLSearchParams(window.location.search);
      const flow = params.get("flow");
      if (!flow) {
        login();
      } else if (!requestResponse) {
        fetchLoginFlow(flow).then((flow) => {
          if (flow) {
            setRequestResponse(flow);
          }
        });
      }
    }
  }, [requestResponse, session]);

  const messages = requestResponse?.messages;
  const form = requestResponse?.methods?.password?.config;

  return (
    <div className="auth">
      <div className="container">
        <IconLogo />
        <h5 className="subheading">Welcome to this example login screen!</h5>
        <div id="login-password">
          {messages && <KratosMessages messages={messages} />}
          {form && (
            <KratosForm
              submitLabel="Sign in"
              action={form.action}
              fields={form.fields}
              messages={form.messages}
            />
          )}
        </div>
        <hr className="divider" />
        <div className="alternative-actions">
          <p>
            <a href={endpoints.register}>Register new account</a>
          </p>
          <p>
            <a href={endpoints.recover}>Reset password</a>
          </p>
        </div>
      </div>
    </div>
  );
};
