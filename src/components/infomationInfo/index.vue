<template>
    <div>
        <el-form
            ref="refForm"
            status-icon
            :rules="rules"
            :model="params"
            label-position="right"
            label-width="150px"
        >
            <el-form-item label="操作记录:" v-if="dialogStatus === 'view'">
                <div style="color: #F56C6C;">
                    {{ form.auth_time }}
                    【{{ form.auth_user_name }}】
                    {{ form.status == '1' ? '审核通过' : '审核不通过' }}
                </div>
                <div v-if="form.status == '3'" style="color: #F56C6C;">
                    原因：{{ form.reason }}
                </div>
            </el-form-item>

            <div v-if="form.article_type == '1'">
                <el-form-item label="标题:">
                    {{ form.title }}
                </el-form-item>
                <el-form-item label="城市:" v-if="form.organize_source_type != 2">
                    {{ form.province_name }} {{ form.city_name }}
                </el-form-item>
                <el-form-item label="服务团:" v-else>
                    {{ form.service_team_name }}
                </el-form-item>
                <el-form-item label="新闻类型:">
                    {{ form.category_two_name }}
                </el-form-item>
                <el-form-item label="封面:">
                    <div class="demo-image__preview" >
                        <el-image
                            v-if="previewSrcList[0]"
                            style="width: 275px; height: 154px"
                            :src="previewSrcList[0]"
                            :lazy="true"
                            :preview-src-list="previewSrcList">
                        </el-image>
                    </div>
                </el-form-item>
                <el-form-item label="内容:" v-if="form.content">
                    <quill-editor v-model="form.content" :disabled="true" :options="disabledEditorOption" />
                </el-form-item>
                <el-form-item label="关键字:">
                    <div class="tag-group"
                         v-if="form.tag_id.length">
                        <el-tag
                            v-for="item in form.tag_id"
                            :key="item"
                            :type="item"
                            effect="plain"
                            style="margin-right: 10px;">
                            {{ item }}
                        </el-tag>
                    </div>
                </el-form-item>
            </div>

            <div v-if="form.article_type == '2'">
                <el-form-item label="标题:">
                    {{ form.title }}
                </el-form-item>
                <el-form-item label="图片:">
                    <div class="demo-image__preview"
                         style="overflow: hidden;"
                         v-for="(item, index) in form.content"
                         :key="index"
                    >
                        <el-image
                            style="width: 100px; height: 100px;float:left;margin-bottom: 20px"
                            v-if="item.img"
                            :src="item.img"
                            :lazy="true"
                            :preview-src-list="previewSrcList">
                        </el-image>
                        <div class="block" style="margin-left: 120px;">
                            {{ item.title }}
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="关键字:">
                    <div class="tag-group"
                         v-if="form.tag_id.length"
                    >
                        <el-tag
                            v-for="item in form.tag_id"
                            :key="item"
                            :type="item"
                            effect="plain"
                            style="margin-right: 10px;"
                        >
                            {{ item }}
                        </el-tag>
                    </div>
                </el-form-item>
                <el-form-item label="城市:" v-if="form.organize_source_type != 2">
                    {{ form.province_name }} {{ form.city_name }}
                </el-form-item>
                <el-form-item label="服务团:" v-if="form.organize_source_type == 2">
                    {{ form.service_team_name }}
                </el-form-item>
            </div>
            
            <el-form-item v-if="form.status == '4'" label="审核选择:" prop="auth_status">
                <el-radio-group v-model="params.auth_status">
                    <el-radio label="1">
                        审核通过
                    </el-radio>
                    <el-radio label="2">
                        审核不通过
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="form.status == '4'" label="审核备注:" prop="reason">
                <el-input
                    v-model="params.reason"
                    type="textarea"
                    rows="5"
                    maxlength="100"
                    show-word-limit/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer tr">
            <el-button
                v-if="dialogStatus === 'pass'"
                type="primary"
                @click="dealPass()"
            >
                确定
            </el-button>
            <el-button @click="closeDialog">
                关闭
            </el-button>
        </div>
    </div>
</template>

<script>
    import {getDetailById, authStatus} from '@/assets/api/review';
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import { quillEditor } from 'vue-quill-editor';
    export default {
        name: 'infomationInfo',
        components:{
            quillEditor
        },
        props: {
            id: Number,
            dialogStatus: {
                type: String,
                default: 'view'
            },
            optWidth: {
                type: String,
                default: '210'
            },
            query: Object
        },
        data() {
            return {
                disabledEditorOption:{
                    readOnly: true,
                    theme: 'bubble',
                },
                previewSrcList: [],
                rules: {
                    reason: [
                        {
                            validator: (rule, value, callback) => {
                                if (this.params.auth_status == '2' && value == '') {
                                    callback(new Error('备注不能为空'));
                                } else {
                                    callback();
                                }
                            }, trigger: 'change'
                        }
                    ]
                },
                params: {
                    articleIds: [],
                    auth_status: '1',
                    reason: ''
                },
                form: {}
            };
        },
        created() {
            this.getInfo();
        },
        methods: {

            // 获取详情数据
            async getInfo() {
                const {data} = await getDetailById({id: this.id});
                this.form = data;
                this.params.articleIds.push(this.id);
                
                if (this.form.article_type == 2){
                    this.previewSrcList = this.form.content && this.form.content.map((item)=>{
                        return item.img;
                    })
                }else {
                    this.form.cover.length > 0 ? this.previewSrcList = this.form.cover:[];
                }
            },

            // 点击审核按钮
            async dealPass() {
                this.$refs['refForm'].validate(async (valid) => {
                    if (valid) {
                        await authStatus(this.params);
                        this.$message.success('审核成功!');
                        this.closeDialog();
                        // 重新获取红点数量
                    } else {
                        return false;
                    }
                });
            },

            // 关闭弹窗
            closeDialog() {
                this.$emit('closeDialog');
            },

            toText(HTML){
                var input = HTML;

                return input.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');
            }
        }
    };
</script>

<style lang="scss" scoped></style>
