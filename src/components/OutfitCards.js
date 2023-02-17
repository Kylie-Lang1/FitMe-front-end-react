import axios from "axios";
import { useState, useEffect } from "react";

import OutfitCard from "./OutfitCard";

const API = process.env.REACT_APP_API_URL

function OutfitCards() {
    const [outfits, setOutfits] = useState([])

    useEffect(() => {
        axios.get(`${API}/outfits`)
        .then((res) => setOutfits(res.data))
        .catch((c) => console.warn("catch, c"))
    }, [outfits]);

    console.log(outfits)

    return (
        <div className="flex flex-col-reverse py-10">
            {
                outfits.map((outfit) => {
                    return (
                        <div>
                            <OutfitCard 
                                key={outfit.id}
                                id={outfit.id}
                                outfit={outfit}
                            />
                        </div>
                    )
                })
            }
        </div>
    );
}

export default OutfitCards;