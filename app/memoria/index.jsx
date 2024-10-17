import { SafeAreaView, StyleSheet, View, Pressable, Text, Image, ScrollView } from "react-native";
import Bar from "../../components/Bar";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from "expo-router";
import { useEffect, useState } from "react";

const Memoria = () => {
    const [memorias, setMemorias] = useState(null);

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('memoria');
            const parsedValue = jsonValue ? JSON.parse(jsonValue) : null;
            setMemorias(parsedValue);
        } catch (error) {
            console.error('Erro ao recuperar os dados de memória:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <Bar
                Titulo="Memória"
                href="/"
                icon={<Entypo name="home" size={24} color="white" />}
                cor="#00BFA6"
            />
            <SafeAreaView style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                >
                    <Pressable style={styles.btnNew}>
                        <Link href="/memoria/novamemoria">
                            <Entypo name="plus" size={28} color="white" />
                        </Link>
                    </Pressable>

                    {memorias ? (
                        <View style={styles.memoryContainer}>
                            {memorias.map((memoria, index) => (
                                <View style={styles.card} key={index}>
                                    <Image
                                        style={styles.img}
                                        source={{ uri: memoria.Img }}
                                    />
                                    <Text style={styles.h1}>{memoria.Titulo}</Text>
                                    <Text style={styles.description}>{memoria.Descricao}</Text>
                                    <View style={styles.details}>
                                        <View style={styles.extraBox}>
                                            <FontAwesome name="map-marker" size={14} color="#00BFA6" />
                                            <Text style={styles.extra}>{memoria.Localizacao}</Text>
                                        </View>
                                        <View style={styles.extraBox}>
                                            <Entypo name="calendar" size={12} color="#00BFA6" />
                                            <Text style={styles.extra}>{memoria.Ano}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyText}>Nenhuma memória salva</Text>
                        </View>
                    )}
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F9',
    },
    scrollView: {
        alignItems: 'center',
        padding: 16,
    },
    memoryContainer: {
        width: '100%',
    },
    btnNew: {
        width: 70,
        height: 70,
        backgroundColor: '#00BFA6',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 10,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 7,
        borderLeftWidth: 5,
        borderLeftColor: '#00BFA6',
    },
    img: {
        width: '100%',
        height: 180,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    h1: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333333',
        marginTop: 12,
    },
    description: {
        fontSize: 15,
        color: '#777777',
        marginTop: 6,
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    extra: {
        fontSize: 13,
        color: '#00BFA6',
        marginLeft: 4,
    },
    extraBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    emptyText: {
        fontSize: 18,
        color: '#AAAAAA',
    },
});

export default Memoria;
