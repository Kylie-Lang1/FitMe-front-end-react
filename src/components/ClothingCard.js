import { useState } from 'react';
import { Link } from 'react-router-dom';

function ClothingCard({clothes, id, createOutfit, style, setStyle, isSelected, setIsSelected}) {
    const unselectedStyle = "border-none"
    const selectedStyle = "border-2 border-gray-500 drop-shadow-lg"
    
    const [thisItem, setThisItem] = useState({});
    // const [style, setStyle] = useState("");
    console.log(style)
    
    const handleSelect = () => {
        const copyClothes = clothes
        copyClothes.is_selected = !copyClothes.is_selected
        
        style === unselectedStyle ? setStyle(selectedStyle) : setStyle(unselectedStyle)
        
        // copyClothes.is_selected === true ? (
        //     setStyle(selected)
        //     if(!isSelected.includes(clothes)){
        //         setIsSelected([...isSelected, clothes])
        //     }
        // ) : (
        //     setStyle(unselected)
        //     if(isSelected.includes(clothes)){
        //         setIsSelected(isSelected.filter((item) => {
        //             return item !== clothes
        //         }))
        //     }
        // )

        if(copyClothes.is_selected === true){
            setStyle(selectedStyle)
            setIsSelected([...isSelected, clothes])
        } else {
            setStyle(unselectedStyle)
            setIsSelected(isSelected.filter((item) => {
                return item !== clothes
            }))
        }

        console.log(isSelected)
        console.log(style)
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
                    className={'w-64 h-64 object-cover ' + `${style}`}
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