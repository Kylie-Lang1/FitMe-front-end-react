import ClothingCards from '../components/ClothingCards';

function ClosetIndex() {
    return (
        <div>
            <h1 className='text-center py-10'>My Closet</h1>
            {/* <h2>Favorites</h2>
                <ClothingCards isFavorite={true}/> */}
            <h2>Clothes</h2>
                <ClothingCards isFavorite={false}/>
        </div>
    );
}

export default ClosetIndex;