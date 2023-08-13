import {Dimensions, FlatList, Image, Pressable, Text, TouchableOpacity, View} from "react-native";
import tw from 'twrnc';
import {Avatar} from "react-native-paper";
import MaterialIcon from  "react-native-vector-icons/MaterialIcons"
import {useNavigation} from "@react-navigation/native";

const {width}=Dimensions.get("window")
export  const Services=()=>{
    const navigation=useNavigation<any>()

    const garagesList=[
        {
            "id":1,
            'name': "Midas",
            "address":"12 avenue paul raoult, Les Mureaux,France",
            "notes":4.5,
            "horaires":"8h a 18h",
            "logo":"https://www.gravatar.com/avatar",
            "phone":"0125488458",
            "cordinate":{"lat": 48.98659660000001, "lng": 1.9120707}
        },
        {
            "id":2,
            'name': "O Garage",
            "address":"120 rue louis bleriot,Les Mureaux,France",
            "notes":4.5,
            "horaires":"8h a 20h",
            "logo":"https://www.gravatar.com/avatar",
            "phone":"0125488455",
            "cordinate":{"lat": 48.9768014, "lng": 1.9193752}
        },
        {
            "id":3,
            'name': "Dépanner fnr",
            "address":"22 rue de bougimont,les Mureaux,France",
            "notes":4.5,
            "horaires":"8h a 20h",
            "logo":"https://www.gravatar.com/avatar",
            "phone":"0125486487",
            "cordinate":{"lat": 48.98806619999999, "lng": 1.9141196}
        },
    ]

    const renderItem=(item:any,index:number)=>(
        <Pressable
            key={index}
            style={[tw`mt-2 ml-3 mr-2 bg-white p-3 shadow rounded`]}
            onPress={()=>navigation.navigate('Detail',{item:item})}
        >
          <View style={tw`flex-row`}>
          <View style={tw`bg-red-600 shadow p-2 rounded-xl items-center justify-center`}>
              <Avatar.Image
                  source={{uri:item.logo}}
                  style={tw`bg-red-600`}
                  size={60}
              />
          </View>
           <View style={[tw`m-3 p-1`,{width:width-120}]}>
               <View style={tw`flex-row justify-between items-center mb-2`} >
                   <View style={tw`flex-row`}>
                       <MaterialIcon name="watch-later" size={20} />
                       <Text> {item.horaires} </Text>
                   </View>
                   <View style={tw`flex-row`}>
                       <MaterialIcon name="star" size={20} style={tw`text-red-600`} />
                       <Text> {item.notes} </Text>
                   </View>
               </View>
               <View>
                   <Text style={tw`text-2xl font-bold `}> {item.name} </Text>
                   <Text> {item.address} </Text>
               </View>
           </View>
          </View>
        </Pressable>
    )
    return(
        <View style={tw`bg-slate-100`}>
        {/*    header*/}
            <View style={tw`flex-row justify-between m-5`}>
                <TouchableOpacity>
                    <Text style={tw`font-bold text-xl`}>Autour de vous</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Voir plus</Text>
                </TouchableOpacity>
            </View>
        {/*    en header*/}
        {/*    list*/}
            {
                garagesList.map((item, index)=>renderItem(item, index))
            }
        {/*    en list*/}
        </View>
    )
}
