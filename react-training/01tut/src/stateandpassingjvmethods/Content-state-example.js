import React from 'react'
import { useState } from 'react'


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

    const handleClick2 = (name) =>{
        console.log(`${name} was clicked`);
    }

    const handleClick3 = (e) => {
        console.log(e.target.innerText);
    }

  return (
    <main>
        <p onDoubleClick={handleClick}>
            Hello bro {name}! 
        </p>
        <button onClick={handleNameChange}>Change Name</button>

        <button onClick={handleClick}>Click It</button>
        {/* this tells interpreter not to immediately invoke but to invoke only on onclick */}
        {/* <button onClick={() => handleClick2('Dave')}>Click It</button> */}


        {/* this would immediately invoke the method for some reason */}
        <button onClick={handleClick2('Dave')}>Click It</button>
        <button onClick={(e) => handleClick3(e)}>Click It</button>

    </main>
  )
}

export default Content