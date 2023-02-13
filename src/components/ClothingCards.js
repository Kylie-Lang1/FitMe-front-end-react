import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClothingCard from "./ClothingCard";

const API = process.env.REACT_APP_API_URL;

function ClothingCards() {
    const [allClothes, setAllClothes] = useState([]);
    const [shownClothes, setShownClothes] = useState([]);
    const [filteredClothes, setFilteredClothes] = useState([])
    const [search, setSearch] = useState("")    

    useEffect(() => {
        axios
        .get(`${API}/closet`)
        .then((res) => {
            setAllClothes(res.data);
            setShownClothes(res.data);
            setFilteredClothes(res.data)
            console.log(res.data)
        })
        .catch((c) => console.warn("catch, c"));
    }, []);

    const handleFilter = (e) => {
        if(e.target.value === "all"){
            setShownClothes(allClothes)
            setFilteredClothes(allClothes)
        } else if (e.target.value === "favorites"){
            const favoriteClothes = allClothes.filter((item) => {
                return item.is_favorite === true
            })
            setShownClothes(favoriteClothes)
            setFilteredClothes(favoriteClothes)
        } else{
            const selectedClothes = allClothes.filter((item) => {
                return item.category === e.target.value
            })
            setShownClothes(selectedClothes)
            setFilteredClothes(selectedClothes)
        }
        setSearch("")
    }

    const handleTextChange = (e) => {
        setSearch(e.target.value)
        const input = e.target.value;
        console.log("typed: " + e.target.value)
        handleSearch(input)
        console.log(shownClothes)
    }
    
    const handleSearch = (input) => {
        console.log("searched: " + input)

        input === "" ? setShownClothes(filteredClothes) 
        : setShownClothes(filteredClothes.filter((item) => {
            return item.name.toLowerCase().includes(input.toLowerCase()) || item.brand.toLowerCase().includes(input.toLowerCase())
        }))
    }

    return (
        <>
            <div className='pb-5'>
                <label>
                    Choose a category:
                </label>
                <select onChange={handleFilter} className='text-center border-black'>
                    <option value="all">All</option>
                    <option value="top">Tops</option>
                    <option value="bottom">Bottoms</option>
                    <option value="dress">Dresses</option>
                    <option value="shoes">Shoes</option>
                    <option value="outer_wear">Outer Wear</option>
                    <option value="hat">Hats</option>
                    <option value="accessory">Accessories</option>
                    <option value="other">Other</option>
                    <option value="favorites">Favorites</option>
                </select>
                <label className='px-20'>
                    Search:
                    <input 
                        type="text" 
                        value={search}
                        onChange={handleTextChange}
                        className='border-blue-800 border-solid border rounded-md px-2 mx-2'
                    />
                    <button onClick={() => setSearch("")}>Clear Search</button>
                </label>
            </div>
                <div className='flex flex-wrap'>
                    <div className="w-64 h-64 bg-gray-300 px-20 mx-10 mb-10">
                        <Link to='/closet/new'>
                            <div>
                                <span>+</span>
                                <p>Add New Item</p>
                            </div>
                        </Link>
                    </div>
                    {
                        shownClothes &&
                        shownClothes.map((item) => {
                            return (
                                <Link to={`/closet/${item.id}`}>
                                    <ClothingCard 
                                        key={item.id}
                                        id={item.id}
                                        clothes={item}                                        
                                    />
                                </Link>
                            )
                        }) 
                    }
                </div>
        </>
    );
}

export default ClothingCards;