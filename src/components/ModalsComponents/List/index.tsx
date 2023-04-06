import { FC } from "react";
import { View, Text, FlatList } from "react-native";
import { IList } from "../../../interfaces/IList";
import { styles } from "./List.styles";

interface IListViewProps {
  List: IList;
}

const childComponent = ({item}) =>{

  return (<View>
    {item}
  </View>)
}

const ListView: FC<IListViewProps> = ({ List }) => {
  return (
    <View style={[styles.listContainer, { backgroundColor: List.color }]}>
      <View style={styles.listHeader}>
        <Text style={styles.headerText}>{List.title.toUpperCase()}</Text>
      </View>
      <View style={styles.listBody}>
        <FlatList
               data={List.children}
               
               renderItem={childComponent}
               keyExtractor={(item,index) => index.toString()}
        />
   
      </View>
    </View>
  );
};

export default ListView;
