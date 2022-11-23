import React from 'react';
import './style.css';

import PaginationHelper from './components/PaginationHelper';
import { PokemonList } from './components/Pokemon';

export default function App() {
  return (
    <div className="container">
      <div className="row">
        <PaginationHelper listProvider={PokemonList} />
      </div>
    </div>
  );
}
