import React, { useState } from 'react'

const ratings = [1, 2, 3, 4, 5]

const InputForm = () => {
    const [category, setCategory] = useState();
    const [rating, setRating] = useState(0);
    const [refurb, setRefurb] = useState(0);

    const [file, setFile] = useState();
    const [imageData, setImageData] = useState();
    const [dropOffPoint, setDropOffPoint] = useState();

    const handleFileChange = (e) => {
        const imageFile = e.target.files[0]
        setFile(imageFile)
        setImageData(URL.createObjectURL(imageFile))
    }

    const handleSubmit = async () => {
        if (category && rating && refurb && file && dropOffPoint) {
            // submit the file
            const payload = new FormData()

            payload.append("category", category)
            payload.append("rating", rating)
            payload.append("refurb", refurb)
            payload.append("image", file)
            payload.append("location", dropOffPoint)

            console.log("payload:", payload)
            const result = await fetch("http://localhost:4000/new/waste", {
                method: "POST",
                body: payload
            });

            const status = result.status 

            if (status === 201) {
                alert("New item created successfully.")
            } else {
                alert("Something went wrong.")
            }

        } else {
            alert("Please provide complete information.")
        }
    }


  return (
    <div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", justifyItems: "center", alignItems: "center", padding: "10px" }}>
    <form  style={{ minWidth: "50%", padding: "20px", border: "1px solid black", display: "flex", flexDirection: "column", gap: "4px" }}>
        {/* 1. category */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <span>What category is the waste: </span>
        <select onChange={(e) => setCategory(e.target.value)}>
            <option>--select a category--</option>
            <option value="electronic">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="plastic">Plastic</option>
            <option value="metal">Metal</option>
            <option value="furniture">Furniture</option>
            <option value="utensil">Utensil</option>
        </select>
        </div>
        {/* 2. reusability rating */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <span>How re-usable is the Item: </span> 
        <div style={{ display: "flex", flexDirection: "row", gap: "5px" }} >
            {ratings.map((value, index) => (
                <div key={`${value}-${index}`} style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                    <button type='button' onClick={() => { setRating(value) }} style={{ width: "20px", height: "20px", padding: "1px", border: "1px solid black", borderRadius: "50%", cursor: "pointer" }} 
                    className={`${rating >= value ? "illuminate-btn" : ""}`} />
                    <span>{value}</span>
                </div>
            ))}
        </div>
        </div>
        {/* 3. refublishing rating */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <span>How refurbishable is the Item: </span> 
        <div style={{ display: "flex", flexDirection: "row", gap: "5px" }} >
            {ratings.map((value, index) => (
                <div key={`${value}-${index}`} style={{ display: "flex", flexDirection: "column", alignItems: "center" }} >
                    <button type='button' onClick={() => { setRefurb(value) }} style={{ width: "20px", height: "20px", padding: "1px", border: "1px solid black", borderRadius: "50%", cursor: "pointer" }} 
                    className={`${refurb >= value ? "illuminate-btn" : ""}`} />
                    <span>{value}</span>
                </div>
            ))}
        </div>
        </div>
        {/* 4. uploading image */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px"}}>
        <input type='file' onChange={handleFileChange} />
        <img src={imageData} style={{ maxWidth: "150px", maxHeight: "200px" }} />
        </div>
        {/* 5. input dropoff point */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <span>Provide a dropoff point: </span> 
            <input type='text' placeholder='Enter a location' onChange={(e) => setDropOffPoint(e.target.value)} value={dropOffPoint} />
        </div>
        {/* 6. submit */}
        <button type='button' onClick={handleSubmit} style={{ width: "150px", padding: "5px", backgroundColor: "green", color: "white", cursor: "pointer", alignSelf: "center" }}>
            submit
        </button>
    </form>
    </div>
  )
}

export default InputForm