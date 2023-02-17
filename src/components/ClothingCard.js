import { Link } from 'react-router-dom';
import HeartSolid from '../assets/SolidHeart.png';
import HeartOutline from '../assets/HeartOutline.png';

function ClothingCard({ clothes, id, createOutfit, style, setStyle, isSelected, setIsSelected }) {
    const unselectedStyle = "border-none"
    const selectedStyle = "border-2 border-gray-500 drop-shadow-lg"

    const handleSelect = () => {

        if(isSelected.includes(clothes)){
            setIsSelected(isSelected.filter((item) => {
                return item !== clothes
            }))
            setStyle(unselectedStyle)
        } else {
            setIsSelected([...isSelected, clothes])
            setStyle(selectedStyle)
        }
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
                    className={'w-64 h-80 object-cover ' + `${style}`}
                />
                <h1 className="w-64 font-bold truncate">{clothes.name}</h1> 
                <div className='flex w-64'>
                    {
                        clothes.is_favorite ? (
                            <img
                                src={HeartSolid}
                                alt='favorite'
                                className='w-5 h-5 mr-2 mt-0.5 flex-end'
                            />
                            ) : (
                                <img
                                    src={HeartOutline}  
                                    alt='not_favorite'
                                    className='w-5 h-5 mr-2 mt-0.5 flex-end'
                                />
                                )
                    }
                    <p>{clothes.brand}</p>
                </div>
            </div>
        ) : (
            <Link to={`/closet/${id}`}>
                <div className="px-10 mb-10">
                    <img 
                        src={clothes.img_url} 
                        alt={clothes.name}
                        className="w-64 h-80 object-cover"
                    />
                    <h1 className="w-64 font-bold truncate">{clothes.name}</h1>
                    <div className='flex w-64'>
                        {
                            clothes.is_favorite ? (
                                <img
                                    src={HeartSolid}
                                    alt='favorite'
                                    className='w-5 h-5 mr-2 mt-0.5 flex-end'
                                />
                                ) : (
                                    <img
                                        src={HeartOutline}  
                                        alt='not_favorite'
                                        className='w-5 h-5 mr-2 mt-0.5 flex-end'
                                    />
                                )
                        }
                        <p>{clothes.brand}</p>
                    </div>
                </div>
            </Link>
        )
    )
}

export default ClothingCard;