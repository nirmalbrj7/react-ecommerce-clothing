import React from "react";
import {connect} from "react-redux";
import CollectionPreview from "../../components/collection/collection.component";
import {selectCollectionsForPreview} from "../../redux/shop/shop.selector";

import {createStructuredSelector} from "reselect";

import './collections-overview.styles.scss';


const CollectionsOverview = ({collections}) =>(
    <div className='collection-overview'>
        {
            collections.map(({id,...otherCollectionProps}) => (
                <CollectionPreview key={id} {...otherCollectionProps} />
            ) )
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionsOverview)