import { authCredentials } from "@/providers";
import { AuthPage } from "@refinedev/antd";

export const Register = () => {
  return (
    <AuthPage formProps={{ initialValues: authCredentials }} type="register" />
  );
};
