import {
    Dimensions, FlatList,
    Image,
    Platform,
    Pressable, ScrollView,
    StatusBar,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { Avatar } from "react-native-paper";
import tw from 'twrnc';
import Icon from "react-native-vector-icons/Ionicons";
import Font6 from "react-native-vector-icons/FontAwesome5";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import {useState} from "react";
import {Banner} from "../components";


const {width, height} =Dimensions.get("window")

const Home =()=>{
    const [isShow, setIsShow] = useState(false);
    const [currentMenu, setCurrentMenu] = useState(0);

    const menuLis=[
        {icon:"home",title:"Accueil"},
        {icon:"history",title:"Mes historiques"},
        {icon:"ios-gift-outline",title:"Bons de réductions"},
        {icon:"notifications-outline",title:"Notifications"},
        {icon:"star-half-outline",title:"recommendations"},
        {icon:"md-information-circle-outline",title:"Besoin d'aides"},
        {icon:"exit-outline",title:"Se déconnecter"},
    ]
    const listMenus=[
        {icon:"car",title:"Voitures"},
        {icon:"motorcycle",title:"Motos"},
        {icon:"bicycle",title:"Vélos"},
    ]
    return(
        <View style={[tw`bg-red-500 flex-1 flex-row items-center`, styles.container]}>
            {
                isShow &&  <View style={[tw`ml-3`,styles.drawer]}>
                    <View style={tw`flex-row justify-between items-center`}>
                        <Avatar.Image source={{uri:'https://picsum.photos/100'}} style={tw`mt-3 m-2`}  />
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
                                    style={tw`flex-row items-center gap-3 ${currentMenu === index ? 'bg-yellow-400 p-2 rounded-xl w-56 ' :''}`} key={index}
                                    onPress={()=> setCurrentMenu(index)}>
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
            {/*container*/}
            <ScrollView style={tw`flex-1`} contentContainerStyle={tw`flex-1`}>
                <View style={[tw`bg-white flex-1 rounded-xl absolute bg-slate-100 ${isShow ? '-right-10': ''}`, {height : isShow ? height/1.4 : height , width: !isShow ? width :150},styles.container]}>

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
                    {/*end menu */}
                </View>

            </ScrollView>
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
