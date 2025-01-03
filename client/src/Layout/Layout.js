// import React from "react";
// import { FiMenu } from "react-icons/fi";
// import { Link, useNavigate } from "react-router-dom";
// import { AiFillCloseCircle } from "react-icons/ai";
// import Footer from "../Components/Footer";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../Redux/authSlice";

// const Layout = ({ children }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
//   const role = useSelector((state) => state?.auth?.role);

//   const hideDrawer = () => {
//     const element = document.getElementsByClassName("drawer-toggle");
//     element[0].checked = false;

//     const drawerSide = document.getElementsByClassName("drawer-side");
//     drawerSide[0].style.width = 0;
//   };

//   const changeWidth = () => {
//     const drawerSide = document.getElementsByClassName("drawer-side");
//     drawerSide[0].style.width = "auto";
//   };

//   const handleLogout = async (event) => {
//     event.preventDefault();

//     const res = await dispatch(logout());

//     if (res?.payload?.success) navigate("/");
//   };

//   return (
//     <div className="min-h-[90vh]">
//       {/* Navigation Bar for Larger Screens */}
//       <nav className="hidden sm:flex justify-between items-center bg-base-100 p-4 shadow-md">
//         <div className="flex gap-4">
//           <Link to={"/"}>Home</Link>
//           {isLoggedIn && role === "ADMIN" && (
//             <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
//           )}
//           <Link to={"/courses"}>All Courses</Link>
//           <Link to={"/contact"}>Contact Us</Link>
//           <Link to={"/about"}>About Us</Link>
//         </div>
//         <div>
//           {!isLoggedIn ? (
//             <div className="flex gap-4">
//               <Link className="btn-primary px-2 rounded-full" to={"/login"}>Login</Link>
//               <Link className="btn-secondary px-2 rounded-full" to={"/signup"}>Signup</Link>
//             </div>
//           ) : (
//             <div className="flex gap-5">
//               <Link className="btn-primary border-r-2 px-2 rounded-full" to={"/user/profile"}>Profile</Link>
//               <button className="btn-secondary px-2 rounded-full" onClick={handleLogout}>Logout</button>
//             </div>
//           )}
//         </div>
//       </nav>

//       {/* Mobile Menu Drawer for Smaller Screens */}
//       <div className="drawer sm:hidden absolute z-50 left-0 w-fit">
//         <input id="my-drawer" type="checkbox" className="drawer-toggle" />
//         <div className="drawer-content">
//           <label htmlFor="my-drawer" className="cursor-pointer relative">
//             <FiMenu
//               onClick={changeWidth}
//               size={"32px"}
//               className="font-bold text-white m-4"
//             />
//           </label>
//         </div>

//         <div className="drawer-side w-0">
//           <label htmlFor="my-drawer" className="drawer-overlay"></label>
//           <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative">
//             <li className="w-fit absolute right-2 z-50">
//               <button onClick={hideDrawer}>
//                 <AiFillCloseCircle size={24} />
//               </button>
//             </li>

//             <li>
//               <Link to={"/"}>Home</Link>
//             </li>

//             {isLoggedIn && role === "ADMIN" && (
//               <li>
//                 <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
//               </li>
//             )}

//             <li>
//               <Link to={"/courses"}>All Courses</Link>
//             </li>

//             <li >
//               <Link  to={"/contact"}>Contact Us</Link>
//             </li>

//             <li>
//               <Link to={"/about"}>About Us</Link>
//             </li>

//             {!isLoggedIn && (
//               <li className="absolute bottom-4 w-[90%]">
//                 <div className="w-full flex items-center justify-center gap-2">
//                   <button className="btn-primary px-4 py-2 font-semibold rounded-full w-full hover:bg-blue-700">
//                     <Link to={"/login"}>Login</Link>
//                   </button>
//                   <button className="btn-secondary px-4 py-2 font-semibold rounded-full w-full hover:bg-pink-700">
//                     <Link to={"/signup"}>Signup</Link>
//                   </button>
//                 </div>
//               </li>
//             )}

//             {isLoggedIn && (
//               <li className="absolute bottom-4 w-[90%]">
//                 <div className="w-full flex items-center justify-center gap-2">
//                   <button className="btn-primary px-4 py-2 font-semibold rounded-full w-full hover:bg-blue-700">
//                     <Link to={"/user/profile"}>Profile</Link>
//                   </button>
//                   <button className="btn-secondary px-4 py-2 font-semibold rounded-full w-full hover:bg-pink-400" onClick={handleLogout}>
//                     <Link>Logout</Link>
//                   </button>
//                 </div>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>

//       {children}

//       <Footer />
//     </div>
//   );
// };

// export default Layout;


import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "../Components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {  logout } from "../Redux/authSlice";
// import defaultAvatar from "../Assets/Images/default_avatar.png"; // default avatar image
// import Logo from "../Assets/Images/logoName.png"; // default avatar image


const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);
  const user = useSelector((state) => state?.auth?.user); // Assuming user data contains avatar
  const userData = useSelector((state) => state?.auth?.data);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const hideDrawer = () => {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = 0;
  };

  const changeWidth = () => {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    const res = await dispatch(logout());

    if (res?.payload?.success) navigate("/");
  };

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-[90vh]">
      {/* Navigation Bar for Larger Screens */}
      <nav className="hidden sm:flex justify-between items-center bg-base-100 p-4 shadow-md">
        <div className="flex gap-4">
          {/* <Link to={"/"}><img src={Logo} alt="Logo" className="w-24 h-auto" /></Link> */}
         {<Link to = {"/"}>Home</Link>}
          {isLoggedIn && role === "ADMIN" && (
            <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
          )}
          <Link to={"/courses"}>All Courses</Link>
          <Link to={"/contact"}>Contact Us</Link>
          <Link to={"/about"}>About Us</Link>
        </div>
        <div className="flex gap-5 items-center">
          {!isLoggedIn ? (
            <div className="flex gap-4">
              <Link className="btn-primary px-2 rounded-full" to={"/login"}>Login</Link>
              <Link className="btn-secondary px-2 rounded-full" to={"/signup"}>Signup</Link>
            </div>
          ) : (
            <div className="relative">
              <button 
                onClick={handleAvatarClick} 
                className="w-12 h-12 rounded-full overflow-hidden border-2 border-white"
              >
                <img 
                  src={userData?.avatar?.secure_url}  
                  alt="User Avatar" 
                  className="w-full h-full object-cover" 
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                  <Link to="/user/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                  <button 
                    className="block px-4 py-2 w-full text-left hover:bg-gray-200" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Drawer for Smaller Screens */}
      <div className="drawer sm:hidden absolute z-50 left-0 w-fit">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white m-4"
            />
          </label>
        </div>

        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content relative">
            <li className="w-fit absolute right-2 z-50">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>

            <li>
              <Link to={"/"}>Home</Link>
            </li>

            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to={"/admin/dashboard"}>Admin Dashboard</Link>
              </li>
            )}

            <li>
              <Link to={"/courses"}>All Courses</Link>
            </li>

            <li>
              <Link to={"/contact"}>Contact Us</Link>
            </li>

            <li>
              <Link to={"/about"}>About Us</Link>
            </li>

            {!isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center gap-2">
                  <button className="btn-primary px-4 py-2 font-semibold rounded-full w-full hover:bg-blue-700">
                    <Link to={"/login"}>Login</Link>
                  </button>
                  <button className="btn-secondary px-4 py-2 font-semibold rounded-full w-full hover:bg-pink-700">
                    <Link to={"/signup"}>Signup</Link>
                  </button>
                </div>
              </li>
            )}

            {isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="w-full flex items-center justify-center gap-2">
                  <button 
                    className="w-12 h-12 rounded-full overflow-hidden border-2 border-white"
                    onClick={handleAvatarClick}
                  >
                    <img 
                     src={userData?.avatar?.secure_url}  
                      alt="User Avatar" 
                      className="w-full h-full object-cover" 
                    />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                      <Link to="/user/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                      <button 
                        className="block px-4 py-2 w-full text-left hover:bg-gray-200" 
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      {children}

      <Footer />
    </div>
  );
};

export default Layout;
