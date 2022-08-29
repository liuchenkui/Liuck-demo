// 导入mockjs
import Mock from 'mockjs'

// 请求响应时间
Mock.setup({
    timeout: '200-400'
})

Mock.mock('/api/user',{
    'data|20': [
        {
            uid: "@id()", // 随机id
            nickname: "@cname()", // 随机生成中文名字
            created_at: "@date()", // 随机生成日期
            'status|0-1': 0,
            mobile: /^1[34578]\d{9}$/,
            avatar:"@image('200×100','#50B347','#fff','avatar')"
        }
    ]
})

Mock.mock('/api/list',{
    'data': [
        {
            id: "1",
            name: "学员管理",
            path: "/faculty",
        },
        {
            id: "1",
            name: "讲师管理",
            path: "/trainer",
        },
        {
            id: "3",
            name: "助教管理",
            path: "/assistant",
        },
    ]
})