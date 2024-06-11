import React, { useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { MainButton } from "@/components/ui/MainButton";
import { InputField } from "@/components/ui/InputField";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logout } from "@/redux/slices/authSlice";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProp } from "@/types/navigationTypes";
import { AppDispatch, RootState } from "../types/userTypes";
import logo from "../../assets/logo.png";

const formSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      navigation.navigate("Home");
    }
  }, [user, navigation]);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  const forgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const createAccountPressed = () => {
    navigation.navigate("SignUp");
  };

  const handleLogin = async (
    values: { email: string; password: string },
    { setSubmitting, setErrors }: any
  ) => {
    try {
      await dispatch(loginAction(values)).unwrap();
      navigation.navigate("Home");
    } catch (error: any) {
      const errors: { email?: string; password?: string } = {};
      if (error.errorCode == 1001) {
        errors.email = "User not found";
      } else if (error.errorCode == 1003) {
        errors.password = "Incorrect password";
      } else if (error.message.includes("Too many login attempts")) {
        errors.email = error.message;
      } else if (error.message.includes("attempts left")) {
        errors.password = error.message;
      } else {
        errors.email = error.message;
      }
      setErrors(errors);
      Alert.alert("Login Failed", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-light">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="always"
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={formSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              submitCount,
              isSubmitting,
            }) => (
              <View className="flex-1 p-3 justify-center">
                <View className="items-center mb-2">
                  <Image source={logo} className="w-44 h-44" />
                </View>
                <View className="items-center mb-6">
                  <Text className="font-poppinsBold text-3xl text-primary-red mb-3">
                    Towntaste
                  </Text>
                  <Text className="font-poppins text-lg text-neutral-dark max-w-4/5 text-center">
                    Discover the best local food experiences in your location!
                  </Text>
                </View>
                <View className="mb-6">
                  <InputField
                    inputProps="Email"
                    containerProps="mt-3"
                    value={values.email}
                    onChangeProps={handleChange("email")}
                    onBlurProps={handleBlur("email")}
                    error={submitCount > 0 && touched.email && errors.email}
                  />
                  <InputField
                    inputProps="Password"
                    containerProps="mt-3"
                    secure
                    value={values.password}
                    onChangeProps={handleChange("password")}
                    onBlurProps={handleBlur("password")}
                    error={
                      submitCount > 0 && touched.password && errors.password
                    }
                  />
                </View>

                <View>
                  <MainButton
                    stylePressableProps=""
                    styleTextProps="pb-3 font-poppinsBold text-sm text-secondary-blue self-end"
                    onPressProps={forgotPasswordPressed}
                    children="Forgot your password?"
                  />
                </View>
                <MainButton
                  stylePressableProps="p-4 bg-primary-red my-4 rounded-lg shadow"
                  styleTextProps="font-poppinsBold text-neutral-light text-center text-lg"
                  onPressProps={handleSubmit}
                  isLoading={isSubmitting}
                  children="Sign in"
                />
                <MainButton
                  stylePressableProps="p-4 bg-secondary-yellow rounded-lg mt-2"
                  styleTextProps="font-poppinsBold text-base text-neutral-dark text-center"
                  children="Create new account"
                  onPressProps={createAccountPressed}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
