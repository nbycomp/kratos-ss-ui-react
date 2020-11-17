import React, { useEffect, useState } from "react";
import { RecoveryFlow } from "@oryd/kratos-client";
import { KratosMessages } from "components/KratosMessages";
import { KratosForm } from "components/KratosForm";
import { Header } from "components/Header";
import { recover } from "services/redirect";
import { fetchRecoveryFlow } from "services/flow";

export const Recover = () => {
  const [requestResponse, setRequestResponse] = useState<RecoveryFlow>();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const flow = params.get("flow");
    if (!flow) {
      recover();
    } else if (!requestResponse) {
      fetchRecoveryFlow(flow).then((flow) => {
        if (flow) {
          setRequestResponse(flow);
        }
      });
    }
  }, [requestResponse]);

  const form = requestResponse?.methods?.link?.config;
  const messages = requestResponse?.messages;

  return (
    <div className="content">
      <Header />
      <div className="container">
        <h4>Recover Your Account</h4>
        {messages && <KratosMessages messages={messages} />}
        {form && (
          <KratosForm
            submitLabel="Send recovery link"
            action={form.action}
            fields={form.fields}
            messages={form.messages}
          />
        )}
      </div>
    </div>
  );
};
