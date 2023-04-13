import { FC, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { IList } from "../../interfaces/IList";
import { styles } from "./Lists.styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import List from "../../models/List";
import { useAppSelector } from "../../redux/hooks/hooks";
import { selectlists } from "../../redux/state/listSlice";
import ListView from "../ModelsComponents/List";

const childComponent = ({ item, index }: any) => {
  return <ListView key={item.id} List={item}></ListView>;
};

const ListsGridView = ({ columns = 3 }) => {
  const [lists, setLists] = useState<IList[]>(useAppSelector(selectlists));
  const allLists = useAppSelector(selectlists);

  useEffect(() => {
    setLists(allLists);
  }, [allLists]);

  return (
    <View style={[styles.container]}>
      <FlatList
        data={lists}
        renderItem={childComponent}
        numColumns={columns}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ListsGridView;
