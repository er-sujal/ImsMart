import React, { useState } from 'react';
import './Search.css';
import axios from 'axios';
import Item from '../Item/Item';

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/search?q=${searchTerm}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    const handleItemClick = () => {
        setSearchResults([]); // Clear search results when item is clicked
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button>
            <div onClick={()=>{window.location.reload(false)}}>
                {searchResults.map((item, i) => (
                    <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} onClick={handleItemClick} />
                ))}
            </div>
        </div>
    );
};

export default SearchComponent;
