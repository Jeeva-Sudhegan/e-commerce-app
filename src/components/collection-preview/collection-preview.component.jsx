import React from "react";
import "./collection-preview.styles.scss";
import CollectionItem from "@components/collection-item/collection-item.component";

const CollectionPreview = ({ title, items }) => (
    <div className='collection-preview'>
        <h1 className = 'title'>{title}</h1>
        <div className='preview'>
            {
                items
                    .filter((_, idx) => idx < 4 )
                    .map(({id, ...others}) => (
                        <CollectionItem id = {id} {...others} />
                    ))
            }
        </div>
    </div>
)

export default CollectionPreview;