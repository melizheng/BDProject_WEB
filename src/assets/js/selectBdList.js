import Axios from "axios";
Axios.defaults.baseURL = "/api";
function selectBdList() {
  const form = new FormData();
  const options = {
    method: "GET",
    url: "/getbd",
    params: { input: "", size: "2", page: "1" },
    headers: {
      "Content-Type":
        "multipart/form-data; boundary=---011000010111000001101001",
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJwaG9uZSI6IjExMjEyMTIxMTExIiwidHlwZSI6MSwiaWF0IjoxNjQ0NjU2NTk0LCJleHAiOjE2NDQ3NDI5OTR9.8TchxMJ3TjzqVOIkNmqL08AVFAMHSNuwWyWx6HKWWLrg_DpDme96LXWjprQnCG-y66D4hBCGya55kMIwySGuCQ",
    },
    data: form,
  };

  Axios.request(options)
    .then((successResponse) => {
      console.log(successResponse.data.msg);
      if (successResponse.data.code === 1) {
        this.tableData = [];
        this.tableData = successResponse.data.msg;
      }
      else {
        //登录接口返回登录失败输出原因
        alert(successResponse.data.msg);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

export { selectBdList };
