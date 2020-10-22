import { vesselsService } from '../services/veesels.service';
import { veeselsConstants } from "../constants/veesels.constants";

//note: this was written in order to activate express endpoints. 
// we could also update server by sending data through the open ws connection. 
export const registerArrived = (data) => {
    return (dispatch) => {

        dispatch(request(data));

        vesselsService.registerArrived(data)
        .then(
          result => {
            if(result) {
              if(result.error){
                dispatch(failure(result));
              } else {
                dispatch(success(result));
              }
            }
          },
          error => {
            dispatch(failure(error.toString()));
          }
      );

        
        function request() { return { type: veeselsConstants.ARRIVED_REQUEST } }
        function success(data) { return { type: veeselsConstants.ARRIVED_SUCCESS, data } }
        function failure(error) { return { type: veeselsConstants.ARRIVED_FAILURE, error } }
    }
};


export const markLeft = (data) => {
    return (dispatch) => {

        dispatch(request(data));
        
        vesselsService.markLeft(data)
        .then(
          result => {
            if(result) {
              if(result.error){
                dispatch(failure(result));
              } else {
                dispatch(success(result));
              }
            }
          },
          error => {
            dispatch(failure(error.toString()));
          }
      );

        
        function request() { return { type: veeselsConstants.MARK_LEFT_REQUEST } }
        function success(data) { return { type: veeselsConstants.MARK_LEFT_SUCCESS, data } }
        function failure(error) { return { type: veeselsConstants.MARK_LEFT_FAILURE, error } }
    }
};


export const removeVessel = (data) => {
    return (dispatch) => {

        dispatch(request(data));
        
        vesselsService.removeVessel(data)
        .then(
          result => {
            if(result) {
              if(result.error){
                dispatch(failure(result));
              } else {
                dispatch(success(result));
              }
            }
          },
          error => {
            dispatch(failure(error.toString()));
          }
      );

        
        function request() { return { type: veeselsConstants.ARRIVED_REQUEST } }
        function success(data) { return { type: veeselsConstants.ARRIVED_SUCCESS, data } }
        function failure(error) { return { type: veeselsConstants.ARRIVED_FAILURE, error } }
    }
};



export const getById = (id) => {
    return (dispatch) => {

        dispatch(request(id));
        
        vesselsService.getById(id)
        .then(
          result => {
            if(result) {
              if(result.error){
                dispatch(failure(result));
              } else {
                dispatch(success(result));
              }
            }
          },
          error => {
            dispatch(failure(error.toString()));
          }
      );

        
        function request() { return { type: veeselsConstants.GET_BY_ID_REQUEST } }
        function success(data) { return { type: veeselsConstants.GET_BY_ID_SUCCESS, data } }
        function failure(error) { return { type: veeselsConstants.GET_BY_ID_FAILURE, error } }
    }
};




export const getAll = () => {
    return (dispatch) => {

        dispatch(request());
        
        vesselsService.getAll()
        .then(
          result => {
            if(result) {
              if(result.error){
                dispatch(failure(result));
              } else {
                dispatch(success(result));
              }
            }
          },
          error => {
            dispatch(failure(error.toString()));
          }
      );

        
        function request() { return { type: veeselsConstants.GET_ALL_REQUEST } }
        function success(data) { return { type: veeselsConstants.GET_ALL_SUCCESS, data } }
        function failure(error) { return { type: veeselsConstants.GET_ALL_FAILURE, error } }
    }
};
