import { useState } from 'react';
import { Link } from 'react-router-dom';

function ClothingCard({clothes, id, createOutfit}) {
    const [thisItem, setThisItem] = useState({});

    const handleSelect = () => {
        const copyClothes = clothes
        copyClothes.is_selected = !copyClothes.is_selected

        // const newClothes = {is_selected: !clothes.is_selected, ...clothes}

        setThisItem(copyClothes)
        console.log(thisItem)
        console.log(copyClothes)
    }

    return (

        createOutfit ? (
            <div
                onClick={handleSelect}
                className="px-10 mb-10"
            >
                <img 
                    src={clothes.img_url} 
                    alt={clothes.name}
                    className={'w-64 h-64 object-cover ' + `${thisItem.is_selected ? "border-2 border-gray-500 drop-shadow-lg" : ""}`}
                />
                <h1 className="w-64 font-bold truncate">{clothes.name}</h1>
                <p>{clothes.brand}</p>
            </div>
        ) : (
            <Link to={`/closet/${id}`}>
                <div className="px-10 mb-10">
                    <img 
                        src={clothes.img_url} 
                        alt={clothes.name}
                        className="w-64 h-64 object-cover"
                    />
                    <h1 className="w-64 font-bold truncate">{clothes.name}</h1>
                    <p>{clothes.brand}</p>
                </div>
            </Link>
        )
    )
}

export default ClothingCard;