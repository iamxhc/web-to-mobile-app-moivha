
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
        
        /* Aggressively hide "clone with mocha" button and related elements */
        footer,
        [class*="footer"],
        [id*="footer"],
        a[href*="mocha"],
        a[href*="clone"],
        button[class*="clone"],
        [class*="clone"],
        [id*="clone"],
        div[class*="mocha"],
        div[id*="mocha"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          width: 0 !important;
          overflow: hidden !important;
          position: absolute !important;
          left: -9999px !important;
          pointer-events: none !important;
        }
      \`;
      document.head.appendChild(style);
      
      // Function to aggressively hide elements containing "clone with mocha"
      function hideCloneElements() {
        console.log('Running hideCloneElements function on iOS');
        let hiddenCount = 0;
        
        // Target all buttons and links
        const buttons = document.querySelectorAll('button, a, div[role="button"], span[role="button"]');
        buttons.forEach(function(el) {
          const text = (el.textContent || '').toLowerCase().trim();
          const innerHTML = (el.innerHTML || '').toLowerCase();
          const ariaLabel = (el.getAttribute('aria-label') || '').toLowerCase();
          
          // Check if element contains "clone" text
          if (text.includes('clone') || 
              innerHTML.includes('clone') || 
              ariaLabel.includes('clone') ||
              text.includes('mocha') ||
              innerHTML.includes('mocha')) {
            el.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; width: 0 !important; position: absolute !important; left: -9999px !important; pointer-events: none !important;';
            
            // Also try to remove from DOM
            try {
              el.remove();
            } catch(e) {
              console.log('Could not remove element:', e);
            }
            
            hiddenCount++;
            console.log('Hidden element on iOS:', el.tagName, text.substring(0, 50));
          }
        });
        
        // Also check for parent containers that might contain the button
        const allDivs = document.querySelectorAll('div, section, footer, aside');
        allDivs.forEach(function(el) {
          const text = (el.textContent || '').toLowerCase().trim();
          
          // If a container only contains "clone" text, hide it
          if (text === 'clone with mocha' || 
              text === 'clone with' || 
              text === 'clone' ||
              (text.includes('clone') && text.length < 50)) {
            el.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; width: 0 !important; position: absolute !important; left: -9999px !important; pointer-events: none !important;';
            
            try {
              el.remove();
            } catch(e) {
              console.log('Could not remove container:', e);
            }
            
            hiddenCount++;
            console.log('Hidden container on iOS:', el.tagName, text.substring(0, 50));
          }
        });
        
        console.log('Total elements hidden on iOS:', hiddenCount);
      }
      
      // Run immediately
      hideCloneElements();
      
      // Run multiple times with delays
      setTimeout(hideCloneElements, 100);
      setTimeout(hideCloneElements, 300);
      setTimeout(hideCloneElements, 500);
      setTimeout(hideCloneElements, 1000);
      setTimeout(hideCloneElements, 1500);
      setTimeout(hideCloneElements, 2000);
      setTimeout(hideCloneElements, 3000);
      
      // Run after page fully loads
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideCloneElements);
      }
      window.addEventListener('load', hideCloneElements);
      
      // Watch for DOM changes and hide new elements
      const observer = new MutationObserver(function(mutations) {
        hideCloneElements();
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'id', 'style']
      });
      
      console.log('Clone button hiding script initialized on iOS');
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
