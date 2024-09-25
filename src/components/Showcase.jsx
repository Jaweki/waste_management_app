import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';

const Showcase = () => {
  const [items, setItems] = useState([]);
  const [isBidding, setIsBidding] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);
  const [bidedItemId, setBidedItemId] = useState(undefined);

  const location = useLocation();

  useEffect(() => {
    console.log("the current path: ", location.pathname);
  }, [location]);


  useEffect(() => {
    async function fetchItems() {
      const response = await fetch(`http://localhost:4000${location.pathname}`)
      const result = await response.json();
      
      if (response.status === 200) {
        const mappedCategories = new Map();

        result.forEach((item) => {
          if (mappedCategories.has(item.category)) {
            mappedCategories.set(item.category, [...mappedCategories.get(item.category), item])
          } else {
            mappedCategories.set(item.category, [item])
          }
        })
        
        const categoriedItems = []
        for (const [key, value] of mappedCategories.entries()) {
          categoriedItems.push({
            category: key,
            items: value
          })
        }

        setItems(categoriedItems);
      }
    }

    fetchItems();
  }, [location])

  return (
    <main style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "10px", position: "relative" }}>
      {
        isBidding && <div style={{ position: "absolute", top: "0", width: "100%", height: "100%", backgroundColor: "black", opacity: "50%", display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center", padding: "30px", zIndex: 100 }}>
          <div style={{ backgroundColor: "white", border:"none", borderRadius: "3%", display: "flex", flexDirection: "column", gap: "4px", padding: "4px", zIndex: 999, color: "black", position: "relative" }}>
            <button onClick={() => {setIsBidding(false)}} style={{ top: "3px",  right: "3px", position: "absolute", padding: "2px" }}>x</button>
            <span style={{ color: "black", marginTop: "20px" }}>Enter your bid amount: </span>
            <div style={{ display: "flex ", flexDirection: "row", gap: "5px"}}>
            <div style={{ position: "relative"}}>
              <span style={{ position: "absolute", top: 0, left: "2px", padding: "5px", }}>Ksh.</span>
              <input type='number' value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} placeholder='0' style={{ padding: "5px", paddingLeft: "40px" }} />
              </div>
            <button onClick={() => {setIsBidding(false)}} style={{ border: "none", backgroundColor: "green", padding: "5px", color: 'white' }}>
              Confirm
            </button>
            </div>

            <span style={{ fontFamily: "monospace", color: "black"  }}>Note: <span style={{ fontStyle: "italic", fontSize: "15px" }}>The heighest bider takes away</span></span>
          </div>
        </div>
      }
      {!items.length && <span style={{ alignSelf: "center", fontFamily: "monospace", fontSize: "40px", fontWeight: "bold" }}> There's no waste to recycle </span>}
      {items?.map((group) => (
        <div key={`${group.items.length}-${group.category}`} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "4px", overflow: "hidden", paddingX: "3px" }}>
          <span style={{ fontWeight: "bold", fontSize: "30px" }}>{String(group.category).toLocaleUpperCase()}</span>
          <div style={{width: "100%", display: "flex", flexDirection: "row", gap: "4px", overflow: "hidden", overflowX: "auto", paddingLeft: "10px" }}>
            {
              group?.items?.map((item) => (
                <div key={`${group.category}-${group.items.length}-${item.length}`} style={{ width: "200px", height: "250px", display: "flex", flexDirection: "column", shapeOutside: "10px", border: "1px solid black", borderRadius: "2%" }}>
                  <img src={item?.imageUrl || ""} style={{ width: "100%", height: "50%", borderBottom: "1px solid black", borderRadius: "2%"}} />
                  <div style={{ display: "flex", flexDirection: "column", padding: "5px", gap: "3px" }}>
                    <span>Reusability: {item?.reusability} / 5</span>
                    <span>Refurbishable: {item?.refurb} / 5</span>
                    <span>Current location: {item?.location}</span>
                    <button onClick={() => {setIsBidding(true); setBidedItemId(item?.id)}} style={{ width: "90%", alignSelf: "center", padding: "8px", backgroundColor: "green", color: "white", border: "none", borderRadius: "4%" }} hidden={location.pathname === "/non-refurb"} >Place a Bid</button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      ))}
    </main>
  )
}

export default Showcase