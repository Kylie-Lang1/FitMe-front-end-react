function OutfitIndex() {
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

    return (
        <div>
            
        </div>
    );
}

export default OutfitIndex;