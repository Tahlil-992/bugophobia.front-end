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

export const callCreateReservationAPI = async ({start_time, office}, isRemembered) => {
    try
    {
        const response = await callAPIHandler({method: "POST", data: {start_time: start_time, office: office}, url: "/schedule/create_reservation/"}, true, isRemembered);
        return response;
    }
    catch (e)
    {
        throw e
    }
}

export const callCreateMultipleReservationAPI = async ({start_time, end_time, office}, isRemembered) => {
    try
    {
        const response = await callAPIHandler({method: "POST", data: {start_time: start_time, end_time: end_time, office: office}, url: "/schedule/create_multiple_reservations/"}, true, isRemembered);
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

export const callGetDoctorOfficeRerservationsList = async({office_id, from_date, to_date}, isRemembered) => {
    try
    {
        const response = await callAPIHandler({method: "GET", url: `/schedule/office_reservations/${office_id}/${from_date}/${to_date}/`}, true, isRemembered);
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

export const callListAllReservationsAvailableToPatients = async({office_id}, isRemembered) => {
    try
    {
        const response = await callAPIHandler({method: "GET", url: `schedule/list_reservations/${office_id}/`}, true, isRemembered);
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

export const callUnreserveAPI = async({id}, isRemembered) => {
    try
    {
        const response = await callAPIHandler({method: "GET", url: `/schedule/unreserve/${id}/`}, true, isRemembered);
        return response;
    }
    catch (e)
    {
        throw e;
    }
}