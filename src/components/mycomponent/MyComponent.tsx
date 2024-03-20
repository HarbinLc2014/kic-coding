  // Bug
  // ✔ inputRefClear,(possibly undefined issue) --- if we call handleClear outside when this component has already been unmounted...(optional chain)
  // ✔ handleSelect duplicated items --- check by id. If existing then unselect it and remove it from state. If not then add it to state(useReducer could be a better option) p.s. strictly speack its not a bug... for now. but who knows

  // Design Perspective
  // ✔ missing styling props * --- add styling props that can be passed as a parameter to make component more reusable
  // ✔ list item better be separated from search input * --- make code more reusable and readable
      //optional:
      // useReducer --- can be considerably cleaner if the page gonna have a lot of 'useState'
      // Customizing Hook for select items feature --- build a useSelectList hook HOC for general use

  // Performance Perspective
  // ✔ Flashlist rather than Flatlist * --- use shopify flashlist and compare performance through perf monitor（was gonna use flipper with expo but no longer being maintained and too much setup）
      //  ALTERNATIVE WAY: onEndReached initialNumtoRender lazyload pagination, otherwise onItemLayout
  // ✔ useCallBack, useMemo, React.memo, memoizedComponent（not a big issue if VDOM->DOM repaint isnt called）-- keep select/unselect something --- shallow comparison useMemo
  // ✔ debounce, --- people can hit keyboard button really quickly and thats not a good thing for this component when the data is a large list


  // Code Quality
  // ✔ Typescript declaration * --- add type definition for props and state variables
  // ✔ useEffect uneccessary for dataSource. just calculate inside the body of component without using state

  // Common Sense Discussion...
  // loading state, empty state, error state --- what happens if datasource is an invalid output?
  // select -> unselect
  // onEndEditing
  // capitalize search(uppercase, lowercase, search algorithm)
  // assume more complex fetch logic inside search: useTransition, useDeferredValue?



import React, { useState, useEffect, useRef, useMemo, useDeferredValue } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  ViewStyle,
  Dimensions,
} from "react-native";

import ListItem from './ListItem'
import { Item } from "../../types/search";
import { FlashList } from "@shopify/flash-list";
import { useDebouncedValue } from "@mantine/hooks";


const MyComponent = ({ data = [], wrapperStyle = {}, inputStyle = {}, textStyle = {} }: { data: Item[], wrapperStyle?: ViewStyle, inputStyle?: ViewStyle, textStyle?: ViewStyle }) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const inputRef = useRef<TextInput>(null);
  const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 500)
  // to prevent detaSource list from being recalculated when neither search term nor data changes, use useMemo
  const dataSource = useMemo(()=>data.filter((item: Item) => item.name.includes(debouncedSearchTerm)),[data, debouncedSearchTerm, selectedItems])

  const handleSelect = (item: Item) => {
    for(let i of selectedItems){
      if(i.id === item.id){
        // to unselect it instead of doing nothing
        const newItems = selectedItems.filter(e=>e.id!==i.id)
        setSelectedItems(newItems)
        return
      }
    }
    setSelectedItems((currentSelectedItems) => [...currentSelectedItems, item]);
  };

  const handleClear = () => {
    if(inputRef?.current?.clear){
      inputRef.current.clear();
    }
  };

  return (
    <View style={wrapperStyle}>
      <TextInput
        ref={inputRef}
        onChangeText={(e)=>{
          setSearchTerm(e)
        }}
        value={searchTerm}
        // style={inputStyle}
      />
      <TouchableOpacity onPress={handleClear}>
        <Text>Clear</Text>
      </TouchableOpacity>
      <View style={{ height: 500, width: Dimensions.get("screen").width }}>
      <FlashList
      // flashlist vs flatlist. FPS, UI JS load
        data={dataSource}
        keyExtractor={(item) => item.id}
        estimatedItemSize={15}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            handleSelect={handleSelect}
            selected={selectedItems.includes(item)}
            itemStyle={{}}
          />
        )}
      />
            {/* <FlatList
        data={dataSource}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            handleSelect={handleSelect}
            selected={selectedItems.includes(item)}
            itemStyle={{}}
          />
        )}
      /> */}
      </View>
    </View>
  );
};

export default MyComponent;