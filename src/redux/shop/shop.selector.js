import {createSelector } from 'reselect';

const selectshop = state => state.shop;


export const selectCollections = createSelector(
    [selectshop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
)

export const selectCollection = collectopnUrlParam =>
    createSelector(
        [selectCollections],
        collections => collections[collectopnUrlParam]
    )