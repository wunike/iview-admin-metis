<style lang="less">
    .create-work-store{
        height:100%;
        width:100%;
        /*background: #fff;*/
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h2{
            margin-bottom:32px;
            font-size:32px;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(73,80,96,1);
            line-height:45px;
            letter-spacing:2px;
        }
        .create-info{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            p{
                font-size:16px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(102,102,102,1);
                line-height:28px;
            }
        }
        .create-company{
            width:376px;
            height:396px;
            margin-top:38px;
            background: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            img{
                width:238px;
                height:238px;
                border-radius:50%;
                margin:42px 0;
                user-select: none;
                -webkit-user-drag: none;
            }
        }
    }
</style>
<template>
    <div class="create-work-store">
        <h2>Welcome，METIS欢迎您!</h2>
        <div class="create-info">
            <p>欢迎您第一次登录系统</p>
            <p>系统将引导您添加机构、员工等基本信息，并配置相应的权限，祝您有一个愉快的体验!</p>
        </div>
        <div class="create-company">
            <img src="../../assets/img/wk.png">
            <Button type="primary" @click="turn2Create">创建企业</Button>
        </div>
    </div>
</template>

<script>
import valid, {
		errors,
		codeImgUrl,
		login,
		captcha,
		sysUser,
		api
	} from '../../libs/request.js'
    export default {
        components: {

        },
        data() {
            return {

            }
        },
        mounted() {

        },
        beforeRouteLeave (to, from, next) {
            if(to.name === 'portal.login'){
                next()
                return;
            }
            api.tenantForm({}).then(valid.call(this)).then(res => {
                if(res.ok) {
                    if(res.data.data && res.data.data.status && res.data.data.status.code == 'UNINIT'){
                        if(to.name === 'portal.workBench'){
                            next()
                        }else{
                            next(false)
                        }
                    } else {
                        next()
                    }

                }
            }).catch(errors.call(this))
        },
        methods: {
            turn2Create() {
                this.$router.push({
                    name:'portal.workBench'
                    // name:"crm.createEvent"
                })

            },
        },
    }
</script>

