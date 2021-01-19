import React, {useEffect} from 'react'
import {ActivityIndicator, StyleSheet, View, Image} from 'react-native'
import {ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux'
import {fetchMovies} from '../store/actions'


export default function Home({navigation}) {
    const dispatch = useDispatch()
    const { movies, isLoading } = useSelector(state => state)
    const toDetails = (movie) => {
        navigation.push('Details', {movie})
    }
    useEffect(() => {
        dispatch(fetchMovies())
    }, [])
    return (
            <ScrollView>
            <View style={styles.container}>
                    {isLoading && <ActivityIndicator style={ styles.loading} size="large" color="#0000ff" />}
                {movies.map(movie => {
                    return (
                        <TouchableOpacity
                            key={movie.id}
                            onPress={() => toDetails(movie)}>
                            <Image
                                style={styles.poster}
                                source={{ uri: 'https://image.tmdb.org/t/p/w500' + movie.poster_path }}
                            />
                        </TouchableOpacity>
                        

                    )
                    
                    })
                }            
                </View>
                </ScrollView>                
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        backgroundColor: 'darkblue'
       
    },
    poster: {
        margin: 10,
        width: 90,
        height: 160,
        borderRadius: 20
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});