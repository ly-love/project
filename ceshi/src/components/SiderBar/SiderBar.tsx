import React, { useState, useEffect, memo } from "react";
import classNames from "classnames";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./SiderBar.module.scss";
import { menuList } from "../../utils/chatData";
import logoUrl from "../../assets/images/logo.png";
import onlineUrl from "../../assets/images/online.png";
import { message } from "antd";
function SiderBar() {
  // console.log("SiderBar");
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const [count, setCount] = useState(10);

  useEffect(() => {
    const ws =
      process.env.REACT_APP_ENV !== "test"
        ? new WebSocket("wss://192.10.50.67/websocket")
        : new WebSocket("wss://www.aicodeas.com/websocket");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };
    // 监听消息事件，当从服务器接收到消息时触发
    ws.onmessage = (event) => {
      const onlineCount = parseInt(event.data, 10);
      if (!isNaN(onlineCount)) {
        setCount(onlineCount); // 更新在线人数
      }
    };
    // ws.onerror = function (error) {
    //   console.error('WebSocket Error:', error);
    // };
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []); // 空依赖数组,只在组件挂载时运行一次

  const downloadApplication = () => {
    messageApi.open({
      type: "warning",
      content: "应用程序升级中，敬请期待！",
    });
    // return;
    // const appUrl =
    //   process.env.REACT_APP_ENV !== "test"
    //     ? "http://192.10.50.67/file/app/intelligent.exe"
    //     : "https://aicodeas.com/file/app/intelligent.exe"; // 下载URL

    // const link = document.createElement("a"); // 创建一个 a 元素
    // link.href = appUrl;
    // link.download = "智能设计.zip"; // 保存的文件名
    // link.style.display = "none"; // 隐藏链接
    // document.body.appendChild(link); // 将 a 元素添加到文档中
    // link.click(); // 模拟点击以触发下载
    // document.body.removeChild(link); // 移除 a 元素
  };

  return (
    <div className={classNames(styles.sider, "column")}>
      <div
        className={classNames(styles.logo, "center", "pointer")}
        onClick={() => navigate("/chat")}
      >
        <img src={logoUrl} alt="logo" />
        <span>智能设计助手</span>
      </div>

      <div className={styles.menu}>
        {menuList.map((item) => (
          <NavLink
            to={item.path}
            key={item.id}
            className={({ isActive }) =>
              classNames([
                styles.list,
                isActive ? styles.active : "",
                "pointer",
              ])
            }
          >
            {item.title}
          </NavLink>
        ))}
      </div>

      <div className={classNames(styles.operate, "center", "pointer")}>
        <div className={styles.aboutus} onClick={() => navigate("/about")}>
          {/* <img src={aboutusUrl} alt="" /> */}
          <span
            style={{
              color: "#00a0e9",
              fontSize: "18px",
            }}
            className={classNames(styles.icon, "iconfont icon-guanyuwomen")}
          ></span>
          <div>关于我们</div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.download} onClick={downloadApplication}>
          {/* <img src={downloadUrl} alt="" /> */}
          <span
            style={{
              color: "#00a0e9",
              fontSize: "18px",
            }}
            className={classNames(styles.icon, "iconfont icon-xiazai")}
          ></span>
          <div>应用下载</div>
          {contextHolder}
        </div>
      </div>
      <div
        className={classNames(styles.online, "align", "pointer")}
        // onClick={() => navigate("/record")}
      >
        <img src={onlineUrl} alt="" />
        在线人数 ：<span className={styles.count}>{count}</span>
      </div>
    </div>
  );
}

export default memo(SiderBar);
