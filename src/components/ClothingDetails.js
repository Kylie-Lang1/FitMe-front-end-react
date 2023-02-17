// Purpose: To display the details of a single item in the closet

// DEPENDENCIES
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ClothesEditForm from './ClothesEditForm';
import HeartSolid from '../assets/SolidHeart.png';
import HeartOutline from '../assets/HeartOutline.png';

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
    }, [id]);

// FUNCTIONS

// handleFavorite updates the clohtes state hook and uses updateFavorite to make a put request to update the API
    const handleFavorite = () => {
        setClothes({
            ...clothes,
            is_favorite: !clothes.is_favorite
        });
        updateFavorite();
    };

    const updateFavorite = () => {
        axios
         .put(`${API}/closet/${id}`, clothes)  
         .then(() => navigate(`/closet/${id}`))
         .catch((c) => console.warn("catch, c"));
    };

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
            <div className='flex max-w-full justify-center my-10'>
                <img
                    src={clothes.img_url}
                    alt={clothes.name}
                    className='w-64 h-80 object-cover'
                />
                <div className='w-96 pl-10 pt-8'>
                    <h1 className='font-bold text-2xl'>{clothes.name}</h1>
                    {
                        clothes.brand ? (
                            <p className='text-xl text-gray-500 pb-28'>
                                {clothes.brand} 
                                <span className='px-2'> | </span>
                                {
                                    clothes.category &&
                                    clothes.category.charAt(0).toUpperCase()+clothes.category.slice(1)
                                }
                            </p>
                        ) : (
                            <p className='text-xl text-gray-500 pb-28'>
                                {
                                    clothes.category &&
                                    clothes.category.charAt(0).toUpperCase()+clothes.category.slice(1)
                                }
                            </p>
                        )
                    }
                    {
                        clothes.is_owned ?
                            <p className='text-l'>Already owned by me</p> :
                                <p className='text-l'>I don't have this yet!</p>
                    }
                    {
                        clothes.shop_url ? 
                            <Link 
                                to={`${clothes.shop_url}`}
                                className='underline'
                            >
                                Shop Now
                            </Link> :
                                null

                    }
                </div>
                <div className='flex flex-col w-64 ml-20 mt-10'>
                    {
                        clothes.is_favorite ?
                            <button 
                                onClick={handleFavorite}
                                className='inline-flex justify-center my-1 border border-gray-500 bg-purple-100 rounded-lg'
                            >
                                <img 
                                    src={HeartSolid} 
                                    alt='favorite'
                                    className='w-5 h-5 mr-2 mt-0.5'
                                />
                                <p>Remove from Favorites</p>
                            </button> :
                                <button 
                                    onClick={handleFavorite}
                                    className='inline-flex justify-center my-1 border border-gray-500 bg-purple-100 rounded-lg'
                                    >
                                    <img 
                                        src={HeartOutline} 
                                        alt='favorite'
                                        className='w-5 h-5 mr-2'
                                    />
                                    <p>Add to Favorites</p>
                                </button>
                    }
                    <button 
                        onClick={() => setEditForm(true)}
                        className='inline-flex justify-center my-1 border border-gray-500 bg-purple-200 rounded-lg'
                    >
                        Edit Item
                    </button>
                    <button 
                        onClick={handleDelete}
                        className='inline-flex justify-center my-1 border border-gray-500 bg-purple-300 rounded-lg'
                    >
                        Remove from Closet
                    </button>
                    <button 
                        onClick={() => navigate(`/closet`)}
                        className='inline-flex justify-center my-1 border border-gray-500 bg-purple-400 rounded-lg'
                    >   
                        Go Back
                    </button>
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