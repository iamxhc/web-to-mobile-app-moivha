
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
        `;
        iframeDoc.head.appendChild(style);
        
        // Function to hide elements containing "clone with mocha"
        const hideCloneElements = () => {
          console.log('Running hideCloneElements function on web');
          let hiddenCount = 0;
          
          // Target all buttons and links
          const buttons = iframeDoc.querySelectorAll('button, a, div[role="button"], span[role="button"]');
          buttons.forEach((el) => {
            const text = (el.textContent || '').toLowerCase().trim();
            const innerHTML = (el.innerHTML || '').toLowerCase();
            const ariaLabel = (el.getAttribute('aria-label') || '').toLowerCase();
            
            if (text.includes('clone') || 
                innerHTML.includes('clone') || 
                ariaLabel.includes('clone') ||
                text.includes('mocha') ||
                innerHTML.includes('mocha')) {
              (el as HTMLElement).style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; width: 0 !important; position: absolute !important; left: -9999px !important; pointer-events: none !important;';
              
              try {
                el.remove();
              } catch(e) {
                console.log('Could not remove element:', e);
              }
              
              hiddenCount++;
              console.log('Hidden element on web:', el.tagName, text.substring(0, 50));
            }
          });
          
          // Also check for parent containers
          const allDivs = iframeDoc.querySelectorAll('div, section, footer, aside');
          allDivs.forEach((el) => {
            const text = (el.textContent || '').toLowerCase().trim();
            
            if (text === 'clone with mocha' || 
                text === 'clone with' || 
                text === 'clone' ||
                (text.includes('clone') && text.length < 50)) {
              (el as HTMLElement).style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; height: 0 !important; width: 0 !important; position: absolute !important; left: -9999px !important; pointer-events: none !important;';
              
              try {
                el.remove();
              } catch(e) {
                console.log('Could not remove container:', e);
              }
              
              hiddenCount++;
              console.log('Hidden container on web:', el.tagName, text.substring(0, 50));
            }
          });
          
          console.log('Total elements hidden on web:', hiddenCount);
        };
        
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
        
        // Watch for DOM changes
        const observer = new MutationObserver(hideCloneElements);
        observer.observe(iframeDoc.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['class', 'id', 'style']
        });
        
        console.log('Clone button hiding script initialized on web');
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
