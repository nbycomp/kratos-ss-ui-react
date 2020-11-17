import { kratos } from "./kratos";

export const fetchLoginFlow = async (id: string) => {
  try {
    return (await kratos().getSelfServiceLoginFlow(id)).data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchRegistrationFlow = async (id: string) => {
  try {
    return (await kratos().getSelfServiceRegistrationFlow(id)).data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchRecoveryFlow = async (id: string) => {
  try {
    return (await kratos().getSelfServiceRecoveryFlow(id)).data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchSettingsFlow = async (id: string) => {
  try {
    return (await kratos().getSelfServiceSettingsFlow(id)).data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchVerificationFlow = async (id: string) => {
  try {
    return (await kratos().getSelfServiceVerificationFlow(id)).data;
  } catch (err) {
    console.error(err);
  }
};
