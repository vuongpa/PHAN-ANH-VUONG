import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      componentSize="large"
      theme={{
        token: {
          colorTextLabel: "#333",
          fontSize: 16,
          controlHeight: 55,
          borderRadius: 10,
          colorPrimary: "#0e2d59",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
