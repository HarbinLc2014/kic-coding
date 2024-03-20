import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const MainPage = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={()=> navigation.navigate('Search') }>
                <View style={{ width: 300, height: 60, borderRadius: 10, borderWidth:1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                        Search Screen
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default MainPage;