import { Redirect, Route, Switch } from "react-router-dom";
import adminSlug from "../resources/AdminSlug";
import DealerManager from "../screens/Admin/DealerManager/screens/DealerManager";
import AddDealer from "../screens/Admin/DealerManager/screens/AddDealer";
import EditDealer from "../screens/Admin/DealerManager/screens/EditDealer";
import ProductManager from "../screens/Admin/Product Manager/screens/ProductManager";
import OrderManager from "../screens/Admin/OrderManager/screens/OrderManager";
import EditOrder from "../screens/Admin/OrderManager/screens/EditOrder";
import UpdatePassword from "../screens/Admin/Password/screens/UpdatePassword";

const AdminRoutes = (props) => {
  const handleLoading = props.handleLoading;
  return (
    <>
      <Switch>
        <Route
          exact
          path={adminSlug.productManager}
          render={(props) => (
            <ProductManager {...props} handleLoading={handleLoading} />
          )}
        ></Route>

        <Route
          exact
          path={adminSlug.orderManager}
          render={(props) => (
            <OrderManager {...props} handleLoading={handleLoading} />
          )}
        ></Route>

        <Route
          exact
          path={adminSlug.editOrder}
          render={(props) => (
            <EditOrder {...props} handleLoading={handleLoading} />
          )}
        ></Route>

        {/* <Route
          exact
          path={adminSlug.editProduct}
          render={(props) => (
            <EditProduct {...props} handleLoading={handleLoading} />
          )}
        ></Route>

        <Route
          exact
          path={adminSlug.createProduct}
          render={(props) => (
            <CreateProduct {...props} handleLoading={handleLoading} />
          )}
        ></Route> */}

        <Route
          exact
          path={adminSlug.dealerManager}
          render={(props) => (
            <DealerManager {...props} handleLoading={handleLoading} />
          )}
        ></Route>

        <Route
          exact
          path={adminSlug.addDealer}
          render={(props) => (
            <AddDealer {...props} handleLoading={handleLoading} />
          )}
        ></Route>

        <Route
          exact
          path={adminSlug.editDealer}
          render={(props) => (
            <EditDealer {...props} handleLoading={handleLoading} />
          )}
        ></Route>

        <Route
          exact
          path={adminSlug.updatePassword}
          render={(props) => (
            <UpdatePassword {...props} handleLoading={handleLoading} />
          )}
        ></Route>
      </Switch>
    </>
  );
};

export default AdminRoutes;
