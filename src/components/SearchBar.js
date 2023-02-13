import axios from 'axios';
import { useEffect, useState } from 'react'

const API = process.env.REACT_APP_API_URL;

function SearchBar() {

    const [clothes, setClothes] = useState({})
    const [filteredClothes, setFilteredClothes] = useState([])
    const [search, setSearch] = useState("")

    useEffect (() => {
        axios
         .get(`${API}/closet`)
         .then((res) => {
             setClothes(res.data)
         })
         .catch((c) => console.warn("catch, c"));  
    })

    const handleFilter = (e) => {
        setFilteredClothes(clothes.filter((item) => {
            return item.category === e.target.value
        }))
    }


    const handleTextChange = (e) => {
        setSearch(e.target.value)

        if(search){

        }

        setSearch({
            ...clothes,
            [e.target.name]: e.target.value
        })
        // console.log(clothes)
    }


    return (
        <div className='pb-5'>
            <label className=''>
                Choose a category:
            </label>
            <select onChange={handleFilter} className='text-center'>
                <option value="all">All</option>
                <option value="tops">Tops</option>
                <option value="bottoms">Bottoms</option>
                <option value="dresses">Dresse</option>
                <option value="shoes">Shoes</option>
                <option value="outer_wear">Outer Wear</option>
                <option value="hats">Hats</option>
                <option value="accessories">Accessories</option>
                <option value="other">Other</option>
                <option value="favorites">Favorites</option>
            </select>
            <label className='px-20'>
                Search:
                <input type="text" onChange={handleTextChange}/>
            </label>
        
        </div>
    );
}

export default SearchBar;