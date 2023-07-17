import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Sidebar() {


  return (
    
    <div className="sidebar">
      
        <div>
        <nav>
          <ul>
            <li>
              <Link to="/shopping">Shopping List</Link>
            </li>
            <li>
              <Link to="/pantry">Pantry Page</Link>
            </li>
            <li>
              <Link to="/advanced">Advanced settings</Link>
            </li>
          </ul>
        </nav>
        </div>
    </div>
  );
}

export default Sidebar;