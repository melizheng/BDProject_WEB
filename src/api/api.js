import request from "@/api/request";
//get:params  post:data
const userApi = {
  /**
   * 得到项目所有的城市并展示
   * @returns {*}
   */
  getProjectAllCityCode: () => {
    return request({
      url: "/findprojectallcity",
      method: "get",
    });
  },
  /**
   * 得到自己可见的城市列表
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
   * 得到该用户可见的城市列表
   * @param params
   * @returns {*}
   */
  getAccountAllCityCode: (params) => {
    return request({
      url: "/getaccountallcitycode",
      method: "get",
      params: params,
    });
  },
  /**
   * 增加用户账号
   * @param data
   * @returns {*}
   */
  addAccount: (data) => {
    return request({
      url: "/addaccount",
      method: "post",
      data: data,
    });
  },
  /**
   * 编辑用户账号信息与城市属性
   * @param data
   * @returns {*}
   */
  updateAccountMessage: (data) => {
    return request({
      url: "/updateaccountmessage",
      method: "post",
      data: data,
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
   * 得到BD的列表
   * @param params
   * @returns {*}
   */
  getonebd: (params) => {
    return request({
      url: "/getonebd",
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
   * 得到客户列表
   * @param params
   * @returns {*}
   */
  getCustomList: (params) => {
    return request({
      url: "/getcustom",
      method: "get",
      params: params,
    });
  },
  /**
   * 得到拜访记录列表
   * @param params
   * @returns {*}
   */
  getVisitList: (params) => {
    return request({
      url: "/getvisitlist",
      method: "get",
      params: params,
    });
  },
  /**
   * 得到汇报记录列表
   * @param params
   * @returns {*}
   */
  getReportRecordList: (params) => {
    return request({
      url: "/getreportrecordlist",
      method: "get",
      params: params,
    });
  },
};
export default userApi;
