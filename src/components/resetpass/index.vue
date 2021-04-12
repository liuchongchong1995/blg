<template>
    <div class="app-container">
        <card>
            <card-header>
                <strong>修改密码</strong>
            </card-header>
            <card-body>
                <el-form ref="form" :model="form" :rules="rules" label-width="150px">
                    <el-col v-if="type == 'unit'">
                        <el-form-item label="ID：">
                            <el-input v-model="form.id" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="单位名称：">
                            <el-input v-model="form.unit_name" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="单位联系人手机号：">
                            <el-input v-model="form.mobile" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col v-if="type == 'deputy'">
                        <el-form-item label="代表号：">
                            <el-input v-model="form.user_name" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="手机号：">
                            <el-input v-model="form.mobile" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-form-item label="原始密码：" prop="old_pass">
                        <el-input v-model="form.old_pass" type="password" placeholder="请输入原始密码"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码：" prop="new_pass">
                        <el-input v-model="form.new_pass" type="password" placeholder="请输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码：" prop="new_pass_firm">
                        <el-input v-model="form.new_pass_firm" type="password" placeholder="请重新输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="editInfo">
                            确认
                        </el-button>
                    </el-form-item>
                </el-form>
            </card-body>
        </card>
    </div>
</template>

<script>
    import {
        updatePass,
        ajaxGetUnitDetail,
        ajaxGetDeputyDetail
    } from '@/assets/api/system';


    export default {
        name: "resetPass",
        props: {
            type: String
        },
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    callback();
                }
            };

            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请重新输入新密码'));
                } else if (value !== this.form.new_pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };

            return {
                form: {
                    id: '',
                    unit_name: '',
                    user_name: '',
                    mobile: '',
                    old_pass: '',
                    new_pass_firm: '',
                    new_pass: ''
                },
                rules: {
                    old_pass: [
                        {required: true, message: '请输入原始密码', trigger: 'blur'}
                    ],
                    new_pass: [
                        {required: true, validator: validatePass, trigger: 'blur'}
                    ],
                    new_pass_firm: [
                        {required: true, validator: validatePass2, trigger: 'blur'}
                    ]
                }

            };
        },
        created(){
            this.type == 'unit' ? this.ajaxGetUnitDetail() : this.ajaxGetDeputyDetail();
        },
        methods: {
            editInfo() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        updatePass(this.form).then(() => {
                            this.$message.success('修改成功！');
                            setTimeout(function(){
                                this.logout();
                            },500)
                        })
                    } else {
                        return false;
                    }
                });
            },
            async logout(){
                await this.$store.dispatch('user/logout');
                this.$router.push(`/login`);
            },
            getForm(data){
                for (let i in data) {

                    if (Object.prototype.hasOwnProperty.call(this.form, i)) {
                        this.form[i] = data[i];
                    }
                }
            },

            async ajaxGetUnitDetail() {
                ajaxGetUnitDetail().then(res => {
                    this.getForm(res.data);
                })
            },

            async ajaxGetDeputyDetail() {
                ajaxGetDeputyDetail().then(res => {
                    this.getForm(res.data);
                })
            }
        }
    };
</script>

<style scoped>
    ::v-deep.el-input .el-input__inner {
        width: 300px
    }

    ::v-deep.el-input.is-disabled .el-input__inner {
        border: none;
        background: none;
        color: #606266;
    }

</style>
