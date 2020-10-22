import { config }  from '../config';
import { veeselsConstants } from "../constants/veesels.constants";


const registerArrived = async (veesel) => {
    let targetUrl = config.API_URL + veeselsConstants.ARRIVED_ENDPOINT;

    if(!veesel.name){
        throw new Error("new veesel must have a name");
    }

     veesel.timeIntervalsInTorruga = veesel.timeIntervalsInTorruga || [];

     veesel.timeIntervalsInTorruga.push({start: Date.now()})


	let requestData = {
		method: veeselsConstants.ARRIVED_METHOD,
		cache: 'no-cache',
		headers: new Headers({
			'Content-Type': 'application/json',
        }),
        body: JSON.stringify({vessel:veesel})
	};

    const myRequest = new Request(targetUrl, requestData);
    
    let response = await fetch(myRequest);
    return await response.json();
};


const markLeft = async (veesel) => {
    let targetUrl = config.API_URL + veeselsConstants.MARK_LEFT_ENDPOINT;
    targetUrl = targetUrl.replace("${id}", veesel.id); 
    
	let requestData = {
		method: veeselsConstants.MARK_LEFT_METHOD,
		cache: 'no-cache',
		headers: new Headers({
			'Content-Type': 'application/json',
        }),
        body: JSON.stringify({vessel:veesel, date: Date.now()})
	};

    const myRequest = new Request(targetUrl, requestData);
    
    let response = await fetch(myRequest);
    return await response.json();
};



const removeVessel = async (form) => {
    let targetUrl = config.API_URL + veeselsConstants.REMOVE_VEESEL_ENDPOINT;

	let requestData = {
		method: veeselsConstants.REMOVE_VEESEL_METHOD,
		cache: 'no-cache',
		headers: new Headers({
			'Content-Type': 'application/json',
		})
	};

    const myRequest = new Request(targetUrl, requestData);
    
    let response = await fetch(myRequest);
    return await response.json();
};


const getById = async (id) => {
    let targetUrl = `${config.API_URL}${veeselsConstants.GET_BY_ID_ENDPOINT}`;
    targetUrl = targetUrl.replace("${id}", id); 
    
	let requestData = {
		method: veeselsConstants.GET_BY_ID_METHOD,
		cache: 'no-cache',
		headers: new Headers({
			'Content-Type': 'application/json',
		})
	};

    const myRequest = new Request(targetUrl, requestData);
    
    let response = await fetch(myRequest);
    return await response.json();
};


const getAll = async () => {
    let targetUrl = `${config.API_URL}${veeselsConstants.GET_ALL_ENDPOINT}`;
    
	let requestData = {
		method: veeselsConstants.GET_ALL_METHOD,
		cache: 'no-cache',
		headers: new Headers({
			'Content-Type': 'application/json',
		})
	};

    const myRequest = new Request(targetUrl, requestData);
    
    let response = await fetch(myRequest);
    return await response.json();
};


export const vesselsService = {
    registerArrived,
    markLeft,
    removeVessel,
    getById,
    getAll
}