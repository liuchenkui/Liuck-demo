const state = {
    tableData: [],
}
const mutations = {
    // 全部标记已读
    allRead(state) {
        state.tableData.forEach((item) => {
            if (!item.flag) {
                item.flag = true;
            }
        });
    },
    // 全部放进回收站
    allDel(state) {
        state.tableData.forEach((item) => {
            if (item.flag) {
                item.flag = 1;
            }
        });
    },
    // 全部删除
    allDeilte(state) {
        state.tableData = state.tableData.filter((item) => item.flag != 1);
    },
    // 放进回收站
    del(state,item) {
        item.flag = 1
    },
    // 改变已读
    changeRead(state,item) {
        item.flag = true;
    },
    // 还原未读
    changeUnread(state,item) {
        item.flag = false;
    },
    createData(state,arr) {
        state.tableData = arr
    }
}

export default {
    namespace:true,
    state,
    mutations
}