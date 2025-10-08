import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children, requiredRole}) => {

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if(!token){
       return <Navigate to='/login' />
    }

    if(role === 'ADMIN' && role !== requiredRole){
        return <Navigate to='/admin' />
    }

    if(role === 'USER' && role !== requiredRole){
        return <Navigate to='/user' />
    }

   return children;
}

export default ProtectedRoute