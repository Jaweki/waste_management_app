import React from 'react'

const Nav = () => {
  return (
    <nav style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "10px", borderBottom: "2px solid black" }}>
      {/* logo */}
      <a href='/' style={{ fontSize: "30px", fontWeight: "bold" }}>Eco-Recyco</a>
      {/* search */}
      <input type='text' placeholder='search in app...' style={{ padding: "5px" }} />
      {/* submit new button */}
      <div style={{ display: "flex", flexDirection: "row", gap: "10px"}}>
      <a href='/refub'>Refub</a>
      <a href='/non-refub'>Non Refub</a>
      <a href='/new'>New Submit</a>
      </div>
    </nav>
  )
}

export default Nav