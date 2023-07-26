import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { apolloClient } from "@/graphql/apolloClient";
import { LOGIN_MUTATION } from "@/graphql/mutations/authMutations";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

interface FormValues {
  userName: string;
  password: string;
}

const loginSchema = Yup.object().shape({
  userName: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const login = (props: Props) => {
  const [viewPassword, setViewPassword] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      console.log(await AsyncStorage.getItem("login"), "Top login");
    };
    fetchData();
  }, []);

  const INITIAL_VALUES: FormValues = {
    userName: "",
    password: "",
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text
        style={{ color: "#5684E0", fontSize: 48, fontFamily: "Inter-Medium" }}
      >
        Hello!
      </Text>
      <Text
        style={{ color: "#BFBFBF", fontSize: 18, fontFamily: "Inter-Regular" }}
      >
        Sign in to continue
      </Text>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          // create login mutation
          // if successfull, set user
          // if not, show error message
          // if error, show error message
          setSubmitting(true);
          console.log(values);
          const client = apolloClient(null);
          try {
            const res = await client.mutate({
              mutation: LOGIN_MUTATION,
              variables: {
                data: {
                  username: values.userName,
                  password: values.password,
                },
              },
            });
            await AsyncStorage.setItem("login", JSON.stringify(res.data.login));
            console.log(await AsyncStorage.getItem("login"), "After login");
            router.replace("/");
            console.log(res.data.login);
          } catch (e) {
            console.log(e);
          }
          setSubmitting(false);
        }}
      >
        {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
          <View>
            <View style={{ marginTop: 30 }}>
              <Text style={{ color: "#6C6C6C", fontSize: 14, marginBottom: 4 }}>
                Username
              </Text>
              <View style={styles.inputStyle}>
                <AntDesign name="user" size={20} color="#5684E0" />
                <TextInput
                  style={styles.inputTextStyle}
                  placeholder="Enter Username"
                  placeholderTextColor="#6C6C6C66"
                  value={values.userName}
                  onChangeText={handleChange("userName")}
                />
              </View>
              {errors.userName && (
                <Text style={{ color: "red", fontSize: 10, marginTop: 4 }}>
                  Username is required
                </Text>
              )}
            </View>
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
                  Password is required
                </Text>
              )}
            </View>
            <Text onPress={() => {}} style={styles.forgotPassword}>
              Forgot password?
            </Text>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.loginButtonText}>
                {isSubmitting ? <ActivityIndicator /> : "Sign In"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default login;

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
  loginButton: {
    backgroundColor: "#5684E0",
    padding: 16,
    marginTop: 30,
    alignItems: "center",
    borderRadius: 6,
  },
  loginButtonText: {
    fontFamily: "Inter-SemiBold",
    color: "#FFF",
    fontSize: 18,
    textTransform: "uppercase",
  },
});
