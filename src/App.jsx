import { useEffect, useState } from 'react';
import './App.css'
import InputElement from './components/InputElement';
import useFetchData from './hooks/useFetchData.jsx'
function App() {
  // data
  const { data, isPending, error } = useFetchData('http://localhost:4001/products');
  const [products, setProducts] = useState([]);
  // InputElement.jsx
  const [selectedinput, setSelectedinput] = useState([]); // id'er som streng

  // Når data hentes første gang
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  // Når selectedinput ændres, filtrer produkter baseret på valgte input
  // Her antager vi, at selectedinput er en liste af brand - navne som str
  useEffect(() => {
    // console.log(selectedinput);
    if (selectedinput.length > 0) {

      const filteredProducts = data.filter(product =>
        selectedinput.some(inputId => product.brand.toLowerCase() === inputId.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      setProducts(data); // Hvis intet valgt, vis alle
    }
  }, [selectedinput]);

  return (
    <>
      {error && <div className="error">{error}</div>}
      {isPending && <div className="loading">Loading...</div>}
      {products && products.map(product => <div key={product.id} className="product">${product.brand}</div>)}
      <InputElement selectedinput={selectedinput} setSelectedinput={setSelectedinput} />
    </>
  )
}

export default App

