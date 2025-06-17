import { Link }  from 'react-router-dom'
import React from 'react'
import { useContext } from 'react'

import DataContext from './context/DataContex';
 
const Nav =() => {
  const { search , setSearch } = useContext(DataContext);
    return (
        <nav className="Nav" style={{ display: 'flex', alignItems: 'center' }}>
          <form className="search-form" onSubmit={(e) => e.preventDefault()} style={{ marginRight: 'auto' }}>
            <label htmlFor="search" style={{ position: 'absolute', left: '-999999px' }}>Search Posts</label>
            <input
              id="search"
              type="text"
              role="searchbox"
              placeholder="Search Posts"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ fontSize: '1.1rem', padding: '6px 10px', width: '250px' }}
              />
          </form>
            <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', margin: 0, padding: 0 }}>
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="post">Posts</Link>
                </li>
                <li>
                <Link to="about">About</Link>
                </li>
                </ul>
        </nav>
    )
}
export default Nav;