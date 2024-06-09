import React, { useState, useEffect } from "react";
import { Button, View, Text, Alert } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import {
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
} from "@env";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = ({ onLoginSuccess }) => {
  console.log("GoogleLogin component rendered");

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    webClientId: GOOGLE_WEB_CLIENT_ID,
    redirectUri: Linking.createURL("/auth/callback"),
  });

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    console.log("useEffect triggered");
    console.log("Google Auth Request:", request);
    console.log("Google Auth Response:", response);

    if (response?.type === "success") {
      console.log("Google authentication successful");
      const { authentication } = response;
      console.log("Authentication object:", authentication);
      if (authentication) {
        fetchUserInfo(authentication.accessToken);
      }
    } else if (response?.type === "error") {
      console.error("Google authentication error:", response.error);
      Alert.alert(
        "Authentication Error",
        "Google Sign-In was unsuccessful. Please try again."
      );
    } else {
      console.log("Google authentication response type:", response?.type);
    }
  }, [response]);

  const fetchUserInfo = async (token) => {
    console.log("Fetching user info with token:", token);
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
      Alert.alert("Error", "Failed to fetch user info");
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
