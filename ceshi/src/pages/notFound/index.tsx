import React from "react";
import { NavLink } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>页面找不到了</h2>
      <p>对不起，您要找的页面不存在。请检查URL或返回主页。</p>
      <NavLink to="/">返回主页</NavLink>
    </div>
  );
};
export default NotFound;
