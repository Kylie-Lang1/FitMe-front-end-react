import ClothesNewForm from "../components/ClothesNewForm";

function NewClothing() {
    return (
        <div>
            <h1 className="text-3xl tracking-wide text-center my-10">Add New Item</h1>
            <ClothesNewForm />
        </div>
    );
}

export default NewClothing;