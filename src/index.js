import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#84ae92',
            fontFamily:
              "'NanumSquareRoundBold', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          },
        }}
      >
        <App />
      </ConfigProvider>
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
