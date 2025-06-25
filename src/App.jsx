import { useEffect, useState } from 'react';
import './App.css'
import Search from './components/Search';

function App() {

  return (
    <>
      <Search searchType={["brand", "type", "model"]} url={"http://localhost:4001"} />
    </>
  )
}

export default App

