import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ConfigProvider, theme } from 'antd'
import thTH from 'antd/lib/locale/th_TH'

//const primaryColor = '#6BBBA4'
//const secondaryColor = '#DE6D36'

const customTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: "#6bbba4",
    colorInfo: "#6bbba4",
    colorSuccess: "#97cb59",
    colorWarning: "#f2c850",
    colorError: "#f55200",
    colorTextBase: "#222222",
    colorBgBase: "#fefefe",
    colorLink: "#235255",
    motion: false,
  },
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={thTH} theme={customTheme}> 
      <App />
    </ConfigProvider>
  </StrictMode>,
)
