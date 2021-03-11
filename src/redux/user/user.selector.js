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

export const selectUserCompanies = createSelector(
    [selectUser],
    user=>user.userCompanies
)