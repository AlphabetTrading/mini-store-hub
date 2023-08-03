import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../contexts/auth";
import { StatusBar } from "expo-status-bar";

type Props = {};

interface FormValues {
  OTP: string;
}

const forgotPasswordSchema = Yup.object().shape({
  OTP: Yup.string().required("Required"),
});

const ForgotPasswordScreen = ({ navigation, route }: any) => {
  const { forgotPassword } = useAuth();
  console.log(route.params);
  const username = route.params?.username ?? "";

  const INITIAL_VALUES: FormValues = {
    OTP: "",
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Text
        style={{ color: "#5684E0", fontSize: 48, fontFamily: "InterMedium" }}
      >
        Forgot password!
      </Text>
      <Text
        style={{ color: "#BFBFBF", fontSize: 18, fontFamily: "InterRegular" }}
      >
        Enter OTP
      </Text>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={forgotPasswordSchema}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values, username);
          setSubmitting(true);
          try {
            // const res = await forgotPassword(values.OTP, username);
            // navigation.reset("ResetPassword", { username });
            navigation.reset({
              index: 0,
              routes: [{ name: "ResetPassword", params: { username } }],
            });
          } catch (e) {
            console.log(e, "error");
          }
          setSubmitting(false);
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting, values, errors }) => (
          <View>
            <View style={{ marginTop: 30 }}>
              <View style={styles.inputStyle}>
                <TextInput
                  style={styles.inputTextStyle}
                  placeholder="Enter OTP"
                  placeholderTextColor="#6C6C6C66"
                  value={values.OTP}
                  onChangeText={handleChange("OTP")}
                />
              </View>
              {errors.OTP && (
                <Text style={{ color: "red", fontSize: 10, marginTop: 4 }}>
                  OTP is required
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.forgotPasswordButtonText}>
                {isSubmitting ? <ActivityIndicator /> : "Submit"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#FFF",
  },
  inputStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  inputTextStyle: {
    flex: 1,
    color: "#6C6C6C",
    fontSize: 18,
    width: "100%",
  },
  forgotPassword: {
    color: "#5684E0",
    fontSize: 16,
    marginTop: 30,
    textAlign: "right",
    textTransform: "capitalize",
  },
  forgotPasswordButton: {
    backgroundColor: "#5684E0",
    padding: 16,
    marginTop: 30,
    alignItems: "center",
    borderRadius: 6,
  },
  forgotPasswordButtonText: {
    fontFamily: "InterSemiBold",
    color: "#FFF",
    fontSize: 18,
    textTransform: "uppercase",
  },
});
