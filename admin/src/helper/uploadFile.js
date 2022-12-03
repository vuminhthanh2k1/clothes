import axios from "axios";
import { apiUrl } from "../enviroment";

const access_token = localStorage.getItem("token")

export default function uploadFile(file) {
  const data = new FormData();
  data.append("file", file)
  return axios({
    method: 'POST',
    url: `${apiUrl}/Containers/image/upload`,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    params: {
      access_token
    },
    data
  }).then(result => {
    return `${apiUrl}/Containers/image/download/${result.data.result.files.file[0].name}`;
  }).catch(err => {
    console.log(err)
    return;
  })
}