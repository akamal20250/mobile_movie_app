// Movie details component
// Displays detailed information about a selected movie
import { icons } from '@/constants/icons';
import { useSavedMovies } from '@/context/SavedMoviesContext';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Reusable component for displaying movie information
interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items=start justify-center mt-5">
    <Text className="text-white font-normal  text-sm">{label}</Text>
    <Text className="text-white font-bold text-sm mt-2">{value || 'N/A'}</Text>
  </View>
)

const MovieDetails = () => {
  const {id} = useLocalSearchParams();
  const { isMovieSaved, toggleSaveMovie } = useSavedMovies();
  // Fetch movie details using custom hook
  const {data: movie, loading} = useFetch(() => fetchMovieDetails(id as string));

  // Handle save/unsave movie
  const handleToggleSave = () => {
    if (movie) {
      toggleSaveMovie(movie);
    }
  };

  return (
    <View className='flex-1 bg-[#021659]'>
      <ScrollView contentContainerStyle={{paddingBottom: 80}}>
        {/* Movie poster */}
        <View>
          <Image source={{uri: `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}} className="w-full h-[550px]" resizeMode="stretch" />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          {/* Movie title and save button */}
          <View className="flex-row items-center justify-between w-full">
            <Text className="text-[#81D4FA] font-bold text-3xl flex-1">{movie?.title}</Text>
            <TouchableOpacity onPress={handleToggleSave} className="ml-2">
              <Image 
                source={icons.save} 
                className="size-8" 
                tintColor={movie && isMovieSaved(movie.id) ? "#FF4081" : "#81D4FA"}
              />
            </TouchableOpacity>
          </View>

          {/* Release date and runtime */}
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-[#81D4FA] text-sm">
              {movie?.release_date?.split('-')[0]}
            </Text>
            <Text className="text-[#81D4FA] text-sm">   {movie?.runtime} min</Text>
          </View>

          {/* Rating badge */}
          <View className="flex-row items-center bg-[#0099FF] px-2 py-1 rounded-md gap-x-1 mt-4">
            <Image source={icons.star} className="size-4"/>
            <Text className="text-white font-bold text-sm">{Math.round(movie?.vote_average ?? 0)}/10</Text>
            <Text className="text-white text-sm"> ({movie?.vote_count} votes)</Text>
          </View>

          {/* Movie details sections */}
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo label="Genres" value={movie?.genres?.map((g: { name: string }) => g.name).join(' - ') || 'N/A'} />
          <View className="flex flex-row justify-between w-1/2">
            <MovieInfo label="Budget" value={`$${movie?.budget ? (movie.budget / 1_000_000).toFixed(2) : 'N/A'} million`} />
            <MovieInfo label="          Revenue" value={`         $${movie?.revenue ? (movie.revenue / 1_000_000).toFixed(2) : 'N/A'} million`}/>
          </View>
          <MovieInfo label="Production Companies" value={movie?.production_companies.map((c: { name: string }) => c.name).join(', ') || 'N/A'} />
        </View>
        
      </ScrollView>
    </View>
  )
}

export default MovieDetails