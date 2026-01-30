
import { WebView } from "react-native-webview";
import { StyleSheet, View, ActivityIndicator, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    zIndex: 1,
  },
});

export default function HomeScreen() {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  // Inject CSS to make fonts smaller and match original website
  const injectedJavaScript = `
    (function() {
      const style = document.createElement('style');
      style.textContent = \`
        * {
          font-size: 14px !important;
          line-height: 1.3 !important;
        }
        h1, h1 * {
          font-size: 28px !important;
          line-height: 1.2 !important;
        }
        h2, h2 * {
          font-size: 20px !important;
          line-height: 1.2 !important;
        }
        h3, h3 * {
          font-size: 16px !important;
          line-height: 1.2 !important;
        }
        button, button * {
          font-size: 14px !important;
          padding: 10px 16px !important;
        }
        input, input * {
          font-size: 14px !important;
          padding: 8px 12px !important;
        }
        label, label * {
          font-size: 13px !important;
        }
        small, small * {
          font-size: 12px !important;
        }
        .text-sm, .text-sm * {
          font-size: 13px !important;
        }
        .text-xs, .text-xs * {
          font-size: 11px !important;
        }
        body {
          zoom: 0.9;
          -webkit-text-size-adjust: 90%;
          text-size-adjust: 90%;
        }
      \`;
      document.head.appendChild(style);
    })();
    true;
  `;

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <WebView
        source={{ uri: 'https://ogzodefnqsype.mocha.app' }}
        style={{ flex: 1 }}
        onLoad={handleLoad}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        injectedJavaScript={injectedJavaScript}
        scalesPageToFit={true}
        startInLoadingState={false}
      />
    </View>
  );
}
