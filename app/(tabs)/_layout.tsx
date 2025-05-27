// Tab navigation layout component
// Configures the bottom tab bar with custom styling and icons
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const Layout = () => {
  return (
    <Tabs
        screenOptions={{
            // Custom styling for the tab bar
            tabBarStyle: {
                backgroundColor: '#0647A3',
                borderRadius: 50,
                marginHorizontal: 10,
                marginBottom: 40,
                height: 55,
                position: 'absolute',
                overflow: 'hidden',
                borderWidth: 1,
                borderColor: '#0f0D23',
                paddingBottom: 10,
            }
        }}
    >
        {/* Home tab configuration */}
        <Tabs.Screen 
        name="index"
        options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({color, size}) => (
                <Ionicons name="home" color={color} size={size} />
            ),
        }}
        />
        {/* Search tab configuration */}
        <Tabs.Screen
            name="search"
            options={{
                title: 'Search',
                headerShown: false,
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="search" color={color} size={size} />
                )
            }}
        />
        {/* Saved movies tab configuration */}
        <Tabs.Screen
            name="saved"
            options={{
                title: 'Saved',
                headerShown: false,
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="heart" color={color} size={size} />
                )
            }}
        />
        {/* Profile tab configuration */}
        <Tabs.Screen
            name="profile"
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({color, size}) => (
                    <Ionicons name="person" color={color} size={size} />
                )
            }}
        />
    </Tabs>
  )
}

export default Layout