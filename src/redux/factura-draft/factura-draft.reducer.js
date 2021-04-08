import { FACTURA_DRAFT_ACTION_TYPES } from "./factura-draft.action-types"


const INITIAL_STATE = {
    draftFactura:{},
}

const facturaDraftReducer = (state = INITIAL_STATE, action)=>{

    switch(action.type){
        case FACTURA_DRAFT_ACTION_TYPES.SAVE_FACTURA_DRAFT:{
            
            let drafts = state.draftFactura
            drafts[action.payload.tin] = action.payload.values

            return { ...state, draftFactura: {...drafts} }
        }
        default: return state;
    }
}

export default facturaDraftReducer;