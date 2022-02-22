import request from "@/api/request";
import requestQQ from "@/api/requestQQ";
//get:params  post:data
const userApi = {
  /**
   * 逆地址解析 已知坐标得到地址
   * @param params
   * @returns {*}
   */
  getAddressByLocation: (params) => {
    return requestQQ({
      url: "/ws/geocoder/v1",
      method: "get",
      params: params,
    });
  },
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
   * 更新用户状态，禁用-启用
   * @param data
   * @returns {*}
   */
  updatePassw: (data) => {
    return request({
      url: "/updatepassw",
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
   * 得到1个bd的详细信息
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
   * 得到一个客户的详细信息
   * @param params
   * @returns {*}
   */
  getOneCustom: (params) => {
    return request({
      url: "/getonecustom",
      method: "get",
      params: params,
    });
  },
  /**
   * 修改客户的对接bd
   * @param params
   * @returns {*}
   */
  updateCustomToBD: (params) => {
    return request({
      url: "/updatecustomtobd",
      method: "get",
      params: params,
    });
  },
  /**
   * 修改客户的信息
   * @param params
   * @returns {*}
   */
  updateCustom: (data) => {
    return request({
      url: "/updatecustom",
      method: "post",
      data: data,
    });
  },
  /**
   * 增加拜访地址
   * @param params
   * @returns {*}
   */
  addCustomVisit: (data) => {
    return request({
      url: "/addacustomvisit",
      method: "post",
      data: data,
    });
  },
  /**
   * 修改拜访地址
   * @param params
   * @returns {*}
   */
  updateCustomVisit: (data) => {
    return request({
      url: "/updatecustomvisit",
      method: "post",
      data: data,
    });
  },
  /**
   * 删除拜访地址
   * @param params
   * @returns {*}
   */
  deleteCustomVisit: (params) => {
    return request({
      url: "/deletecustomvisit",
      method: "get",
      params: params,
    });
  },
  /**
   * 得到可見的審核列表
   * @param params
   * @returns {*}
   */
  findAuditList: (params) => {
    return request({
      url: "/findauditlist",
      method: "get",
      params: params,
    });
  },
  /**
   * 审核操作
   * @param params
   * @returns {*}
   */
  updateAudit: (params) => {
    return request({
      url: "/updateaudit",
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
  /**
   * 得到汇报记录
   * @param params
   * @returns {*}
   */
  getReportRecord: (params) => {
    return request({
      url: "/getreportrecord",
      method: "get",
      params: params,
    });
  },
  /**
   * 得到拜访地址
   * @param params
   * @returns {*}
   */
  getCustomVisitList: (params) => {
    return request({
      url: "/getcustomvisit",
      method: "get",
      params: params,
    });
  },
};
export default userApi;
