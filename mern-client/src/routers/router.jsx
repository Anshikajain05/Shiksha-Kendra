import {
    createBrowserRouter,
    RouterProvider,
}from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop.jsx";
import Blog from "../component/Blog.jsx";
import SingleBook from "../shop/Singlebook.jsx";
import About from "../component/About.jsx";
import Cart from "../component/Cart.jsx"
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import Upload from "../dashboard/Upload.jsx"
import ManageBook from "../dashboard/ManageBook.jsx"
import EditBook from "../dashboard/EditBook.jsx"
import Signup from "../component/Signup.jsx"
import Login from "../component/Login.jsx"
import PrivateRoute from "../Privateroute/PrivateRoute.jsx";
import Logout from "../component/Logout.jsx";
import InspiringStories from "../component/InspiringStories.jsx";
const router = createBrowserRouter([
    {
        path: "/",
        element : <App/>,
        children:[{
            path:'/',
            element: <Home/>
        },
        {
            path:'/shop',
            element:<Shop/>
        },
        {
            path:'/Blog',
            element:<Blog/>
        },
       
        {
            path:'/About',
            element:<About/>
        },
        {
            path:'/Cart',
            element:<Cart/>

        },
        {
path:'/inspiring-stories',
element:<InspiringStories/>
        },
        {
            path:'/book/:id',
            element:<SingleBook/>,
            loader:({params})=> fetch(`http://localhost:5000/book/${params.id}`),
        }
        
    ]
    },
   {
    path:"/admin/dashboard",
    element:<DashboardLayout/>,
    children:[
        {
            path:"/admin/dashboard",
            element:<PrivateRoute><Dashboard/></PrivateRoute>
        },
        {
            path:"/admin/dashboard/Upload",
            element:<Upload/>
        },
        {
            path:"/admin/dashboard/ManageBook",
            element:<ManageBook/>
        },
        {
            path:"/admin/dashboard/EditBook/:id",
            element:<EditBook/>,
            loader:({params})=> fetch(`http://localhost:5000/book/${params.id}`),
        },
      
    ]
   },
    {
        path:"Sign-up",
        element:<Signup/>
    },
    {
        path:"login",
        element:<Login/>
    },
    {
        path:"Logout",
        element:<Logout/>
    },
   
]);
export default router;
