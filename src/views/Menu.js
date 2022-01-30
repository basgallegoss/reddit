import React, { memo, useState } from 'react';
import { View, StyleSheet, Text, FlatList, RefreshControl } from "react-native";
import { Card, Title, Searchbar } from 'react-native-paper';
import { Skeleton, Div } from 'react-native-magnus'
import Icon from 'react-native-vector-icons/dist/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useMemes } from '../services/memeServices';
const Menu = ({ navigation }) => {

    const {
        data,
        isLoading,
        isError
    } = useMemes();

    if (isLoading) {
        return (
            <>
                <Div flexDir="row" mt="md">
                    <Skeleton.Box mt="sm" />
                    <Div ml="md" flex={1} alignItems='center'>
                        <Skeleton.Box mt="sm" />
                        <Skeleton.Box mt="sm" w="80%" h="60%" />
                        <Skeleton.Box mt="sm" w="80%" h="60%" />
                    </Div>
                </Div>
            </>
        );
    }

    if (isError) {
        console.log('ERROR')
    }
    return (
        <View style={styles.background}>
            <FlatList
                data={data}
                style={{ height: '90%' }}
                keyExtractor={(item, index) => item?.data?.created}
                renderItem={({ item, index }) => {
                    return (
                        <Card style={styles.card} >
                            <Card.Cover style={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }} source={{ uri: item?.data?.thumbnail }} />
                            <Card.Actions>
                                <Card.Content style={styles.contCard}>
                                    <View style={styles.contNumber}>
                                        <Icon name="chevron-up" size={30} color="#9c9c9c" />
                                        <Text style={styles.textNumber}>{item?.data?.score}</Text>
                                        <Icon name="chevron-down" size={30} color="#9c9c9c" />
                                    </View>
                                    <View style={styles.contText}>
                                        <Title>{item?.data?.title}</Title>
                                        <View style={styles.contCard}>
                                            <MaterialCommunityIcons name="message-reply" size={20} color="#d6d6d6" />
                                            <Text style={styles.textNumber}>{item?.data?.num_comments}</Text>
                                        </View>
                                    </View>
                                </Card.Content>
                            </Card.Actions>
                        </Card>
                    )
                }}
                onEndReachedThreshold={0.1}
            />
        </View>


    );
};
const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
        height: '100%'
    },
    search: {
        margin: '1%',
        backgroundColor: '#f9f9f9'
    },
    card: {
        width: '90%',
        alignSelf: 'center',
        margin: '5%',
        elevation: 10,
        borderRadius: 10
    },
    contCard: {
        flexDirection: 'row'
    },
    contNumber: {
        flex: 0.1,
        alignItems: 'center'
    },
    contText: {
        flex: 1
    },
    textNumber: {
        color: '#9c9c9c',
        marginStart: '2%'
    }
});

export default memo(Menu);
