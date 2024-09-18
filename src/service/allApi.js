import { serverUrl } from "./baseUrl"
import { commonApi } from "./commonApi"



export const loginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/adminlogin`,reqBody,"")
}


export const getAllGriviencesApi = async() =>{
    return await commonApi('GET',`${serverUrl}/allgriviences`,"")
}

export const getGriviencesApi = async (id) => {
    return await commonApi('GET', `${serverUrl}/getgrievancebyId/${id}`, "");
};


export const editApi = async(id,reqBody)=>{
    return await commonApi('PUT',`${serverUrl}/editgrivience/${id}`,reqBody)
}


export const deleteDataApi = async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/deletegrivience/${id}`,{},"")
}