import request from "@/api/request";
//get:params  post:data
const userApi = {
  getBdList: (params) => {
    return request({
      url: "/getbd",
      method: "get",
      params: params,
    });
  },
};
export default userApi;
