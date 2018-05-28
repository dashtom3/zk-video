import axios from 'axios'
import md5 from 'blueimp-md5'
export default{
  // 成功
  success (obj, msg, url) {
    obj.$message({
      message: msg,
      type: 'success',
      duration: '1000',
      onClose: function () {
        obj.$router.push(url)
      }
    })
  },
  // 错误
  error (obj, msg, url) {
    obj.$message({
      message: msg,
      type: 'error',
      duration: '1200'
    })
  },
  apiGet(obj ,url, params = {}) {
    var self = this
    console.log(obj,url,params)
    return new Promise((resolve, reject) => {
      console.log(resolve,reject)
    axios.get(url, { params })
      .then((res) => {
        console.log(res)
      if (res.data.callStatus === 'SUCCEED') {
        resolve(res);
      } else {
        if(res.data.errorLabel == '操作权限不足') {
          self.logout()
          self.success(obj,'请重新登陆','/login')
          reject();
        } else {
          reject(res.data.errorLabel);
        }
      }
    }).catch(err => {
      self.error(obj,'网络连接错误','')
      reject();
    });
    });
  },
  appKey:"72d77b4a",
  secret:"44e7464a4df7443a8798d8c42661c606",
  apiGetWithToken(obj ,url, params = {}) {
    var temp = url + JSON.stringify(params) + this.secret
    console.log(obj,url,params,temp)
    var token = md5(temp)
    console.log(token)
    params.token = token
    return new Promise((resolve, reject) => {
      // console.log(resolve,reject)
    axios.get(url, { params })
      .then((res) => {
        console.log(res)

    }).catch(err => {
      self.error(obj,'网络连接错误','')
      reject();
    });
    });
  },
  apiPost(obj,url, params) {
  var self = this
  return new Promise((resolve, reject) => {
    // console.log(params)
    axios.post(url, params)
      .then((res) => {
        // console.log(res)
        resolve(res.data)
      }).catch(() => {
        // reject(err);
        self.error(obj,'网络连接错误','')
        reject();
      });
  });
},
baseUrl: 'http://localhost:6000',

  getHttpData: function (data) {
    var temp = ''
    for (var i in data) {
      if (data[i] != null && data[i] !== 'null') {
        temp = temp + '&' + i + '=' + data[i]
      }
    }
  },
  getHttpDataWithToken: function (data) {
    var temp = ''
    for (var i in data) {
      if (data[i] != null && data[i] !== 'null') {
        temp = temp + '&' + i + '=' + data[i]
      }
    }
    temp = temp + '&token=' + this.getToken();
    return temp
  },
  postHttpDataWithToken: function (data) {
    var temp = new FormData()
    for (var i in data) {
      if (data[i] != null) {
        temp.append(i, data[i])
      }
    }
    temp.append('token', this.getToken())
    return temp
  },
  postHttpDataWithTokenNoForm: function (data) {
    data.token = this.getToken()
    return data
  },
  postHttpData: function (data) {
    var temp = new FormData()
    for (var i in data) {
      if (data[i] != null) {
        temp.append(i, data[i])
      }
    }
    return temp
  },
  setToken (token) {
    localStorage.setItem('bimprotoken', token)
    localStorage.setItem('watertokentime', new Date().getTime())
  },
  getToken () {
    var date = localStorage.getItem('watertokentime')
    if (new Date().getTime() - date > 36000000) {
      // alert('登录过期')
      return null
    }
    return localStorage.getItem('bimprotoken')
  },
  getUser: function () {
    return JSON.parse(localStorage.getItem('bimprouser'))
  },
  setUser: function (wateruser) {
    localStorage.setItem('bimprouser', JSON.stringify(wateruser))
  },
  logout: function(){
    localStorage.setItem('watertoken', null)
    localStorage.setItem('watertokentime', null)
    localStorage.setItem('wateruser', null)
  },
  getToday: function (today) {
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)
    return today
  }
}
