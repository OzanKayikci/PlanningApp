import React, { ComponentType, useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity,Dimensions, ScrollView } from "react-native";

import { styles } from "./dropDown.styles";
import { FlatList } from "react-native-gesture-handler";
import { listColors } from "../../constants/Colors";

const { width,height } = Dimensions.get("window");

interface DropdownProps {
  options: string[];
  SecondElement?: ComponentType<any>;
  backgroundColor?: string;
  headerColor?: string;
  itemColor?: string;
  type: string;
  value: string;
  isopen: React.Dispatch<React.SetStateAction<string>>;

  action: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  SecondElement,
  backgroundColor,
  headerColor,
  itemColor,
  type,
  value = "",
  isopen,

  action,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(value);
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    action(option);

    setShowOptions(false);
    isopen(!showOptions ? type:"")
  };

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

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
          {SecondElement && <SecondElement item={item} />}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[styles.dropdownContainer,{height:showOptions ? "100%":height, position:"absolute", width:"100%",top:25}]}>
      <TouchableOpacity
        style={[
          styles.dropdownHeader,
          { backgroundColor: headerColor ? headerColor : styles.dropdownHeader.backgroundColor },
        ]}
        onPress={() =>{setShowOptions(!showOptions),isopen(!showOptions ? type:"")}}
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
              nestedScrollEnabled={true}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default Dropdown;
