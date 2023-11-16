import React from "react";
import { Container, Logo, LogoutBtn } from "../";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Header() {
  const authStatus = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav>
          <div className="flex items-center">
            <div className="mr-4">
              <Link to="/">
                <Logo width="70px" />
              </Link>
            </div>

            <ul className="flex ml-auto">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.slug}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="inline-block px-4 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
