import axios, { AxiosResponse } from "axios"
import { get_device_list_url } from "./apiConstants"

export const get_all_devices  = async ()  =>{
   
        const res = await axios.get(get_device_list_url)
        if (res.status === 200)
        {  
            console.log(res.data);
            return res.data
        }
        return [];

        
   
}

// export const get_device_data_by_id = async (deviceId : string)=>
// {
//     axios.get()
// }