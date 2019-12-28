import React from "react";
import "./collections-overview.styles.scss";
import CollectionPreview from "@components/collection-preview/collection-preview.component";
import { createStructuredSelector } from "reselect";
import { selectCollectionsForPreview } from "@redux/shop/shop.selectors";
import { connect } from "react-redux";

const CollectionsOverview = ({collections}) => (
    <div className="collections-overview">
        {collections.map(({ id, ...others }) => (
        <CollectionPreview key={id} {...others} />
      ))}
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview);
