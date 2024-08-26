import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import "./App.css";
import RouterConfig from "./router/index";
import SiderBar from "./components/SiderBar/SiderBar";
import UpdateContent from "./components/UpdateContent/UpdateContent";
import qrCodeSrc from "./assets/images/Qrcode.png";

const { Sider, Content } = Layout;

function App() {
  const [flag, setFlag] = useState(true);

  // // 检测窗口是不是在最上面，可以防止iframe引入
  useEffect(() => {
    if (window.top !== window.self) {
      window.top!.location.href = window.location.href;
      // setFlag(false);
    }
  }, []);

  // useEffect(() => {
  //   const detectDevTools = () => {
  //     const before = Date.now();
  //     debugger;
  //     const after = Date.now();
  //     if (after - before > 100) {
  //       window.location.href = "https://www.baidu.com";
  //       // navigate('/notFound');
  //     }
  //   };
  //   const interval = setInterval(detectDevTools, 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // 禁用F12和右键
  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (
  //       event.key === "F12" ||
  //       (event.ctrlKey && event.shiftKey && event.key === "I")
  //     ) {
  //       event.preventDefault();
  //       alert("哎呀，一溜烟儿飞走了");
  //     }
  //   };
  //   const handleContextMenu = (event: MouseEvent) => {
  //     event.preventDefault();
  //     alert("哎呀，一溜烟儿飞走了");
  //   };
  //   process.env.REACT_APP_ENV !== "test" &&
  //     window.addEventListener("keydown", handleKeyDown);
  //   process.env.REACT_APP_ENV !== "test" &&
  //     window.addEventListener("contextmenu", handleContextMenu);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //     window.removeEventListener("contextmenu", handleContextMenu);
  //   };
  // }, []);

  return (
    <div className="App">
      {flag ? (
        <>
          <Layout className="container">
            <Sider width={192}>
              <SiderBar />
            </Sider>
            <Content className="main">
              <RouterConfig />
            </Content>
          </Layout>
          <UpdateContent />
        </>
      ) : (
        <div className="noIframe">
          <h2>哎呀，一溜烟儿飞走了!</h2>
          <p>快来扫我，一起潜入专业知识的海洋</p>
          <img src={qrCodeSrc} alt="扫码进群" />
        </div>
      )}
      {/* <Layout className="container">
        <Sider width={192}>
          <SiderBar />
        </Sider>
        <Content className="main">
          <RouterConfig />
        </Content>
      </Layout>
      <UpdateContent /> */}
    </div>
  );
}

export default App;
