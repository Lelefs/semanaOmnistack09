import React, { useState } from 'react';
import { Text, StyleSheet, Alert, TextInput, SafeAreaView, TouchableOpacity, AsyncStorage } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit() {
        const userid = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: { userid }
        })

        Alert.alert('Solicitação de reserva enviada.');

        navigation.navigate('List');
    };

    function handleCancel() {
        navigation.navigate('List');
    };

    return (
        <SafeAreaView style={s.container}>
            <Text style={s.label}>DATA DE INTERESSE *</Text>
            <TextInput 
                style={s.input} 
                placeholder='Qual data você quer reservar?' 
                placeholderTextColor='#999' 
                keyboardType="email-address" 
                autoCapitalize="words" 
                autoCorrect={false} 
                value={date} 
                onChangeText={setDate} />

            <TouchableOpacity onPress={handleSubmit} style={s.button}>
                <Text style={s.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[s.button, s.cancelButton]}>
                <Text style={s.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    container: {
        margin: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginTop: 20,
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    cancelButton: {
        backgroundColor: '#ccc',
        marginTop: 10
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});