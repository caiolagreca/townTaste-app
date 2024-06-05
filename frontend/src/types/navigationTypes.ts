import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Login: undefined; //undefined means that the route doens't have params
  SignUp: undefined;
  Home: undefined;
  ForgotPassword: undefined;
  ResetPassword: { email: string };
};

export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

export type SignUpScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignUp"
>;

export type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ForgotPassword"
>;

export type ResetPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ResetPassword"
>;

export type ResetPasswordScreenRouteProp = RouteProp<
  RootStackParamList,
  "ResetPassword"
>;
