import type { ApiResponse } from "@/types";
const getData = async(url: string): Promise<ApiResponse> => {
    try {
        const req = await fetch(url);
        const data: ApiResponse = await req.json();
        return data;
    } catch (error) {
        console.log(error);
        throw(error)
    }
}

export const useFetchApiData = () => {
    return {
        getData,
    }
}