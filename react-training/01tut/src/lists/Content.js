import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const Content = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            checked: true,
            item: "One half pound bag of Cocoa Covered Almonds Unsalted"
        },
        {
            id: 2,
            checked: false,
            item: "Item 2"
        },
        {
            id: 3,
            checked: false,
            item: "Item 3"
        }
    ]);

    const [test, setTest] = useState(55);
    
 
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

    return (
        <main>
            {/* ternaropoy if statement to produce default text if there are no items in the list */}
            {items.length ? (
                <ul>
                    {items.map((item) => (
                        // a key item is used by react to know if the element has been changed
                        <li className="item" key={item.id}>
                            <input
                                type="checkbox"
                                onChange={() => handleCheck(item.id)}
                                checked={item.checked}
                            />
                            <label

                                style={(item.checked) ? { textDecoration: 'line-through' } : null}
                                onDoubleClick={() => handleCheck(item.id)}
                            >{item.item}</label>
                            <FaTrashAlt
                                onClick={() => handleDelete(item.id)}
                                role="button"
                                tabIndex="0"
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
            )}
        </main>
    )
}

export default Content