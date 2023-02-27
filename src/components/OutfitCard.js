import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEdit } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';
import { FiMoreVertical } from 'react-icons/fi';

const API = process.env.REACT_APP_API_URL

function OutfitCard({ outfit, id }) {
    const navigate = useNavigate()
    const [edit, setEdit] = useState(false)
    const [options, setOptions] = useState(false)
    const [updateOutfit, setUpdateOutfit] = useState(outfit)

    const handleEdit = () => {
        axios
         .put(`${API}/outfits/${outfit.id}`, updateOutfit)
         .then((res) => {
            setEdit(false)
            setOptions(false)
         })
         .catch((c) => console.warn("catch, c")) 
    }

    const handleDelete = () => {
        if(window.confirm("Are you sure you want to delete this outfit?") === true){
            axios
             .delete(`${API}/outfits/${outfit.id}`)
             .then((res) => navigate("/outfits"))
             .catch((c) => console.warn("catch, c"))
        }
    }

    return (
        <div>
            <div className="py-5 px-10 relative">
                <FiMoreVertical 
                    onClick={() => {
                        setOptions(!options)
                        setEdit(false)
                    }}   
                    className="inline scale-125 text-gray-600 mb-1 cursor-pointer relative" 
                />
                <h1 className="text-xl w-64 font-bold truncate inline pr-2">{outfit.name}</h1>
                {
                    options ? (
                        <div className={"absolute bottom-6 -translate-y-6" }>
                            <div 
                                onClick={() => setEdit(!edit)}
                                className="cursor-pointer w-32 inline"
                            >
                                <AiFillEdit 
                                    className='scale-125 mr-1 relative mb-1 inline'
                                />
                                <p className="inline">Edit Name</p>
                            </div>
                            <div className="inline">

                                {
                                    edit ? (
                                        <form className="inline">
                                            <input
                                                type="text"
                                                name="name"
                                                onChange={(e) => setUpdateOutfit({...updateOutfit, name: e.target.value})}
                                                placeholder="New Outfit Name"
                                                className="border-2 border-blue-500 rounded-md ml-5 pl-2"
                                                />
                                            <button 
                                                onClick={handleEdit}
                                                className="underline px-3"
                                                >
                                                Submit
                                            </button>
                                        </form>
                                    ) : null
                                }
                            </div>
                            <div 
                                onClick={handleDelete}
                                className="cursor-pointer w-32"
                            >
                                <TiDelete 
                                    className='inline scale-150 text-red-500 mb-1 mr-1'
                                /> 
                                <p className="inline">Delete Outfit</p>
                            </div>
                        </div>
                    ) : null
                }
                
            </div>
            <Link to={`/outfit/${outfit.id}`}>
                <div className="px-10 mb-10">
                    {
                        outfit.img1_url ? (
                            <img
                            src={outfit.img1_url}
                            alt={outfit.name}
                            className="w-64 h-80 object-cover inline"
                            />
                            ) : null
                        }
                    {
                        outfit.img2_url ? (
                            <img 
                            src={outfit.img2_url} 
                            alt={outfit.name}
                            className="w-64 h-80 object-cover inline"
                            />
                            ) : null
                        }  
                    {
                        outfit.img3_url ? (
                            <img
                            src={outfit.img3_url}
                            alt={outfit.name}
                            className="w-64 h-80 object-cover inline"
                            />
                            ) : null
                        }
                    {
                        outfit.img4_url ? (
                            <img
                            src={outfit.img4_url}
                            alt={outfit.name}
                            className="w-64 h-80 object-cover inline"
                            />
                            ) : null
                        }
                    {
                        outfit.img5_url ? (
                            <img
                            src={outfit.img5_url}
                            alt={outfit.name}
                            className="w-64 h-80 object-cover inline"
                            />
                            ) : null
                        }
                    {
                        outfit.img6_url ? (
                            <img
                            src={outfit.img6_url}
                            alt={outfit.name}
                            className="w-64 h-80 object-cover inline"
                        />
                        ) : null
                    }
                
                </div>
            </Link>
        </div>
    );
}

export default OutfitCard;