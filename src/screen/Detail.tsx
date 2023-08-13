import {Alert, Text, View, StyleSheet, Dimensions} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import {useEffect, useState} from "react";
import {useRoute} from "@react-navigation/native";

const {width,height}=Dimensions.get("window")
const Detail=()=>{
    const route= useRoute()
    // @ts-ignore
    const {item}=route.params

    const [myLocation, setMyLocation] = useState<any>(null);
    const [destination, setDestination] = useState(null);
    const [description, setDescription] = useState(null);
    const [address, setAddress] = useState<any>(null);
    const [initialRegion, setInitialRegion] = useState({
        latitude: 48.85661, // myLocation?.coords.latitude,
        longitude: 2.35222, // myLocation?.coords.longitude,
    });
    // const GOOGLE_MAPS_APIKEY:string | undefined=process.env.EXPO_PUBLIC_GOOGLE_MAPS_APIKEY

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




    return(
        <View>
            <MapView
                style={styles.map}
                // ref={mapRef}
                // onMapReady={onMapReadyHandler}
                mapType="mutedStandard"
                initialRegion={{
                    latitude: myLocation == null ? initialRegion.latitude : myLocation.coords.latitude,
                    longitude: myLocation == null ? initialRegion.longitude : myLocation.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                provider={PROVIDER_GOOGLE}

            >
                {myLocation != null && (
                    <Marker
                        coordinate={{
                            latitude: Number(myLocation?.coords.latitude),
                            longitude: Number(myLocation?.coords.longitude),
                        }}
                        title="Vous êtes ici"
                        pinColor="red"
                        zIndex={100}
                    />
                )}
                <Marker
                    coordinate={{
                        latitude:item.cordinate.lat,
                        longitude: item.cordinate.lng,
                    }}
                    title="Vous souhaitez vous rendre ici"
                    pinColor="green"
                    description={item.address}
                />
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
                        console.log('distance', result);
                        console.log('duration', result);
                    }}
                />
            </MapView>
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
        height: height / 1.5,
        zIndex: -1,
    },
})
