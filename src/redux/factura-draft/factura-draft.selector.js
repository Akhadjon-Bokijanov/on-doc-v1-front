import { createSelector } from 'reselect';

const fDraftSelector = state => state.facturaDraft;

export const selectDrafts = createSelector(
    [fDraftSelector],
    fdraft => fdraft.draftFactura
)