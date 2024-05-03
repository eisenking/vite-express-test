import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store'
import { RouterProvider } from 'react-router-dom'
import router from './routes.jsx'
// import '@mantine/core/styles.css';

// import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <MantineProvider> */}
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    {/* </MantineProvider> */}
  </React.StrictMode>,
)