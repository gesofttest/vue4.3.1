<template>

    <div id="login">
        <!--        <h1>登录测试组件</h1>-->


        <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules" label-width="80px">
            <el-form-item label="用户名称" prop="userName">
                <el-input v-model="loginForm.userName">
                    <i slot="suffix" class="iconfont  iconicon-test suffixIcon"></i>
                </el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
                <el-input v-model="loginForm.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">立即登录</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-row>
            <el-button type="primary" round v-on:click="initVueonloac">login</el-button>
            <el-button type="success" round v-on:click="debounce">手抖</el-button>
        </el-row>
        <div class="tb_box">
            <v-table
                    is-horizontal-resize
                    style="width:100%"
                    row-hover-color="#eee"
                    :columns="columns"
                    :table-data="tableData"
                    :show-vertical-border="false"

            ></v-table>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="pageSizes"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                        :prev-text="'上一页'"
                        :next-text="'下一页'"
                >
                </el-pagination>
            </div>
        </div>
        <mt-picker :slots="slots" @change="onValuesChange" style="margin-top: 20px;"></mt-picker>
    </div>

</template>

<script>


    const delay = (function () {
        let timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms)
        }
    })();
    export default {
        beforeCreate() {

            var nums = [1,3,5,6], target = 0;
            /**
             * @param {number[]} nums
             * @param {number} target
             * @return {number}
             */
            var searchInsert = function (nums, target) {
                let index = 0;
                for (let i = 0; i < nums.length; i++) {
                    if (nums[i] >= target) {
                        index=i;
                        return index;
                    }
                }
            };


            console.log(searchInsert(nums, target));
        },
        name: "Login",
        data() {
            return {


                slots: [
                    {
                        flex: 1,
                        values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                        className: 'slot1',
                        textAlign: 'right'
                    }, {
                        divider: true,
                        content: '-',
                        className: 'slot2'
                    }, {
                        flex: 1,
                        values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
                        className: 'slot3',
                        textAlign: 'left'
                    }
                ],
                //验证规则
                loginFormRules: {
                    userName: [
                        {required: true, message: '请输入用户名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入用户密码', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                },
                loginForm: {
                    userName: 'zzy',
                    password: '123',
                },
                total: 0,
                pageNum: 1,
                pageSize: 10,
                pageSizes: [10, 100, 200, 400],
                tableData: [],
                columns: [
                    {
                        field: 'id',
                        title: 'id',
                        width: 100,
                        titleAlign: 'center',
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: 'address',
                        title: 'address',
                        width: 100,
                        titleAlign: 'center',
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: 'inputTime',
                        title: 'inputTime',
                        width: 100,
                        titleAlign: 'center',
                        columnAlign: 'center',
                        isResize: true
                    },
                    {
                        field: 'ip',
                        title: 'ip',
                        width: 100,
                        titleAlign: 'center',
                        columnAlign: 'center',
                        isResize: true
                    }]
            }
        },
        created() {
            // this.initVueonloac();
        },

        methods: {
            onValuesChange(picker, values) {
                if (values[0] > values[1]) {
                    picker.setSlotValue(1, values[0]);
                }
            },
            submitForm(formName) {
                // this.$refs[formName].validateField('password')
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.loginForm.password = '';
                this.loginForm.userName = '';
            },
            debounce() {
                delay(() => {
                    console.log('手抖？', this.$axios.default);

                }, 500);
            },
            initVueonloac() {
                this.pageNum = 1;
                this.getList(this.pageNum, this.pageSize);
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.pageNum = 1;
                this.handleCurrentChange(this.pageNum);
                // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getList(this.pageNum, this.pageSize);
                // console.log(`当前页: ${val}`);
            },
            async getList(pageNum, pageSize) {
                try {
                    let res = await this.$axios.get('http://127.0.0.1:8061/login.action?pageNum=' + pageNum + '&pageSize=' + pageSize);
                    console.log(res)
                    this.total = res.data.total;
                    this.currentPage = res.data.maxPage;
                    this.tableData = res.data.data;
                    this.$message.success('数据出现成功')
                } catch (e) {
                    console.log(e)
                }

            },

        },

    }
</script>

<style lang="less" scoped>
    #login {
        background-color: aliceblue;
        padding: 20px;

        .suffixIcon {
            width: 25px;
            display: block;
        }

        .tb_box {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }


</style>