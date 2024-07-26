import { useState } from 'react';
import LineItem from './LineItem';
//import {useState} from 'react'

const Content = ({ items, setItems, handleCheck, handleDelete}) => {
   

    const [test, setTest] = useState(55);
    
 /*
    const handleCheck = (id) => {
        const listItems = items.map((item) => 
            {
                //go through all the list items and find the one we clicked. flip the checked value
                //we can find one we clicked because we pass the id value of the element we clicked
                //the spread takes whats in item and uses that to constrcut a copy object and the checked after overwrites the
                //item object if its different
             return    item.id === id ? { ...item, checked: !item.checked } : item
            });
        setItems(listItems);
        localStorage.setItem('shoppinglist', JSON.stringify(listItems));
    }

    const handleDelete = (id) => {
        const listItems = items.filter((item) => item.id !== id);
        setItems(listItems);
        localStorage.setItem('shoppinglist', JSON.stringify(listItems));
    }
        */

    return (
        <>
            {/* ternaropoy if statement to produce default text if there are no items in the list */}
            {items.length ? (
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
            ) : (
                <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
            )}
        </>
    )
}

export default Content