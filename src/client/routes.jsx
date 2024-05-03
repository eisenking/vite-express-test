import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import App from './App.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import PrivateRoute from './layouts/PrivateRoute/PrivateRoute.jsx';
import CatalogScreen from './screens/CatalogScreen/CatalogScreen.jsx';
import ProductScreen from './screens/ProductScreen/ProductScreen.jsx';
import LoginScreen from './screens/LoginScreen/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen.jsx';
import OrderScreen from './screens/OrderScreen/OrderScreen.jsx';
import DeliveryScreen from './screens/DeliveryScreen/DeliveryScreen.jsx';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen.jsx';
import TastingsPage from './pages/TastingsPage/TastingsPage.jsx';
import AboutBonusesScreen from './screens/AboutBonusesScreen/AboutBonusesScreen.jsx';
import AboutPaymentScreen from './screens/AboutPaymentScreen/AboutPaymentScreen.jsx';
import AboutDeliveryScreen from './screens/AboutDeliveryScreen/AboutDeliveryScreen.jsx';
import AboutPolicyScreen from './screens/AboutPolicyScreen/AboutPolicyScreen.jsx';
import ThanksForOrderScreen from './screens/ThanksForOrderScreen/ThanksForOrderScreen.jsx';
import SomethingWrongWithOrderScreen from './screens/SomethingWrongWithOrderScreen/SomethingWrongWithOrderScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/catalog' element={<CatalogScreen />}>
        <Route path='/catalog/page/:pageNumber' element={<CatalogScreen />} />
      </Route>
      <Route path='/tastings' element={<TastingsPage />} />
      <Route path='/bonus' element={<AboutBonusesScreen />} />
      <Route path='/aboutdelivery' element={<AboutDeliveryScreen />} />
      <Route path='/pricing' element={<AboutPaymentScreen />} />
      <Route path='/policy' element={<AboutPolicyScreen />}/>
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/product/:id/order' element={<OrderScreen />} />
      <Route path='/product/:id/delivery' element={<DeliveryScreen />} />
      <Route path='/thankyou' element={<ThanksForOrderScreen />} />
      <Route path='/sorry' element={<SomethingWrongWithOrderScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      {/* Registered users */}
      <Route path='' element={<PrivateRoute />}>
        {/* <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} /> */}
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      {/* Admin users */}
    </Route>
  )
);

export default router;