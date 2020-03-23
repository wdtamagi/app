import React, { useState } from "react";
import { SafeAreaView, Image, Text, View, TextInput } from "react-native";
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { StackActions } from "@react-navigation/core";

import style from "./FormPost.style";
import Button from "../../components/Button";

const FormPostScreen = ({ navigation }) => {
  const [text, setText] = useState("");

  const currentUser = firebase.auth().currentUser;

  return (
    <SafeAreaView style={style.container}>
      <View style={style.user}>
        <Image style={style.userImage} source={{ uri: currentUser.photoURL }} />
        <Text style={style.userName}>{currentUser.displayName}</Text>
      </View>
      <TextInput
        style={style.input}
        textAlignVertical="top"
        placeholder="Peça ou sugira algo para fazer no tempo livre..."
        multiline
        numberOfLines={4}
        onChangeText={newText => setText(newText)}
        value={text}
      />
      <Button
        variant="primary"
        title="Enviar"
        onPress={async () => {
          firestore()
            .collection("posts")
            .add({
              date: firestore.Timestamp.fromDate(new Date()),
              author: firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid),
              text
            });
          navigation.dispatch(StackActions.pop());
        }}
      />
    </SafeAreaView>
  );
};

export default FormPostScreen;