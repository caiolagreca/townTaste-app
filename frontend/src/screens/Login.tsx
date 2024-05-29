import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";

import { SafeAreaView, Text, View } from "react-native";
import { MainButton } from "@/components/ui/MainButton";
import { IconButton } from "@/components/ui/IconButton";
import { InputField } from "@/components/ui/InputField";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { loginAction } from "@/redux/slices/authSlice";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProp } from "@/types/navigationTypes";

const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginAction(values));
    },
    validationSchema: formSchema,
  });
  const { user, loading, appError, serverError } = useSelector(
    (state: RootState) => state?.auth
  );

  if (user) {
    navigation.navigate("Home");
  }

  const forgotPasswordPressed = () => {
    navigation.navigate("SignUp");
  };

  const createAccountPressed = () => {
    navigation.navigate("SignUp");
  };

  return (
    <SafeAreaView>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => dispatch(loginAction(values))}
      >
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
              value={formik.values.email}
              onChangeProps={formik.handleChange("email")}
              onBlurProps={formik.handleBlur("email")}
            />
            <InputField
              inputProps="Password"
              secure
              value={formik.values.password}
              onChangeProps={formik.handleChange("password")}
              onBlurProps={formik.handleBlur("password")}
            />
          </View>
          {appError || serverError ? (
            <Text className="text-red-500">{appError || serverError}</Text>
          ) : null}
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
            onPressProps={formik.handleSubmit}
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
      </Formik>
    </SafeAreaView>
  );
};
