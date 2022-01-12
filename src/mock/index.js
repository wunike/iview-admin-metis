import Mock from 'mockjs'
// import { login, logout, getUserInfo } from './login'
// import { getTableData, getDragList, uploadImage, getOrgData } from './data'
// import { getMessageInit, getContentByMsgId, hasRead, removeReaded, restoreTrash, messageCount } from './user'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
//Mock.setup({
//timeout: 1000
//})


//如果怕别人的mock影响到自己的开发，可以在本地临时注释掉别人的mock引入
import { longwangMock } from './longwangMock'
longwangMock(Mock)
import { ydxMock } from './ydxMock'
ydxMock(Mock)
import { lzMock } from './lzMock'
lzMock(Mock)
import { wxMock } from './wxMock'
wxMock(Mock)
import { cjfMock } from './cjfMock'
cjfMock(Mock)

// 登录相关和获取用户信息
//Mock.mock(/\/login/, login)
//Mock.mock(/\/get_info/, getUserInfo)
//Mock.mock(/\/logout/, logout)
//Mock.mock(/\/get_table_data/, getTableData)
//Mock.mock(/\/get_drag_list/, getDragList)
//Mock.mock(/\/save_error_logger/, 'success')
//Mock.mock(/\/image\/upload/, uploadImage)
//Mock.mock(/\/message\/init/, getMessageInit)
//Mock.mock(/\/message\/content/, getContentByMsgId)
//Mock.mock(/\/message\/has_read/, hasRead)
//Mock.mock(/\/message\/remove_readed/, removeReaded)
//Mock.mock(/\/message\/restore/, restoreTrash)
//Mock.mock(/\/message\/count/, messageCount)
//Mock.mock(/\/get_org_data/, getOrgData)

export default Mock
