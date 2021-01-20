import React, {useEffect} from 'react'
import {ActivityIndicator, StyleSheet, Image, FlatList, Text} from 'react-native'
import {TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux'
import {fetchMovies} from '../store/actions'


export default function Home({navigation}) {
    const dispatch = useDispatch()
    const { movies, isLoading, pages } = useSelector(state => state)
    const toDetails = (movie) => {
        navigation.push('Details', {movie})
    }

    const renderPoster = (({ item }) => {
        {isLoading && <ActivityIndicator style={styles.loading} size="large" color="#00ff00" />}
        return (
            <TouchableOpacity
                key={item.id}
                onPress={() => toDetails(item)}>
                <Image
                    style={styles.poster}
                    source={{ uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path }}
                />
            </TouchableOpacity>
        )
    })

    const loadMore = () => {
        if (pages !== 52) dispatch(fetchMovies(pages + 1))
    }
    useEffect(() => {
        dispatch(fetchMovies(1))
    }, [])
    return (
        <>
            <Text style={styles.text}>Now Playing ...</Text>
                <FlatList
                    contentContainerStyle={styles.container}                    
                    data={movies}
                    renderItem={renderPoster}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={loadMore}
                    horizontal
                />     
        </>
            
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        display: 'flex',
        flexDirection: 'row',       
    },
    poster: {
        margin: 10,
        width: 300,
        height: 500,
        borderRadius: 20
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        margin: 10,
        fontFamily: 'sans-serif',
        fontSize: 40
    }
});