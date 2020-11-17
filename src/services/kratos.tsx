import { Configuration, PublicApi } from "@oryd/kratos-client";
import config from "config/kratos";

export const kratos = () =>
  new PublicApi(
    new Configuration({
      basePath: config.kratos.public,
    })
  );
