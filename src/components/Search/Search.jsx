import React, {useState} from 'react';
import {useLocalStorage} from '../../hook/useLocalStorage';

const Search = ({submitForm}) => {
  
  const [keySearch, setKeySearch] = useLocalStorage('keySearch', '');
  
  return (
    <div className="form-inline w-100">
      <div className="input-group">
        
        <input value={keySearch} className="form-control" name="search" placeholder="Search key ..." onChange={(e) => setKeySearch(e.target.value)}/>
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={() => submitForm(keySearch) }>Search</button>
        </div>
      </div>
    </div>
  );
}

export default Search;
