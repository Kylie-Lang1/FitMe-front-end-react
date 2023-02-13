function ClothingCard({clothes, id}) {
    return (
        <div className="px-10 mb-10">
            <img 
                src={clothes.img_url} 
                alt={clothes.name}
                className="w-64 h-64 object-cover"
            />
            <h1 className="w-64 font-bold truncate">{clothes.name}</h1>
            <p>{clothes.brand}</p>
        </div>
    );
}

export default ClothingCard;