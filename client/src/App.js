import { Provider } from "react-redux";
import { store } from "./store/store";
import { Approuter } from "./router/Approuter";

function App() {
  return (
    <Provider store={store}>
       <Approuter/>
    </Provider>
  );
}

export default App;
