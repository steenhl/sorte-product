import { useEffect, useState, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import amplifier from "../assets/images/amplifier.png"
import useFetchData from "../hooks/useFetchData";

export default function Search({ searchType, url }) {
    // states
    const [originalProducts, setOriginalProducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const [search, setSearch] = useState("");
    const [errorKeyWord, setErrorKeyWord] = useState(null);
    // refs
    const inputRef = useRef();
    const dialogRef = useRef();

    // fetch data
    const { data, isPending, error } = useFetchData(`${url}/products`)
    // kun første gang komponenten renderes, så sætter vi originalProducts og searchResults
    useEffect(() => {
        if (data) {
            setOriginalProducts(data);
            setSearchResults(data);
        }
    }, [data]);

    useEffect(() => {

        if (!searchType || searchType.length === 0) {
            setErrorKeyWord("HUSK AT ANGIVE NØGLEORD SOM PARAMETER TIL Search Componentet");
            setSearchResults?.([]); // ingen resultater
            return;
        }

        setErrorKeyWord(null);

        const filtered = originalProducts.filter(item =>
            searchType.some(key => {
                const value = item[key?.toLowerCase()]?.toString().toLowerCase();
                return value?.includes(search);
            })
        );

        // 1. hvis søgestrengen(search) er ikke tom, så vis resultaterne
        // 2. Hvis søgestrengen(search) er tom, så vis ingenting
        if (search != "") {
            setSearchResults?.(filtered);
        }
        else {
            setSearchResults?.([])
        }


    }, [search, originalProducts]);

    useEffect(() => {

        if (search !== "" && searchResults.length) {
            dialogRef.current.show()
            inputRef.current.focus()
        }
        else {
            dialogRef.current.close();
        }

    }, [search, searchResults])

    return (
        <div className="search-section grid grid-cols-1">
            {isPending && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {errorKeyWord && <p style={{ color: "red" }}>{errorKeyWord}</p>}
            <IoSearch />
            <input
                type="text"
                id="brands"
                name="brands"
                placeholder="Søg produkter..."
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                ref={inputRef}

            />
            <dialog className="search-dialog" ref={dialogRef} >
                <ul>
                    {searchResults && searchResults.map((product) => {

                        return <li key={product.model} >
                            <img src={amplifier}></img>
                            <strong>{product.brand}</strong> - {product.model}
                        </li>

                    })}
                </ul>
            </dialog>
        </div>

    );
}
