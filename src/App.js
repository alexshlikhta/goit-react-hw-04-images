import './App.css';
import React, { useState } from 'react';
import ImagesSearchbar from './components/ImagesSearchbar';
import ImagesRender from './components/ImagesRender';

export default function App() {
    const [ query, setQuery ] = useState('');

    const handleSubmit = query => {
        setQuery(query);
    };  
    
    return (
        <div className="App">
            <ImagesSearchbar onSubmit={handleSubmit} />
            <ImagesRender imageQuery={query} />
        </div>
    );
};