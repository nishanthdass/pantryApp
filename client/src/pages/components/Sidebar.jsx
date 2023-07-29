import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FaThList} from 'react-icons/fa';
import {MdOutlineKitchen} from 'react-icons/md';
import {AiTwotoneSetting} from 'react-icons/ai';
import {SiGnometerminal} from 'react-icons/si';
import {PiDoorDuotone} from 'react-icons/pi';


function Sidebar({onLogout}) {


  return (
    <> 
      <div className='sidebar-content'>
        <nav>
          <ul>
            <li>

              <Link to="/shopping"><span>Shopping List </span>
              <FaThList/>
              </Link>
             
            </li>
            <li>
              <Link to="/pantry"><span>Pantry Page</span>
              <MdOutlineKitchen/>
              </Link>
            </li>
            <li>
              <Link to="/advanced"><span>Advanced settings</span>
              <SiGnometerminal/>
              </Link>
            </li>
          </ul>
        </nav>
        
      </div>
        <ul>
          <li className='logoutbuttonbox'>
            <a className='logoutbutton' onClick={onLogout}><span>Log Out</span>
              <PiDoorDuotone/>
            </a>
          </li>
        </ul>
    </>
  );
}

export default Sidebar;