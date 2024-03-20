import React, { Profiler, useEffect, useState } from 'react';
import MyComponent from '../components/mycomponent/MyComponent';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SearchBar from '../components/NewSearch';
import jsonAPI from '../api/jsonserver';
import { Item } from '../types/search';

const SearchPage = () => {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState<Item[]>([]);
    const search = async() => {
        const response = await jsonAPI.get('/testList2');
        setResults(response.data);

        // large case
        // let res = []
        // for(let i = 1; i<1000; i++){
        //     res.push({ id: `id_${i}_${Math.floor(Math.random()*100)}`, name: `name_${i}_${Math.floor(Math.random()*100)}` })
        // }
        // setResults(res)
        console.log('RESPONSE FETCHED')
    }

    useEffect(()=>{
        search();
    },[])
    return (
        <View style={{ flex: 1, paddingTop: 100 }}>
            <Profiler id='SearchComponent' onRender={(id, phase, actualDuration, baseDuration, startTime, commitTime)=>{
                console.log('Actual Duration', actualDuration)
                console.log('Base Duration', baseDuration)
            }}>
            <MyComponent data={results} wrapperStyle={{}} inputStyle={styles.inputStyle} />
            </Profiler>
            {/* <SearchBar data={results} term={term} onTermChange={setTerm} /> */}
            <TouchableOpacity
                onPress={()=>search()}
                style={{ width: 250, height: 50, position: 'absolute', zIndex: 10, backgroundColor: 'blue', bottom: 100, alignSelf: 'center', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
            >
                <Text style={{ fontSize: 15, color: 'white' }}>Refresh Datasource</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#f0eeee',
        height: 50, borderRadius: 5, marginHorizontal: 15,
        marginTop: 100,
        flexDirection: 'row',
        paddingHorizontal: 16,
    },
    inputStyle: {
        flex: 1,
        fontSize: 18,
        paddingHorizontal: 12,
    },
    iconStyle: {
        alignSelf: 'center'
    }
})


export default SearchPage;