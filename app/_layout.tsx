// Root layout component that wraps the entire app
// Provides the SavedMoviesContext to all child components
import { SavedMoviesProvider } from "@/context/SavedMoviesContext";
import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    <SavedMoviesProvider>
      <Stack>
        <Stack.Screen 
          name="(tabs)"
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="movies/[id]"
          options={{headerShown: false}}
        />
      </Stack>
    </SavedMoviesProvider>
  );
}
