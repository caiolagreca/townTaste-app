import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";

import { Alert, SafeAreaView, Text, View } from "react-native";
import { MainButton } from "@/components/ui/MainButton";
import { IconButton } from "@/components/ui/IconButton";
import { InputField } from "@/components/ui/InputField";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logout } from "@/redux/slices/authSlice";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProp } from "@/types/navigationTypes";
import { AppDispatch, RootState } from "../types/userTypes";

const formSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const { user, loading, appError, serverError } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (user) {
      navigation.navigate("Home");
    }
  }, [user, navigation]);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  const forgotPasswordPressed = () => {
    navigation.navigate("SignUp");
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
    <SafeAreaView>
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
        }) => (
          <View className="p-3">
            <View className="items-center">
              <Text className="font-poppinsBold text-2xl my-3">Login Here</Text>
              <Text className="font-poppins text-base max-w-3/5 text-center">
                Welcome back, you've been missed!
              </Text>
            </View>
            <View className="my-3">
              <InputField
                inputProps="Email"
                value={values.email}
                onChangeProps={handleChange("email")}
                onBlurProps={handleBlur("email")}
                error={submitCount > 0 && touched.email && errors.email}
              />
              <InputField
                inputProps="Password"
                secure
                value={values.password}
                onChangeProps={handleChange("password")}
                onBlurProps={handleBlur("password")}
                error={submitCount > 0 && touched.password && errors.password}
              />
            </View>

            <View>
              <MainButton
                stylePressableProps=""
                styleTextProps="pb-3 font-poppinsBold text-sm text-secondary-blue self-end"
                onPressProps={forgotPasswordPressed}
                children="Forgot my password"
              />
            </View>
            <MainButton
              stylePressableProps="p-3 bg-primary-red my-3 rounded-lg shadow"
              styleTextProps="font-poppinsBold text-neutral-light text-center text-lg"
              onPressProps={handleSubmit}
              children="Sign in"
            />
            <MainButton
              stylePressableProps="p-3"
              styleTextProps="font-poppins text-center text-base"
              children="Create new account"
              onPressProps={createAccountPressed}
            />
            <View className="p-3">
              <Text className="font-poppins text-center text-sm">
                Or continue with
              </Text>
              <View className="p-1 flex-row justify-center">
                <IconButton nameProps="logo-google" />
                <IconButton nameProps="logo-apple" />
                <IconButton nameProps="logo-facebook" />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};
