import {Alert, Text, View, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";
import tw from "twrnc";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet from '@gorhom/bottom-sheet';


const {width,height}=Dimensions.get("window")
const Detail=()=>{
    const route= useRoute()
    // @ts-ignore
    const {item}=route.params

    const [myLocation, setMyLocation] = useState<any>(null);
    const [destination, setDestination] = useState(null);
    const [description, setDescription] = useState(null);
    const [address, setAddress] = useState<any>(null);
    const mapRef=useRef<any>(null);
    const [initialRegion, setInitialRegion] = useState({
        latitude: 48.85661, // myLocation?.coords.latitude,
        longitude: 2.35222, // myLocation?.coords.longitude,
    });
    const  navigation=useNavigation<any>()
    // const GOOGLE_MAPS_APIKEY:string | undefined=process.env.EXPO_PUBLIC_GOOGLE_MAPS_APIKEY
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '30%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    useEffect(() => {
        // Fonction rescursive, c'est à dire qui s'auto appelle, elle retourne une promesse
        // (complétion ou échec d'une opération asynchrone)
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission to access location was denied');
            }
            let location:any = await Location.getCurrentPositionAsync();
            let address:any = await Location.reverseGeocodeAsync(location.coords);

            // console.log("location", location);
            // console.log("location",  address);

            // @ts-ignore
            setAddress(...address);
            setMyLocation(location);
        })();
    }, []);

    const onMapReadyHandler = () => {
        if (myLocation) {
            mapRef.current.animateToRegion({
                latitude: myLocation.coords.latitude,
                longitude: myLocation.coords.longitude,
                latitudeDelta: 0.60,
                longitudeDelta: 0.60,
            });
        }
    };




    return(
        <View>
            {
                myLocation && (
                    <MapView
                        style={styles.map}
                        ref={mapRef}
                        onMapReady={onMapReadyHandler}
                        mapType="mutedStandard"
                        initialRegion={{
                            latitude: myLocation ? myLocation.coords.latitude : 0,
                            longitude: myLocation ? myLocation.coords.longitude : 0,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                        provider={PROVIDER_GOOGLE}
                        zoomControlEnabled={true}

                    >
                        {(
                            <Marker
                                coordinate={{
                                    latitude: Number(myLocation?.coords.latitude),
                                    longitude: Number(myLocation?.coords.longitude),
                                }}
                                title="Vous êtes ici"
                                pinColor="red"
                                zIndex={100}
                            >
                                <Image source={require('../../assets/placeholder.png')} style={{height: 35, width:35 }} />
                            </Marker>
                        )}
                        <Marker
                            coordinate={{
                                latitude:item.cordinate.lat,
                                longitude: item.cordinate.lng,
                            }}
                            title="Vous souhaitez vous rendre ici"
                            pinColor="green"
                            description={item.address}>
                            <Image source={require('../../assets/destination.png')} style={{height: 35, width:35 }} />
                        </Marker>
                        <MapViewDirections
                            apikey={''}
                            origin={`${address?.name} + ${address?.street} + ${address?.postalCode} + ${address?.city} + ${address?.country}`}
                            destination={item.address}
                            strokeWidth={5}
                            strokeColor={"blue"}
                            onError={(err) => {
                                //console.log('error', err);
                            }}
                            language="fr"
                            mode="DRIVING"
                            lineDashPhase={10}
                            precision="high"
                            optimizeWaypoints={true}
                            onReady={(result) => {
                                // console.log('distance', result);
                                // console.log('duration', result);
                            }}

                        />
                    </MapView>
                )
            }
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                onClose={() => {console.log('close')}}
            >
                <View>
                    <View style={tw`flex-row items-center self-center w-90`}>
                        <Icon name={"map-marker-account"} size={40} />
                        <Text style={tw`text-xl `}> {`${address?.name} + ${address?.street} + ${address?.postalCode} + ${address?.city} + ${address?.country}`} </Text>
                    </View>
                    {/*<View style={[tw`w-90 self-center m-2 ml-20 text-slate-100`, {height:4,borderBottomWidth:1,borderTopWidth:0}]} />*/}
                    <View style={[{width:10,height:10,opacity:.5},tw`bg-slate-500 rounded-full ml-10`]} />
                    <View style={[{width:10,height:10,opacity:.5},tw`bg-slate-500 rounded-full ml-10`]} />
                    <View style={[{width:10,height:10,opacity:.5},tw`bg-slate-500 rounded-full ml-10`]} />
                    <View style={tw`flex-row items-center self-center w-90`}>
                        <Image source={require("../../assets/destination.png")} style={{height: 35, width:35 }} />
                        <Text style={tw`text-xl`}> {item.address} </Text>
                    </View>
                </View>
                <TouchableOpacity style={tw`self-center bg-[#d33] w-90 p-3 m-2 rounded-md`}
                onPress={() =>{
                    bottomSheetRef.current?.close()
                    navigation.navigate('Home')
                }}
                >
                    <Text style={tw`text-white text-xl text-center`}>Retour aux services</Text>
                </TouchableOpacity>
            </BottomSheet>
        {/*    */}

        </View>
    )
}

export  default Detail
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: width,
        height: height,
        zIndex: -1,
        justifyContent: 'center',
        alignItems:'center'
    },
})
