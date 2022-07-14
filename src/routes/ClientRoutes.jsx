import { Redirect, Route, Switch } from "react-router-dom";
import LadingPage from "../screens/Landing/screens/LadingPage";
import slug from "../resources/slug";
import DetailsProduct from "../screens/Product/screens/DetailsProduct";
import ProductPage from "../screens/Product/screens/ProductPage";
import NewsPage from "../screens/News/screens/NewsPage";
import DetailsNewsPage from "../screens/News/screens/DetailsNewsPage";
import IntroducePage from "../screens/Introduce/screens/IntroducePage";
import DealerPage from "../screens/Dealer/screens/DealerPage";
import ContactPage from "../screens/Contact/screens/ContactPage";
import StorePage from "../screens/Store/screens/StorePage";
import SearchPage from "../screens/Search/screens/SearchPage";
const ClientRoutes = (props) => {
  return (
    <>
      <Switch>
        <Route
          exact
          path={slug.home}
          render={() => <LadingPage {...props} />}
        ></Route>

        <Route
          exact
          path={slug.detailsProduct}
          render={(props) => <DetailsProduct {...props} />}
        ></Route>
        <Route
          exact
          path={slug.product}
          render={(props) => <ProductPage {...props} />}
        ></Route>
        <Route
          exact
          path={slug.detailsNews}
          render={(props) => <DetailsNewsPage {...props} />}
        ></Route>

        <Route
          exact
          path={slug.introduce}
          render={(props) => <IntroducePage {...props} />}
        ></Route>

        <Route
          exact
          path={slug.store}
          render={(props) => <StorePage {...props} />}
        ></Route>

        <Route
          exact
          path={slug.search}
          render={(props) => <SearchPage {...props} />}
        ></Route>

        <Route
          exact
          path={slug.dealer}
          render={(props) => <DealerPage {...props} />}
        ></Route>
        <Route
          exact
          path={slug.contact}
          render={(props) => <ContactPage {...props} />}
        ></Route>
        <Route
          exact
          path={slug.news1}
          render={(props) => <NewsPage {...props} />}
        ></Route>
      </Switch>
    </>
  );
};

export default ClientRoutes;
