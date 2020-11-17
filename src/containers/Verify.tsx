import React, { useEffect, useState } from "react";
import { VerificationFlow } from "@oryd/kratos-client";
import { KratosMessages } from "components/KratosMessages";
import { KratosForm } from "components/KratosForm";
import { Header } from "components/Header";
import { fetchVerificationFlow } from "services/flow";
import { verify } from "services/redirect";

export const Verify = () => {
  const [requestResponse, setRequestResponse] = useState<VerificationFlow>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const flow = params.get("flow");
    if (!flow) {
      verify();
    } else {
      fetchVerificationFlow(flow).then((flow) => {
        if (flow) {
          setRequestResponse(flow);
        }
      });
    }
  });

  const messages = requestResponse?.messages;
  const form = requestResponse?.methods?.link?.config;

  return (
    <div className="content">
      <Header />
      <div className="container">
        <h4>Resend verification code</h4>
        {messages && <KratosMessages messages={messages} />}
        {form && (
          <React.Fragment>
            <KratosForm
              submitLabel="Resend verification code"
              action={form.action}
              fields={form.fields}
              messages={form.messages}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
