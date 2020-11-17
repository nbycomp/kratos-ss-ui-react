import React, { useEffect, useState } from "react";
import { SettingsFlow } from "@oryd/kratos-client";
import { Header } from "components/Header";
import { KratosMessages } from "components/KratosMessages";
import { KratosForm } from "components/KratosForm";
import { settings } from "services/redirect";
import { fetchSettingsFlow } from "services/flow";

export const Settings = () => {
  const [requestResponse, setRequestResponse] = useState<SettingsFlow>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const flow = params.get("flow");
    if (!flow) {
      settings();
    } else if (!requestResponse) {
      fetchSettingsFlow(flow).then((flow) => {
        if (flow) {
          setRequestResponse(flow);
        }
      });
    }
  }, [requestResponse]);

  const { state } = requestResponse || {};
  const formPassword = requestResponse?.methods?.password?.config;
  const formProfile = requestResponse?.methods?.profile?.config;
  const messages = requestResponse?.messages;

  return (
    <div className="content">
      <Header />
      <div className="container">
        <h2>Settings</h2>
        {state === "success" && <p>Your changes have been saved!</p>}
        {messages && <KratosMessages messages={messages} />}
        <div id="user-password">
          <h3>Profile</h3>
          {formProfile && (
            <KratosForm
              submitLabel="Save"
              action={formProfile.action}
              fields={formProfile.fields}
              messages={formProfile.messages}
            />
          )}
        </div>
        <div id="user-password">
          <h3>Password</h3>
          {formPassword && (
            <KratosForm
              submitLabel="Save"
              action={formPassword.action}
              fields={formPassword.fields}
              messages={formPassword.messages}
            />
          )}
        </div>
      </div>
    </div>
  );
};
