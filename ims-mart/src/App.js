import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop.jsx';
import Product from './Pages/Product.jsx';
import Cart from './Pages/Cart.jsx';
import LoginSignUp from './Pages/LoginSignUp.jsx';
import ShopCategory from './Pages/ShopCategory.jsx';
import Footer from './Components/Footer/Footer.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/men' element={<ShopCategory category='men'/>}/>
        <Route path='/women' element={<ShopCategory category='women'/>}/>
        <Route path='/kids' element={<ShopCategory category='kid'/>}/>
        <Route path='/mobile' element={<ShopCategory category='mobile'/>}/>
        <Route path='/leptop' element={<ShopCategory category='leptop'/>}/>
        <Route path='/accessories' element={<ShopCategory category='accessories'/>}/>
        <Route path='/Product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignUp/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
