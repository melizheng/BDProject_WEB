// eslint-disable-next-line no-unused-vars
import Axios from "axios";

const requestQQ = Axios.create({
  baseURL: "/qq",
  timeout: 600000,
  // 链接超时  当发送时间超过300秒就不再发送了
  // 若网速过慢发送不成功就会报错
  headers: {},
});
export default requestQQ;
