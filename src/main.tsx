import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ConfigProvider } from 'antd'
import thTH from 'antd/lib/locale/th_TH'

const customTheme = {
  token: {
    colorPrimary: '#6BBBA4',
    motion: false,

  }
}

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <ConfigProvider 
      locale={thTH} 
      theme={customTheme}
    > 
      <App />
    </ConfigProvider>
  </StrictMode>,
)
