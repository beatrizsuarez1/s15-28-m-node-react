// import { useCookies } from 'react-cookie';
// import jwt from 'jsonwebtoken';

// const SECRET_KEY = import.meta.env.VITE_API_KEY; 

// const useValidToken = () => {
//     const [cookies, setCookie, removeCookie] = useCookies(['token']);

//     const isValideToken = async () => {
//         const token = cookies.token;
//         if (!token) {
//             localStorage.removeItem('user');
//             return false;
//         }

//         try {
//             const decoded  = jwt.verify(token, SECRET_KEY);
//             if (decoded  && decoded .exp > Date.now() / 1000) {
                
                
                
                
//                 if (!localStorage.getItem('user')) {
//                     const response = await fetch('/api/user', {
//                         method: 'GET',
//                         credentials: 'include'
//                     });

//                     if (response.ok) {
//                         const userData = await response.json();
//                         localStorage.setItem('user', JSON.stringify(userData));
//                     } else {
//                         localStorage.removeItem('user');
//                         return false;
//                     }
//                 }
//                 return true;
//             } else {
//                 localStorage.removeItem('user');
//                 return false;
//             }
//         } catch (error) {
//             console.error('Token verification error:', error);
//             localStorage.removeItem('user');
//             return false;
//         }
//     };

//     return { isValideToken };
// };

// export default useValidToken;
