import axios from 'axios';
import authHeader from './AuthHeader';

const API_BASE_URL = "http://localhost:8080/trip";

class TripService {
    getTrips(page){
        return axios.get(API_BASE_URL+"/allActive/"+page);
    }

    getTripsCount(){
        return axios.get(API_BASE_URL+"/count");
    }

    getTripsByOrigin(origin){
        return axios.get(API_BASE_URL+"/active/"+origin);
    }

    getActiveTripsByDriver(){
        return axios.get(API_BASE_URL+"/active/driver",{headers: authHeader()});
    }
    getActiveTripsByUser(){
        return axios.get(API_BASE_URL+"/active",{headers: authHeader()});
    }

    getAllTripsByDriver(){
        return axios.get(API_BASE_URL+"/alld",{headers: authHeader()});
    }
    getAllTripsByUser(){
        return axios.get(API_BASE_URL+"/allu",{headers: authHeader()});
    }

    getTrip(tripID){
        return axios.get(API_BASE_URL+"/"+tripID);
    }

    postTrip(trip){
        axios.post(API_BASE_URL,trip,{headers: authHeader()});
    }

    editTrip(trip){
        axios.put(API_BASE_URL+'/update',trip,{headers: authHeader()});
    }

    deleteTrip(tripID){
        axios.delete(API_BASE_URL+"/"+tripID,{headers: authHeader()})
    }


}

export default new TripService()