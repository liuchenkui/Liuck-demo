import Mock from 'mockjs'
// 导入mockjs
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