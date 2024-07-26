import React from 'react'

const ItemList = () => {
  return (
    <ul>
        {items.map((item) => (
            // a key item is used by react to know if the element has been changed
            <LineItem
                    //key goes here instead of in the lineitem class cause react is looking for the immediate element in the list to find the key
                key={item.id}
                item = {item}
                handleDelete = {handleDelete}
                handleCheck = {handleCheck}
            />
        ))}
    </ul>
  )
}

export default ItemList