import { Provider } from "react-redux"
import { BrowserRouter, HashRouter } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
import { store } from "./store/store"

export const Calendar = () => {
  return (
    <Provider store={ store }>
      {/* <BrowserRouter> */}
      <HashRouter>
          <AppRouter />
      </HashRouter>
      {/* </BrowserRouter> */}
    </Provider>
  )
}
