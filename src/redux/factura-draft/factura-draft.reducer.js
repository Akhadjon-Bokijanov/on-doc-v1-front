import { FACTURA_DRAFT_ACTION_TYPES } from "./factura-draft.action-types"


const INITIAL_STATE = {
    draftFactura:{},
}

const facturaDraftReducer = (state = INITIAL_STATE, action)=>{

    switch(action.type){
        case FACTURA_DRAFT_ACTION_TYPES.SAVE_FACTURA_DRAFT:{
            
            let drafts = state.draftFactura
            
            drafts[action.payload.id] = action.payload.values
            //drafts[action.payload.tin].productList = action.payload.productList

            return { ...state, draftFactura: {...drafts} }
        }
        default: return state;
    }
}

export default facturaDraftReducer;