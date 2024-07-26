import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
//use effect runs at every render - can specify what itll watch for
import { useState, useEffect } from 'react';

function App() {
  const API_URL = 'http://localhost:3500/items';
  //get shopping list from local storage. if doesnt exist we'll default to empty array
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);
  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

   useEffect(() => {
    console.log('track');
    //items is being watched so we can put methods in here that should be fired when state changes
    //the method that changes state cant be in here, that has to fire first which will call this method
    //this will also initialize localStorage since this fire runs on load
    localStorage.setItem('shoppinglist', JSON.stringify(items));

   }, [items]); // whenever something (usually state) in the array changes, the method fires. aka depenecy. wehen empty, the method only runs on load time

  const setAndSavesetItemsItems = (newItems) => {
    setItems(newItems);
   
  }

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <Content
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;