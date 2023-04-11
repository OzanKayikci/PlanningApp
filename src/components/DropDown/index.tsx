import React, { ComponentType, useCallback, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./dropDown.styles";
import { FlatList } from "react-native-gesture-handler";
import { listColors } from "../../constants/Colors";

interface DropdownProps {
  options: string[];
  SecondElement?: ComponentType<any>;
  backgroundColor?: string;
  headerColor?: string;
  itemColor?: string;
  type: string;
  action:React.Dispatch<React.SetStateAction<string>>,
}

const Dropdown: React.FC<DropdownProps > = ({
  options,
  SecondElement,
  backgroundColor,
  headerColor,
  itemColor,
  type,
  action
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    action(option);

    setShowOptions(false);
  };

  //?flatList Item
  const Item = ({ item }: any) => {
    return (
      <TouchableOpacity onPress={() => handleSelect(item)} style={styles.itemButton}>
        <View
          style={[
            styles.buttonView,
            { backgroundColor: itemColor ? itemColor : styles.buttonView.backgroundColor },
          ]}
        >
          <Text style={styles.item}>{item}</Text>
          {SecondElement && <SecondElement item={item}/>}
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <View style={[styles.dropdownContainer]}>
      <TouchableOpacity
        style={[
          styles.dropdownHeader,
          { backgroundColor: headerColor ? headerColor : styles.dropdownHeader.backgroundColor },
        ]}
        onPress={() => setShowOptions(!showOptions)}
      >
        <Text style={styles.header}>{selectedOption ? selectedOption : `Select a ${type}`}</Text>
      </TouchableOpacity>
      {showOptions && (
        <View
          style={[
            styles.dropdownOptionsContainer,
            {
              backgroundColor: backgroundColor
                ? backgroundColor
                : styles.dropdownOptionsContainer.backgroundColor,
            },
          ]}
        >
          <View style={styles.dropdownOptions}>
            <FlatList
              data={options}
              renderItem={Item}
              scrollEnabled
              keyExtractor={(item, index) => index.toString()}
         
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Dropdown;
