import React from "react";
import CollectionsOverview from "@components/collections-overview/collections-overview.component";
import Collection from "@pages/collection/collection.component";
import { Route } from "react-router-dom";

const ShopPage = ({match}) =>(
    <div className="shop">
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionID`} component={Collection} />
    </div>
  );

export default ShopPage;
