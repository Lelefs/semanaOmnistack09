import React, { useState, useEffect } from 'react';
import {withNavigation} from 'react-navigation';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';

import api from '../services/api';

function SpotList({ tech, navigation }) {
    const [spots, setSpots] = useState([]);
    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: {tech}
            })

            setSpots(response.data)
        }

        loadSpots();
    }, []);

    function handleNavigate(id) {
        navigation.navigate('Book', { id });
    }

    return (
        <View style={s.container}>
            <Text style={s.title}> Empresas que usam <Text style={s.bold}>{tech}</Text> </Text>

            <FlatList style={s.list} data={spots} keyExtractor={spot => spot._id} horizontal showsHorizontalScrollIndicator={false} renderItem={({ item }) => (
                <View style={s.listItem}>
                    <Image style={s.thumbnail} source={{ uri: item.imagem_url.toString().replace('http://localhost:3333', 'https://leandroteste.localtunnel.me') }} />
                    <Text style={s.empresa}>{item.empresa}</Text>
                    <Text style={s.valor}>{item.valor ? `R$${item.valor} /dia` : 'GRATUITO'}</Text>
                    <TouchableOpacity onPress={() => handleNavigate(item._id)} style={s.button}>
                        <Text style={s.buttonText}>Solicitar alguma reserva</Text>
                    </TouchableOpacity>
                </View>
            )} />
        </View>
    )
}

const s = StyleSheet.create({
    container: {
        marginTop: 30
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15
    },

    bold: {
        fontWeight: 'bold'
    },

    list: {
        paddingHorizontal:20
    },

    listItem: {
        marginRight: 15
    },

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2
    },

    empresa: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10
    },

    valor: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },

    button: {
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14
    }
});

export default withNavigation(SpotList);