import React, { useState } from 'react';

export default function ImagesSearchbar({ onSubmit }) {
    const [inputQuery, setInputQuery] = useState('');

    const onSearchInputChange = e => {
        setInputQuery(e.target.value);
    };

    const onSearchBarSubmit = e => {
        e.preventDefault();

        let queriedValue = inputQuery.toLowerCase().trim();
        onSubmit(queriedValue);
    };

    return (
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={onSearchBarSubmit}>
                <button type="submit" className="SearchForm-button">
                    <span className="button-label">Search</span>
                </button>

                <input className="SearchForm-input" value={inputQuery} onChange={onSearchInputChange} placeholder="Search images and photos" />
            </form>
        </header>
    );
}
