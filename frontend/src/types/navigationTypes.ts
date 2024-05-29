import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Login: undefined; //undefined means that the route doens't have params
  SignUp: undefined;
  Home: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;
