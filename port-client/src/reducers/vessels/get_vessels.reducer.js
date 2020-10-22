import { veeselsConstants } from "../../constants/veesels.constants";

const initialState = { waiting: false, updated: false, errors: [] };

// todo: this can be splitted
export default function get_vessels_reducer(state = initialState, action) {
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
    case veeselsConstants.GET_BY_ID_REQUEST:
      return {
        waiting: true,
        updated: false
      };
    case veeselsConstants.GET_BY_ID_SUCCESS:
      return {
        waiting: false,
        updated: true,
        veessel: action.data.data
      };
    case veeselsConstants.GET_BY_ID_FAILURE:
      return {
        waiting: false,
        error: action.error
      };
    case veeselsConstants.MARK_LEFT_REQUEST:
      return {
        waiting: true,
        updated: false
      };
    case veeselsConstants.MARK_LEFT_SUCCESS:
      return {
        waiting: false,
        updated: true,
        veessel: action.data
      };
    case veeselsConstants.MARK_LEFT_FAILURE:
      return {
        waiting: false,
        error: action.error
      };
    default:
      return state
  }
}
