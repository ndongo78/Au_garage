import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screen/Home";
import Detail from "../screen/Detail";

const Stack = createNativeStackNavigator();

const HomeStack=()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name={"Home"} component={Home} options={
              {
                  headerShown:false
              }
            } />
            <Stack.Screen name={"Detail"} component={Detail} options={
                {
                    headerShown:false
                }
            } />
        </Stack.Navigator>
    )
}



export default  HomeStack;
