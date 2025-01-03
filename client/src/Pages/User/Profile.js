// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Layout from "../../Layout/Layout";
// import { getUserData } from "../../Redux/authSlice";
// import { cancelCourseBundle } from "../../Redux/razorpaySlice";

// const Profile = () => {
//   const dispatch = useDispatch();

//   const userData = useSelector((state) => state?.auth?.data);

//   // function to handle the cancel subscription of course
//   const handleCourseCancelSubscription = async () => {
//     await dispatch(cancelCourseBundle());
//     await dispatch(getUserData());
//   };

//   useEffect(() => {
//     // getting user details
//     dispatch(getUserData());
//   }, []);
//   return (
//     <Layout>
//       <div className="min-h-[90vh] flex items-center justify-center">
//         <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black]">
//           <img
//             className="w-40 m-auto rounded-full border border-black"
//             src={userData?.avatar?.secure_url}
//             alt="user profile image"
//           />

//           <h3 className="text-xl font-semibold text-center capitalize">
//             {userData.fullName}
//           </h3>

//           <div className="grid grid-cols-2 overflow-hidden text-ellipsis whitespace-nowrap cursor-default select-none"   tabIndex="-1">
//             <p>Email :</p>
//             <p>{userData?.email}</p>
//             <p>Role :</p>
//             <p>{userData?.role}</p>
//             <p>Subscription :</p>
//             <p>
//               {userData?.subscription?.status === "active"
//                 ? "Active"
//                 : "Inactive"}
//             </p>
//           </div>

//           {/* button to change the password */}
//           <div className="flex items-center justify-between gap-2">
//             <Link
//               to={
//                 userData?.email === "test@gmail.com"
//                   ? "/denied"
//                   : "/changepassword"
//               }
//               className="w-1/2 bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300   py-2 rounded-sm font-semibold cursor-pointer text-center"
//             >
//               <button>Change Password</button>
//             </Link>

//             <Link
//               to={
//                 userData?.email === "test@gmail.com"
//                   ? "/denied"
//                   : "/user/editprofile"
//               }
//               className="w-1/2 border border-yellow-600 hover:border-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
//             >
//               <button>Edit Profile</button>
//             </Link>
//           </div>

//           {userData?.subscription?.status === "active" && (
//             <button
//               onClick={handleCourseCancelSubscription}
//               className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
//             >
//               Cancel Subscription
//             </button>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Profile;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../../Layout/Layout";
import { getUserData } from "../../Redux/authSlice.js";
import { cancelCourseBundle } from "../../Redux/razorpaySlice.js";

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.auth?.data);

  // Function to handle the cancel subscription of course
  const handleCourseCancelSubscription = async () => {
    try {
      await dispatch(cancelCourseBundle());
      await dispatch(getUserData());
    } catch (error) {
      console.error("Failed to cancel subscription:", error);
    }
  };

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  if (!userData) return <p>Loading...</p>; // Handle loading state

  return (
    <Layout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black]">
          <img
            className="w-40 m-auto rounded-full border border-black"
            src={userData?.avatar?.secure_url || 'default-avatar-url.jpg'} // Fallback image
            alt="user profile image"
          />

          <h3 className="text-xl font-semibold text-center capitalize">
            {userData.fullName}
          </h3>

          <div className="grid grid-cols-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <p>Email:</p>
            <p className="relative overflow-hidden text-ellipsis whitespace-nowrap" title={userData?.email}>
              {userData?.email}
              <span className="absolute left-0 bottom-full mb-1 px-2 py-1 text-sm bg-gray-700 text-white rounded-md opacity-0 transition-opacity duration-300 hover:opacity-100">
                {userData?.email}
              </span>
            </p>
            <p>Role:</p>
            <p>{userData?.role}</p>
            <p>Subscription:</p>
            <p>{userData?.subscription?.status === "active" ? "Active" : "Inactive"}</p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <Link
              to={userData?.email === "test@gmail.com" ? "/denied" : "/changepassword"}
              className="w-1/2 bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 py-2 rounded-sm font-semibold text-center"
            >
              Change Password
            </Link>

            <Link
              className="w-1/2 border border-yellow-600 hover:border-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-center"
            >
              Edit Profile
            </Link>
          </div>

          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCourseCancelSubscription}
              className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-center"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
