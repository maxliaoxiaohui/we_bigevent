//注意：每次调用￥$.get()或$.post()或$.ajax()的时候会先调用ajaxPrefilter这个函数在这个函数可以拿给AjAXt提供配置对象
$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求之前，通用拼接请求根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    //统一为有权限的接口 设置 headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' }
    }
    //全局统一挂载complete回调函数
    options.complete = function (res) {
        //在complete回调函数中可以使用res.responseJSON拿到服务器响应回啦的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.强制清空 token
            localStorage.removeItem('token')
            //2.强制跳转到登录页
            location.href = '/login.html'
        }
    }

})