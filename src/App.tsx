import './App.css';
import ProductsList from './Products/ProductsList';
import ProductsForm from './Products/ProductForm';
import store from './store';
import { Provider } from 'react-redux';
import Cart from './Cart/Cart';

function App() {
  return (
    <Provider store = {store}>
      <div className="App">
      <ProductsList />
      <ProductsForm />
      <Cart />
      </div>
    </Provider>
  );
}

export default App;
