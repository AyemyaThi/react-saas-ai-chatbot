import { Provider } from 'react-redux'
import store from './store'
import Chatbot from './components/Chatbot'

function App() {
  return (
    <Provider store={store}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4"> AI Chatbot</h1>
        <Chatbot />
      </div>
    </Provider>
  );
}

export default App;
