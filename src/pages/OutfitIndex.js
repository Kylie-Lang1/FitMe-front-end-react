// A component that takes in a a list of outfits as a prop and lifts state to it parent component. The parent component is responsible for fetching the outfits from the backend and passing them to this component as a prop. This component is responsible for displaying the outfits and lifting state to the parent component.
import { useState } from "react";

    // Before OutfitIndex renders:
    // User clicks Create Outfit button, and form appears for them to set a title
        // *CAPTURE selected clothing items in state
    // onOutfitSubmit, the form sends a POST request to the backend, which creates a new outfit
        // *POST selected imageURL arr and title to backend
    // The backend responds with the new outfit's id
    // The frontend redirects to /outfit/:id

    // OutfitIndex renders
    // OutfitIndex makes a GET request to the backend for the outfit's data
    // The backend responds with the outfit's data
    // OutfitIndex renders the outfit's data

    // or

    // Before OutfitIndex renders:
    // User clicks Create Outfit button, and form appears for them to set a title
        // *CAPTURE selected clothing items pass into OutfitIndex component

    // OutfitIndex renders
    // Map through passed props to render each clothing item

function OutfitIndex({ outfits, setOutfits }) {
    const [createOutfit, setCreateOutfit] = useState(false);
    const [selectedOutfit, setSelectedOutfit] = useState(null);
    
    // this function will handle toggling an object property and lifting it to its parent component.
    const handleToggle = (outfit) => {
        const updatedOutfits = outfits.map((item) => {
            if(item.id === outfit.id){
                return {...item, is_selected: !item.is_selected}
            } else {
                return item
            }
        })
        setOutfits(updatedOutfits)
    }

    return (
        <div>
            
        </div>
    );
}

export default OutfitIndex;