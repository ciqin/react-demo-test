const USERINFO_LOGIN = 'USERINFO_LOGIN'
const ADD_CONCENT = 'ADD_CONCENT'

const initialState = {}

export default function userinfo(state = initialState, action) {
    switch (action.type) {
        // 添加数据
        case USERINFO_LOGIN:
            return action.data

        // 添加内容
        case ADD_CONCENT :
            state.tableData = action.data;
            return action.data

        default:
            return state
    }
}