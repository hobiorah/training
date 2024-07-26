// /import logo from './logo.svg';
import Header from './Header.js';
import Content from './Content.js';
import Footer from './Footer.js';
import {useState} from 'react'
import AddItem from './AddItem.js';


// curly bases tells the interpreter its a javascript expressoin{}
//App component is where we build the page stringing together all our inidvidual components
function App() {
  let what = "hey";
  const [newItem, setNewItem] = useState('sdfsdf');
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

const handleSubmit = (e) => {
  //disable default behavior that form reloads broswer when submitted
  e.preventDefault();
  console.log("submitted");
}

  return (
    <div className="App">
      <Header />
      <AddItem
      newItem= {newItem} setNewItem = {setNewItem} handleSubmit={handleSubmit}
        />
      <Content items= {items} setItems = {setItems} handleCheck= {handleCheck} handleDelete={handleDelete}/>
      <Footer length={items.length}></Footer>

    </div>
  );
}

export default App;
