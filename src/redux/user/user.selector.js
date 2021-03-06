import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
)

export const selectToken = createSelector(
    [selectUser],
    user => user.token
)

export const selectCabinetData = createSelector(
    [selectUser],
    user=>user.cabinetData
)

export const selectLoadedKey = createSelector(
    [selectUser],
    user => user.loadedKeyId
)

export const selectUserCompanies = createSelector(
    [selectUser],
    user=>user.userCompanies
)

export const selectKeyUser = createSelector(
    [selectUser],
    user => user.keyUser
)

export const selectIsAferta = createSelector(
    [selectUser],
    user => user.isAferta
)
export const selectKeyIsRouming = createSelector(
    [selectUser],
    user => user.isRouming
)

export const selectUserProducts = createSelector(
    [selectUser],
    user => user.products
)