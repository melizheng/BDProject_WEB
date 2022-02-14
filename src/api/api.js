import request from "@/api/request";
//get:params  post:data
const userApi = {
  /**
   * 得到可见的城市列表
   * @param params
   * @returns {*}
   */
  getAllCityCode: (params) => {
    return request({
      url: "/getallcitycode",
      method: "get",
      params: params,
    });
  },
  /**
   * 得到BD的列表
   * @param params
   * @returns {*}
   */
  getBdList: (params) => {
    return request({
      url: "/getbd",
      method: "get",
      params: params,
    });
  },
  /**
   * 得到管理员列表
   * @param params
   * @returns {*}
   */
  getAdminList: (params) => {
    return request({
      url: "/getadmin",
      method: "get",
      params: params,
    });
  },
  /**
   * 删除账号
   * @param params
   * @returns {*}
   */
  deleteAccount: (params) => {
    return request({
      url: "/deleteaccount",
      method: "get",
      params: params,
    });
  },
  /**
   * 更新用户状态，禁用-启用
   * @param data
   * @returns {*}
   */
  updateStatus: (data) => {
    return request({
      url: "/updatestatus",
      method: "post",
      data: data,
    });
  },
};
export default userApi;
