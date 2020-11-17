import React, { useEffect, useState } from "react";
import { RegistrationFlow } from "@oryd/kratos-client";
import { KratosMessages } from "components/KratosMessages";
import { KratosForm } from "components/KratosForm";
import { IconLogo } from "components/IconLogo";
import { endpoints, register } from "services/redirect";
import { fetchRegistrationFlow } from "services/flow";

export const Register = () => {
  const [requestResponse, setRequestResponse] = useState<RegistrationFlow>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const flow = params.get("flow");
    if (!flow) {
      register();
    } else {
      fetchRegistrationFlow(flow).then((flow) => {
        if (flow) {
          setRequestResponse(flow);
        }
      });
    }
  }, [setRequestResponse]);

  const form = requestResponse?.methods?.password?.config;
  const messages = requestResponse?.messages;

  return (
    <div className="auth">
      <div className="container">
        <IconLogo />
        <h5 className="subheading">
          Welcome to SecureApp! <br />
          Use the form below to sign up:
        </h5>
        <div id="registration-password">
          {messages && <KratosMessages messages={messages} />}
          {form && (
            <KratosForm
              submitLabel="Sign up"
              action={form.action}
              fields={form.fields}
              messages={form.messages}
            />
          )}
        </div>
        <hr className="divider" />
        <div className="alternative-actions">
          <p>
            <a href={endpoints.login}>
              Already have an account? Log in instead
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
