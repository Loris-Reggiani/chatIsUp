// import { useContext, createContext, useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import jwt_decode from 'jwt-decode';  // Adjusted import

// interface User {
//   id: string;
//   role: string;
//   username: string;
//   email: string;
// }

// const UserContext = createContext<User | null>(null);

// interface UserProviderProps {
//   children: React.ReactNode;
// }

// export const UserProvider = ({ children }: UserProviderProps) => {
//     const [user, setUser] = useState<User | null>(null);

//     useEffect(() => {
//         const token = Cookies.get('Token');
//         if (token) {
//             try {
//                 // Specify the expected type of the decoded token directly in the jwt_decode generic
//                 const decoded = jwt_decode<User>(token); // Directly use User type
//                 setUser({ 
//                     id: decoded.id, 
//                     role: decoded.role, 
//                     username: decoded.username, 
//                     email: decoded.email 
//                 });
//             } catch (error) {
//                 console.error('Error decoding token:', error);
//                 setUser(null);
//             }
//         }
//     }, []);

//     return (
//         <UserContext.Provider value={user}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// export const useUser = () => useContext(UserContext);
