import {callAPIHandler} from './refreshToken';

export const callChangeVisitDurationTimeAPI = async({visit_duration_time}, isRemembered) => {
    try
    {
        const response = await callAPIHandler({method: "PUT", data: {visit_duration_time: visit_duration_time}, url: "/profile/change_visit_duration/"}, true, isRemembered);
        return response;
    }
    catch (e)
    {
        throw e;
    }
}

export const callCreateReservationAPI = async ({start_time}, isRemembered) => {
    try
    {
        const response = await callAPIHandler({method: "POST", data: {start_time: start_time}, url: "/schedule/create_reservation/"}, true, isRemembered);
        return response;
    }
    catch (e)
    {
        throw e
    }
}

export const callDeleteReservationAPI = async({id}, isRemembered) => {
    try
    {
        const response = await callAPIHandler({method: "DELETE", url: `/schedule/delete_reservation/${id}/`}, true, isRemembered);
        return response;
    }
    catch (e)
    {
        throw e;
    }
}

export const callGetDoctorRerservationsList = async({from_date, to_date}, isRemembered) => {
    try
    {
        const response = await callAPIHandler({method: "GET", url: `/schedule/doctor_reservations/${from_date}/${to_date}/`}, true, isRemembered);
        return response;
    }
    catch (e)
    {
        throw e;
    }
}

export const callGetReservationAPI = async({id}, isRemembered) => {
    try
    {
        const response = await callAPIHandler({method: "PUT", data: {id: id}, url: "schedule/get_reservation/"}, true, isRemembered);
        return response;
    }
    catch (e)
    {
        throw e;
    }
}

export const callListAllReservationsAvailableToPatients = async({id}, isRemembered) => {
    try
    {
        const response = await callAPIHandler({method: "GET", url: `schedule/list_reservations/${id}/`}, true, isRemembered);
        return response;
    }
    catch (e)
    {
        throw e;
    }
}

export const callListPatientReservations = async({from_date, to_date}, isRemembered) => {
    try
    {
        const response = await callAPIHandler({method: "GET", url: `schedule/patient_reservations/${from_date}/${to_date}/`}, true, isRemembered);
        return response;
    }
    catch (e)
    {
        throw e;
    }
}