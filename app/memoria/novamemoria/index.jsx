import { useEffect, useState } from "react";
import { View, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, Alert } from "react-native";
import Bar from "../../../components/Bar";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Link, useRouter } from "expo-router";



const NewMemory = () => {
    const [formData, setFormData] = useState({
        Titulo: '',
        Ano: '',
        Localizacao: '',
        Descricao: '',
        Img: ''
    });
    const [image, setImage] = useState('');
    const router = useRouter();

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            handleChangeInput('Img', result.assets[0].uri);
        }
    };

    const handleChangeInput = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const storeData = async (novaMemoria) => {
        const { Titulo, Ano, Localizacao, Descricao, Img } = novaMemoria;
        if (!Titulo || !Ano || !Localizacao || !Descricao || !Img) {
            Alert.alert('Atenção', 'Preencha todos os campos');
            return;
        }
        try {
            const memoriaArmazenada = await AsyncStorage.getItem('memoria');
            const memoriaArray = memoriaArmazenada ? JSON.parse(memoriaArmazenada) : [];
            memoriaArray.push(novaMemoria);
            await AsyncStorage.setItem('memoria', JSON.stringify(memoriaArray));
            router.push('/memoria');
        } catch (e) {
            console.error('Erro ao salvar a memória:', e);
        }
    };

    return (
        <>
            <Bar
                Titulo="Adicionar Memória"
                href="/memoria"
                icon={<Entypo name="chevron-left" size={24} color="white" />}
                cor="#6600FF"
            />
            <SafeAreaView style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        placeholder="Título"
                        value={formData.Titulo}
                        onChangeText={(value) => handleChangeInput('Titulo', value)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Ano"
                        value={formData.Ano}
                        onChangeText={(value) => handleChangeInput('Ano', value)}
                        style={styles.input}
                        keyboardType="numeric"
                    />
                    <TextInput
                        placeholder="Localização"
                        value={formData.Localizacao}
                        onChangeText={(value) => handleChangeInput('Localizacao', value)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Descrição"
                        value={formData.Descricao}
                        onChangeText={(value) => handleChangeInput('Descricao', value)}
                        style={styles.input}
                        multiline
                    />
                    <View style={styles.btnsImgRow}>
                        <Pressable style={styles.btnimg} onPress={pickImage}>
                            <FontAwesome name="photo" size={24} color="#6600FF" />
                            <Text style={styles.pimg}>Adicionar foto</Text>
                        </Pressable>
                        <Pressable style={styles.btnimg}>
                            <Link href={'/memoria/camera'}>
                                <FontAwesome name="camera-retro" size={24} color="#6600FF" />
                                <Text style={styles.pimg}>Tirar foto</Text>
                            </Link>
                        </Pressable>
                    </View>
                    {image && <Image style={styles.foto} source={{ uri: image }} />}
                </View>
                <Pressable style={styles.btn} onPress={() => storeData(formData)}>
                    <Text style={styles.btnText}>Adicionar</Text>
                </Pressable>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F9F9F9',
    },
    form: {
        width: '100%',
        maxWidth: 400,
        marginVertical: 20,
    },
    input: {
        height: 50,
        padding: 12,
        marginBottom: 16,
        backgroundColor: '#ECECEC',
        borderRadius: 8,
        fontSize: 16,
    },
    btnimg: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    foto: {
        width: '100%',
        height: 200,
        marginTop: 16,
        borderRadius: 8,
        resizeMode: 'contain',
    },
    btnsImgRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    btn: {
        backgroundColor: '#6600FF',
        paddingVertical: 14,
        paddingHorizontal: 60,
        borderRadius: 8,
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    pimg: {
        color: '#6600FF',
        marginLeft: 6,
   
    },
});

export default NewMemory;
