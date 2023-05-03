import { Text, TouchableOpacity, View } from "react-native";
import styles from "./createListModal.styles";
import { TextInput } from "react-native-gesture-handler";
import { FC, useEffect, useState } from "react";
import { LightColors, listColors } from "../../../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Dropdown from "../../../DropDown";
import { shapes } from "../../../../constants/types";
import GetShape from "../../../shapeView";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { selectButtonAction, setButtonAction } from "../../../../redux/state/buttonActionSlice";
import { IListService } from "../../../../services/Abstract/IListService";
import { ListService } from "../../../../services/Concrete/ListService";
import { addlist } from "../../../../redux/state/listSlice";

// const GetList = () => {
//     let list: IList =
//      new ListBuilder(1, types.list, "TODO", LightColors.listColors[13], shapes.circle)
//       .setChildGroupId(2)
//       .setChildren([GetTask1(), GetTask2(), GetTask3()])
//       .setIsChild(false)
//       .listBuild();

//     return <ListView List={list}></ListView>;
//   };

const colorValues = Object.values(listColors);
const shapeValues = Object.values(shapes);

const DropDownColorElement = ({ item }: any) => {
  return <View style={{ width: 15, height: 15, borderRadius: 5, backgroundColor: item }}></View>;
};
const DropDownShapeElement = ({ item }: any) => {
  return (
    <View style={{ width: 15, height: 15, justifyContent: "center" }}>
      <GetShape shape={item} />
    </View>
  );
};
export const CreateListModalHeader = () => {
  return (
    <View style={[styles.container, styles.header]}>
      <Text style={styles.HeaderText}>NEW LIST</Text>
    </View>
  );
};

export const CreateListModalBody = () => {
  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState<string>(listColors[5]);
  const [shape, setShape] = useState<string>(shapes[1]);

  const saveButtonActive = useAppSelector(selectButtonAction);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (saveButtonActive) {
      console.log("butona tıklandı");

      const listService: IListService = new ListService();

      listService.create(title, color, shape).then((value) => {
        console.log("liste kaydetme başarılı");
        console.log("value", value);
        value !== null ? dispatch(addlist(value)) : console.log("redux liste kaydetme başarısız");
        dispatch(setButtonAction([false,""]));
      });
    }
  }, [saveButtonActive]);

  return (
    <View style={[styles.container, styles.body]}>
      <View style={styles.bodyItem}>
        <Text style={styles.itemLabel}>Name</Text>
        <TextInput
          value={title}
          onChangeText={(value) => {
            setTitle(value);
          }}
          style={styles.itemInput}
        ></TextInput>
      </View>
      <View style={[styles.bodyItem, { zIndex: 10 }]}>
        <Text style={styles.itemLabel}>Color</Text>

        <Dropdown
          options={colorValues}
          SecondElement={DropDownColorElement}
          backgroundColor={LightColors.primary}
          action={setColor}
          type="color"
          headerColor="rgba(200, 210, 247,0.2)"
          //itemColor="rgba(200, 210, 247,0.8)"
        />
      </View>
      <View style={styles.bodyItem}>
        <Text style={styles.itemLabel}>Shape</Text>
        <Dropdown
          options={shapeValues}
          SecondElement={DropDownShapeElement}
          backgroundColor={LightColors.primary}
          action={setShape}
          type="shape"
          headerColor="rgba(200, 210, 247,0.2)"
          //itemColor="rgba(200, 210, 247,0.8)"
        />
      </View>
    </View>
  );
};
export const CreateListModalFooter = () => {
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(setButtonAction([true,"save"]));
  };
  return (
    <TouchableOpacity
      onPress={() => {
        handleSave();
      }}
    >
      <View style={styles.buttonContainer}>
        <MaterialCommunityIcons
          color={LightColors.secondary}
          size={30}
          name="playlist-plus"
        ></MaterialCommunityIcons>
      </View>
    </TouchableOpacity>
  );
};