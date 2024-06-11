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
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MainButton } from "@/components/ui/MainButton";
import { InputField } from "@/components/ui/InputField";
import { passwordResetTokenAction } from "@/redux/slices/authSlice";
import { ForgotPasswordScreenNavigationProp } from "@/types/navigationTypes";
import { AppDispatch, RootState } from "../types/userTypes";
import logo from "../../assets/logo.png";

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
              <View className="flex-1 p-3 justify-center">
                <View className="items-center mb-6">
                  <Image source={logo} style={{ width: 120, height: 120 }} />
                </View>
                <View className="items-center mb-6">
                  <Text className="font-poppinsBold text-3xl text-primary-red mb-2">
                    Password Reset
                  </Text>
                  <Text className="font-poppins text-lg text-neutral-dark max-w-4/5 text-center">
                    Reset your password if you have forgotten it.
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
                </View>
                <MainButton
                  stylePressableProps="p-4 bg-primary-red my-4 rounded-lg shadow"
                  styleTextProps="font-poppinsBold text-neutral-light text-center text-lg"
                  onPressProps={handleSubmit}
                  isLoading={isSubmitting}
                  children="Send Reset Code"
                />
                <MainButton
                  stylePressableProps="p-4 bg-secondary-yellow rounded-lg mt-2"
                  styleTextProps="font-poppinsBold text-base text-neutral-dark text-center"
                  children="Back to Login"
                  onPressProps={backLoginPressed}
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
