import React, { useEffect, useState } from 'react';

function Navbar() {
    const navItems = [
        { text: 'Home', href: '/', id: 'home-page' },
        { text: 'Add New Recipe', href: '/new-recipe', id: 'newRecipe-page' },
        { text: 'Meal Planner', href: '/meal-planner', id: 'mealPlanner-page' },
    ];

    const popUpLinks = [
        { text: 'Home', href: '/' },
        { text: 'New Recipe', href: '/new-recipe' },
        { text: 'Meal Planner', href: '/meal-planner' }
    ];

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="mx-auto flex flex-col sm:flex-row justify-between items-center py-3 bg-green-400 shadow-md w-full top-0 z-50">
            <div className="text-white text-2xl">
                {/* Your logo or site name goes here */}
            </div>

            {/* Responsive menu button */}
            <button
                onClick={toggleMenu}
                className="text-white text-2xl sm:hidden focus:outline-none self-end mx-2"
            >
                &#9776; {/* Hamburger icon */}
            </button>

            {/* Navigation links */}
            <ul className={`sm:flex space-x-8 sm:relative hidden`}>
                {navItems.map((item) => (
                    <li key={item.id}>
                        <a href={item.href} id={item.id} className="text-white text-xl hover:text-blue-950 duration-200">
                            {item.text}
                        </a>
                    </li>
                ))}
                <li>
                    <button className="text-white text-xl hover:text-blue-950 duration-200 border border-white rounded-lg mx-2 px-3">
                        Dark
                    </button>
                </li>
            </ul>

            {/* Responsive popup menu */}
            {showMenu && (
                <div className="sm:hidden absolute top-14 right-0 bg-green-400 p-4 px-2 shadow-lg">
                    {popUpLinks.map((link) => (
                        <div key={link.text} className="mb-2">
                            <a href={link.href} className="text-white text-xl hover:text-blue-950 duration-200">
                                {link.text}
                            </a>
                        </div>
                    ))}
                    {/* Dark mode button can also be added here */}
                </div>
            )}
        </div>
    );
}
//fix
export default Navbar;
///