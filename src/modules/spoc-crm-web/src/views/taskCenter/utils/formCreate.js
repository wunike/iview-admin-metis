import valid, {
    errors,
    sys,
    sysDict,
    crmQrcode,
    crmCustomer
} from '../../../libs/request.js';
const formCreateSetting = {
    data() {
        return {
            //实例对象
            fApi1: {},
            //表单生成规则
            rule1: [],
        };
    },
    methods: {
        setFormAttr1(list) {
            let $f = this.fApi;
            let arr = [];
            let num = list.filter(v => !!v.dictType).length;
            let index = 0;
            let dictTypes = list.filter(v => !!v.dictType).map(v => v.dictType).join(',');
            let params1 = {
                types: dictTypes
            };
            sysDict
                .batchListData(params1)
                .then(valid.call(this))
                .then(res => {
                    if (res.ok) {
                        let dictTypeObj = res.data.data
                        list.forEach((v, k) => {
                            if(v.isQuery==0){
                                return ;
                            }
                            let obj = Object.assign({}, this.formMap[v.jdbcType]);
                            obj=JSON.parse(JSON.stringify(obj));
                            const name=v.name;
                            // obj.title = v.name + ':';
                            obj.props.placeholder = name;
                            obj.field = v.field;
                            obj.options = v.dictType ? dictTypeObj[v.dictType] : (v.options || []);
                            obj.validate = [];
                            // if (v.required == '1') {
                            //     let validate = {
                            //         required: true,
                            //         message: `请输入${v.name}`,
                            //         type: 'string',
                            //         trigger: (v.jdbcType == 'input') ? 'blur' : 'change'
                            //     }
                            //     if (v.jdbcType=="AddressMap") {
                            //         validate.type = 'object';
                            //         validate.fields = {
                            //             address: {
                            //                 type: "string",
                            //                 required: true,
                            //                 message: `${v.name}不能为空`,
                            //             }
                            //         }
                            //     }
                            //     obj.validate.push(validate)
                            // }

                            if (v.dictType) {
                                index = index + 1;
                                console.log(index, num)
                                arr[k] = obj;
                                if (k == list.length - 1) {
                                    this.rule1 = arr;
                                }
                            } else {
                                arr[k] = obj;
                                if (k == list.length - 1) {
                                    this.rule1 = arr;
                                }
                            }
                        });
                    }
                })
                .catch(errors.call(this))
                .finally(() => {});
        },
    },
}
export default formCreateSetting;
