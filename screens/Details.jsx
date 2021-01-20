import { Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { fetchRelatedMovies } from '../store/actions'
import {useDispatch, useSelector} from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'

export default function Details({ route, navigation }) {
    const { movie } = route.params
    const dispatch = useDispatch()
    const { relatedMovies, isLoading } = useSelector(state => state)
    const toDetails = (relatedMovie) => {
        navigation.push('Details', {movie: relatedMovie})
    }
    useEffect(() => {
        dispatch(fetchRelatedMovies(movie.id))
    }, [])
    return (
        <ScrollView>
            <>                
                <View style={styles.container}>                    
                    
                    <Image                        
                        style={styles.poster}                        
                        source={{ uri: 'https://image.tmdb.org/t/p/w500' + movie.poster_path }}                        
                    />                    
                </View>               
                <View style={styles.textContainer}>                    
                    <Text style={styles.title}>{movie.title}</Text>                    
                    <Text>Released: {movie.release_date.substring(0, 4)}</Text>                    
                    <Text style={styles.description}>{movie.overview}</Text>                    
                </View>                                          
                <Text style={styles.title}>Related Movies</Text>
                { isLoading && <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />}
                <ScrollView horizontal>
                    <View style={styles.moviesContainer}>
                        {relatedMovies.map(relatedMovie => {
                            return (
                                <TouchableOpacity                                    
                                    key={relatedMovie.id}
                                    onPress={() => toDetails(relatedMovie)}>
                                    <Image
                                        style={styles.relatedPoster}
                                        source={{ uri: 'https://image.tmdb.org/t/p/w500' + relatedMovie.poster_path }}
                                    />
                                </TouchableOpacity>
                    )
                    })
                }
                    </View>                   
                </ScrollView>                
            </>
        </ScrollView>        
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        backgroundColor: 'darkblue'
       
    },
    moviesContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        
    },
    textContainer: {
        marginTop: -15,
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'lightblue',
        borderRadius: 20,
        padding: 10,
    },
    poster: {
        width: 250,
        height: 300
    },
    relatedPoster: {
        width: 100,
        height: 150,
        margin: 10,
        borderRadius: 20
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: 'sans-serif',
        fontSize: 30,
        marginLeft: 10
    },

    description: {
        fontFamily: 'sans-serif',
        fontSize: 20
    }
});