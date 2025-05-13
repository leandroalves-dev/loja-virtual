import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { useFavorites } from "../../context/FavoritesContext";

const Favorites = () => {
    const { favorites } = useFavorites();

    return (
        <Container>
            <div className="text-white mt-10">
                <h1 className="text-2xl mb-4">Meus Favoritos</h1>
                {favorites.length === 0 ? (
                    <p>Você ainda não tem produtos favoritados.</p>
                ) : (
                    <ul className="grid grid-cols-2 gap-4">
                        {favorites.map((item) => (
                            <Link to={`/product/${item.id}`}>
                                <li key={item.id} className="bg-neutral-800 p-4 rounded hover:opacity-70 transition-all ease-in-out delay-100">
                                    <img src={item.imagem} alt={item.title} className="h-40 object-cover w-full mb-2" />
                                    <h2 className="text-lg">{item.title}</h2>
                                    <p className="text-sm text-neutral-400">{item.description}</p>
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>
        </Container>
    );
};

export default Favorites;
