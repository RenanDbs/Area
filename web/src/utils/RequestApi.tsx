import axios from "axios";

export const RequestApi = async (
  endpoint: string,
  request: string,
  data: {} = {}
) => {
  return await axios({
    method: request,
    url: "http://localhost:8080/v2/" + endpoint,
    data: data,
    withCredentials: true,
  });
};
