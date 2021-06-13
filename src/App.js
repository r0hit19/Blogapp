import './App.css';
import { UserContextProvider } from './contexts/user';
import { Home } from './pages';
import Modal from 'react-modal';
Modal.setAppElement('#root');

function App() {
  return (
    
    <UserContextProvider>
    <div className="app">
       <Home/>
    </div>   
    </UserContextProvider>
     
   
  );
}

export default App;
