import { FC, ReactNode } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { setButtonAction } from "../../redux/state/buttonActionSlice";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LightColors, listColors } from "../../constants/Colors";

interface IModalFooter {
  deleteButton?: ReactNode;
}
export const ModalFooter: FC<IModalFooter> = ({ deleteButton }) => {
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(setButtonAction([true, "save"]));
  };
  return (
    <View style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}>
      <View style={{ flex: 2, alignItems: "flex-end" }}>{deleteButton}</View>

      <TouchableOpacity
        onPress={() => {
          handleSave();
        }}
        style={{ flex: 2, alignItems: "flex-end" }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: listColors["1"],
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons
            color={LightColors.secondary}
            size={30}
            name="playlist-plus"
          ></MaterialCommunityIcons>
        </View>
      </TouchableOpacity>
    </View>
  );
};
