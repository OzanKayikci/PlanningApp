import { FC, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { IList } from "../../../interfaces/IList";
import { styles } from "./List.styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IListService } from "../../../services/Abstract/IListService";
import { ListService } from "../../../services/Concrete/ListService";
import { useAppDispatch } from "../../../redux/hooks/hooks";
import { deletelistById } from "../../../redux/state/listSlice";
import { LightColors } from "../../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
interface IListViewProps {
  List: IList;
}
const deleteHandle = (id: IList["id"], dispatch: any) => {
  const listService: IListService = new ListService();
  listService.delete(id).then((res) => {
    console.log("list silindi", res);
    dispatch(deletelistById(id));
  });
};
const childComponent = ({ item }: any) => {
  return <View>{item}</View>;
};

const ListView: FC<IListViewProps> = ({ List }) => {
  const dispatch = useAppDispatch();

  return (
    <View style={[styles.listContainer, { backgroundColor: List.color }]}>
      <View style={styles.listHeader}>
        <Text style={styles.headerText}>{List.title.toUpperCase()}</Text>
        <TouchableOpacity
          onPress={() => {
            console.log("Delete");
            deleteHandle(List.id, dispatch);
          }}
          style={styles.deleteButton}
        >
          <View style={styles.buttonContainer}>
            <MaterialCommunityIcons
              color={LightColors.tertiary}
              size={20}
              name="trash-can"
            ></MaterialCommunityIcons>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.listBody}>
        <FlatList
          data={List.children}
          renderItem={childComponent}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default ListView;
