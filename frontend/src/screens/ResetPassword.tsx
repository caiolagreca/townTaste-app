import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Alert, SafeAreaView, Text, View } from "react-native";
import { MainButton } from "@/components/ui/MainButton";
import { InputField } from "@/components/ui/InputField";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../types/userTypes";
import { resetPasswordAction } from "@/redux/slices/authSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FourDigitInput } from "@/components/ui/FourDigitInput";
import { ResetPasswordScreenNavigationProp } from "@/types/navigationTypes";

const formSchema = Yup.object({
  code: Yup.string()
    .length(4, "Code must be 4 digits")
    .required("Code is required"),
  newPassword: Yup.string().required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Confirm your password"),
});

export const ResetPasword: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<ResetPasswordScreenNavigationProp>();
  const route = useRoute();
  const { email } = route.params as { email: string };

  const handleResetPassword = async (
    values: { code: string; newPassword: string; confirmPassword: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      await dispatch(
        resetPasswordAction({
          email,
          code: values.code,
          newPassword: values.newPassword,
        })
      ).unwrap();
      Alert.alert("Success", "Password reset successfully");
      navigation.navigate("Login");
    } catch (error: any) {
      Alert.alert("Password Reset Failed", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView>
      <Formik
        initialValues={{ code: "", newPassword: "", confirmPassword: "" }}
        validationSchema={formSchema}
        onSubmit={handleResetPassword}
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
          setFieldValue,
        }) => (
          <View className="p-3">
            <View className="items-center">
              <Text className="font-poppinsBold text-2xl my-3">
                Reset Password
              </Text>
              <Text className="font-poppins text-base max-w-3/5 text-center">
                Enter your new password below
              </Text>
            </View>
            <View className="my-3">
              <FourDigitInput
                value={values.code}
                onChange={(value) => setFieldValue("code", value)}
              />

              {submitCount > 0 && touched.code && errors.code && (
                <Text style={{ color: "red" }}>{errors.code}</Text>
              )}
              <InputField
                inputProps="New Password"
                containerProps="mt-3"
                secure
                value={values.newPassword}
                onChangeProps={handleChange("newPassword")}
                onBlurProps={handleBlur("newPassword")}
                error={
                  submitCount > 0 && touched.newPassword && errors.newPassword
                }
              />
              <InputField
                inputProps="Confirm Password"
                containerProps="mt-3"
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
            <View></View>
            <MainButton
              stylePressableProps="p-3 bg-primary-red my-3 rounded-lg shadow"
              styleTextProps="font-poppinsBold text-neutral-light text-center text-lg"
              onPressProps={handleSubmit}
              isLoading={isSubmitting}
              children="Reset Password"
            />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};
