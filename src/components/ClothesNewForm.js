import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function ClothesNewForm() {
    const navigate = useNavigate();

    const [newClothes, setNewClothes] = useState({
        name: "",
        brand: "",
        category: "",
        img_url: "",
        shop_url: "",
        is_favorite: false,
        is_owned: false,
        is_selected: false
    });

    const handleChange = (e) => {
        setNewClothes({
            ...newClothes,
            [e.target.name]: e.target.value
        });
    };

    const handleRadio = (e) => {
        if (e.target.value === "true") {
            setNewClothes({
                ...newClothes,
                [e.target.name]: true
            })
        } else if (e.target.value === "false") {
            setNewClothes({
                ...newClothes,
                [e.target.name]: false
            })
        }
    };

    const handleFavorite = (e) => {
        setNewClothes({
            ...newClothes,
            is_favorite: !newClothes.is_favorite
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
         .post(`${API}/closet`, newClothes)
         .then(() => navigate(`/closet`))
         .catch((c) => console.warn("catch, c"));
    };

    return (
        <div className="flex justify-center space-x-10">
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col w-96 px-20 py-10 bg-slate-200 rounded-lg"
            >
                <label htmlFor="name">
                    Name:
                </label>
                <input 
                    type="text" 
                    name="name" 
                    onChange={handleChange}
                    required
                />

                <label htmlFor="brand">
                    Brand:
                </label>
                <input 
                    type="text" 
                    name="brand" 
                    onChange={handleChange}
                />

                <label htmlFor="category">
                    Category:
                </label>
                <select 
                    name="category" 
                    onChange={handleChange}
                    required
                >
                    <option value="">--Please select one--</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                    <option value="dress">Dress</option>
                    <option value="shoes">Shoes</option>
                    <option value="outer_wear">Outer Wear</option>
                    <option value="hat">Hat</option>
                    <option value="accessory">Accessory</option>
                    <option value="other">Other</option>
                </select>

                <label htmlFor="img_url">
                    Image URL:
                </label>
                <input 
                    type="text" 
                    name="img_url" 
                    onChange={handleChange}
                    required 
                />

                <label htmlFor="shop_url">
                    Shop URL:
                </label>
                <input 
                    type="text" 
                    name="shop_url" 
                    onChange={handleChange}
                />

                <label htmlFor="is_owned">
                    Owned by Me:
                    <label>
                        <input
                            type="radio"
                            name="is_owned"
                            value="true"
                            onChange={handleRadio}
                            className="ml-4 mr-1"
                            required
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="is_owned"
                            value="false"
                            onChange={handleRadio}
                            className="ml-4 mr-1"
                            required
                        />
                        No
                    </label>
                </label>

                <label htmlFor="is_favorite" className="py-3">
                    Favorite:
                    <input 
                        type="checkbox" 
                        name="is_favorite" 
                        onClick={handleFavorite}
                        className="mx-3" 
                    />
                </label>

                <button 
                    type="submit"
                    className="bg-blue-600 text-white border border-blue-800 border-solid rounded px-2 mt-1 h-7 ml-3 "
                >
                    Submit
                </button>
                <button 
                    type="reset"
                    className="bg-gray-500 text-white border border-blue-800 border-solid rounded px-2 mt-1 h-7 ml-3 "
                >
                    Reset
                </button>
                <button 
                    onClick={() => navigate(`/closet`)}
                    className="bg-red-400 text-white border border-blue-800 border-solid rounded px-2 mt-1 h-7 ml-3 "
                >
                    Cancel
                </button>
            </form>
                {/* <button className="justify-items-center">Add another item</button> */}
            <div className="">
                <p className="my-5">Please review image to be added</p>
                {
                    newClothes.img_url ?
                        <img 
                            src={newClothes.img_url} 
                            alt={newClothes.img_url} 
                            className="w-64 h-80 object-cover"
                        /> :
                            <img src="https://via.placeholder.com/250" alt="placeholder" />
                }
            </div>
        </div>
    );
}

export default ClothesNewForm