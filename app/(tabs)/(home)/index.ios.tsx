
import React, { useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  console.log("HomeScreen (iOS): Loading website in WebView");

  const websiteUrl = "https://ogzodefnqsype.mocha.app";

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <WebView
        source={{ uri: websiteUrl }}
        style={styles.webview}
        onLoadStart={() => {
          console.log("WebView (iOS): Started loading website");
          setLoading(true);
        }}
        onLoadEnd={() => {
          console.log("WebView (iOS): Finished loading website");
          setLoading(false);
        }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error("WebView (iOS): Error loading website", nativeEvent);
          setLoading(false);
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        allowsBackForwardNavigationGestures={true}
        bounces={true}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="large" 
            color={theme.colors.primary}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});
