
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
    console.log('WebView loaded successfully');
    setLoading(false);
  };

  // Inject CSS to make fonts much smaller to match original website
  const injectedJavaScript = `
    (function() {
      const style = document.createElement('style');
      style.textContent = \`
        * {
          font-size: 11px !important;
          line-height: 1.2 !important;
        }
        h1, h1 * {
          font-size: 18px !important;
          line-height: 1.1 !important;
        }
        h2, h2 * {
          font-size: 15px !important;
          line-height: 1.1 !important;
        }
        h3, h3 * {
          font-size: 13px !important;
          line-height: 1.1 !important;
        }
        h4, h4 * {
          font-size: 12px !important;
          line-height: 1.1 !important;
        }
        button, button * {
          font-size: 11px !important;
          padding: 6px 12px !important;
        }
        input, input *, textarea, textarea * {
          font-size: 11px !important;
          padding: 6px 10px !important;
        }
        label, label * {
          font-size: 10px !important;
        }
        small, small * {
          font-size: 9px !important;
        }
        .text-sm, .text-sm * {
          font-size: 10px !important;
        }
        .text-xs, .text-xs * {
          font-size: 9px !important;
        }
        .text-lg, .text-lg * {
          font-size: 13px !important;
        }
        .text-xl, .text-xl * {
          font-size: 15px !important;
        }
        .text-2xl, .text-2xl * {
          font-size: 17px !important;
        }
        body {
          zoom: 0.85;
          -webkit-text-size-adjust: 85%;
          text-size-adjust: 85%;
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
