import {
    Alert,
    Button,
    Dimensions,
    Image,
    Platform,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { Avatar } from "react-native-paper";
import tw from 'twrnc';
import Icon from "react-native-vector-icons/Ionicons";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import {useState} from "react";
import {flex} from "twrnc/dist/esm/resolve/flex";

const {width, height} =Dimensions.get("window")

const Home =()=>{
    const [isShow, setIsShow] = useState(false);
    const [currentMenu, setCurrentMenu] = useState(false);

    const menuLis=[
        {icon:"home",title:"Accueil"},
        {icon:"history",title:"Mes historiques"},
        {icon:"ios-gift-outline",title:"Bons de réductions"},
        {icon:"notifications-outline",title:"Notifications"},
        {icon:"star-half-outline",title:"recommendations"},
        {icon:"md-information-circle-outline",title:"Besoin d'aides"},
        {icon:"exit-outline",title:"Se déconnecter"},
    ]
    return(
        <View style={[tw`bg-red-500 flex-1 flex-row items-center`, styles.container]}>
            {
                isShow &&  <View style={[tw`ml-3`,styles.drawer]}>
                    <View style={tw`flex-row justify-between items-center`}>
                        <Avatar.Image source={''}  />
                        <View style={tw`absolute -right-45 text-white`}>
                            <Pressable onPress={()=>setIsShow(!isShow)}>
                                <Icon name="close-circle" size={28} color={"#fff"} />
                            </Pressable>
                        </View>
                    </View>
                    <Text style={tw`text-xl font-bold m-1 text-white`}>Heureux de vous revoir !</Text>
                    <Text style={tw`text-xl font-bold m-1 text-white`}>Billy Mary</Text>
                    <View style={tw`flex-col justify-between flex-1`}>
                        <View style={tw`mt-10 gap-8`}>
                            {
                                menuLis.map((menu,index)=> <Pressable
                                    style={tw`flex-row items-center gap-3 ${currentMenu ? 'bg-yellow-400' :''}`} key={index}
                                    onPress={()=>{
                                    if(menuLis[index].title === menu.title){
                                        setCurrentMenu(true)
                                    }
                                }}>
                                    {
                                        menu.icon === "history"?  <Material name={menu.icon} size={30} color={"#fff"} />
                                         :
                                            <Icon name={menu.icon} size={30} color={"#fff"} />
                                    }

                                    <Text style={tw`text-xl font-bold m-1 text-white`}>{menu.title}</Text>
                                </Pressable>)
                            }


                        </View>
                        <View style={tw`flex-row items-center mb-2 w-[220px]`}>
                            <Text style={tw`text-white text-xl`}>Choisir votre language : </Text>
                            <View style={tw`flex-row gap-2 ml-2`}>
                                <TouchableOpacity style={tw`flex-row items-center gap-3`}>
                                    <Image source={require("../../assets/france.png")} style={tw`w-10 h-10`}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={tw`flex-row items-center gap-3`}>
                                    <Image source={require("../../assets/royaume-uni.png")} style={tw`w-10 h-10`} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            }
            {
                isShow && <View style={[tw`bg-red-200 flex-1 rounded-xl ${isShow ? '-right-10': ''}`,{height : isShow ? height/1.6 : height ,zIndex:-99}]}></View>

            }
                <View style={[tw`bg-white flex-1 rounded-xl absolute ${isShow ? '-right-10': ''}`, {height : isShow ? height/1.4 : height , width: !isShow ? width :150},styles.container]}>
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
                </View>

        </View>
    )
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
export  default  Home
