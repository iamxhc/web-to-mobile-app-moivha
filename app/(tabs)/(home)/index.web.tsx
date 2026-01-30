
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
    
    // Try to inject CSS into iframe to hide "clone with mocha" button
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
          button[class*="clone"] {
            display: none !important;
          }
          [class*="clone"] {
            display: none !important;
          }
        `;
        iframeDoc.head.appendChild(style);
        
        // Function to hide elements containing "clone with mocha"
        const hideCloneElements = () => {
          console.log('Running hideCloneElements function on web');
          const allElements = iframeDoc.querySelectorAll('*');
          let hiddenCount = 0;
          
          allElements.forEach((el) => {
            const text = el.textContent || '';
            const lowerText = text.toLowerCase();
            
            if (lowerText.includes('clone with mocha') || 
                lowerText.includes('clone with') ||
                (el.tagName === 'BUTTON' && lowerText.includes('clone')) ||
                (el.tagName === 'A' && lowerText.includes('clone'))) {
              (el as HTMLElement).style.display = 'none';
              (el as HTMLElement).style.visibility = 'hidden';
              (el as HTMLElement).style.opacity = '0';
              (el as HTMLElement).style.height = '0';
              (el as HTMLElement).style.overflow = 'hidden';
              el.remove();
              hiddenCount++;
              console.log('Hidden element on web:', el.tagName, text.substring(0, 50));
            }
          });
          
          console.log('Total elements hidden on web:', hiddenCount);
        };
        
        // Run immediately
        hideCloneElements();
        
        // Run after delays
        setTimeout(hideCloneElements, 500);
        setTimeout(hideCloneElements, 1500);
        
        // Watch for DOM changes
        const observer = new MutationObserver(hideCloneElements);
        observer.observe(iframeDoc.body, {
          childList: true,
          subtree: true
        });
      }
    } catch (e) {
      console.log('Could not inject CSS into iframe (cross-origin restriction):', e);
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
