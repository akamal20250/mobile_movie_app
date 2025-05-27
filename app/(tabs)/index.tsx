// Home tab component displaying latest movies
// Uses useFetch hook to fetch and display movies in a grid layout
import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch movies using custom hook
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: '' }))
  return (
    <View className="flex-1 bg-[#021659]">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight: '100%', paddingBottom: 10}}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {/* Loading state */}
        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
            <Text>Error: {moviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
          {/* Grid layout for movies using FlatList */}
          <>
            <Text className="text-[#2196F3] text-3xl font-bold mt-2 mb-4 text-center">Latest Movies</Text>
            <FlatList
              data={movies}
              renderItem={({ item }) => (
                <MovieCard
                  {...item}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </>
        </View>
        )}
        
      </ScrollView>
    </View>
  );
}
