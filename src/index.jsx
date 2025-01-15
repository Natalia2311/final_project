import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App';
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <HashRouter basename="/news_explorer">
      <App />
    </HashRouter>
    <App />
  </React.StrictMode>,
)
