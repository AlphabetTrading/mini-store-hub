import { ActivityIndicator, Text } from "react-native-paper";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

import React, { useState } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../contexts/auth";
import { notifyMessage } from "../../components/Toast";
import { StatusBar } from "expo-status-bar";
import { useAppTheme } from "../../contexts/preference";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../graphql/mutations/authMutations";

import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";


type Props = {};

interface FormValues {
  phone: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  phone: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const LoginScreen = ({ }: any) => {
  const navigation = useNavigation();
  const { setAuthState, updateNotificationToken } = useAuth();
  const { theme } = useAppTheme();
  const [viewPassword, setViewPassword] = useState(false);
  const controller = new AbortController();

  const [login, { loading, data }] = useMutation(LOGIN_MUTATION, {
    notifyOnNetworkStatusChange: true,
    context: {
      fetchOptions: {
        signal: controller.signal,
      },
    },
    onCompleted: async ({ login }: any) => {
      if (login) {
        if (login?.user?.role !== "RETAIL_SHOP_MANAGER") {
          notifyMessage("Error: " + "You are not allowed to login as retailshop manager");
          return;
        }
        setAuthState(login);
        navigation.navigate("Root", {
          screen: "HomeRoot",
        });
        await SecureStore.setItemAsync("login", JSON.stringify(login));
        const token = (
          await Notifications.getExpoPushTokenAsync({
            projectId: Constants.expoConfig?.extra?.eas?.projectId,
          })
        ).data;
        await updateNotificationToken(login, token, "android");
      }
      else {
        notifyMessage("Error: " + "Invalid Credentials Please try again");
      }
    },
    onError: (error) => {
      console.log(error)
      notifyMessage("Error: " + error.message);
    },
    errorPolicy: "all"
  });
  const INITIAL_VALUES: FormValues = {
    phone: "",
    password: "",
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 30,
      backgroundColor: theme.colors.background,
    },
    inputStyle: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.cardBackground,
      padding: 16,
      borderRadius: 12,
      gap: 16,
    },
    inputTextStyle: {
      flex: 1,
      color: theme.colors.text,
      fontSize: 18,
      width: "100%",
    },
    forgotPassword: {
      color: theme.colors.accent,
      fontSize: 16,
      marginTop: 30,
      textAlign: "right",
      textTransform: "capitalize",
    },
    loginButton: {
      backgroundColor: theme.colors.primary,
      padding: 16,
      marginTop: 30,
      alignItems: "center",
      borderRadius: 6,
    },
    loginButtonText: {
      fontFamily: "InterSemiBold",
      color: theme.colors.white,
      fontSize: 18,
      textTransform: "uppercase",
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="auto" />

        <Text
          style={{
            color: theme.colors.tint,
            fontSize: 48,
            fontFamily: "InterMedium",
          }}
        >
          Hello!
        </Text>
        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: 18,
            fontFamily: "InterRegular",
          }}
        >
          Sign in to continue
        </Text>
        <Formik
          initialValues={INITIAL_VALUES}
          validationSchema={loginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              const id = setTimeout(() => {
                controller.abort();
                notifyMessage("Something went wrong, please try again");
              }, 7000);

              const res = await login({
                variables: {
                  data: {
                    phone: values.phone,
                    password: values.password,
                  }
                },
              });

              clearTimeout(id);

              //   if (res.errors) {
              //     notifyMessage("Error: " + res.errorsmessage);
              //     if (
              //       res.error?.message === "Invalid Credentials" ||
              //       res.error?.message ===
              //       "No user found for phone: " + values.phone
              //     ) {
              //       notifyMessage("Invalid Credentials Please try again");
              //     } else {
              //       notifyMessage(res.error?.message, true);
              //     }
              //     return;
              //   }
              return res.data;
            } catch (e) {
              notifyMessage("Network Error Please try again");
            }
            setSubmitting(false);
          }}
        >
          {({
            handleChange,
            handleSubmit,
            submitForm,
            isSubmitting,
            values,
            errors,
            setErrors,
          }) => (
            <View>
              <View style={{ marginTop: 30 }}>
                <Text
                  style={{ color: "#6C6C6C", fontSize: 14, marginBottom: 4 }}
                >
                  Phone Number
                </Text>
                <View style={styles.inputStyle}>
                  <AntDesign name="user" size={20} color="#5684E0" />
                  <TextInput
                    keyboardType="phone-pad"
                    style={styles.inputTextStyle}
                    placeholder="Enter Phone Number"
                    placeholderTextColor="#6C6C6C66"
                    value={values.phone}
                    onChangeText={handleChange("phone")}
                  />
                </View>
                {errors.phone && (
                  <Text style={{ color: "red", fontSize: 10, marginTop: 4 }}>
                    Phone Number is required
                  </Text>
                )}
              </View>
              <View style={{ marginTop: 30 }}>
                <Text
                  style={{ color: "#6C6C6C", fontSize: 14, marginBottom: 4 }}
                >
                  Password
                </Text>
                <View style={styles.inputStyle}>
                  <Entypo name="key" size={20} color="#5684E0" />
                  <TextInput
                    style={styles.inputTextStyle}
                    placeholderTextColor="#6C6C6C66"
                    placeholder="Enter Password"
                    value={values.password}
                    secureTextEntry={!viewPassword}
                    keyboardType={
                      !viewPassword ? "default" : "visible-password"
                    }
                    onChangeText={handleChange("password")}
                  />
                  {viewPassword ? (
                    <Entypo
                      name="eye-with-line"
                      onPress={() => setViewPassword(!viewPassword)}
                      style={{ alignSelf: "flex-end" }}
                      size={20}
                      color="#5684E0"
                    />
                  ) : (
                    <Entypo
                      name="eye"
                      onPress={() => setViewPassword(!viewPassword)}
                      style={{ alignSelf: "flex-end" }}
                      size={20}
                      color="#5684E0"
                    />
                  )}
                </View>
                {errors.password && (
                  <Text style={{ color: "red", fontSize: 10, marginTop: 4 }}>
                    Password is required
                  </Text>
                )}
              </View>
              <Text
                onPress={() => {
                  if (values.phone) {
                    navigation.navigate("ForgotPassword", {
                      phone: values.phone,
                    });
                  } else {
                    notifyMessage("Enter your Phone Number");
                  }
                }}
                style={styles.forgotPassword}
              >
                Forgot password?
              </Text>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => handleSubmit()}
                disabled={loading}
              >
                <Text style={styles.loginButtonText}>
                  {loading ? (
                    <ActivityIndicator color={theme.colors.white} />
                  ) : (
                    "Sign In"
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
