import Home from '../components/Home/Home';
import Friend from '../components/Friends/Friend';
import Infor from '../components/Infor/Infor';
import Messages from "../components/Messages/Messages"
export const ROUTES =[
    {
        path:'/',
        name:'Trang chủ',
        exact:true,
        component:Home,
        defaultSelectedKeys:1
    },

    {
        path:'/infor',
        name:'trang cá nhân',
        exact:false,
        component:Infor,
        defaultSelectedKeys:4
    },
    {
        path:'/messages',
        name:'tin nhắn',
        exact:false,
        component:Messages,
        defaultSelectedKeys:3
    },
   
    {
        path:'/friend',
        name:'bạn bè',
        exact:false,
        component:Friend,
        defaultSelectedKeys:2
    }
    
];