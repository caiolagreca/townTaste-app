import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";

import { SafeAreaView, Text, View } from "react-native";
import { MainButton } from "@/components/ui/MainButton";
import { InputField } from "@/components/ui/InputField";
import { useDispatch, useSelector } from "react-redux";
import { passwordResetTokenAction } from "@/redux/slices/authSlice";
import { useNavigation } from "@react-navigation/native";
import { ForgotPasswordScreenNavigationProp } from "@/types/navigationTypes";
import { AppDispatch, RootState } from "../types/userTypes";

const formSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      navigation.navigate("Login");
    }
  }, [user, navigation]);

  const backLoginPressed = () => {
    navigation.navigate("Login");
  };

  const handleForgotPassword = async (
    values: { email: string },
    { setSubmitting, setErrors }: any
  ) => {
    try {
      await dispatch(passwordResetTokenAction(values)).unwrap();
      //.unwrap() is used to handle the result of an asynchronous operation in a more straightforward way. It allows you to directly get the payload or throw an error if the action was rejected.
      navigation.navigate("ResetPassword", { email: values.email });
    } catch (error: any) {
      const errors: { email?: string } = {};
      if (error.errorCode == 1001) {
        errors.email = "Email not found";
      } else {
        errors.email = error.message;
      }
      setErrors(errors);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={formSchema}
        onSubmit={handleForgotPassword}
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
          <View className="p-3">
            <View className="items-center">
              <Text className="font-poppinsBold text-2xl my-3">
                Password Reset
              </Text>
              <Text className="font-poppins text-base max-w-3/5 text-center">
                Reset your password if you have forgotten
              </Text>
            </View>
            <View className="my-3">
              <InputField
                inputProps="Email"
                containerProps="mt-3"
                value={values.email}
                onChangeProps={handleChange("email")}
                onBlurProps={handleBlur("email")}
                error={submitCount > 0 && touched.email && errors.email}
              />
            </View>
            <View>
              <MainButton
                stylePressableProps=""
                styleTextProps="pb-3 font-poppinsBold text-sm text-secondary-blue self-end"
                onPressProps={backLoginPressed}
                children="Back to Login page"
              />
            </View>
            <MainButton
              stylePressableProps="p-3 bg-primary-red my-3 rounded-lg shadow"
              styleTextProps="font-poppinsBold text-neutral-light text-center text-lg"
              onPressProps={handleSubmit}
              isLoading={isSubmitting}
              children="Send Reset Code"
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};
