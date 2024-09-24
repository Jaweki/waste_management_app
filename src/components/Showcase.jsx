import React, { useEffect, useState } from 'react'

const Showcase = () => {
  const [items, setItems] = useState();

  useEffect(() => {
    async function fetchItems() {
      const response = await fetch("http://localhost:4000/refurb")
      const result = await response.json();
      
      if (response.status === 200) {
        setItems(result)
      }
    }

    fetchItems();
  }, [])

  return (
    <>
      
    </>
  )
}

export default Showcase