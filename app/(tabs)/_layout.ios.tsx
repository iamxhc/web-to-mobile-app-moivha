
import React from 'react';
import { Stack } from 'expo-router';

export default function TabLayout() {
  // Removed NativeTabs - just show the home screen without bottom navigation
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}
    >
      <Stack.Screen name="(home)" />
      <Stack.Screen name="profile" />
    </Stack>
  );
}
