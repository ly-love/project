import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import Home from "../pages/home";
import Settings from "../pages/settings/index";
import Record from "../pages/record/index";
import About from "../pages/about/index";
import Extract from "../pages/extract/index";
import Doc from "../pages/doc/index";
import Building from "../pages/building/index";
import NotFound from "../pages/notFound/index";
import Test from "../pages/test/index";


const rootRouter: RouteObject[] = [
  {
    path: "/",
    element: <Navigate replace to="/chat/all_major" />,
  },
  {
    path: "/chat/:id", // 首页
    element: <Home />,
  },
  {
    path: "/extract", // 设计信息抽取
    element: <Extract />,
  },
  {
    path: "/extract/doc", // 设计信息抽取显示文本信息
    element: <Doc />,
  },
  {
    path: "/about", // 关于我们
    element: <About />,
  },
  {
    path: "/record", // 在线人数统计
    element: <Record />,
  },
  {
    path: "/settings", // 设置
    element: <Settings />,
  },
  {
    path: "/building", // 建设中
    element: <Building />,
  },
  {
    path: "/notFound", // 404找不到页面
    element: <NotFound />,
  },
  {
    path: "/test", // 测试页面
    element: <Test />,
  },
  {
    path: "*",
    element: <Navigate replace to="/chat/all_major" />,
  },
];

export default function RouterConfig() {
  return useRoutes(rootRouter);
}
