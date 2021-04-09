import { FACTURA_DRAFT_ACTION_TYPES } from "./factura-draft.action-types";

export const saveFacturaDraft = (values, tin, productList)=>({
    type: FACTURA_DRAFT_ACTION_TYPES.SAVE_FACTURA_DRAFT,
    payload: {values, tin, productList}
})