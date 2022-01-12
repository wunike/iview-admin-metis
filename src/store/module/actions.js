export default {

    /**
     * 显示提示 msg.type 类型  msg.data 消息内容
     * @param commit
     * @param msg
     */
    showMassage(store, msg) {
        console.log(msg)
        Message({
            type: msg.type,
            message: msg.message || msg.data
        })
    },


};
