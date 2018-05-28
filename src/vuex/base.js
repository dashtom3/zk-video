// import axios from 'axios'
// import router from '../router'
// import {tokenMethods} from "./util"
// import {Toast, Indicator, MessageBox} from 'mint-ui';
//
// const HOST = 'http://116.62.228.3:8080/api';    //测试端口
//
// export default function (url, params = {}) {
//   return new Promise((resolve, reject) => {
//     Indicator.open();
//     axios.get(HOST + url, {params})
//       .then((res) => {
//         resolve(res.data);
//         Indicator.close();
//       }).catch(err => {
//         reject(err);
//         Indicator.close();
//     });
//   });
// }
//
// export function get(url, params = {}) {
//   return new Promise((resolve, reject) => {
//     Indicator.open();
//     axios.get(HOST + url, {params})
//       .then((res) => {
//         if (res.status === 500 || res.status === 503 || res.status === 504) {
//           Indicator.close();
//           Indicator.open({
//             text: '服务器出小差了',
//             spinnerType: 'fading-circle'
//           });
//           setTimeout(() => {
//             Indicator.close();
//           }, 2000)
//           return
//         }
//         if (res.data.callStatus === 'SUCCEED') {
//           resolve(res.data.data);
//         } else {
//           if (res.data.data) resolve(res.data);
//         }
//         // Indicator.close();
//       }).catch(err => {
//         reject(err);
//         Indicator.close();
//     });
//   });
// }
