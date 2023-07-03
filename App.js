import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import './firebase/firebaseConfig';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useLoadedAssets } from './hooks/useLoadedAssets';
import Navigation from './navigation';
import { useColorScheme } from 'react-native';
import {loadFonts} from "./constants/Fonts";

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();

  const [isFontsLoaded, setIsFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadResourcesAsync() {
      try {
        await loadFonts();
        setIsFontsLoaded(true);
      } catch (error) {
        console.warn('Error loading fonts:', error);
      }
    }

    loadResourcesAsync();
  }, []);

  if (!isLoadingComplete || !isFontsLoaded) {
    return null; // or render a loading indicator
  }

  return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
  );
}
