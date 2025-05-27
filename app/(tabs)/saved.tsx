// Saved movies tab component
// Displays movies saved by the user using SavedMoviesContext
import MovieCard from '@/components/MovieCard'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { useSavedMovies } from '@/context/SavedMoviesContext'
import React from 'react'
import { FlatList, Image, Text, View } from 'react-native'

const Saved = () => {
  // Get saved movies from context
  const { savedMovies } = useSavedMovies();

  return (
    <View className="flex-1 bg-[#021659]">
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className="flex-1 px-5">
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        
        {/* Empty state or saved movies grid */}
        {savedMovies.length === 0 ? (
          <View className="flex justify-center items-center flex-1 flex-col gap-5">
            <Image source={icons.save} className="size-10" tintColor="#2196F3" />
            <Text className="text-white text-lg">No saved movies yet</Text>
          </View>
        ) : (
          <>
            <Text className="text-[#2196F3] text-3xl font-bold mt-2 mb-4 text-center">Saved Movies</Text>
            {/* Grid layout for saved movies */}
            <FlatList
              data={savedMovies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
            />
          </>
        )}
      </View>
    </View>
  )
}

export default Saved