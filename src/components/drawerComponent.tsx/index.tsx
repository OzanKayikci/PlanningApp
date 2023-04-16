import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Text, TouchableOpacity, View } from "react-native";
import { LightColors } from "../../constants/Colors";
import { styles } from "./Drawernavigatin.styles";

const DrawerComponent = (props: any) => {
  return (
    <View style={styles.continer}>
      <DrawerContentScrollView style={{ borderTopEndRadius: 50 }}>
        <View style={styles.header}>
          <Text style={styles.headerText}> PROJECTS</Text>
        </View>
        <TouchableOpacity
        style={styles.homeButton}
          onPress={() => {
            props.prop.navigation.navigate("Home");
          }}
        >
          <Text style={styles.buttonText}>Proje</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerComponent;
