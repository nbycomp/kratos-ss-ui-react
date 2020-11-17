import config from "config/kratos";

const selfService = `${config.kratos.browser}/self-service`;

export const endpoints = {
  login: `${selfService}/login/browser`,
  register: `${selfService}/registration/browser`,
  logout: `${selfService}/browser/flows/logout`,
  recover: `${selfService}/recovery/browser`,
  settings: `${selfService}/settings/browser`,
  verify: `${selfService}/verification/browser`,
};

export const login = () => {
  window.location.href = endpoints.login;
};

export const register = () => {
  window.location.href = endpoints.register;
};

export const logout = () => {
  window.location.href = endpoints.logout;
};

export const recover = () => {
  window.location.href = endpoints.recover;
};

export const settings = () => {
  window.location.href = endpoints.settings;
};

export const verify = () => {
  window.location.href = endpoints.verify;
};
