import {Pressable, View} from "react-native";
import tw from "twrnc";
import Font6 from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/Ionicons";


type Props = {
    bottomList: {
        icon: string
        title: string
    }[];
    currentMenuBottom: number;
    setCurrentMenuBottom: (t:number) => void;
}

export const BottomNav=({bottomList,currentMenuBottom,setCurrentMenuBottom}:Props)=>{
    return (
        <View style={tw` flex-row justify-between p-2 bg-slate-200 shadow-xl`}>
            {
                bottomList.map((menu,index)=> <Pressable
                    style={tw`flex-row items-center  ${currentMenuBottom === index ? 'bg-[#d33] p-2 rounded-xl text-white  ' :''}`} key={index}
                    onPress={()=> setCurrentMenuBottom(index)}>
                    {
                        menu.icon === "luggage-cart" ?  <Font6 name={menu.icon} size={40} color={ currentMenuBottom === index ?"#fff" : "#0019" } />
                            :
                            <Icon name={menu.icon} size={40} color={ currentMenuBottom === index ?"#fff" : "#0019" }/>
                    }

                    {/*<Text style={tw`text-xl font-bold m-1 text-white`}>{menu.title}</Text>*/}
                </Pressable>)
            }
        </View>
    )
}
