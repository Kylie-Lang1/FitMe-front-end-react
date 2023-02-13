import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
const API = process.env.REACT_APP_API_URL;

function ClothesEditForm({ clothes, setClothes, setEditForm}) {
    const navigate = useNavigate();
    const { id } = useParams();

    const handleChange = (e) => {
        setClothes({
            ...clothes,
            [e.target.name]: e.target.value
        });
    };

    const handleFavorite = (e) => {
        setClothes({
            ...clothes,
            is_favorite: !clothes.is_favorite
        });
    };

    const handleRadio = (e) => {
        if (e.target.value === "true") {
            setClothes({
                ...clothes,
                [e.target.name]: true
            })
        } else if (e.target.value === "false") {
            setClothes({
                ...clothes,
                [e.target.name]: false
            })
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
         .put(`${API}/closet/${id}`, clothes)
         .then(() => {
            navigate(`/closet/${id}`)
            setEditForm(false)
         })
         .catch((c) => console.warn("catch, c"));
    };

    return (
        <div className='w-full fixed top-28 left-0 flex justify-center'>
            <div className="flex justify-center space-x-10 pr-20 bg-slate-200">
                <form 
                    onSubmit={handleSubmit}
                    className="flex flex-col w-96 px-20 py-10"
                >
                    <label htmlFor="name">
                        Name:
                    </label>
                    <input 
                        type="text" 
                        name="name"
                        value={clothes.name} 
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="brand">
                        Brand:
                    </label>
                    <input 
                        type="text" 
                        name="brand" 
                        value={clothes.brand}
                        onChange={handleChange}
                    />

                    <label htmlFor="category">
                        Category:
                    </label>
                    <select 
                        name="category" 
                        value={clothes.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">--Please select one--</option>
                        <option value="top">Top</option>
                        <option value="bottom">Bottom</option>
                        <option value="dress">Dress</option>
                        <option value="Shoes">Shoes</option>
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
                        value={clothes.img_url}
                        onChange={handleChange}
                        required 
                    />

                    <label htmlFor="shop_url">
                        Shop URL:
                    </label>
                    <input 
                        type="text" 
                        name="shop_url" 
                        value={clothes.shop_url}
                        onChange={handleChange}
                    />

                    <label htmlFor="is_owned">
                        Owned by Me:
                        <label>
                            <input
                                type="radio"
                                name="is_owned"
                                value="true"
                                checked={clothes.is_owned ? true : false}
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
                                checked={clothes.is_owned ? false : true}
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
                            className="mx-3" 
                            checked={
                                clothes.is_favorite ? true : false
                            }
                            onClick={handleFavorite}
                        />
                    </label>

                    <button type="submit">Submit</button>
                    <button onClick={() => setEditForm(false)}>Cancel</button>
                </form>
                {/* <button className="justify-items-center">Add another item</button> */}
                <div>
                    <p className='text-center py-10'>Please review image to be added</p>
                    {
                        clothes.img_url ?
                            <img 
                                src={clothes.img_url} 
                                alt={clothes.img_url} 
                                className="w-64 h-64 object-cover"
                            />
                            :   <img src="https://via.placeholder.com/150" alt="placeholder" />
                    }
                </div>
           </div>
        </div>
    );
}

export default ClothesEditForm;