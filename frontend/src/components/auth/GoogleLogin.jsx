import React, { useState, useEffect } from "react";
import { Button, View, Text } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
} from "@env";

console.log("GOOGLE_WEB_CLIENT_ID:", GOOGLE_WEB_CLIENT_ID);
console.log("GOOGLE_ANDROID_CLIENT_ID:", GOOGLE_ANDROID_CLIENT_ID);
console.log("GOOGLE_IOS_CLIENT_ID:", GOOGLE_IOS_CLIENT_ID);

WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = ({ onLoginSuccess }) => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    webClientId: GOOGLE_WEB_CLIENT_ID,
  });

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    console.log("Google Auth Request:", request);
    console.log("Google Auth Response:", response);

    if (response) {
      if (response.type === "success") {
        const { authentication } = response;
        console.log("Authentication successful:", authentication);
        if (authentication) {
          fetchUserInfo(authentication.accessToken);
        }
      } else if (response.type === "error") {
        console.error("Google Auth Error:", response.params);
      }
    }
  }, [response]);

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      const user = await response.json();
      console.log("Fetched user info:", user);
      setUserInfo(user);
      onLoginSuccess(user);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={() => {
          console.log("Prompting Google Sign-In");
          promptAsync();
        }}
      />
      {userInfo && (
        <Text style={{ marginTop: 20 }}>Welcome, {userInfo.name}!</Text>
      )}
    </View>
  );
};

export default GoogleLogin;
