// Profile tab component
// Displays user information and activity statistics (purely decorative, no actual functionality)
import { icons } from '@/constants/icons'
import React from 'react'
import { Image, Text, View } from 'react-native'

const Profile = () => {
  return (
    <View className="bg-[#021659] flex-1">
      <View className="flex justify-center items-center flex-1">
        {/* Profile picture and basic info */}
        <Image source={icons.person} className="w-40 h-40 absolute mt-20 top-10 left-4"/>
        <View className="flex-row items-center justify-center gap-x-2 absolute top-36 left-48">
          <Text className="text-white text-4xl font-bold">John Doe</Text>
        </View>
        <View className="flex-row items-center justify-center gap-x-2 absolute top-48 left-48">
        <Text className="text-white text-lg">john.doe@example.com</Text>
        </View>
        <View className="flex-row items-center bg-[#0099FF] px-2 py-1 rounded-md gap-x-1 mt-4 absolute top-60 left-48">
          <Text className="text-white font-bold text-sm">Member Since June 2025</Text>
        </View>

        {/* User statistics section */}
        <View className="absolute top-80 left-10 right-10">
          <View className="flex-row justify-between mb-6">
            <View className="items-center">
              <Text className="text-[#81D4FA] text-2xl font-bold">128</Text>
              <Text className="text-white text-sm">Movies Searched</Text>
            </View>
            <View className="items-center">
              <Text className="text-[#81D4FA] text-2xl font-bold">45</Text>
              <Text className="text-white text-sm">Saved Movies</Text>
            </View>
            <View className="items-center">
              <Text className="text-[#81D4FA] text-2xl font-bold">12</Text>
              <Text className="text-white text-sm">Reviews</Text>
            </View>
          </View>

          {/* Favorite genres section */}
          <View className="mt-4">
            <Text className="text-white text-xl font-bold mb-3">Favorite Genres</Text>
            <View className="flex-row flex-wrap gap-2">
              {['Action', 'Drama', 'Sci-Fi', 'Comedy'].map((genre) => (
                <View key={genre} className="bg-[#0647A3] px-3 py-1 rounded-full">
                  <Text className="text-white text-sm">{genre}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Recent activity section */}
          <View className="mt-6">
            <Text className="text-white text-xl font-bold mb-3">Recent Activity</Text>
            <View className="space-y-2">
              {['Watched Inception', 'Saved The Dark Knight', 'Rated Interstellar'].map((activity) => (
                <View key={activity} className="flex-row items-center bg-[#0647A3] p-3 rounded-lg mb-3">
                  <Image source={icons.star} className="size-5 mr-2" tintColor="#81D4FA"/>
                  <Text className="text-white">{activity}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Profile