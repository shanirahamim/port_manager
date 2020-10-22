import { veeselsConstants } from "../../constants/veesels.constants";

const initialState = { waiting: false, updated: false, errors: [] };

export default function vessels_reducer(state = initialState, action) {
  switch (action.type) {
    case veeselsConstants.ARRIVED_REQUEST:
      return {
        waiting: true,
        updated: false,
        errors: []
      };
    case veeselsConstants.ARRIVED_SUCCESS:
      return {
        waiting: false,
        updated: true,
        veessel: action.data
      };
    case veeselsConstants.ARRIVED_FAILURE:
      return {
        waiting: false,
        error: action.error
      };
    default:
      return state
  }
}
