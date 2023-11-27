import axios from "axios";

export const getDataHandler = async (apiPath) => {
  let obj = {};
  await axios
    .get(apiPath)
    .then((response) => {
      obj["status"] = "success";
      obj["response"] = response.data;
    })
    .catch((error) => {
      obj["status"] = "failed";
      obj["response"] = error;
    });

  return obj;
};
