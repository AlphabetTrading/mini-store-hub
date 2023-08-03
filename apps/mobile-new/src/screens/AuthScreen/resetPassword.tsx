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
import { Entypo } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

type Props = {};

interface FormValues {
  password: string;
  confirm: string;
}

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Required")
    .min(6, "Password is too short - should be 6 chars minimum."),
  confirm: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
});

const ResetPasswordScreen = ({ navigation, route }: any) => {
  const { resetPassword } = useAuth();
  const username = route.params?.username ?? "";
  const [viewPassword, setViewPassword] = useState(false);

  const INITIAL_VALUES: FormValues = {
    password: "",
    confirm: "",
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Text
        style={{ color: "#5684E0", fontSize: 48, fontFamily: "InterMedium" }}
      >
        Reset password!
      </Text>
      <Text
        style={{ color: "#BFBFBF", fontSize: 18, fontFamily: "InterRegular" }}
      >
        Enter New Password
      </Text>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={resetPasswordSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            const res = await resetPassword(values.password, username);
            // navigation.dispatch(StackActions.replace("Login"));
            navigation.reset({
              index: 0,
              routes: [{ name: "SignIn" }],
            });
          } catch (e) {
            console.log(e);
          }
          setSubmitting(false);
        }}
      >
        {({ handleChange, handleSubmit, isSubmitting, values, errors }) => (
          <View>
            <View style={{ marginTop: 30 }}>
              <Text style={{ color: "#6C6C6C", fontSize: 14, marginBottom: 4 }}>
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
                  keyboardType={!viewPassword ? "default" : "visible-password"}
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
                  {errors.password}
                </Text>
              )}
            </View>
            <View style={{ marginTop: 30 }}>
              <Text style={{ color: "#6C6C6C", fontSize: 14, marginBottom: 4 }}>
                Confirm
              </Text>
              <View style={styles.inputStyle}>
                <Entypo name="key" size={20} color="#5684E0" />
                <TextInput
                  style={styles.inputTextStyle}
                  placeholderTextColor="#6C6C6C66"
                  placeholder="Confirm Password"
                  value={values.confirm}
                  secureTextEntry={!viewPassword}
                  keyboardType={!viewPassword ? "default" : "visible-password"}
                  onChangeText={handleChange("confirm")}
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
              {errors.confirm && (
                <Text style={{ color: "red", fontSize: 10, marginTop: 4 }}>
                  {errors.confirm}
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.resetPasswordButton}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.resetPasswordButtonText}>
                {isSubmitting ? <ActivityIndicator /> : "Submit"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

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
  resetPassword: {
    color: "#5684E0",
    fontSize: 16,
    marginTop: 30,
    textAlign: "right",
    textTransform: "capitalize",
  },
  resetPasswordButton: {
    backgroundColor: "#5684E0",
    padding: 16,
    marginTop: 30,
    alignItems: "center",
    borderRadius: 6,
  },
  resetPasswordButtonText: {
    fontFamily: "InterSemiBold",
    color: "#FFF",
    fontSize: 18,
    textTransform: "uppercase",
  },
});
