import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        is_selected: false
    });

    const handleChange = (e) => {
        setNewClothes({
            ...newClothes,
            [e.target.name]: e.target.value
        });
            console.log(newClothes)

    //     if(newClothes.is_favorite === "on") {
    //         setNewClothes({
    //             ...newClothes,
    //             is_favorite: true
    //         });
    //     } else {
    //         setNewClothes({
    //             ...newClothes,
    //             is_favorite: false
    //         });
    //    };
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
         .post(`${API}/closet`, newClothes)
         .then(() => navigate(`/closet`))
         .catch((c) => console.warn("catch, c"));
    };

    return (
        <div className="flex">
            <form 
                onSubmit={handleSubmit}
                className="flex flex-col m-auto w-96 px-20 bg-slate-200"
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

                <label htmlFor="is_favorite" className="py-3">
                    Favorite:
                    <input 
                        type="checkbox" 
                        name="is_favorite" 
                        onChange={handleChange}
                        className="mx-3" 
                    />
                </label>

                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
                <button onClick={() => navigate(`/closet`)}>Cancel</button>
            </form>
                {/* <button className="justify-items-center">Add another item</button> */}
            <div className="float-right">
                {
                    newClothes.img_url ?
                        <img src={newClothes.img_url} alt={newClothes.img_url} />
                        :   <img src="https://via.placeholder.com/150" alt="placeholder" />
                }
                <p>Please review image to be added</p>
            </div>
        </div>
    );
}

export default ClothesNewForm