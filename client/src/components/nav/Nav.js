import React from "react";
import { Link } from "react-router-dom";
import Auth from '../../utils/auth';

function Nav() {
    function updateExpanded(expanded) {}
  return (
        <section className="Headerbar">
            <header className="hidden">
                <h1><Link to="/" onClick={() => updateExpanded(false)}>
                    My Home Bar
                    </Link></h1>           
            </header>

            <nav className="pagelinks">
                {Auth.loggedIn() && <ul>
                    <li>
                    <Link to="/mybar" onClick={() => updateExpanded(false)}>
                    My Bar
                    </Link>
                    </li>
                    <li>
                    <Link to="/cocktails" onClick={() => updateExpanded(false)}>
                    Cocktails
                    </Link>
                    </li>
                    <li>
                    <Link to="/favorites" onClick={() => updateExpanded(false)}>
                    Favorites
                    </Link>
                    </li>
                    <li>
                    <div>dropdown</div>
                    </li>
                </ul> }
                {!Auth.loggedIn() && <ul>
                    <li>
                    <Link to="/login" onClick={() => updateExpanded(false)}>
                    Login
                    </Link>
                    </li>
                    <li>
                    <Link to="/signup" onClick={() => updateExpanded(false)}>
                    Sign up
                    </Link>
                    </li>
                </ul>}
            </nav>
        </section>
  );
}

export default Nav;