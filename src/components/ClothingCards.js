import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClothingCard from "./ClothingCard";

const API = process.env.REACT_APP_API_URL;

function ClothingCards() {
    const [clothing, setClothing] = useState([]);
    console.log(clothing);

    useEffect(() => {
        axios
        .get(`${API}/closet`)
        .then((res) => {
            setClothing(res.data);
            console.log(res.data);
        })
        .catch((c) => console.warn("catch, c"));
    }, []);

    return (
        <div className='flex'>
            <div className="w-64 h-64 max-w-full bg-gray-300 px-20">
                <Link to='/closet/new'>
                    <div>
                        <span>+</span>
                        <p>Add New Item</p>
                    </div>
                </Link>
            </div>
            {
                clothing.map((item) => {
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
    );
}

export default ClothingCards;