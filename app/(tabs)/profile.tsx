
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import React from "react";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    paddingTop: Platform.OS === 'android' ? 48 : 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  infoLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
});

export default function ProfileScreen() {
  const theme = useTheme();

  console.log("ProfileScreen: Rendering profile view");

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right']}
    >
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Profile
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.text }]}>
            App Information
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            About
          </Text>
          
          <View style={styles.infoRow}>
            <IconSymbol 
              ios_icon_name="globe" 
              android_material_icon_name="language" 
              size={24} 
              color={theme.colors.text} 
            />
            <Text style={[styles.infoLabel, { color: theme.colors.text }]}>
              Website App
            </Text>
          </View>

          <View style={styles.infoRow}>
            <IconSymbol 
              ios_icon_name="info.circle" 
              android_material_icon_name="info" 
              size={24} 
              color={theme.colors.text} 
            />
            <Text style={[styles.infoLabel, { color: theme.colors.text }]}>
              Version 1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
