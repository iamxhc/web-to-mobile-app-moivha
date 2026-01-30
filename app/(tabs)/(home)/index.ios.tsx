
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

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
    console.log('WebView loaded successfully on iOS');
    setLoading(false);
  };

  // Enhanced injection to hide "clone with mocha" button
  const injectedJavaScript = `
    (function() {
      console.log('Injecting CSS and JavaScript to hide clone with mocha button on iOS');
      
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
        
        /* Hide "clone with mocha" button and related elements */
        footer {
          display: none !important;
        }
        [class*="footer"] {
          display: none !important;
        }
        [id*="footer"] {
          display: none !important;
        }
        a[href*="mocha"] {
          display: none !important;
        }
        button[class*="clone"] {
          display: none !important;
        }
        [class*="clone"] {
          display: none !important;
        }
      \`;
      document.head.appendChild(style);
      
      // Function to aggressively hide elements containing "clone with mocha"
      function hideCloneElements() {
        console.log('Running hideCloneElements function on iOS');
        const allElements = document.querySelectorAll('*');
        let hiddenCount = 0;
        
        allElements.forEach(function(el) {
          const text = el.textContent || '';
          const lowerText = text.toLowerCase();
          
          // Check if element contains "clone with mocha" or just "clone" in button context
          if (lowerText.includes('clone with mocha') || 
              lowerText.includes('clone with') ||
              (el.tagName === 'BUTTON' && lowerText.includes('clone')) ||
              (el.tagName === 'A' && lowerText.includes('clone'))) {
            el.style.display = 'none';
            el.style.visibility = 'hidden';
            el.style.opacity = '0';
            el.style.height = '0';
            el.style.overflow = 'hidden';
            el.remove();
            hiddenCount++;
            console.log('Hidden element on iOS:', el.tagName, text.substring(0, 50));
          }
        });
        
        console.log('Total elements hidden on iOS:', hiddenCount);
      }
      
      // Run immediately
      hideCloneElements();
      
      // Run after short delay
      setTimeout(hideCloneElements, 500);
      
      // Run after longer delay
      setTimeout(hideCloneElements, 1500);
      
      // Run after page fully loads
      window.addEventListener('load', hideCloneElements);
      
      // Watch for DOM changes and hide new elements
      const observer = new MutationObserver(function(mutations) {
        hideCloneElements();
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
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
