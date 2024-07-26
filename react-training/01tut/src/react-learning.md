# create react app 
`npx create-react-app 16tut`

# installing react-route
`npm i react-router-dom -S` the s makes it production
# snippet search
ctlre + alt + r pops up 

# start react app 
`npm start`

# everythign is within a root div
# styled components product

# adding styles
- Each component naturally has a class of its name. ex: Header component has a .header class. If you write a .header class css it'll get applied to the Header componentpeopel usualyl create a style sheet for each component. you'll have to import the stylesheet in the component file
- one option inline
```
const Header = () => {
  return (
    // <div>
    //     Header
    // </div>
    <header style={{
        backgroundColor: 'mediumblue',
        color: 'white'
    }}>
        <h1>Groceries List</h1>
    </header>
  )
}

export default Header
```
- other option (inline using object)
```
const Header = () => {
    const headerStyle = {
         backgroundColor: 'royalblue',
        color: 'white'
    };
  return (
    // <div>
    //     Header
    // </div>
    <header style={headerStyle}>
        <h1>Groceries List</h1>
    </header>
  )
}

export default Header
```
# manually adding classes
`render() {
  return <span className="menu navigation-menu">Menu</span>
}`


# preventDefault 
- form: By default, if you have an input of type "submit" in a form then clicking that input (or hitting enter after filling in ANY inputs in the form) will send a post or get request to the server, redirecting the current page to the server's response.



# using method in attrivbutes like on click
```
const Content = () => {
    const handleNameChange = () => {
        const names = ["lets", 'get', 'right'];
        return names[1];
    }

    const handleClick = () =>{
        console.log('You clicked it ');
    }

    const handleClick2 = (name) =>{
        console.log(`${name} was clicked`);
    }

    const handleClick3 = (e) => {
        console.log(e.target.innerText);
    }

  return (
    <main>
        <p onDoubleClick={handleClick}>Hello bro {handleNameChange()}! </p>
        <button onClick={handleClick}>Click It</button>
        {/* this tells interpreter not to immediately invoke but to invoke only on onclick */}
        <button onClick={() => handleClick2('Dave')}>Click It</button>
        {/* this would immediately invoke the method for some reason */}
        <button onClick={handleClick2('Dave')}>Click It</button>
        <button onClick={(e) => handleClick3(e)}>Click It</button>

    </main>
  )
}
```

# state
- not supposed to update the value directly, supposed to use the set functionn
- state goes back to default when browser refreshes
- If you render the same component multiple times, each will get its own state. Click each button separately:
```
export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}
```


the value of the state variable doesn't update even if you change it until after you exit the method.
- whatever value of count is, will be used for every operation so even though its incremented in first setCount to n+ 1. the second call uses the initial value of count (n) so it just rewrites the count variable

```
const Content = () => {
    const [name, setName] = useState('Dave');
    const [count, setCount] = useState(0);

    const handleNameChange = () => {
        const names = ["lets", 'get', 'right'];
        const int = Math.floor(Math.random() * 3);

        //return names[1];
        setName(names[int]);
    }

    const handleClick = () =>{
        // the value of the state variable doesn't update even if you change it until after you exit the method
        setCount(count +1);
        setCount(count +1);
        console.log(count);
    }

```

# lists
file in lists folder


# forms
//disable default behavior that form reloads broswer when submitted
 ` e.preventDefault();`

# useRef
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

 # use effect
 useEffect(() => {
    console.log('track');
    //items is being watched so we can put methods in here that should be fired when state changes
    //the method that changes state cant be in here, that has to fire first which will call this method
    //this will also initialize localStorage since this fire runs on load
    localStorage.setItem('shoppinglist', JSON.stringify(items));

   }, [items]); // whenever something (usually state) in the array changes, the method fires. aka depenecy. wehen empty, the method only runs on load time

# running api server with json file
-one of the turotiral videos in the react slist