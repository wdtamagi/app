import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
  ToastAndroid
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { firebase } from "@react-native-firebase/auth";
import { t } from "../../i18n";

import style from "./Login.style";

import Button from "../../components/Button";
import Loader from "../../components/Loader";
import colors from "../../core/colors";

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={style.container}>
      <ScrollView contentContainerStyle={style.scroll}>
        <Loader show={loading} background="transparent" />
        <Image
          resizeMode="contain"
          source={require("../../assets/logo.png")}
          style={style.logo}
        />
        <TextInput
          placeholder={t("EMAIL")}
          underlineColorAndroid={colors.white}
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType="email-address"
          placeholderTextColor={colors.white}
          textContentType="emailAddress"
          returnKeyType="next"
          style={style.input}
        />
        <TextInput
          placeholder={t("PASSWORD")}
          underlineColorAndroid={colors.white}
          onChangeText={text => setPassword(text)}
          value={password}
          placeholderTextColor={colors.white}
          textContentType="password"
          secureTextEntry
          style={style.input}
        />
        <Button
          variant="white"
          title={t("LOGIN")}
          style={{ marginBottom: 16, marginTop: 8 }}
          onPress={async () => {
            if (!email || !password) {
              ToastAndroid.showWithGravity(
                t("REQUIRED_FIELDS"),
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
              );
            } else {
              try {
                setLoading(true);

                await firebase
                  .auth()
                  .signInWithEmailAndPassword(email, password);

                navigation.dispatch(StackActions.replace("Home"));
              } catch (error) {
                ToastAndroid.showWithGravity(
                  error.message,
                  ToastAndroid.LONG,
                  ToastAndroid.BOTTOM
                );
              } finally {
                setLoading(false);
              }
            }
          }}
        />
        <Button
          variant="transparent"
          title={t("REGISTER")}
          onPress={() => navigation.dispatch(StackActions.push("Register"))}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
