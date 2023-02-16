import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClothingCard from "./ClothingCard";

const API = process.env.REACT_APP_API_URL;

function ClothingCards({ isFavorite }) {
    // State for rendering different clothing cards based on filter/search
    const [allClothes, setAllClothes] = useState([]);
    const [shownClothes, setShownClothes] = useState([]);
    const [filteredClothes, setFilteredClothes] = useState([]);
    const [search, setSearch] = useState("");
    const [createOutfit, setCreateOutfit] = useState(false); 
    
    // State for toggling selected clothing items and corresponding styling
    const [isSelected, setIsSelected] = useState([]);
    const [style, setStyle] = useState("");
    const unselectedStyle = "border-none"
    const selectedStyle = "border-2 border-gray-500 drop-shadow-lg"

    // State for saving outfit details
    const navigate = useNavigate();
    const [outfitName, setOutfitName] = useState("");
    const [outfit, setOutfit] = useState({
        name: "",
        img1_url: "",
        img2_url: "",
        img3_url: "",
        img4_url: "",
        img5_url: "",
        img6_url: ""
    });

    useEffect(() => {
        axios
        .get(`${API}/closet`)
        .then((res) => {
            setAllClothes(res.data);
            setShownClothes(res.data);
            setFilteredClothes(res.data)
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
        handleSearch(input)
    }
    
    const handleSearch = (input) => {
        input === "" ? setShownClothes(filteredClothes) 
        : setShownClothes(filteredClothes.filter((item) => {
            return item.name.toLowerCase().includes(input.toLowerCase()) || item.brand.toLowerCase().includes(input.toLowerCase())
        }))
    }

    const handleCreateOutfit = () => {
        setCreateOutfit(true)
    }

    const handleRemove = (item) => {
        setIsSelected(isSelected.filter((each) => {
            return each !== item
        }))
    }

    const handleOutfitName = (e) => {
        setOutfit({...outfit, name: e.target.value})
    }

    const handleSaveOutfit = () => {
        const newOutfit = {...outfit}
        isSelected.map((item, index) => {
            newOutfit[`img${index + 1}_url`] = item.img_url
        })
        
        if(outfit.name && isSelected.length){
            axios
             .post(`${API}/outfits`, newOutfit)
             .then(() => navigate(`/outfits`))
             .catch((c) => console.warn("catch, c"));
                setCreateOutfit(false)
                setIsSelected([])
        }
    };

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
                        required
                    />
                    <button onClick={() => setSearch("")}>Clear Search</button>
                </label>
                {
                    createOutfit ? (
                        <button
                            onClick={() => {
                                setCreateOutfit(false)
                                setIsSelected([])
                            }}
                            className={'bg-slate-200 border border-black border-solid rounded px-2 ml-3 ' + `${createOutfit ? "inline" : "hidden"}`}
                        >
                            Cancel
                        </button>
                    ) : (
                        <button
                            onClick={handleCreateOutfit}
                            className="bg-slate-200 border border-black border-solid rounded px-2"
                        >
                            Create Outfit
                        </button>
                    )
                }  
            </div>
            <div className="flex">
                <div className='flex flex-wrap my-8 float left'>
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
                            if(isSelected.includes(item)){ 
                            return (
                                <ClothingCard 
                                    key={item.id}
                                    id={item.id}
                                    clothes={item}
                                    createOutfit={createOutfit}
                                    isSelected={isSelected}
                                    setIsSelected={setIsSelected}
                                    style={selectedStyle}
                                    setStyle={setStyle}
                                />
                            )} else {
                                return (
                                    <ClothingCard 
                                        key={item.id}
                                        id={item.id}
                                        clothes={item}
                                        createOutfit={createOutfit}
                                        isSelected={isSelected}
                                        setIsSelected={setIsSelected}
                                        style={unselectedStyle}
                                        setStyle={setStyle}
                                    />
                                )
                            }
                        }) 
                    }
                </div>
                <aside>
                    <div className={"flex flex-col w-96 right-0 border border-solid border-black mr-10 h-3/4 overflow-y-auto" + `${createOutfit ? "" : " hidden"}`}>
                    <p
                        className={createOutfit ? "text-center py-5 bg-blue-100 sticky top-0" : "hidden"}
                     >
                        Select items of clothing you would like to add
                    </p>
                    {
                        isSelected.length > 0 ? (
                            <>
                                <div className="flex justify-center sticky top-10 py-5 bg-white">
                                    <input 
                                        type="text" 
                                        name="name" 
                                        placeholder="Name your outfit"
                                        className="px-2 my-2 bg-gray-100"
                                        onChange={handleOutfitName}
                                        />
                                    <button
                                        onClick={handleSaveOutfit}
                                        className="bg-blue-800 text-white border border-blue-800 border-solid rounded px-2 mt-1 h-7 ml-3"
                                        >
                                        Submit
                                    </button>
                                </div>
                                <p className="text-center pb-5">
                                    <span className="text-blue-800 underline">{isSelected.length} </span> items selected
                                </p>
                            </>
                        ) : null
                    }
                        {
                            isSelected.length ?
                            isSelected.map((item) => {
                                return (
                                    <div 
                                        key={item.id}
                                        className='flex items-center justify-center pb-2 float-right'
                                    >
                                            <img 
                                                src={item.img_url} 
                                                alt={item.name} 
                                                className='w-52 h-52 object-scale-down'
                                                />
                                            <button 
                                               onClick={() => handleRemove(item)}
                                                className='bg-red-400 text-white border border-red-500 border-solid rounded px-1 ml-3'
                                            >
                                                X
                                            </button>
                                        </div>
                                    )
                                }
                            )
                                : null
                        }
                        </div>
                </aside>
            </div>
        </>
    );
}

export default ClothingCards;