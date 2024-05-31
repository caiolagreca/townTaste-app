import { IconButton } from "@/components/ui/IconButton";
import { InputField } from "@/components/ui/InputField";
import { MainButton } from "@/components/ui/MainButton";
import { loginAction } from "@/redux/slices/authSlice";
import { LoginScreenNavigationProp } from "@/types/navigationTypes";
import { AppDispatch, RootState } from "@/types/userTypes";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useEffect } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const formSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  firstName: Yup.string().required("Name is required"),
});

export const SignUp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const { user, loading, appError, serverError } = useSelector(
    (state: RootState) => state.auth
  );

  const loginPressed = () => {
    navigation.navigate("Login");
  };

  const handleSignUp = async (
    values: {
      email: string;
      password: string;
      confirmPassword: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
    },
    { setSubmitting, setErrors }: any
  ) => {
    try {
      await dispatch(loginAction(values)).unwrap();
      navigation.navigate("Login");
    } catch (error: any) {
      const errors: { email?: string; password?: string } = {};
      setErrors(errors);
      Alert.alert("Sign Up failed", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView className="grow">
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              firstName: "",
              lastName: "",
              phoneNumber: "",
            }}
            validationSchema={formSchema}
            onSubmit={handleSignUp}
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
                  <Text className="font-poppinsBold text-2xl my-3">
                    Create Account
                  </Text>
                  <Text className="font-poppins text-sm max-w-4/5 text-center">
                    Create an account so you can explore all the existing jobs
                  </Text>
                </View>
                <View className="my-3">
                  <InputField
                    inputProps="Name"
                    value={values.firstName}
                    onChangeProps={handleChange("firstName")}
                    onBlurProps={handleBlur("firstName")}
                    error={
                      submitCount > 0 && touched.firstName && errors.firstName
                    }
                  />
                  <InputField
                    inputProps="Last Name"
                    value={values.lastName}
                    onChangeProps={handleChange("lastName")}
                    onBlurProps={handleBlur("lastName")}
                    error={
                      submitCount > 0 && touched.lastName && errors.lastName
                    }
                  />
                  <InputField
                    inputProps="Phone Number"
                    value={values.phoneNumber}
                    onChangeProps={handleChange("phoneNumber")}
                    onBlurProps={handleBlur("phoneNumber")}
                    error={
                      submitCount > 0 &&
                      touched.phoneNumber &&
                      errors.phoneNumber
                    }
                  />
                  <InputField
                    inputProps="Email"
                    value={values.email}
                    onChangeProps={handleChange("email")}
                    onBlurProps={handleBlur("email")}
                    error={submitCount > 0 && touched.email && errors.email}
                  />
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
                    error={
                      submitCount > 0 && touched.password && errors.password
                    }
                  />
                  <InputField
                    inputProps="Confirm Password"
                    secure
                    value={values.confirmPassword}
                    onChangeProps={handleChange("confirmPassword")}
                    onBlurProps={handleBlur("confirmPassword")}
                    error={
                      submitCount > 0 &&
                      touched.confirmPassword &&
                      errors.confirmPassword
                    }
                  />
                </View>
                <MainButton
                  stylePressableProps="p-3 bg-primary-red my-3 rounded-lg shadow"
                  styleTextProps="font-poppinsBold text-neutral-light text-center text-lg"
                  onPressProps={handleSubmit}
                  children="Sign Up"
                />
                <MainButton
                  stylePressableProps="p-3"
                  styleTextProps="font-poppins text-center text-base"
                  onPressProps={loginPressed}
                  children="Already have an account"
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
