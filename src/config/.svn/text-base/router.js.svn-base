//加载模板文件  
import Main_router from '../components/Main_router'  
import TravelSet from '../components/TravelSet'  
import ManageSud from '../components/ManageSud'  
import NoticeManage from '../components/NoticeManage'  
import DocManage from '../components/DocManage'  
import ServerManage from '../components/ServerManage' 
import MapManage from '../components/MapManage' 
import OnlineUpdate from '../components/OnlineUpdate' 
import ManageRole from '../components/ManageRole' 
import LogManage from '../components/LogManage' 
import Setting from '../components/Setting'
//路由规则设置  
export default [
    {  
        path: '/', 
        name:"主页",
         hashbang: true,
        component: Main_router,
        
    },  
     {  
        path: '/OnlineUpdate', 
        name:"在线升级",
         hashbang: true,
        component: OnlineUpdate,
        
    }, 
    {  
        path: '/ManageRole', 
        name:"角色管理",
         hashbang: true,
        component: ManageRole,
        
    }, 
    {  
        path: '/TravelSet',  
        name:"巡航设备",
         hashbang: true,
        component: TravelSet,
    },
      {  
        path: '/MapManage',  
        name:"地图服务",
         hashbang: true,
        component: MapManage,
    },
    {  
        path: '/ManageSud',  
        name:"用户管理",
        component: ManageSud,
    },
     {  
        path: '/NoticeManage',  
        name:"公告管理",
        component: NoticeManage,
    },
     {  
        path: '/DocManage',  
        name:"字典管理",
        component: DocManage,
    },
    {  
        path: '/ServerManage',  
        name:"服务器",
         hashbang: true,
        component: ServerManage,
    },
    {  
        path: '/LogManage',  
        name:"日志管理",
         hashbang: true,
        component: LogManage,
    },
    {  
        path: '/Setting',  
        name:"系统配置",
         hashbang: true,
        component: Setting,
    },
     {path: '*', component: Main_router }
]  