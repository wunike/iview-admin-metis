<style lang="less">
@mainColor: #44BCB7;
.student-other-container{
    position: relative;
    height: 100%;overflow-y: auto;
    background: #fff;text-align: center;
    .flex{
        display: flex;
        margin-bottom: 23px;
    }
    li{
        @h: 32px;
        padding-left: 57px + 120px;height: @h;line-height: @h;
        position: relative;
        flex: 1;
        font-size: 14px;text-align: left;
        &:last-child{
            padding-left: 0;
        }
    }
    .label{
        position: absolute;left: 0;top: 0;width: 57px + 120px;
        text-align: right;color: #999;
    }
    .fr{
        float: right;
    }
    .no-lists{
        position: absolute;
        top: 50%;
		left: 0;
		right: 0;
		transform: translate(0, -50%);
        text-align: center;
        img{
            display: block;width: 300px;margin: 0 auto;
        }
        p{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2;
            font-size: 16px;
            line-height: 48px;
        }
    }
    .full-height{
        position: relative;
        height: 100%;padding: 20px 16px 50px;
        min-height: 520px;
    }
    .stu-card{
        position: absolute;top: 50%;left: 0;right: 0;margin: 20px auto 0;
        transform: translate(0,-50%);
    }
}
.printStuCard{
    .colors {
		display: inline-block;
		.colorBlock {
			width: 32px;
			height: 32px;
			cursor: pointer;
			margin: 30px;
			&:hover {
				box-shadow: 0px 3px 6px 0px rgba(0, 162, 154, 0.5);
				border: 1px solid rgba(68, 188, 183, 1);
			}
		}
	}
}
</style>
    
<template>
<div class="student-other-container">
    <div class="no-lists" v-if="noListsFlag">
        <img src="../../../assets/img/noLists.png" alt="">
        <p>{{$t('modules_spoc_crm_web_src_views_customer360_components_studentother_998')}}</p>
    </div>
    <div v-else class="full-height">
        <ul class="flex">
            <li>
                <span class="label">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentother_999')}}</span>
                <div>{{getStatus(childItem.bindFlag)}}</div>
            </li>
            <li>
                <span class="label">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentother_1000')}}</span>
                <div>{{childItem.code}}</div>
            </li>
            <!-- 1 -->
            <li v-if="myButtonPrem.indexOf('otherPrint') > -1">
                <Button type="primary" @click="openPrint" class="fr">{{$t('modules_spoc_crm_web_src_views_customer360_components_studentother_1001')}}</Button>
            </li>
        </ul>
        <stu-card class="stu-card" myBackground="rgb(0, 162, 154)" :childItem="childItem"></stu-card>
    </div>
    <Modal
        class="printStuCard"
        v-model="showPrint"
        :title="$t('modules_spoc_crm_web_src_views_customer360_components_studentother_1002')"
        @on-ok="printOk"
        @on-cancel="printCancel">
        <div>
            <stu-card :myBackground="myBackground" :childItem="childItem"></stu-card>
            <div class="colors">
                <div
                    class="colorBlock"
                    :style="{'background': item}"
                    v-for="(item, index) in colors"
                    :key="index"
                    @click="changeColor(item)"
                ></div>
            </div>
        </div>
    </Modal>
</div>
</template>

<script>
/**
 ** @author: 曹见芳
 ** 客户360 - 其他信息
 */
import valid, { errors, crmCustomerDetail } from "../../../libs/request";
import stuCard from './stuCard.vue';
import { mapMutations, mapState } from "vuex";
import { waitUntil } from '@public/libs/util.js'
export default {
    name: 'studentOther',
    components: {
        stuCard
    },
    props: {
        id: {
            type: String,
            required: true
        },
        stuId: {
            type: String,
            default: ''
        },
    },
    data(){
        return {
            myBackground: "rgb(0, 162, 154)",
			colors: [
				"rgb(253,205,0)",
				"rgb(243,153,69)",
				"rgb(0,47,103)",
				"rgb(233,72,49)",
				"rgb(0,162,154)",
				"rgb(0,175,236)"
            ],
            childItem: {},
            showPrint: false,
            noListsFlag: true,
            myButtonPrem: [],
        };
    },
    computed: {
        ...mapState(["buttonPerm"]),
    },
    mounted(){
        waitUntil(
            () => {
                return JSON.stringify(this.buttonPerm)!= '{}' || false;
            },
            () => {
                this.myButtonPrem = this.buttonPerm['crm.customer360'] || []
            }
        );
        this.getStudentCard()
    },
    methods: {
        ...mapMutations(["updateLoadingStatus"]),
        openPrint() {
            this.showPrint = true;
        },
        changeColor(color) {
			this.myBackground = color;
        },
        printOk() {
            let stuIdList = [this.stuId];
            // let stuIdList = ['9a4bbb2d6e3846878572debfa8bc486c'];
			let param = {
				changeColor: this.myBackground,
				stuIdList
			};
			localStorage.setItem("printStuCard", JSON.stringify(param));
			const { href } = this.$router.resolve({
				name: "jw.printStudentCard"
			});
			window.open(href, "_blank");
        },
        printCancel() {},
        getStudentCard() {
            this.updateLoadingStatus({isLoading: true});
            let params = {
                id: this.id
            }
            crmCustomerDetail.studentCard(params)
            .then(valid.call(this))
            .then(res => {
                if (res.ok) {
                    let _data = res.data.data;
                    // _data = {
                    //     bindFlag: '0',
                    //     code: '12344',
                    //     enName: 'enname',
                    //     name: 'name',
                    //     gradeLabel: 'gradeLabel',
                    //     imgPath: '...',
                    //     officeName: 'officeName'
                    // }
                    if(_data) {
                        this.noListsFlag = false;
                        this.childItem = _data;
                    } else {
                        this.noListsFlag = true;
                    }
                }
            })
            .catch(errors.call(this))
            .finally(() => {
                this.updateLoadingStatus({isLoading: false});
            });
        },
        getStatus(num) {
            let _str = this.$t('classlist_compontents_detailinfo_39');
            if(num == '1') _str = this.$t('classlist_compontents_detailinfo_40');
            else if(num == '2') _str = this.$t('classlist_compontents_detailinfo_41');
            return _str;
        },
    },
    watch: {
        id() {
			if (this.$route.name == 'crm.customer360') {
				this.getStudentCard();
			}
        }
    }
}
</script>


