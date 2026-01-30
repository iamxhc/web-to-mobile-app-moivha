
import React, { useState, useEffect, useRef } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

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

export default function Home() {
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = () => {
    console.log('Website loaded successfully in iframe');
    setLoading(false);
    
    // Try to inject CSS into iframe to hide "clone with mocha" text
    try {
      const iframe = iframeRef.current;
      if (iframe && iframe.contentWindow && iframe.contentDocument) {
        const iframeDoc = iframe.contentDocument;
        const style = iframeDoc.createElement('style');
        style.textContent = `
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
        `;
        iframeDoc.head.appendChild(style);
        
        // Remove elements containing "clone with mocha"
        setTimeout(() => {
          const allElements = iframeDoc.querySelectorAll('*');
          allElements.forEach((el) => {
            if (el.textContent && el.textContent.toLowerCase().includes('clone with mocha')) {
              (el as HTMLElement).style.display = 'none';
            }
          });
        }, 500);
      }
    } catch (e) {
      console.log('Could not inject CSS into iframe (cross-origin restriction)');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <iframe
        ref={iframeRef}
        src="https://ogzodefnqsype.mocha.app"
        style={{ 
          flex: 1, 
          width: '100%', 
          height: '100%', 
          border: 'none',
          zoom: 0.85,
        }}
        onLoad={handleLoad}
      />
    </View>
  );
}
