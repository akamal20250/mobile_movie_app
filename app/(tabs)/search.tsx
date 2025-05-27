// Search tab component with debounced search functionality
// Updates search count in database when results are found
import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import { updateSearchCount } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // Fetch movies based on search query
  const { data: movies, loading, error, refetch, reset } = useFetch(() => fetchMovies({ query: searchQuery }), false)

  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim()) {
        await refetch();
        // Update search count in database if results found
        if(movies?.length > 0 && movies?.[0])
          await updateSearchCount(searchQuery, movies[0]);
      } else {
        reset()
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-[#021659]">
      <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover"/>

      {/* Search results grid */}
      <FlatList data={movies} 
        renderItem={({item}) => <MovieCard {...item}/>}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16, 
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            {/* Search input */}
            <View className="my-5">
              <SearchBar 
              placeholder= "Search movies..."
              value={searchQuery}
              onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {/* Loading and error states */}
            {loading && (
              <ActivityIndicator size="large" color="#0000ff" className="my-3" />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {/* Search results header */}
            {!loading && !error && searchQuery.trim() && movies?.length>0 && (
              <Text className="text-xl text-white font-bold">
                Search results for{' '}
                <Text className="text-[#4FC3F7]">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
      />
    </View>
  )
}

export default Search