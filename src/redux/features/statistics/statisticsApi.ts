
import baseApi from "../../api/baseApi";


const statisticsApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({

        getStatistics : builder.query({
            query: () => ({
                url : '/statistics',
                method : "GET",
            }),
        }),
    })
})

export const {
    useGetStatisticsQuery
    } = statisticsApi;