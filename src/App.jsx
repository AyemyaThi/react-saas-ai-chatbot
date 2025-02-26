import { Provider } from 'react-redux'
import store from './store.js'
import Chatbot from './components/Chatbot'
import Auth from './components/Auth'

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <Auth />
        <Chatbot />
      </div>
    </Provider>
  );
}

export default App;
