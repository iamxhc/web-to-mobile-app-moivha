
import React, { useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  console.log("HomeScreen (Web): Loading website in iframe");

  const websiteUrl = "https://ogzodefnqsype.mocha.app";

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <View style={styles.iframeContainer}>
        <iframe
          src={websiteUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          onLoad={() => {
            console.log("iframe: Finished loading website");
            setLoading(false);
          }}
          title="Website"
        />
      </View>
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
  iframeContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
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
