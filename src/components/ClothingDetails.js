// Purpose: To display the details of a single item in the closet

// DEPENDENCIES
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ClothesEditForm from './ClothesEditForm';

const API = process.env.REACT_APP_API_URL;

// COMPONENT
function ClothingDetails() {

// VARIABLES
    const [clothes, setClothes] = useState({});
    const [editForm, setEditForm] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

// useEffect updates state hook variable with an individual item given the id
    useEffect(() => {
        axios
         .get(`${API}/closet/${id}`)
         .then((res) => setClothes(res.data))
         .catch((c) => console.warn("catch, c"));
    }, []);

// FUNCTIONS

// handleEdit is called when the user clicks the edit buttons
    // const handleEdit = () => {
    //     axios
    //      .put(`${API}/closet/${id}`)
    //      .then((res) => console.log(res))
    //      .catch((c) => console.warn("catch, c"));
    // };

// handleDelete uses the deleteItem function and is called when the user clicks the delete button
    const deleteItem = () => {
        axios
         .delete(`${API}/closet/${id}`)
         .then(() => navigate(`/closet`))
         .catch((c) => console.warn("catch, c"));
    };

    const handleDelete = () => {
        let text = "Are you sure you want to delete?"
        if (window.confirm(text) === true) {
          deleteItem()
        }
    };

// RENDER

    return (
        <>
            <div className='flex'>
                <img
                    src={clothes.img_url}
                    alt={clothes.name}
                    className='w-64 h-64 object-cover'
                />
                {
                    clothes.is_favorite ?
                        <p className='text-2xl font-bold'>Favorite</p> :
                            null
                }
                <div>
                    <h1 className='font-bold'>{clothes.name}</h1>
                    <p>{clothes.brand}</p>
                    <p>
                        <span className='font-bold text-gray-700'>Category: </span>
                        {
                            clothes.category &&
                            clothes.category.charAt(0).toUpperCase()+clothes.category.slice(1)
                        }
                    </p>
                    {
                        clothes.shop_url ? 
                            <Link to={`${clothes.shop_url}`}>Shop Now</Link> :
                                null

                    }
                </div>
                <div className='flex flex-col'>
                    <button onClick={() => setEditForm(true)}>Edit Item</button>
                    <button onClick={handleDelete}>Remove from Closet</button>
                    <button onClick={() => navigate(`/closet`)}>Go Back</button>
                </div>
            </div>
            {
                editForm ?
                    <ClothesEditForm 
                        clothes={clothes} 
                        setClothes={setClothes}
                        setEditForm={setEditForm}
                    /> :
                        null
            }
        </>
    );
}

// EXPORT
export default ClothingDetails;