import {Image, Text, TouchableOpacity, View} from "react-native";
import tw from "twrnc";


export const Banner =()=>  <View style={tw`flex-row bg-slate-200 shadow ml-4 mr-5 rounded-xl`}>
    <View style={tw`w-50 justify-between`}>
        <Text style={tw`text-xl font-bold ml-5 mt-2`}>Obtenir des services à partir de votre emplacement</Text>
        <TouchableOpacity style={tw`m-5 bg-red-500 p-2 rounded-full  `}>
            <Text style={tw`text-center text-white font-bold`}>Trouver une service</Text>
        </TouchableOpacity>
    </View>
    <Image source={require('../../assets/mecano.png')}
           style={tw`w-60 h-40 `}
           resizeMode={'stretch'}
    />
</View>
