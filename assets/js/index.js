$(function () {
    //调用这个信息获取用户基本信息
    getUserInfo()
    var layer = layui.layer;
    //点击按钮实现退出功能
    $('#btnLogout').on('click', function () {
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1.清空本地存储中的 token
            localStorage.removeItem('token');
            //2.跳转登录页
            location.href = '/login.html'
            //关闭cofirm询问框
            layer.close(index);
        });
    })
})
//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        //headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用 renderAvatar渲染用户头像
            removeAvatar(res.data)
        },
        //不论成功还是失败都会调用这个complete函数
        // complete: function (res) {
        //     //在complete回调函数中可以使用res.responseJSON拿到服务器响应回啦的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //1.强制清空 token
        //         localStorage.removeItem('token')
        //         //2.强制跳转到登录页
        //         location.href = '/login.html'
        //     }
        // }
    })
}
// 渲染用户头像
function removeAvatar(user) {
    //获取昵称
    var name = user.nickname || user.username
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //按需渲染用户的头像
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatur').hide();
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatur').html(first).show();
    }
}
