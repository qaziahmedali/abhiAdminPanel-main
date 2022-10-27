import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { StoreProvider } from 'easy-peasy'
import { setup } from '@ali_nawaz/style-kit'
import { Router } from 'react-router'

import App from './app/App'
import { store } from './store'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '@/config/theme/baseDesign'
import { history } from '@/app/router/history'
setup()
ReactDOM.render(
  <StrictMode>
    <StoreProvider store={store}>
      <ChakraProvider resetCSS theme={theme}>
        <Router history={history}>
          <App />
        </Router>
      </ChakraProvider>
    </StoreProvider>
  </StrictMode>,
  document.getElementById('root')
)
