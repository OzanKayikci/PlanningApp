import { Text, TouchableOpacity, View } from "react-native";
import styles from "./createParentItemModal.styles";
import { TextInput } from "react-native-gesture-handler";
import { FC, useEffect, useState } from "react";
import { LightColors, listColors } from "../../../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Dropdown from "../../../DropDown";
import { ModalTypes, ParentTypes, shapes } from "../../../../constants/types";
import GetShape from "../../../shapeView";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { selectButtonAction, setButtonAction } from "../../../../redux/state/buttonActionSlice";
import { IListService } from "../../../../services/Abstract/IListService";
import { ListService } from "../../../../services/Concrete/ListService";
import { addlist, updatelistById } from "../../../../redux/state/listSlice";
import { selectModal } from "../../../../redux/state/modalSlice";
import { IBase } from "../../../../interfaces/IBase";
import { IList } from "../../../../interfaces/IList";
import { ListBuilder } from "../../../../models/List/listBuilder";
import List from "../../../../models/List";
import { IParent } from "../../../../interfaces/IParent";
import { IProjectService } from "../../../../services/Abstract/IProjectService";
import { ProjectService } from "../../../../services/Concrete/ProjectService";
import Project from "../../../../models/Project";
import { ProjectBuilder } from "../../../../models/Project/projectBuilder";
import { updateProjectById } from "../../../../redux/state/projectSlice";
import { selectSelectedProject } from "../../../../redux/state/selectedProjectSlice";

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
export const CreateParentModalHeader = ({ title = "NEW LIST" }) => {
  return (
    <View style={[styles.container, styles.header]}>
      <Text style={styles.HeaderText}>{title}</Text>
    </View>
  );
};

const createANewParent = (
  title: IBase["title"],
  color: IBase["color"],
  shape: IBase["colorShape"],
  dispatch: any,
  parentType: ParentTypes,
  selectedProjectId:IBase["groupId"] = 0
) => {
  const parentService: IListService | IProjectService =
    parentType === ParentTypes.project ? new ProjectService() : new ListService();
 
    parentService.create(title, color, shape, selectedProjectId).then((value) => {
    console.log("liste kaydetme başarılı");
    console.log("value", value);
    value !== null ? dispatch(addlist(value)) : console.log("redux liste kaydetme başarısız");
    dispatch(setButtonAction([false, ""]));
  });
};

const updateList = (
  parent: IParent,
  newTitle: IParent["title"],
  newColor: IParent["color"],
  newShape: IParent["colorShape"]
) => {
  const updatedList: List = new ListBuilder(parent.id, parent.type, newTitle, newColor, newShape)
    .setIsChild(parent.isChild)
    .setChildGroupId(parent.childGroupid)
    .setGroupId(parent.groupId)
    .setIsParent(parent.IsParent)
    .SetParentId(parent.parentId)
    .setChildren(parent.children)
    .listBuild();
  return updatedList;
};

const updateProject = (
  parent: IParent,
  newTitle: IParent["title"],
  newColor: IParent["color"],
  newShape: IParent["colorShape"]
) => {
  const updatedProject: Project = new ProjectBuilder(parent.id, parent.type, newTitle, newColor, newShape)
    .setIsChild(parent.isChild)
    .setChildGroupId(parent.childGroupid)
    .setGroupId(parent.groupId)
    .setIsParent(parent.IsParent)
    .SetParentId(parent.parentId)
    .setChildren(parent.children)
    .ProjectBuild();
  return updatedProject;
};

const updateParent = (
  parent: IParent,
  newTitle: IParent["title"],
  newColor: IParent["color"],
  newShape: IParent["colorShape"],
  dispatch: any,
  parentType: ParentTypes
) => {
  const parentService: IListService | IProjectService =
    parentType === ParentTypes.project ? new ProjectService() : new ListService();

  const updatedParent = ParentTypes.project
    ? updateProject(parent, newTitle, newColor, newShape)
    : updateList(parent, newTitle, newColor, newShape);
  parentService.update(updatedParent).then((value) => {
    console.log("local store a parent kaydetme başarılı");
    value === "success"
      ? dispatch(
          parentType === ParentTypes.project
            ? updateProjectById(updatedParent.getAllItems)
            : updatelistById(updatedParent.getAllItems)
        )
      : console.log("redux parent kaydetme başarısız");
    dispatch(setButtonAction([false, ""]));
  });
};

export const CreateParentModalBody = () => {
  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState<string>(listColors[6]);
  const [shape, setShape] = useState<string>(shapes[1]);

  const [listforUpdate, setListforUpdate] = useState<IList>(null);

  const saveButtonActive = useAppSelector(selectButtonAction);
  const selectedProject = useAppSelector(selectSelectedProject);

  const modalProps = useAppSelector(selectModal);
  const dispatch = useAppDispatch();

  //? when modal type is update
  useEffect(() => {
    switch (modalProps.type) {
      case ModalTypes.listDetail:
        const listService: IListService = new ListService();
        listService.getById(modalProps.elementId).then((value) => {
          setListforUpdate(value);
          setTitle(value.title);
          setColor(value.color);
          setShape(value.colorShape);
        });
    }
  }, [modalProps]);

  useEffect(() => {
    if (saveButtonActive) {
      console.log("butona tıklandı saveButtonActive", saveButtonActive, modalProps);
      switch (modalProps.type) {
        case ModalTypes.listCreate:
          createANewParent(title, color, shape, dispatch, ParentTypes.list,selectedProject.id);
          break;
        case ModalTypes.listDetail:
          updateParent(listforUpdate, title, color, shape, dispatch, ParentTypes.list);
          break;
        case ModalTypes.projectCreate:
          createANewParent(title, color, shape, dispatch, ParentTypes.project);
          break;
        default:
          break;
      }
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
          value={color}
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
          value={shape}
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
export const CreateParentModalFooter = () => {
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(setButtonAction([true, "save"]));
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
