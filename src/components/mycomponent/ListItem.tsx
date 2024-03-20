import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const ListItem = ({ item, handleSelect, selected, itemStyle = {} }) => {
  console.log('ITEM RENDER', item?.id)
    return (
        <TouchableOpacity onPress={() => handleSelect(item)}>
        <Text>{item.name}</Text>
        <Text>
          {selected ? "Selected" : "Not selected"}
        </Text>
      </TouchableOpacity>
    )
}

const customComparator = (prevProps, nextProps) => {
  // console.log('item', nextProps.item.id, prevProps.item.id)
  return (nextProps.item.id === prevProps.item.id && nextProps.selected === prevProps.selected)
}

// export default ListItem;
export default React.memo(ListItem,customComparator)