import React from "react";
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
import { useDispatch } from "react-redux";
import { resetPasswordAction } from "@/redux/slices/authSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FourDigitInput } from "@/components/ui/FourDigitInput";
import { ResetPasswordScreenNavigationProp } from "@/types/navigationTypes";
import { AppDispatch } from "../types/userTypes";
import logo from "../../assets/logo.png";

const formSchema = Yup.object({
  code: Yup.string()
    .length(4, "Code must be 4 digits")
    .required("Code is required"),
  newPassword: Yup.string().required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Confirm your password"),
});

export const ResetPassword: React.FC = () => {
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
    <SafeAreaView className="flex-1 bg-neutral-light">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
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
              <View className="flex-1 p-3 justify-center">
                <View className="items-center mb-6">
                  <Image source={logo} style={{ width: 120, height: 120 }} />
                </View>
                <View className="items-center mb-6">
                  <Text className="font-poppinsBold text-3xl text-primary-red mb-2">
                    Reset Password
                  </Text>
                  <Text className="font-poppins text-lg text-neutral-dark max-w-4/5 text-center">
                    Enter the code sent to your email and your new password
                    below.
                  </Text>
                </View>
                <View className="mb-6">
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
                      submitCount > 0 &&
                      touched.newPassword &&
                      errors.newPassword
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
                <MainButton
                  stylePressableProps="p-4 bg-primary-red my-4 rounded-lg shadow"
                  styleTextProps="font-poppinsBold text-neutral-light text-center text-lg"
                  onPressProps={handleSubmit}
                  isLoading={isSubmitting}
                  children="Reset Password"
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
