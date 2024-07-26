import React from 'react'
/*
const Header = (propertiesGivenToComponentWhenDeclared) => {

  return (
    // <div>
    //     Header
    // </div>
    <header >
        <h1>{propertiesGivenToComponentWhenDeclared.title}</h1>
    </header>
  )
}
*/

const Header = ({title}) => {
  

  return (
    // <div>
    //     Header
    // </div>
    <header >
        <h1>{title}</h1>
    </header>
  )
}

Header.defaultProps = {
  title: "default titsdfddle"
}



export default Header