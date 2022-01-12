<style lang="less">
.assign_leads {
  .ivu-table-wrapper {
    border: 1px solid #dcdee2;
    border-bottom: 0;
    border-right: 0;
    .ivu-table {
      th {
        /*background-color: #fff;*/
        height: 40px;
      }
      &:after {
        display: inline-block;
        content: '';
        width: 1px;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        background-color: #dcdee2;
        z-index: 3;
      }
    }
  }
  .assign_leads-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    height: 388px;
    width: 100%;
    .ivu-table th {
      background: none;
    }
    .title {
      background: #f7f8fa;
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      border-top: 1px solid #dcdee3;
      border-left: 1px solid #dcdee3;
      border-right: 1px solid #dcdee3;
      span {
        font-size: 12px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
      }
    }
    .left {
      width: 352px;
      border-radius: 4px;
      flex: 1;
    }
    .center {
      width: 64px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    .right {
      width: 470px;
      border-radius: 4px;
      flex: 1;
      .search-box {
        padding: 12px;
        border-top: 1px solid #dcdee3;
        border-left: 1px solid #dcdee3;
        border-right: 1px solid #dcdee3;
      }
      .operate-btn {
        height: 50px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding: 0 24px;
        align-items: center;
        border-bottom: 1px solid #dcdee3;
        border-left: 1px solid #dcdee3;
        border-right: 1px solid #dcdee3;
      }
    }
  }
  .reason {
    padding: 10px 12px 0;
    border-left: 1px solid #dcdee3;
    border-right: 1px solid #dcdee3;
    & > span {
      display: inline-block;
      width: 100px;
      text-align: right;
    }
  }
}
</style>

<template>
  <!--    <div class="assign_leads-container">-->
  <Modal
    v-model="batchAssign"
    width="1000"
    class-name="assign_leads"
    :title="$t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1204')"
    :mask-closable="false"
    @on-visible-change="visibleChange"
    :transfer="false"
  >
    <div class="assign_leads-box">
      <div class="left">
        <div class="title">
          <span>{{
            $t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1205')
          }}</span>
        </div>
        <Table
          height="343"
          :columns="columns1"
          :data="data1"
          @on-selection-change="selectionChange1"
          border
        ></Table>
      </div>
      <div class="center">
        <!-- <Button type="primary"> -->
        <!-- 分配 -->
        <!-- <Icon type="md-arrow-round-forward" size="28"/> -->
        <!-- <img src="../../assets/img/Right-1.png" alt="" /> -->
        <CommonIcon type="_jiantou--" :size="32" color="#969ba7" />
        <!-- </Button> -->
      </div>
      <div class="right">
        <div class="search-box">
          <Input
            v-model="name"
            :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1206')"
            style="width: 160px; margin-right: 12px"
          />
          <Select
            v-model="campus"
            @on-change="search"
            style="width: 160px; margin-right: 12px"
            filterable
            :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1207')"
          >
            <Option v-for="item in campusList" :value="item.id" :key="item.id"
              >{{ item.code }}{{ item.name }}</Option
            >
          </Select>
          <Button type="primary" @click="search">{{ $t('modules_rolepeople_210') }}</Button>
        </div>
        <div class="title">
          <span>{{
            $t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1209')
          }}</span>
        </div>
        <Table
          :no-data-text="name ? '暂无数据' : '当前机构下没有销售，请联系校长或管理员分配销售人员'"
          :height="hasAssign ? 193 : 234"
          ref="selectionTable"
          :columns="columns2"
          :loading="isloading"
          :data="data2"
          @on-selection-change="selectionChange"
          border
        ></Table>
        <div class="reason" v-if="hasAssign">
          <span>{{
            $t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1210')
          }}</span>
          <Select
            v-model="reason"
            clearable
            style="width: 250px"
            :placeholder="$t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1211')"
          >
            <Option
              :value="$t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1212')"
              >{{
                $t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1212')
              }}</Option
            >
            <Option
              :value="$t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1213')"
              >{{
                $t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1213')
              }}</Option
            >
            <Option
              :value="$t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1214')"
              >{{
                $t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1214')
              }}</Option
            >
            <Option
              :value="$t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1215')"
              >{{
                $t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1215')
              }}</Option
            >
          </Select>
        </div>
        <div class="operate-btn">
          <Button @click="save" :disabled="leadsIds.length == 0 || selectedIds.length == 0">{{
            $t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1216')
          }}</Button>
          <Icon size="14" color="#999" type="md-information-circle" style="margin: 0 10px" />
          <span style="color: #999; line-height: 14px">{{
            $t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1217')
          }}</span>
        </div>
      </div>
    </div>
    <div slot="footer" class="same_modal_footer">
      <Button @click="cancel">{{ $t('courselist_compontents_servicecontent_216') }}</Button>
    </div>
  </Modal>
  <!--    </div>-->
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import valid, { errors, sysUser, crmCustomerStatus, sysConfig } from '../../libs/request';
import { waitUntil } from '@public/libs/util';
import CommonIcon from '_c/common-icon';
export default {
  props: {
    tableSelected: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  components: {
    CommonIcon
  },
  data() {
    return {
      selectedRoles: [],
      isActioning: false, //多次提交拦截
      isloading: false,
      batchAssign: false,
      name: '',
      campus: '',
      campusList: [],
      columns1: [
        {
          type: 'selection',
          width: 60,
          resizable: true,
          align: 'center'
        },
        {
          title: this.$t('modules_rolemanage_186'),
          width: null,
          resizable: true,
          key: 'name'
        },
        {
          title: this.$t('modules_usermanage_230'),
          width: null,
          resizable: true,
          key: 'starPhone'
        }
      ],
      data1: this.tableSelected,
      columns2: [
        {
          type: 'selection',
          width: 50,
          resizable: true,
          align: 'center'
        },
        {
          title: this.$t('modules_rolemanage_186'),
          width: 150,
          resizable: true,
          key: 'name',
          render: (h, params) => {
            return h('div', {}, params.row.name + '（' + params.row.total + '）');
          }
        },
        {
          title: this.$t('modules_usermanage_230'),
          width: null,
          resizable: true,
          key: 'mobile'
        }
        // {
        //     title: '所属校区',
        //     width: null,
        //     resizable: true,
        //     key: 'officeName'
        // }
      ],
      data2: [],
      selectedIds: [],
      currentIds: [],
      leadsIds: [],
      assignOfficeId: '',
      reason: '',
      hasAssign: false, // 再分配，true 有再分配资源，false 没有再分配资源
      assignSelection: []
    };
  },
  computed: {
    ...mapState(['app'])
  },
  mounted() {
    this.data1 = this.tableSelected;
    this.updateLoadingStatus({ isLoading: true });
    sysConfig
      .getConfig({
        menuId: 2001,
        configId: 'crm:allocPool'
      })
      .then(valid.call(this))
      .then((res) => {
        if (res.ok) {
          let _data = res.data.data;
          // 分单池规则
          // this.allocPool.enable = _data.enable;
          // this.allocPool.enableLable = _data.enable == '1' ? true : false;
          this.selectedRoles = _data.roleIds;
          this.getInitData();
          this.$nextTick(() => {
            let _this = this;
            let table_box = this.$el.querySelector('.ivu-table-body');
            let table_tbody = this.$el.querySelector('.ivu-table-tbody');
            table_box.addEventListener(
              'scroll',
              function () {
                if (
                  Math.ceil(table_box.clientHeight + table_box.scrollTop) >=
                  Math.ceil(table_tbody.offsetHeight)
                ) {
                  if (_this.data2.length < _this.count) {
                    _this.isloading = true;
                    _this.pageNo += 1;
                    _this.getList();
                  }
                }
              },
              false
            );
          });
        } else {
          this.updateLoadingStatus({ isLoading: false });
        }
      })
      .catch(errors.call(this))
      .finally(() => {});
  },

  methods: {
    ...mapMutations(['updateLoadingStatus']),
    search() {
      this.pageNo = 1;
      this.getList();
    },
    getList() {
      this.updateLoadingStatus({ isLoading: true });
      let params = {
        isService: 1,
        roleIds: this.selectedRoles.join(','), //'4',
        officeId: this.campus,
        name: this.name,
        pageSize: 0,
        pageNo: this.pageNo
      };
      this.assignOfficeId = this.campus + '';
      crmCustomerStatus
        .listRoleUser(params)
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            // this.data2 = res.data.data.list
            let data = res.data;
            let d = data.data.list;
            this.currentIds = [];
            for (let i in d) {
              this.currentIds.push(d[i].id);
              if (this.selectedIds.includes(d[i].id)) {
                d[i]._checked = true;
              }
            }
            if (this.pageNo == 1) {
              this.data2 = [];
            }
            this.count = data.data.total;
            this.data2 = this.data2.concat(d);
            // console.log(res);
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          this.isloading = false;
          this.updateLoadingStatus({ isLoading: false });
        });
    },
    getInitData() {
      let promise = new Promise((resolve, reject) => {
        //校区列表
        sysUser
          .dataScopeFilter()
          .then(valid.call(this))
          .then((res) => {
            if (res.ok) {
              resolve(res);
            }
          })
          .catch(errors.call(this));
      });
      promise.then((res) => {
        if (res.ok) {
          this.campusList = res.data.data;
          waitUntil(
            () => {
              return !!this.app.currOfficeId;
            },
            () => {
              this.campus = this.app.currOfficeId;
              this.search();
            }
          );
        }
      });
    },
    show(hasAssign) {
      this.hasAssign = hasAssign;
      this.batchAssign = true;
    },
    cancel() {
      this.batchAssign = false;
      this.$emit('close');
    },
    save() {
      this.assign(this.leadsIds);
    },
    selectionChange(selection) {
      let s = this.selectedIds;
      let c = this.currentIds;
      for (let i in c) {
        if (s.includes(c[i])) {
          let num = this.selectedIds.indexOf(c[i]);
          s.splice(num, 1);
        }
      }
      if (selection.length) {
        selection.forEach((item) => {
          s.push(item.id);
        });
      }
    },
    selectionChange1(selection) {
      this.assignSelection = selection;
      this.leadsIds = selection.map((v) => v.id);
    },
    assign(arr) {
      // 判断带分配 leads 是否有已分配的资源
      let _status = false; // 是否含有已分配资源，默认false
      this.assignSelection.forEach((item) => {
        if (item.status == 'assign') {
          _status = true;
        }
      });
      console.log('_status: ' + _status);
      if (_status && this.reason == '') {
        this.$Message.error(
          this.$t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1211')
        );
        return false;
      }

      if (this.isActioning) {
        //多次提交拦截
        return;
      }
      this.isActioning = true;
      this.updateLoadingStatus({ isLoading: true });
      let params = {
        assignPhase: 'sale',
        ids: arr,
        assignedUserIds: this.selectedIds,
        assignOfficeId: this.assignOfficeId,
        officeId: this.assignOfficeId,
        reason: this.reason
      };
      crmCustomerStatus
        .assign(params)
        .then(valid.call(this))
        .then((res) => {
          if (res.ok) {
            this.$refs.selectionTable.selectAll(false);
            this.data1 = this.data1.filter((v) => arr.indexOf(v.id) == -1);
            if (res.data.data.totalCount - res.data.data.assignCount > 0) {
              this.$Modal.success({
                title: this.$t(
                  'modules_spoc_crm_web_src_views_customermanagement_assignleads_1221'
                ),
                content: this.$t(
                  'modules_spoc_crm_web_src_views_customermanagement_assignleads_1222',
                  [res.data.data.assignCount, res.data.data.totalCount - res.data.data.assignCount]
                )
              });
            } else {
              // this.$Modal.success({
              //     title: '分配成功',
              //     content: `已分配${res.data.data.assignCount}个资源，剩余${res.data.data.totalCount - res.data.data.assignCount}个资源未分配!<br>销售资源数已达到最大值，请将未分配资源分配给其他销售。`
              // });
              this.$Message.success(
                this.$t('modules_spoc_crm_web_src_views_customermanagement_assignleads_1223')
              );
            }
          }
        })
        .catch(errors.call(this))
        .finally(() => {
          // this.updateLoadingStatus({ isLoading: false });
          this.getList();
          setTimeout(() => {
            //多次提交拦截
            this.isActioning = false;
          }, 200);
        });
    },
    visibleChange(val) {
      if (!val) {
        this.batchAssign = false;
        this.$emit('assign-success');
        this.$nextTick(() => {
          this.$emit('close');
        });
      }
    }
  },
  watch: {
    'app.currOfficeId': function (val, oldVal) {
      if (oldVal) {
        // this.$set(this, 'campus', this.app.currOfficeId);
        this.campus = this.app.currOfficeId;
        this.pageNo = 1;
        this.search();
      }
    }
  }
};
</script>
