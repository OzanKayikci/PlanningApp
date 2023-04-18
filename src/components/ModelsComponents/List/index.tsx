import { FC, useState } from "react";
import { View, Text, FlatList,TouchableOpacity } from "react-native";
import { IList } from "../../../interfaces/IList";
import { styles } from "./List.styles";
import { IListService } from "../../../services/Abstract/IListService";
import { ListService } from "../../../services/Concrete/ListService";
import { useAppDispatch } from "../../../redux/hooks/hooks";
import { deletelistById } from "../../../redux/state/listSlice";
import { LightColors } from "../../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { addModalState } from "../../../redux/state/modalSlice";
import { ModalTypes, types } from "../../../constants/types";
interface IListViewProps {
  List: IList;
}
const deleteHandle = (id: IList["id"], title: IList["title"], dispatch: any) => {
  dispatch(addModalState([ModalTypes.deleteModal, id, title,types.list]));
};

const updateHandle = (id: IList["id"], title: IList["title"], dispatch: any) => {
  dispatch(addModalState([ModalTypes.listDetail, id]));
}

const childComponent = ({ item }: any) => {
  return <View>{item}</View>;
};

const ListView: FC<IListViewProps> = ({ List }) => {
  const dispatch = useAppDispatch();

  return (
    <View style={[styles.listContainer, { backgroundColor: List.color }]}>
      <View style={styles.listHeader}>
        <TouchableOpacity onPress={()=>{ updateHandle(List.id,List.title,dispatch)}} style={styles.headerButton}>
        
            <Text style={styles.headerText}>{List.title}</Text>
      
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Delete");
            deleteHandle(List.id, List.title, dispatch);
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
