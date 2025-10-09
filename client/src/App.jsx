import { Routes, Route } from "react-router-dom"
import VerifyLayout from "./components/verify/layoutofverify"
import Signin from "./pages/verify/signin"
import Signup from "./pages/verify/signup"
import AdminLayout from "./components/admin-view/layoutofadminview"
import AdminDasboard from "./pages/admin-view/dashboard"
import AdminOrders from "./pages/admin-view/orders"
import AdminProducts from "./pages/admin-view/products"
import AdminFeatures from "./pages/admin-view/features"
import ShoppingLayout from "./pages/shop-view/userlayout"
import NotFound from "./pages/not-found/index"
import ShoppingHome from "./pages/shop-view/home"
import ShoppingListing from "./pages/shop-view/listing"
import ShoppingAccount from "./pages/shop-view/account"
import ShoppingCheckout from "./pages/shop-view/checkout"
import CheckVerified from "./components/common/checkverfied"
import UnauthPage from "./pages/unauth-page"
import { useSelector } from "react-redux"


function App() {

  const { user, isAuthenticated } = useSelector(state => state.auth);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="verify" element={<CheckVerified isAuthenticated={isAuthenticated} user={user}><VerifyLayout /></CheckVerified>}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/admin" element={<CheckVerified isAuthenticated={isAuthenticated} user={user}><AdminLayout /></CheckVerified>}>
          
          <Route path="dashboard" element={<AdminDasboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>
        <Route path="/shop" element={<CheckVerified isAuthenticated={isAuthenticated} user={user}><ShoppingLayout /></CheckVerified>}>
          <Route path="*" element={<NotFound />} />
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  )
}

export default App;
