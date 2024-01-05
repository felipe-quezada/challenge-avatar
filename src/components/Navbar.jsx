import { NavLink } from 'react-router-dom';

const navLinkClass = ({ isActive }) =>
  isActive ? 'text-base cursor-default' : 'text-sm hover:text-gray-200';

export const Navbar = () => {
  return (
    <>
      <nav className="flex gap-3 w-full m-auto py-4 px-6 bg-red-700 ">
        <span>My Poke Api</span>
        <ul className="flex gap-3 ml-auto mr-0">
          <li>
            <NavLink to={''} className={navLinkClass}>
              Home page
            </NavLink>
          </li>
        </ul>
        {/* <section className="ml-auto mr-0 space-x-4">
            <input type="text" className="text-black" />
            <button>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </section> */}
      </nav>
      <div className="bg-black w-full h-2 rounded-b-3xl relative">
        <div className="bg-white border-[6px] border-black right-1/2 -mr-5 -top-4 w-10 h-10 absolute rounded-full"></div>
      </div>
    </>
  );
};
