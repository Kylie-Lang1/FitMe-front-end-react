import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClothingCard from "./ClothingCard";

const API = process.env.REACT_APP_API_URL;

function ClothingCards({ isFavorite }) {
  // State for rendering different clothing cards based on filter/search
  const [allClothes, setAllClothes] = useState([]);
  const [shownClothes, setShownClothes] = useState([]);
  const [filteredClothes, setFilteredClothes] = useState([]);
  const [search, setSearch] = useState("");
  const [createOutfit, setCreateOutfit] = useState(false);

  // State for toggling selected clothing items and corresponding styling
  const [isSelected, setIsSelected] = useState([]);
  const [style, setStyle] = useState("");
  const unselectedStyle = "border-none";
  const selectedStyle = "border-2 border-gray-500 drop-shadow-lg";

  // State for saving outfit details
  const navigate = useNavigate();
  const [outfit, setOutfit] = useState({
    name: "",
    img1_url: "",
    img2_url: "",
    img3_url: "",
    img4_url: "",
    img5_url: "",
    img6_url: "",
  });

  useEffect(() => {
    axios
      .get(`${API}/closet`)
      .then((res) => {
        setAllClothes(res.data);
        setShownClothes(res.data);
        setFilteredClothes(res.data);
      })
      .catch((c) => console.warn("catch, c"));
  }, []);

  const handleFilter = (e) => {
    if (e.target.value === "all") {
      setShownClothes(allClothes);
      setFilteredClothes(allClothes);
    } else if (e.target.value === "favorites") {
      const favoriteClothes = allClothes.filter((item) => {
        return item.is_favorite === true;
      });
      setShownClothes(favoriteClothes);
      setFilteredClothes(favoriteClothes);
    } else {
      const selectedClothes = allClothes.filter((item) => {
        return item.category === e.target.value;
      });
      setShownClothes(selectedClothes);
      setFilteredClothes(selectedClothes);
    }
    setSearch("");
  };

  const handleTextChange = (e) => {
    setSearch(e.target.value);
    const input = e.target.value;
    handleSearch(input);
  };

  const handleSearch = (input) => {
    input === ""
      ? setShownClothes(filteredClothes)
      : setShownClothes(
          filteredClothes.filter((item) => {
            return (
              item.name.toLowerCase().includes(input.toLowerCase()) ||
              item.brand.toLowerCase().includes(input.toLowerCase())
            );
          })
        );
  };

  const handleCreateOutfit = () => {
    setCreateOutfit(true);
  };

  const handleRemove = (item) => {
    setIsSelected(
      isSelected.filter((each) => {
        return each !== item;
      })
    );
  };

  const handleOutfitName = (e) => {
    setOutfit({ ...outfit, name: e.target.value });
  };

  const handleSaveOutfit = (e) => {
    e.preventDefault();

    const newOutfit = { ...outfit };
    isSelected.map((item, index) => {
      newOutfit[`img${index + 1}_url`] = item.img_url;
    });

    if (outfit.name && isSelected.length <= 6) {
      axios
        .post(`${API}/outfits`, newOutfit)
        .then(() => navigate(`/outfits`))
        .catch((c) => console.warn("catch, c"));
      setCreateOutfit(false);
      setIsSelected([]);
    }
  };

  return (
    <>
        <div className="pb-5 flex flex-row">
            <div className="float-left flex items-center justify-center w-1/4">
                <label className="pl-10">Choose a category:</label>
                <select onChange={handleFilter} className="text-center border-blue-700 border-b rounded-md mx-2">
                <option value="all">All</option>
                <option value="top">Tops</option>
                <option value="bottom">Bottoms</option>
                <option value="dress">Dresses</option>
                <option value="shoes">Shoes</option>
                <option value="outer_wear">Outer Wear</option>
                <option value="hat">Hats</option>
                <option value="accessory">Accessories</option>
                <option value="other">Other</option>
                <option value="favorites">Favorites</option>
                </select>
            </div>

            <div className="flex grow justify-center w-2/4">
                <label>
                Search:
                <input
                    type="text"
                    value={search}
                    onChange={handleTextChange}
                    className="border-blue-800 w-64 border-solid border rounded-md px-2 mx-2"
                    required
                    />
                <button
                    onClick={() => {
                        setSearch("")
                        setShownClothes(filteredClothes)
                    }}
                    className="bg-red-100 border border-red-200 border-b-2 text-gray-700 rounded px-2"
                    >
                    Clear Search
                </button>
                </label>
            </div>

            <div className="float-right flex items-center justify-center mr-20 w-1/4">
                {createOutfit ? (
                //     <button
                //     onClick={() => {
                //         setCreateOutfit(false);
                //         setIsSelected([]);
                //     }}
                //     className={
                //         "bg-gray-300 border border-blue-800 border-solid rounded px-2 mt-1 h-7 ml-3 "
                //         + `${createOutfit ? "inline" : "hidden"}`
                //     }
                //     >
                //     Cancel
                // </button>
                null
                ) : (
                    <button
                    onClick={handleCreateOutfit}
                    className="bg-blue-700 text-white border border-blue-800 border-solid rounded px-2 mt-1 h-7 ml-3 "
                    >
                    + Create Outfit
                </button>
                )}
            </div>
        </div>
        <div className="flex">
            <div className="flex flex-wrap my-8 float left">

            <div className="w-64 h-80 bg-gray-300 mx-10 flex items-center justify-center text-white">
                <Link to="/closet/new" className="w-64 h-80">
                    <div className="place-items-center text-center mt-24">
                        <span className="text-7xl drop-shadow-md">+</span>
                        <p className="text-2xl drop-shadow-md font-semibold">
                            Add New Item
                        </p>
                    </div>
                </Link>
            </div>

            {shownClothes &&
                shownClothes.map((item, index) => {
                if (isSelected.includes(item)) {
                    return (
                    <ClothingCard
                        key={item.id}
                        id={item.id}
                        clothes={item}
                        createOutfit={createOutfit}
                        isSelected={isSelected}
                        setIsSelected={setIsSelected}
                        style={selectedStyle}
                        setStyle={setStyle}
                    />
                    );
                } else {
                    return (
                    <ClothingCard
                        key={item.id}
                        id={item.id}
                        clothes={item}
                        createOutfit={createOutfit}
                        isSelected={isSelected}
                        setIsSelected={setIsSelected}
                        style={unselectedStyle}
                        setStyle={setStyle}
                    />
                    );
                }
                })}
            </div>
            <aside
                className={
                    "w-96 right-0" +
                    `${createOutfit ? "" : " hidden"}`
                }
            >
                <div
                    className={
                    "flex flex-col w-96 right-0 rounded-lg shadow-2xl mr-10 h-5/6 overflow-y-auto my-8 fixed top-16" +
                    `${createOutfit ? "" : " hidden"}`
                    }
                >
                    <div className="sticky top-0">
                        <p
                            onClick={() => {
                                setCreateOutfit(false);
                                setIsSelected([]);
                            }}
                            className="text-right pr-4 pt-3 cursor-pointer bg-blue-100 text-red-700 text-l font-semibold"
                        >
                            X
                        </p>
                        <p
                        className={
                            createOutfit
                            ? "text-center pb-5 bg-blue-100 top-0 px-5"
                            : "hidden"
                        }
                        >
                        Select up to <span className="underline underline-offset-2"> 6 </span> items of clothing you would like to add
                        </p>
                        {isSelected.length > 0 ? (
                            <div className="">
                            <form className="flex justify-center sticky top-10 py-5 bg-white">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name your outfit"
                                    className="px-2 my-2 bg-gray-100"
                                    onChange={handleOutfitName}
                                    required
                                    />
                                <button
                                    onClick={handleSaveOutfit}
                                    className="bg-blue-800 text-white border border-blue-800 border-solid rounded px-2 mt-1 h-7 ml-3"
                                    >
                                    Submit
                                </button>
                            </form>
                            <p className="text-center pb-3 bg-white">
                            <span className="text-blue-800 underline underline-offset-2">
                                {isSelected.length}{" "}
                            </span>{" "}
                            items selected
                            </p>
                            {
                                isSelected.length > 6 ?
                                <p className="text-red-800 text-center pb-5 bg-white">
                                        Please remove {isSelected.length - 6} item(s).
                                    </p>
                                        : null
                                    }
                        </div>
                    ) : null}
                    </div>
                    <div className="flex flex-col-reverse">
                        {isSelected.length
                        ? isSelected.map((item) => {
                            return (
                                <div
                                key={item.id}
                                className="flex items-center justify-center pb-2 float-right"
                                >
                                <img
                                    src={item.img_url}
                                    alt={item.name}
                                    className="w-52 h-52 object-scale-down"
                                />
                                <button
                                    onClick={() => handleRemove(item)}
                                    className="bg-red-400 text-white border border-red-500 border-solid rounded px-1 ml-3"
                                >
                                    X
                                </button>
                                </div>
                            );
                            })
                        : null}
                    </div>
                </div>
            </aside>
        </div>
    </>
  );
}

export default ClothingCards;
