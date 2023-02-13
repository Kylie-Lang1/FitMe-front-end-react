import SearchBar from '../components/SearchBar';
import ClothingCards from '../components/ClothingCards';

function ClosetIndex() {
    return (
        <div>
            <h1 className='text-center py-10'>My Closet</h1>
            <ClothingCards />
        </div>
    );
}

export default ClosetIndex;