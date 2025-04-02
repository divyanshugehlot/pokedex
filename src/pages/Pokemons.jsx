import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../component/Card";
import Header from "../component/Header";
import useDebounce from "../hooks/useDebounce";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/v3",
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user"));
    if (token) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const Pokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPokemons([]);
    setPage(1);
    fetchPokemons(1, true);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchPokemons(1, true);
  }, []);

  const fetchPokemons = async (pageNumber = 1, reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await api.get("/pokemon", {
        params: {
          page: pageNumber,
          per_page: pageNumber === 1 ? 8 : 20, // Load 8 on first page, then 20
          q: debouncedSearch || undefined,
        },
      });
      const newPokemons = response.data.data || [];
      setPokemons((prev) => (reset ? newPokemons : [...prev, ...newPokemons]));
      setHasMore(newPokemons.length > 0);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      setPokemons([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPokemons(nextPage);
    }
  };

  return (
    <>
      <Header isSearch={true} setSearch={setSearch} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <Card
              key={pokemon.id}
              name={pokemon.name.english}
              image={pokemon.image}
              type={pokemon.type}
            />
          ))
        ) : (
          <p className="col-span-4 text-center">No Pokémon found</p>
        )}
      </div>
      <div className="flex justify-center mb-4 "> 
      {hasMore && !loading && (
        <button
          className="mt-4 p-2 bg-blue-500 text-white rounded 
          cursor-pointer hover:bg-blue-600 transition duration-300 self-center "
          onClick={loadMore}
        >
          Load More
        </button>
      )}
      {loading && <p>Loading...</p>}
      </div>
    </>
  );
};

export default Pokemons;
