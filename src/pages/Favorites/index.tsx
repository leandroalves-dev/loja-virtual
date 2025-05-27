import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { useFavorites } from "../../context/FavoritesContext";
import Loading from "../../components/Loading";
import ImageProducts from "../../components/ImageProducts/ImageProducts";

const Favorites = () => {
    const { favorites, loading } = useFavorites();

    if (loading) {
        return <Loading />;
    }

    return (
        <Container>
            <div className="text-white mt-10">
                <h1 className="text-2xl mb-4">Meus Favoritos</h1>
                
                {favorites.length === 0 ? (
                    <p>Você ainda não tem produtos favoritados.</p>
                ) : (
                    <ul className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                        {favorites.map((item) => (
                            <Link to={`/product/${item.id}`}>
                                <li key={item.id} className="bg-neutral-800 p-4 rounded hover:opacity-70 transition-all ease-in-out delay-100">
                                    <ImageProducts src={item.imagem} alt={item.title} />
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
