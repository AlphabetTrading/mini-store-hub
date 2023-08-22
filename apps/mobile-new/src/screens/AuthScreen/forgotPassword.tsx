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
import { useAppTheme } from "@/src/contexts/preference";
import { useNavigation } from "@react-navigation/native";

type Props = {};

interface FormValues {
  OTP: string;
}

const forgotPasswordSchema = Yup.object().shape({
  OTP: Yup.string().required("Required"),
});

const ForgotPasswordScreen = ({ route }: any) => {
  const navigation = useNavigation();
  const { forgotPassword } = useAuth();
  const phone = route.params?.phone ?? "";

  const INITIAL_VALUES: FormValues = {
    OTP: "",
  };
  const { theme } = useAppTheme();

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
    forgotPasswordButton: {
      backgroundColor: theme.colors.primary,
      padding: 16,
      marginTop: 30,
      alignItems: "center",
      borderRadius: 6,
    },
    forgotPasswordButtonText: {
      fontFamily: "InterSemiBold",
      color: theme.colors.white,
      fontSize: 18,
      textTransform: "uppercase",
    },
  });

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
          setSubmitting(true);
          try {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "ResetPassword",
                  params: {
                    phone,
                    token: values.OTP,
                  },
                },
              ],
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
