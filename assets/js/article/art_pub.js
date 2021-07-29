$(function () {
    var layer = layui.layer
    var form = layui.form

    initCate()
    //初始化富文本编辑器
    initEditor()



    //定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章分类失败！')
                }
                var htmlstr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlstr)
                //一定要记得调用form.render()方法
                form.render();
            }
        })
    }
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    //为选择封面的按钮，绑定点击事件处理函数
    $('#btnChooseImage').on('click', function () {
        $('#coverfile').click()
    })
    //监听coverfile的change事件 ，获取用户选择的文件列表
    $('#coverfile').on('change', function (e) {
        //获取到文件列表数据
        var files = e.target.files
        //判断用户是否选择了封面图片
        if (files.length === 0) {
            return
        }
        //2. 根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(files[0])
        //为裁剪区重新设置图片
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    //文章的发布状态
    var atr_state = '已发布';
    //为存为草稿按钮 绑定点击事件处理函数
    $('#btnSave2').on('click', function () {
        atr_state = '草稿'
    })

    //为表单绑定submit 提交事件
    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        //基于from表单，快速创建一个 fromData 对象
        var fd = new FormData($(this)[0])
        //将文章的发布状态，存到fd中
        fd.append('state', atr_state)

        // 4. 将裁剪后的图片，输出为文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                //将文件对象，存储到fd中
                fd.append('cover_img', blob)
                //发起ajax数据请求
                PublishArticle(fd);

            })
    })


    //定义一个发布文章的方法
    function PublishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            //如果向服务器提交的是formData格式的数据
            //必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                //发布文章成功后跳转到文章列表页面
                location.href = "/article/art_list.html"
            }


        })
    }
})