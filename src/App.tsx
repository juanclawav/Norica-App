
// Importar el StoreProvider
import {StoreProvider} from './store/StoreProvider'; 
import { BrowserRouter } from 'react-router-dom';

// Componentes
import {MainRouter} from './router/MainRouter'; 
function App() {
  return (
    <>
      <StoreProvider>
        <BrowserRouter>
          <MainRouter />
        </BrowserRouter>
      </StoreProvider>
    </>
  );
}

export default App;
