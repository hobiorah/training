import { FaPlus } from 'react-icons/fa'; //importing an icon
import { useRef } from 'react';

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
    const inputRef = useRef();

    return (
        <form className='addForm' onSubmit={handleSubmit}>
            <label htmlFor='addItem'>Add Item</label>
            <input
                autoFocus
                //ref is a way to have access to the javacript object of the element. we can then make function calls on the element
                ref={inputRef}
                id='addItem'
                type='text'
                placeholder='Add Item'
                required
                // set value to what the state variable is
                value={newItem}
                // update state variable
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button
                type='submit'
                aria-label='Add Item'
                // use the javacript object that repreents the element to set focus on that element
                onClick={() => inputRef.current.focus()}
            >
                {/*  using an icon as the button(slick the button text) */}
                <FaPlus />  
            </button>
        </form>
    )
}

export default AddItem