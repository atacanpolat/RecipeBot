import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/inspiration'>Search for Inspiration</Link></li>
                <li><Link to='/saved-recipes'>Saved Recipes</Link></li>
                <li><Link to='/create-recipe'>Create a Recipe</Link></li>
                <li><Link to='/settings'>Account & Settings</Link></li>
                <li><Link to='/generate-recipe'>Generate Recipe</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;