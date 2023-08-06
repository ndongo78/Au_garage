import React, {Dispatch, SetStateAction} from 'react';
import {
    Dimensions,
    FlatList, Platform,
    Pressable,
    ScrollView, StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import tw from "twrnc";
import Icon from "react-native-vector-icons/Ionicons";
import {Banner} from "../components";
import Font6 from "react-native-vector-icons/FontAwesome5";

type  Props = {
    isShow:boolean
    setIsShow:Dispatch<SetStateAction<boolean>>
}
const {width, height} =Dimensions.get("window")
const Accueil=({isShow,setIsShow}:Props) =>{
    const listMenus=[
        {icon:"car",title:"Voitures"},
        {icon:"motorcycle",title:"Motos"},
        {icon:"bicycle",title:"Vélos"},
    ]
    return (
        <View style={{}}>
        <ScrollView contentContainerStyle={{}}>
            <View style={[tw`bg-white flex-1 rounded-xl   ${isShow ? '-right-5 top-23': ''}`, {height : isShow ? height/1.3 : height , width: !isShow ? width :150,zIndex:999},styles.container]}>
                <View style={tw`flex-row justify-between`}>
                    <TouchableOpacity onPress={()=>setIsShow(!isShow)}>
                        <Icon name={"menu"} size={40} />
                    </TouchableOpacity>
                    <View style={tw`flex-row gap-5`}>
                        <View style={tw`flex-row items-center`}>
                            <Icon name={"location-outline"} size={30} style={tw`text-red-600`} />
                            <Text>Paris</Text>
                        </View>
                        <Pressable>
                            <Icon name={"notifications-outline"} size={30} style={tw`text-blue-600  mr-3`} />
                        </Pressable>
                    </View>
                </View>

                {/*end menu */}
            </View>
            {/*input search*/}
            <View style={tw`flex-row items-center justify-between m-5`}>
                <View style={tw`bg-slate-200 items-center flex-row w-74  p-2 rounded-full`}>
                    <Icon name={"search"} size={30} style={tw``} />
                    <TextInput
                        style={tw`h-12  w-62 ml-2`}
                        placeholder={'Search une service'}
                    />
                </View>
                <TouchableOpacity style={tw`bg-red-500 p-3 rounded-full m-2`}>
                    <Icon name={"filter"} size={30} style={tw`text-white`} />
                </TouchableOpacity>
            </View>
            {/*end input search*/}
            {/*card banner*/}
            <Banner />
            {/*end card banner*/}
            {/*menu */}
            <View>
                <Text style={tw`text-2xl m-3`}>Réserver une service</Text>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={listMenus}
                    keyExtractor={(item)=>item.icon}
                    renderItem={({item})=><TouchableOpacity style={tw`shadow bg-white w-30 items-center p-4 m-3 rounded-xl`}>
                        {item.icon ==="motorcycle" ? <Font6 name={"motorcycle"} size={55} style={tw`text-red-500`} /> :<Icon name={item.icon} size={55} style={tw`text-red-500`} />}
                        <Text style={tw`text-xl`}>{item.title} </Text>
                    </TouchableOpacity>}
                />

            </View>
        </ScrollView>
        </View>
    );
}


const styles= StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
    },
    drawer: {
        flex: 1,
    },
    shad:{

    }
})
export default Accueil;
