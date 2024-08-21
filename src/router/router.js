import {createBrowserRouter } from 'react-router-dom';
import EmployeeDashboard from '../pages/EmployeeDashboard/EmployeeDashboard';
import App from '../App'
import ProtectedRoute from './protectedRoute';

const isAuthenticated = localStorage.getItem('token');

export const router = createBrowserRouter([
    {
      path:'/',
      element:<App />,
      errorElement:<div>404 Not Found</div>
    },
    {
      path:'/dashboard',
      element:<ProtectedRoute element={<EmployeeDashboard />} 
      isAuthenticated={isAuthenticated} />
    },
    {
      path:'/login',
      element:<App />
    }

  ]);