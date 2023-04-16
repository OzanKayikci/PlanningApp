import { TouchableOpacity } from "react-native"
import { AntDesign } from "@expo/vector-icons";


const DrawerButton = ({navigation}) => {
    return (
        <TouchableOpacity
        
        onPress={() => navigation.openDrawer()}
      >
        <AntDesign
          size={25}
          name="menu-fold"
          type="material-community"
          color="white"
        />
      </TouchableOpacity>
    )
}

export default DrawerButton;