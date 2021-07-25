//注意：每次调用￥$.get()或$.post()或$.ajax()的时候会先调用ajaxPrefilter这个函数在这个函数可以拿给AjAXt提供配置对象
$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求之前，通用拼接请求根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

})