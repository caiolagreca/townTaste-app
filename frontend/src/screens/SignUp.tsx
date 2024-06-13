import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
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
import { InputField } from "@/components/ui/InputField";
import { MainButton } from "@/components/ui/MainButton";
import { signUpAction, logout } from "@/redux/slices/authSlice";
import { SignUpScreenNavigationProp } from "@/types/navigationTypes";
import { AppDispatch, RootState, SignUpUser } from "@/types/userTypes";
import logo from "../../assets/logo.png";

const formSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string().required("Confirm your password"),
  firstName: Yup.string().required("Name is required"),
});

export const SignUp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      navigation.navigate("Login");
    }
  }, [user, navigation]);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleSignUp = async (
    values: {
      email: string;
      password: string;
      confirmPassword: string;
      firstName: string;
      lastName?: string;
      phoneNumber?: string;
    },
    { setSubmitting, setErrors }: any
  ) => {
    try {
      const signUpData: SignUpUser = {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName || undefined,
        phoneNumber: values.phoneNumber || undefined,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      await dispatch(signUpAction(signUpData)).unwrap();
      navigation.navigate("Login");
    } catch (error: any) {
      const errors: { email?: string; password?: string } = {};
      setErrors(errors);
      Alert.alert("Sign Up failed", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const loginPressed = () => {
    navigation.navigate("Login");
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
              isSubmitting,
            }) => (
              <View className="flex-1 p-3 justify-center">
                <View className="items-center mb-3">
                  <Image source={logo} className="w-40 h-40" />
                </View>
                <View className="items-center mb-4">
                  <Text className="font-poppinsBold text-3xl text-primary-red mb-2">
                    Create Account
                  </Text>
                  <Text className="font-poppins text-lg text-neutral-dark max-w-4/5 text-center">
                    Ready to explore new restaurants?
                  </Text>
                </View>
                <View className="mb-6">
                  <View className="flex-row mb-3">
                    <InputField
                      inputProps="First Name"
                      containerProps="flex-1 mr-2"
                      value={values.firstName}
                      onChangeProps={handleChange("firstName")}
                      onBlurProps={handleBlur("firstName")}
                      error={
                        submitCount > 0 && touched.firstName && errors.firstName
                      }
                    />
                    <InputField
                      inputProps="Last Name"
                      containerProps="flex-1 ml-2"
                      value={values.lastName}
                      onChangeProps={handleChange("lastName")}
                      onBlurProps={handleBlur("lastName")}
                      error={
                        submitCount > 0 && touched.lastName && errors.lastName
                      }
                    />
                  </View>
                  <InputField
                    inputProps="Phone Number"
                    containerProps="mt-3"
                    value={values.phoneNumber}
                    keyboardType="numeric"
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
                  children="Sign Up"
                />
                <MainButton
                  stylePressableProps="p-4 bg-secondary-yellow rounded-lg mt-2"
                  styleTextProps="font-poppinsBold text-base text-neutral-dark text-center"
                  onPressProps={loginPressed}
                  children="Already have an account"
                />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
