<template>
    <div>
        <card v-if="audit_status == 2">
            <div class="review-reason">
                <p class="review-title"> 审核记录-{{ audioObj.audit_type }}在{{ audioObj.audit_time }}将您的信息审核不通过，审核不同原因为：</p>
                <p>{{ audioObj.audit_reason }}</p>
            </div>
        </card>
        <div class="btn fr" v-if="!editReasonFlag">
            <el-button type="success" size="mini" @click="prev" v-if="activeNum > 1">
                上一步
            </el-button>
            <el-button type="success" size="mini" @click="next" v-if="activeNum < 3">
                下一步
            </el-button>
            <el-button type="info" size="mini" @click="save" v-if="status !== 'pass'">
                暂存
            </el-button>
            <el-button type="primary" size="mini" @click="submmitFun" v-if="status !== 'pass' && activeNum >= 3">
                提交审核
            </el-button>
        </div>
        <el-col :span="24">
            <el-tabs v-model="active" type="card" :before-leave="TabChange">
                <el-tab-pane label="基本信息（一）" name="1">
                    <el-form label-width="120px" :inline="true" :rules="rules1" ref="form1" :disabled="disabled" :model="form1" size="mini" @submit.native.prevent>
                        <table class="registrat-table">
                            <tr>
                                <td class="label-td">
                                    <el-form-item label="姓名" prop="name"></el-form-item>
                                    <!-- <el-tooltip class="item" effect="dark" :content="reasonData.name_reason" placement="bottom-start" v-if="reasonData.name_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('name_reason')" v-if="editReasonFlag"></el-button> -->
                                </td>
                                <td colspan="2"><el-input v-model="form1.name" maxlength="10" disabled></el-input></td>
                                <td class="label-td">
                                    <el-form-item label="性别" prop="gender" :class="(reasonData.gender_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.gender_reason" placement="bottom-start" v-if="reasonData.gender_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('gender_reason','性别')" v-if="editReasonFlag"></el-button>
                                </td>
                                <td colspan="2">
                                    <el-form-item prop="gender">
                                        <el-select v-model="form1.gender" placeholder="请选择">
                                            <el-option label="男" value="1"></el-option>
                                            <el-option label="女" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td class="label-td">
                                    <el-form-item label="民族" prop="nation" :class="(reasonData.nation_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.nation_reason" placement="bottom-start" v-if="reasonData.nation_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('nation_reason','民族')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="3">
                                    <el-form-item prop="nation">
                                        <el-select v-model="form1.nation" filterable placeholder="请选择">
                                            <el-option v-for="(item,key) in NationList" :value="item" :key="key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td rowspan="4" style="width:200px;">
                                    <el-form-item prop="cover">
                                        <el-tooltip class="item" effect="dark" :content="reasonData.cover_reason" placement="bottom-start" v-if="reasonData.cover_reason && audit_status == 2">
                                            <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                        </el-tooltip>
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('cover_reason','头像')" v-if="editReasonFlag"></el-button>
                                        <el-upload class="upload-demo" action="xxx" :http-request="imageUpload" list-type="picture-card" :show-file-list="false" :before-upload="beforeUpload" accept="image/png, image/jpeg,image/jpg">
                                            <el-image v-if="form1.cover" class="img-box" style="width: 100px; height: 100px" lazy :src="form1.cover" fit="fit"></el-image>
                                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            <div class="el-upload__tip" slot="tip">仅支持上传jpg、png格式图片，图片大小建议{{ uploadImgSize }}px且不超过2M。</div>
                                        </el-upload>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="label-td">
                                    <el-form-item label="出生年月日" prop="birthday" :class="(reasonData.birthday_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.birthday_reason" placement="bottom-start" v-if="reasonData.birthday_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('birthday_reason','出生年月日')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <el-form-item prop="birthday">
                                        <el-date-picker v-model="form1.birthday" :picker-options="isDisabled" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </td>
                                <td class="label-td">
                                    <el-form-item label="国籍" prop="nationality" :class="(reasonData.nationality_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.nationality_reason" placement="bottom-start" v-if="reasonData.nationality_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('nationality_reason','国籍')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <el-form-item prop="nationality">
                                        <el-select v-model="form1.nationality" filterable placeholder="请选择">
                                            <el-option v-for="(item,key) in CountryList" :label="item" :value="item" :key="key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td class="label-td">
                                    <el-form-item label="籍贯" prop="native_place" :class="(reasonData.native_place_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.native_place_reason" placement="bottom-start" v-if="reasonData.native_place_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('native_place_reason','籍贯')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="3">
                                    <div :class="(form1.native_place !='110000' && form1.native_place !='120000' && form1.native_place !='310000' && form1.native_place !='500000' ? 'el-form-select' : '')">
                                        <el-form-item prop="native_place">
                                            <el-select v-model="form1.native_place" filterable placeholder="请选择" style="margin-right:10px;" @change="getPlaceTree('native')">
                                                <el-option v-for="(item,key) in nativePlaceData" :label="item.name" :value="item.id" :key="key"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item prop="native_city" v-if="form1.native_place !='110000' && form1.native_place !='120000' && form1.native_place !='310000' && form1.native_place !='500000'">
                                            <el-select v-model="form1.native_city" filterable placeholder="请选择">
                                                <el-option v-for="(item,key) in nativeCityData" :label="item.name" :value="item.id" :key="key"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="label-td">
                                    <el-form-item label="出生地" prop="birth_place" :class="(reasonData.birth_place_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.birth_place_reason" placement="bottom-start" v-if="reasonData.birth_place_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('birth_place_reason','出生地')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <div :class="(form1.birth_place !='110000' && form1.birth_place !='120000' && form1.birth_place !='310000' && form1.birth_place !='500000' ? 'el-form-select' : '')">
                                        <el-form-item prop="birth_place">
                                            <el-select v-model="form1.birth_place" filterable placeholder="请选择" style="margin-right:10px;" @change="getPlaceTree('birth')">
                                                <el-option v-for="(item,key) in nativePlaceData" :label="item.name" :value="item.id" :key="key"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item prop="birth_city" v-if="form1.birth_place !='110000' && form1.birth_place !='120000' && form1.birth_place !='310000' && form1.birth_place !='500000'">
                                            <el-select v-model="form1.birth_city" filterable placeholder="请选择">
                                                <el-option v-for="(item,key) in birthCityData" :label="item.name" :value="item.id" :key="key"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </td>
                                <td class="label-td">
                                    <el-form-item label="电子邮箱" prop="email" :class="(reasonData.email_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.email_reason" placement="bottom-start" v-if="reasonData.email_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('email_reason','电子邮箱')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <el-form-item prop="email">
                                        <el-input v-model="form1.email"></el-input>
                                    </el-form-item>
                                </td>
                                <td class="label-td">
                                    <el-form-item label="移动电话" prop="mobile"></el-form-item>
                                    <!-- <el-tooltip class="item" effect="dark" :content="reasonData.mobile_reason" placement="bottom-start" v-if="reasonData.mobile_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('mobile_reason')" v-if="editReasonFlag"></el-button> -->

                                </td>
                                <td colspan="3">
                                    <el-form-item prop="mobile">
                                        <el-input v-model="form1.mobile" disabled type="number"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td rowspan="2">
                                    政治面貌
                                </td>
                                <td class="label-td">
                                    <el-form-item label="党派1" prop="party1" :class="(reasonData.party1_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.party1_reason" placement="bottom-start" v-if="reasonData.party1_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('party1_reason','党派1')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <el-form-item prop="party1">
                                        <el-select v-model="form1.party1" placeholder="请选择">
                                            <el-option v-for="(item,key) in PartyList" :label="item" :value="item" :key="key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td class="label-td">
                                    <el-form-item label="职业类别" prop="vocation_type" :class="(reasonData.vocation_type_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.vocation_type_reason" placement="bottom-start" v-if="reasonData.vocation_type_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('vocation_type_reason','职业类别')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="5">
                                    <div class="el-form-select">
                                        <el-form-item prop="vocation_type">
                                            <el-select v-model="form1.vocation_type" placeholder="请选择" style="margin-right:10px;" @change="getCompanyTypeList()">
                                                <el-option v-for="(item,key) in UnitTypeList" :label="item.label" :value="item.value" :key="key"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item prop="company_type">
                                            <el-select v-model="form1.company_type" placeholder="请选择">
                                                <el-option v-for="(item,key) in companyTypeList" :label="item" :value="item" :key="key"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="label-td">
                                    <el-form-item label="党派2" prop="party2" :class="(reasonData.party2_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.party2_reason" placement="bottom-start" v-if="reasonData.party2_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('party2_reason','党派2')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <el-form-item prop="party2">
                                        <el-select v-model="form1.party2" placeholder="无">
                                            <el-option v-for="(item,key) in PartyList" :label="item" :value="item" :key="key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td class="label-td">
                                    <el-form-item label="证件类型" prop="certificates" :class="(reasonData.certificates_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.certificates_reason" placement="bottom-start" v-if="reasonData.certificates_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('certificates_reason','证件类型')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <el-form-item prop="certificates">
                                        <el-select v-model="form1.certificates" placeholder="请选择">
                                            <el-option v-for="(item,key) in CertificateList" :label="item" :value="item" :key="key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td class="label-td" colspan="2">
                                    <el-form-item label="证件号" prop="certificates_num" :class="(reasonData.certificates_num_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.certificates_num_reason" placement="bottom-start" v-if="reasonData.certificates_num_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('certificates_num_reason','证件号')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <el-form-item prop="certificates_num">
                                        <el-input v-model="form1.certificates_num"></el-input>
                                    </el-form-item>
                                </td>

                            </tr>
                            <tr>
                                <td class="label-td">
                                    <el-form-item label="学历学位信息" prop="edu_type" :class="(reasonData.edu_type_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.edu_type_reason" placement="bottom-start" v-if="reasonData.edu_type_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('edu_type_reason','学历学位信息')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td style="text-align:left;" colspan="10">
                                    <el-form-item prop="edu_type">
                                        <el-checkbox-group v-model="eduTypeArr">
                                            <el-checkbox v-for="(educate,key) in educateData" :label="educate.value" :key="key" @change="changeEducate">
                                                {{ educate.label }}
                                            </el-checkbox>
                                        </el-checkbox-group>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="form1.edu_type == 1 || form1.edu_type == 3">
                                <td colspan="11" style="text-align:left;">
                                    全日制教育
                                </td>
                            </tr>
                            <tr v-if="form1.edu_type == 1 || form1.edu_type == 3">
                                <td class="label-td">
                                    <el-form-item label="学历" prop="education" :class="(reasonData.education_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.education_reason" placement="bottom-start" v-if="reasonData.education_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('education_reason','全日制教育学历')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <el-form-item prop="education">
                                        <el-select v-model="form1.education" placeholder="请选择">
                                            <el-option v-for="(item,key) in EducationList" :label="item" :value="item" :key="key"></el-option>
                                        </el-select>
                                        <el-input v-model="form1.education_text" v-if="form1.education == '其他'" class="education-text"></el-input>
                                    </el-form-item>
                                </td>
                                <td class="label-td">
                                    <el-form-item label="学位" prop="degree" :class="(reasonData.degree_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.degree_reason" placement="bottom-start" v-if="reasonData.degree_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('degree_reason','全日制教育学位')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td>
                                    <el-form-item prop="degree">
                                        <el-select v-model="form1.degree" placeholder="请选择">
                                            <el-option v-for="(item,key) in DegreeList" :label="item" :value="item" :key="key"></el-option>
                                        </el-select>
                                        <el-input v-model="form1.degree_text" v-if="form1.degree == '其他'" class="education-text"></el-input>
                                    </el-form-item>
                                </td>
                                <td class="label-td">
                                    <el-form-item label="毕业院校" prop="graduated_school" :class="(reasonData.graduated_school_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.graduated_school_reason" placement="bottom-start" v-if="reasonData.graduated_school_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('graduated_school_reason','全日制教育毕业院校')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <el-form-item prop="graduated_school">
                                        <el-input v-model="form1.graduated_school"></el-input>
                                    </el-form-item>
                                </td>
                                <td class="label-td" >
                                    <el-form-item label="所学专业" prop="major" :class="(reasonData.education_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.major_reason" placement="bottom-start" v-if="reasonData.major_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('major_reason','全日制教育所学专业')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <el-form-item prop="major">
                                        <el-input v-model="form1.major"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr v-if="form1.edu_type == 2 || form1.edu_type == 3">
                                <td colspan="11" style="text-align:left;">
                                    在职教育
                                </td>
                            </tr>
                            <tr v-if="form1.edu_type == 2 || form1.edu_type == 3">
                                <td class="label-td">
                                    <el-form-item label="学历" prop="work_education" :class="(reasonData.work_education_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.work_education_reason" placement="bottom-start" v-if="reasonData.work_education_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('work_education_reason','在职教育学历')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <el-form-item prop="work_education">
                                        <el-select v-model="form1.work_education" placeholder="请选择">
                                            <el-option v-for="(item,key) in EducationList" :label="item" :value="item" :key="key"></el-option>
                                        </el-select>
                                        <el-input v-model="form1.work_education_text" v-if="form1.work_education == '其他'" class="education-text"></el-input>
                                    </el-form-item>
                                </td>
                                <td class="label-td">
                                    <el-form-item label="学位" prop="work_degree" :class="(reasonData.work_degree_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.work_degree_reason" placement="bottom-start" v-if="reasonData.work_degree_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('work_degree_reason','在职教育学位')" v-if="editReasonFlag"></el-button>
                                </td>
                                <td>
                                    <el-form-item prop="work_degree">
                                        <el-select v-model="form1.work_degree" placeholder="请选择">
                                            <el-option v-for="(item,key) in DegreeList" :label="item" :value="item" :key="key"></el-option>
                                        </el-select>
                                        <el-input v-model="form1.work_degree_text" v-if="form1.work_degree == '其他'" class="education-text"></el-input>
                                    </el-form-item>
                                </td>
                                <td class="label-td">
                                    <el-form-item label="毕业院校" prop="work_graduated_school" :class="(reasonData.work_graduated_school_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.work_graduated_school_reason" placement="bottom-start" v-if="reasonData.work_graduated_school_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('work_graduated_school_reason','在职教育毕业院校')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <el-form-item prop="work_graduated_school">
                                        <el-input v-model="form1.work_graduated_school"></el-input>
                                    </el-form-item>
                                </td>
                                <td class="label-td">
                                    <el-form-item label="所学专业" prop="work_major" :class="(reasonData.work_major_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.work_major_reason" placement="bottom-start" v-if="reasonData.work_major_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('work_major_reason','在职教育所学专业')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <el-form-item prop="work_major">
                                        <el-input v-model="form1.work_major"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="label-td" colspan="3">
                                    <el-form-item label="专业技术职务" prop="tech_post" :class="(reasonData.tech_post_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.tech_post_reason" placement="bottom-start" v-if="reasonData.tech_post_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('tech_post_reason','专业技术职务')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <el-form-item prop="tech_post">
                                        <el-input v-model="form1.tech_post"></el-input>
                                    </el-form-item>
                                </td>
                                <td class="label-td">
                                    <el-form-item label="专业技术职务等级" prop="post_level" :class="(reasonData.post_level_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.post_level_reason" placement="bottom-start" v-if="reasonData.post_level_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('post_level_reason','专业技术职务等级')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <el-form-item prop="post_level">
                                        <el-select v-model="form1.post_level" placeholder="请选择">
                                            <el-option v-for="(item,key) in postLevelList" :label="item.label" :value="item.value" :key="key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td class="label-td">
                                    <el-form-item label="是否具有院士身份" prop="identity" :class="(reasonData.identity_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.identity_reason" placement="bottom-start" v-if="reasonData.identity_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('identity_reason','是否具有院士身份')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <el-form-item prop="identity">
                                        <el-select v-model="form1.identity" placeholder="请选择">
                                            <el-option v-for="(item,key) in identityList" :label="item.label" :value="item.value" :key="key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="label-td" colspan="3">
                                    <el-form-item label="工作单位及职务" prop="company_post" :class="(reasonData.company_post_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.company_post_reason" placement="bottom-start" v-if="reasonData.company_post_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('company_post_reason','工作单位及职务')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="8">
                                    <el-form-item prop="company_post">
                                        <el-input v-model="form1.company_post"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="label-td" colspan="3">
                                    <el-form-item label="在国际科技组织任职情况" prop="international_tech_appoint" :class="(reasonData.international_tech_appoint_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.international_tech_appoint_reason" placement="bottom-start" v-if="reasonData.international_tech_appoint_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('international_tech_appoint_reason','在国际科技组织任职情况')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="8">
                                    <el-form-item prop="international_tech_appoint">
                                        <el-input v-model="form1.international_tech_appoint"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="label-td" colspan="3">
                                    <el-form-item label="在民主党派任职情况" prop="democratic_party_appoint" :class="(reasonData.democratic_party_appoint_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.democratic_party_appoint_reason" placement="bottom-start" v-if="reasonData.democratic_party_appoint_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('democratic_party_appoint_reason','在民主党派任职情况')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="8">
                                    <el-form-item prop="democratic_party_appoint">
                                        <el-input v-model="form1.democratic_party_appoint"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="label-td" colspan="3">
                                    <el-form-item label="学术组织任职情况" prop="committee_type" :class="(reasonData.committee_type_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.committee_type_reason" placement="bottom-start" v-if="reasonData.committee_type_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('committee_type_reason','学术组织任职情况')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <el-form-item prop="committee_type">
                                        <el-select v-model="form1.committee_type" placeholder="请选择" @change="committeType">
                                            <el-option v-for="(item,key) in MeetingList" :label="item" :value="item" :key="key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td class="label-td" colspan="3">
                                    <el-form-item label="学术组织名称及担任职务" prop="committee_positon" :class="(reasonData.committee_positon_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.committee_positon_reason" placement="bottom-start" v-if="reasonData.committee_positon_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('committee_positon_reason','学术组织名称及担任职务')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="4">
                                    <el-form-item prop="committee_positon">
                                        <el-input v-model="form1.committee_positon" :disabled="form1.committee_type == '无'"></el-input> 
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="label-td" colspan="3">

                                    <el-form-item label="党派及社会团体任职情况" prop="position_party" :class="(reasonData.position_party_reason && audit_status == 2)?'erro-label':''">
                                    </el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.position_party_reason" placement="bottom-start" v-if="reasonData.position_party_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('position_party_reason','党派及社会团体任职情况')" v-if="editReasonFlag"></el-button>
                                </td>
                                <td colspan="2">
                                    <div :class="(form1.position_party !=3 && form1.position_party != '0' ? 'el-form-select' : '')">
                                        <el-form-item prop="position_party">
                                            <el-select v-model="form1.position_party" filterable placeholder="请选择" style="margin-right:10px;" @change="getPositionTypeList">
                                                <el-option v-for="(item,key) in positionPartyData" :label="item.label" :value="item.value" :key="key"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item prop="position_type" v-if="form1.position_party != 3 && form1.position_party != '0'">
                                            <el-select v-model="form1.position_type" filterable placeholder="请选择">
                                                <el-option v-for="(item,key) in positionTypeData" :label="item" :value="item" :key="key"></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </div>
                                </td>
                                <td class="label-td" colspan="3">
                                    <el-form-item label="党派及社会团体组织名称及担任职务" prop="positon_name_post" :class="(reasonData.positon_name_post_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.positon_name_post_reason" placement="bottom-start" v-if="reasonData.positon_name_post_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('positon_name_post_reason','党派及社会团体组织名称及担任职务')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="4">
                                    <el-form-item prop="positon_name_post">
                                        <el-input v-model="form1.positon_name_post" :disabled="form1.position_party == '0'"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="label-td" colspan="3">
                                    <el-form-item label="在科协任职情况" prop="tech_association_appoint" :class="(reasonData.tech_association_appoint_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.tech_association_appoint_reason" placement="bottom-start" v-if="reasonData.tech_association_appoint_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('tech_association_appoint_reason','在科协任职情况')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <el-form-item prop="tech_association_appoint">
                                        <el-select v-model="form1.tech_association_appoint" placeholder="请选择" @change="changeTechAssociation">
                                            <el-option label="是" value="1"></el-option>
                                            <el-option label="否" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td class="label-td" colspan="3">
                                    <el-form-item label="科协类别" prop="tech_association_type" :class="(reasonData.tech_association_type_reason && audit_status == 2 )?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.tech_association_type_reason" placement="bottom-start" v-if="reasonData.tech_association_type_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('tech_association_type_reason','科协类别')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="4">
                                    <el-form-item prop="tech_association_type">
                                        <el-select v-model="form1.tech_association_type" :disabled="form1.tech_association_appoint === '2'" placeholder="请选择">
                                            <el-option v-for="(item,key) in AssociaList" :label="item" :value="item" :key="key"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="label-td">
                                    <el-form-item label="中共中央委员" prop="center_member" :class="(reasonData.center_member_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.center_member_reason" placement="bottom-start" v-if="reasonData.center_member_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('center_member_reason','中共中央委员')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td>
                                    <el-form-item prop="center_member">
                                        <el-select v-model="form1.center_member" placeholder="请选择">
                                            <el-option label="是" value="1"></el-option>
                                            <el-option label="否" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td rowspan="2" style="width:140px;">全国人大</td>
                                <td class="label-td">
                                    <el-form-item label="常委" prop="congress_standing" :class="(reasonData.congress_standing_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.congress_standing_reason" placement="bottom-start" v-if="reasonData.congress_standing_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('congress_standing_reason','全国人大常委')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td>
                                    <el-form-item prop="congress_standing">
                                        <el-select v-model="form1.congress_standing" placeholder="请选择">
                                            <el-option label="是" value="1"></el-option>
                                            <el-option label="否" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td rowspan="2" style="width:140px;">全国政协</td>
                                <td class="label-td">
                                    <el-form-item label="常委" prop="cppcc_standing" :class="(reasonData.cppcc_standing_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.cppcc_standing_reason" placement="bottom-start" v-if="reasonData.cppcc_standing_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('cppcc_standing_reason','全国政协常委')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td>
                                    <el-form-item prop="cppcc_standing">
                                        <el-select v-model="form1.cppcc_standing" placeholder="请选择">
                                            <el-option label="是" value="1"></el-option>
                                            <el-option label="否" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                            </tr>
                            <tr>
                                <td class="label-td">
                                    <el-form-item label="中共候补委员" prop="alternate_member" :class="(reasonData.alternate_member_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.alternate_member_reason" placement="bottom-start" v-if="reasonData.alternate_member_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('alternate_member_reason','中共候补委员')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td>
                                    <el-form-item prop="alternate_member">
                                        <el-select v-model="form1.alternate_member" placeholder="请选择">
                                            <el-option label="是" value="1"></el-option>
                                            <el-option label="否" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td class="label-td">
                                    <el-form-item label="代表" prop="congress_representa" :class="(reasonData.congress_representa_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.congress_representa_reason" placement="bottom-start" v-if="reasonData.congress_representa_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('congress_representa_reason','全国人大代表')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td>
                                    <el-form-item prop="congress_representa">
                                        <el-select v-model="form1.congress_representa" placeholder="请选择">
                                            <el-option label="是" value="1"></el-option>
                                            <el-option label="否" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>
                                <td class="label-td">
                                    <el-form-item label="委员" prop="cppcc_member" :class="(reasonData.cppcc_member_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.cppcc_member_reason" placement="bottom-start" v-if="reasonData.cppcc_member_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('cppcc_member_reason','全国政协委员')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td style="width:180px">
                                    <el-form-item prop="cppcc_member">
                                        <el-select v-model="form1.cppcc_member" placeholder="请选择">
                                            <el-option label="是" value="1"></el-option>
                                            <el-option label="否" value="2"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </td>

                            </tr>
                            <tr>
                                <td class="label-td">
                                    <el-form-item label="单位电话" prop="company_mobile" :class="(reasonData.company_mobile_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.company_mobile_reason" placement="bottom-start" v-if="reasonData.company_mobile_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('company_mobile_reason','单位电话')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td>
                                    <el-form-item prop="company_mobile">
                                        <el-input v-model="form1.company_mobile"></el-input>
                                    </el-form-item>
                                </td>
                                <td class="label-td">
                                    <el-form-item label="单位通讯地址" prop="company_addr" :class="(reasonData.company_addr_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.company_addr_reason" placement="bottom-start" v-if="reasonData.company_addr_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('company_addr_reason','单位通讯地址')" v-if="editReasonFlag"></el-button>

                                </td>
                                <td colspan="2">
                                    <el-form-item prop="company_addr">
                                        <el-input v-model="form1.company_addr"></el-input>
                                    </el-form-item>
                                </td>
                                <td class="label-td">
                                    <el-form-item label="邮政编码" prop="company_postcode" :class="(reasonData.company_postcode_reason && audit_status == 2)?'erro-label':''"></el-form-item>
                                    <el-tooltip class="item" effect="dark" :content="reasonData.company_postcode_reason" placement="bottom-start" v-if="reasonData.company_postcode_reason && audit_status == 2">
                                        <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                                    </el-tooltip>
                                    <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('company_postcode_reason','邮政编码')" v-if="editReasonFlag"></el-button>
                                </td>
                                <td colspan="2">
                                    <el-form-item prop="company_postcode">
                                        <el-input v-model="form1.company_postcode" type="number"></el-input>
                                    </el-form-item>
                                </td>
                            </tr>
                        </table>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="基本信息（二）" name="2">
                    <el-form class="text-box form-box" :rules="rules2" ref="form2" :model="form2" :disabled="disabled" size="mini">
                        <el-form-item label="主要学习经历和工作经历" prop="study_work" :class="(reasonData.study_work_reason && audit_status == 2)?'erro-label':''">
                            <el-tooltip class="item" effect="dark" :content="reasonData.study_work_reason" placement="bottom-start" v-if="reasonData.study_work_reason && audit_status == 2">
                                <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                            </el-tooltip>
                            <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('study_work_reason','主要学习经历和工作经历')" v-if="editReasonFlag"></el-button>
                            <el-input type="textarea" v-model="form2.study_work"></el-input>
                        </el-form-item>
                        <el-form-item label="学术成果或创新业绩" prop="achievement" :class="(reasonData.achievement_reason && audit_status == 2)?'erro-label':''">
                            <el-tooltip class="item" effect="dark" :content="reasonData.achievement_reason" placement="bottom-start" v-if="reasonData.achievement_reason && audit_status == 2">
                                <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                            </el-tooltip>
                            <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('achievement_reason','学术成果或创新业绩')" v-if="editReasonFlag"></el-button>
                            <el-input type="textarea" v-model="form2.achievement"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="基本信息（三）" name="3">
                    <el-form class="text-box form-box" :rules="rules3" ref="form3" :model="form3" :disabled="disabled">
                        <el-form-item label="其他科技工作成绩" prop="work_score" :class="(reasonData.work_score_reason && audit_status == 2)?'erro-label':''">
                            <el-tooltip class="item" effect="dark" :content="reasonData.work_score_reason" placement="bottom-start" v-if="reasonData.work_score_reason && audit_status == 2">
                                <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                            </el-tooltip>
                            <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('work_score_reason','其他科技工作成绩')" v-if="editReasonFlag"></el-button>
                            <el-input type="textarea" v-model="form3.work_score"></el-input>
                        </el-form-item>
                        <el-form-item label="主要学术著作及论文" prop="paper" :class="(reasonData.paper_reason && audit_status == 2)?'erro-label':''">
                            <el-tooltip class="item" effect="dark" :content="reasonData.paper_reason" placement="bottom-start" v-if="reasonData.paper_reason && audit_status == 2">
                                <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                            </el-tooltip>
                            <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('paper_reason','主要学术著作及论文')" v-if="editReasonFlag"></el-button>
                            <el-input type="textarea" v-model="form3.paper"></el-input>
                        </el-form-item>
                        <el-form-item label="备注" prop="three_remark" :class="(reasonData.three_remark_reason && audit_status == 2)?'erro-label':''">
                            <el-tooltip class="item" effect="dark" :content="reasonData.three_remark_reason" placement="bottom-start" v-if="reasonData.three_remark_reason && audit_status == 2">
                                <el-button class="icon-edit" icon="el-icon-edit" type="text"></el-button>
                            </el-tooltip>
                            <el-button class="icon-edit" icon="el-icon-edit" type="text" @click="editReason('paper_reason','备注')" v-if="editReasonFlag"></el-button>
                            <el-input type="textarea" v-model="form3.three_remark"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-col :span="24" v-if="status == 'add' || status == 'edit'">
                    <el-link type="primary">备注：所有项均为必填项，没有内容可填写"无"或"0"；</el-link>
                </el-col>
                <el-col :span="24" v-if="editReasonFlag">
                    <el-form class="text-box" ref="reviewForm" :rules="reviewRule" :model="reviewForm">
                        <el-form-item label="审核选择" prop="status">
                            <el-radio-group v-model="reviewForm.status">
                                <el-radio label="3" name="status">审核通过</el-radio>
                                <el-radio label="2" name="status">审核不通过</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="审核备注" prop="reason">
                            <el-input type="textarea" v-model="reviewForm.reason" placeholder="请输入审核备注"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="mini" @click="submmitFun">
                                确定
                            </el-button>
                            <el-button type="info" size="mini" @click="goBack">
                                关闭
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="24">
                    <div class="btn text-left" v-if="!editReasonFlag">
                        <el-button type="success" size="mini" @click="prev" v-if="activeNum > 1">
                            上一步
                        </el-button>
                        <el-button type="success" size="mini" @click="next" v-if="activeNum < 3">
                            下一步
                        </el-button>
                        <el-button type="info" size="mini" @click="save" v-if="status !== 'pass'">
                            暂存
                        </el-button>
                        <el-button type="primary" size="mini" @click="submmitFun" v-if="status !== 'pass' && activeNum >= 3">
                            提交审核
                        </el-button>
                    </div>
                </el-col>
            </el-tabs>
        </el-col>
        <el-dialog title="图片裁剪" :visible.sync="isShowCropper" width="500px">
            <img-cropper :height="500" :imgSize="uploadImgSize" :isKjToken="false" :img="currCropperImgSrc" @close="isShowCropper = false" @success="finishCrop"></img-cropper>
        </el-dialog>
        <el-dialog title="修改意见" :visible.sync="dialogFormVisible" width="400px" height="500px">
            <el-form @submit.native.prevent>
                <el-form-item>
                    <el-input v-model="edit_reason" autocomplete="off" class="modal-input" placeholder="请输入修改意见"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveReasonText">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {getQiNiuToken} from '@/assets/api/tools';
    import {fileUpload} from '@/assets/scripts/fileUpload';
    import ImgCropper from '@/components/ImgCropper';

    import {
        addbase,
        getBaseInfo,
        secondTrial,
        getuser,
        firstTrial
    } from '@/assets/api/registration';

    import {
        getNationList,
        getCountryList,
        getPartyList,
        getEducationList,
        getCertificateList,
        getDegreeList,
        getMeetingList,
        getAssociaList,
        getMajorcateList,
        getDistrictTree,
        getCompanyTypeList,
        getPositionTypeList
    } from '@/assets/api/utils';


    export default {
        name: 'registrationTab',
        components:{
            ImgCropper
        },
        props: {
            id: String,
            auditType: String,
            status: String
        },
        data() {
            var validatePhone = (rule, value, callback) => {

                if (!/^1[3-9]\d{9}$/.test(value)) {
                    callback(new Error('请输入正确的移动电话'));
                } else {
                    callback();
                }
            }

            var validateAlphabet = (rule, value, callback) => {
                const name = rule.field;
                let emptyMsg = '',
                    erroMsg = '';

                switch (name){
                case 'certificates_num':
                    emptyMsg = '请输入证件号码';
                    erroMsg = '证件号码只可输入数字/字母/符号';
                    break; 
                case 'company_mobile':
                    emptyMsg = '请输入单位电话';
                    erroMsg = '单位电话只可输入数字/字母/符号';
                    break; 
                }
                
                if (!value){
                    callback(new Error(emptyMsg));
                }else if (/[\u4E00-\u9FA5]/g.test(value)) {
                    callback(new Error(erroMsg));
                } else {
                    callback();
                }
            }



            return {
                uploadImgSize: "295*413",
                validflag: false,
                isShowCropper:false,
                editReasonFlag: false,
                dialogFormVisible: false,
                // 裁剪地址
                currCropperImgSrc:"",
                edit_reason: '',
                audit_status: '',
                disabled: false,
                audioObj: { // 审核不通过原因
                    audit_type: '',
                    audit_time: '',
                    audit_reason: '',
                },
                active: '1',
                activeNum: 1,
                isTabChange2: true, // 基本信息一是否填写完整
                isTabChange3: true, // 基本信息二是否填写完整
                educateData: [
                    {
                        label:'全日制教育',
                        value: '1'
                    },
                    {
                        label:'在职教育',
                        value: '2'
                    }],
                identityList:[{
                    label:'无',
                    value: '0'
                },{
                    label:'中国科学院院士',
                    value: '1'
                },{
                    label:'中国工程院院士',
                    value: '2'
                },{
                    label:'第三世界科学院院士',
                    value: '3'
                }],
                postLevelList:[{
                    label:'正高',
                    value: '1'
                },{
                    label:'副高',
                    value: '2'
                },{
                    label:'中级',
                    value: '3'
                },{
                    label:'初级',
                    value: '4'
                },{
                    label:"无",
                    value:"0"
                }],
                positionPartyData:[{
                    label:'民主党派',
                    value: '1'
                },{
                    label:'人民团体',
                    value: '2'
                },{
                    label:'其他社会组织',
                    value: '3'
                },{
                    label:'无',
                    value: '0'
                }],
                positionTypeData: [],
                NationList: [],
                nativePlaceData: [],
                nativeCityData:[],
                birthCityData:[],
                CountryList: [],
                PartyList: [],
                EducationList: [],
                DegreeList: [],
                MeetingList: [],
                CertificateList: [],
                AssociaList: [],
                MajorcateList: [],
                UnitTypeList: [{
                    label:'公务员',
                    value:'1'
                },{
                    label:'事业单位',
                    value:'2'
                },{
                    label:'公有制经济单位',
                    value:'3'
                },{
                    label:'非公有制经济单位',
                    value:'4'
                },{
                    label:'社会组织',
                    value:'5'
                }],
                companyTypeList: [],
                reviewForm: {
                    status: '',
                    reason: '',
                    ids: []
                },
                form1: {
                    id: '',
                    name: '',
                    gender: '',
                    nation: '',
                    cover: '',
                    birthday: '',
                    nationality: '',
                    native_place: '',
                    native_city: '',
                    birth_place: '',
                    birth_city: '',
                    email: '',
                    mobile: '',
                    party1: '',
                    party2: '',
                    vocation_type: '',
                    company_type: '',
                    certificates: '',
                    certificates_num: '',
                    edu_type: null,
                    identity: '0',
                    tech_post:'',
                    post_level:'',
                    company_post: '',
                    international_tech_appoint: '',
                    democratic_party_appoint: '',
                    committee_type: '',
                    committee_positon: '',
                    position_party: '',
                    position_type: '',
                    positon_name_post: '',
                    tech_association_appoint: '',
                    tech_association_type: '',
                    center_member: '',
                    congress_standing: '',
                    cppcc_standing: '',
                    alternate_member:'',
                    congress_representa:'',
                    cppcc_member: '',
                    company_mobile: '',
                    company_addr: '',
                    company_postcode: '',
                    work_education: '',
                    work_education_text: '',
                    work_degree:'',
                    work_degree_text: '',
                    work_graduated_school: '',
                    work_major:'',
                    education: '',
                    education_text: '',
                    degree:'',
                    degree_text: '',
                    graduated_school: '',
                    major:''
                },
                form2: {
                    id: '',
                    study_work: '',
                    achievement: ''
                },
                form3: {
                    id: '',
                    work_score: '',
                    paper: '',
                    three_remark: ''
                },
                eduTypeArr: [],
                rules1: {
                    cover: [
                        {required: true, message: '请添加照片', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ],
                    gender: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                    nation: [
                        {required: true, message: '请选择民族', trigger: 'change'}
                    ],
                    birthday: [
                        {required: true, message: '请选择出生年月日', trigger: 'change'}
                    ],
                    birth_place:[
                        {required: true, message: '请选择出生地', trigger: 'change'}
                    ],
                    birth_city:[
                        {required: true, message: '请选择出生地', trigger: 'change'}
                    ],
                    party1: [
                        {required: true, message: '请选择党派1', trigger: 'change'}
                    ],
                    nationality: [
                        {required: true, message: '请选择国籍', trigger: 'change'}
                    ],
                    native_place: [
                        {required: true, message: '请选择籍贯', trigger: 'change'}
                    ],
                    native_city: [
                        {required: true, message: '请选择籍贯', trigger: 'change'}
                    ],
                    certificates: [
                        {required: true, message: '请选择证件类型', trigger: 'change'}
                    ],
                    certificates_num: [
                        {required: true, validator: validateAlphabet, trigger: 'blur'}
                    ],
                    graduated_school: [
                        {required: true, message: '请输入毕业院校', trigger: 'blur'}
                    ],
                    major: [
                        {required: true, message: '请输入所学专业', trigger: 'blur'}
                    ],
                    work_graduated_school: [
                        {required: true, message: '请输入毕业院校', trigger: 'blur'}
                    ],
                    work_major: [
                        {required: true, message: '请输入所学专业', trigger: 'blur'}
                    ],
                    education: [
                        {required: true, message: '请选择学历', trigger: 'change'}
                    ],
                    degree: [
                        {required: true, message: '请选择学位', trigger: 'change'}
                    ],
                    work_education: [
                        {required: true, message: '请选择学历', trigger: 'change'}
                    ],
                    work_degree: [
                        {required: true, message: '请选择学位', trigger: 'change'}
                    ],
                    tech_post: [
                        {required: true, message: '请输入专业技术职务', trigger: 'blur'}
                    ],
                    company_post: [
                        {required: true, message: '请输入工作单位及职务', trigger: 'blur'}
                    ],
                    vocation_type: [
                        {required: true, message: '请选择职业类别', trigger: 'change'}
                    ],
                    company_type: [
                        {required: true, message: '请选择职业类别', trigger: 'change'}
                    ],
                    international_tech_appoint: [
                        {required: true, message: '请输入在国际科技组织任职情况', trigger: 'blur'}
                    ],
                    positon_name_post:[
                        {required: true, message: '请输入党派及社会团体组织名称及担任职务', trigger: 'blur'}
                    ],
                    democratic_party_appoint: [
                        {required: true, message: '请输入在民主党派任职情况', trigger: 'blur'}
                    ],
                    committee_type: [
                        {required: true, message: '请选择学术组织任职情况', trigger: 'change'}
                    ],
                    committee_positon: [
                        {required: true, message: '请选择学术组织名称及担任职务', trigger: 'change'}
                    ],
                    tech_association_appoint: [
                        {required: true, message: '请选择在科协任职情况', trigger: 'change'}
                    ],
                    tech_association_type: [
                        {required:true,message:'请选择科协类别', trigger: 'change'}
                    ],
                    center_member: [
                        {required: true, message: '请选择是否中共中央委员', trigger: 'change'}
                    ],
                    alternate_member: [
                        {required: true, message: '请选择是否中共候补委员', trigger: 'change'}
                    ],
                    congress_standing: [
                        {required: true, message: '请选择是否全国人大常委', trigger: 'change'}
                    ],
                    congress_representa: [
                        {required: true, message: '请选择是否全国人大代表', trigger: 'change'}
                    ],
                    cppcc_standing: [
                        {required: true, message: '请选择是否全国政协常委', trigger: 'change'}
                    ],
                    cppcc_member: [
                        {required: true, message: '请选择是否全国政协委员', trigger: 'change'}
                    ],
                    company_addr: [
                        {required: true, message: '请输入单位通讯地址', trigger: 'blur'}
                    ],
                    company_mobile: [
                        {required: true, validator: validateAlphabet, trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, validator: validatePhone, trigger: ['blur', 'change']}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ], 
                    position_party: [
                        {required: true, message: '请选择党派及社会团体任职情况', trigger: 'change'}
                    ],
                    position_type: [
                        {required: true, message: '请选择党派及社会团体任职情况', trigger: 'change'}
                    ],
                    identity:[
                        {required: true, message: '请选择是否具有院士身份', trigger: 'change'}
                    ],
                    post_level:[
                        {required: true, message: '请选择专业技术职务等级', trigger: 'change'}
                    ],
                    company_postcode :[
                        {required: true, message: '请输入邮政编码', trigger: 'change'}
                    ],
                    edu_type:[
                        {required: true, message: '请选择学历学位信息', trigger: 'change'}
                    ],
                },
                rules2: {
                    study_work: [
                        {required: true, message: '请输入主要学习经历和工作经历', trigger: 'blur'}
                    ],
                    achievement: [
                        {required: true, message: '请输入科技工作主要成就', trigger: 'blur'}
                    ],
                },
                rules3: {
                    work_score: [
                        {required: true, message: '请输入在科协及所属学会工作成绩', trigger: 'blur'}
                    ],
                    paper: [
                        {required: true, message: '请输入主要学术著作及论文', trigger: 'blur'}
                    ]
                },
                reasonData: {},
                resonList: [],
                reviewRule: {
                    status: [
                        {required: true, message: '请选择审核状态', trigger: 'blur'}
                    ]
                },
                isDisabled: {
                    disabledDate(time) {
                        // 大于某个日期不能选择
                        let myDate = new Date();
                        let _beforeDay = myDate.setDate(new Date().getDate() - 1);

                        return time.getTime() >= _beforeDay;
                    }
                },
            };
        },
        mounted(){
            this.getPlaceTree();
            this.getAssociaList();
            this.getNationList();
            this.getCountryList();
            this.getPartyList();
            this.getCertificateList();
            this.getEducationList();
            this.getDegreeList();
            this.getMeetingList();
            this.getMajorcateList();

            // 编辑
            if (this.id !== '0') {
                this.getBaseInfo();
                this.reviewForm.ids = [this.id];
                this.isTabChange2 = false;
                this.isTabChange3 = false;
                this.form1.id = this.id;
                this.form2.id = this.id;
                this.form3.id = this.id;
                this.rules1.tech_association_type[0].required = +this.form1.tech_association_appoint === 1;
                this.rules1.committee_positon[0].required = this.form1.committee_type == '无' ? false : true;
                this.rules1.positon_name_post[0].required = this.form1.position_party == '0' ? false : true;
            }

            if (this.status == 'review') {
                this.isTabChange2 = true;
                this.isTabChange3 = true;
                this.editReasonFlag = true;
            }

            if (this.status == 'pass') {
                this.disabled = true;
            }

            // 获取用户信息
            this.status == 'add' ? this.getUser() : '';
        },
        methods: {
            // 切换科协任职情况的时候。如果只为否。不校验科协类别
            changeTechAssociation(){
                this.isNeedValidTech = +this.form1.tech_association_appoint === 1;
                this.rules1.tech_association_type[0].required = this.isNeedValidTech;

                this.setTechAssociaVal();
            },
            setTechAssociaVal(){
                // 如果不需要校验。就清空后面的选项
                if(!this.isNeedValidTech){
                    this.form1.tech_association_type = "";
                }
            },
            changeEducate() {
                if(this.eduTypeArr.indexOf('1') > -1 && this.eduTypeArr.indexOf('2') > -1) {
                    this.form1.edu_type = 3;
                }else if(this.eduTypeArr.indexOf('1') > -1) {
                    this.form1.edu_type = 1;
                    this.form1.work_education='';
                    this.form1.work_education_text='';
                    this.form1.work_degree='';
                    this.form1.work_degree_text='';
                    this.form1.work_graduated_school= '';
                    this.form1.work_major='';

                }else if(this.eduTypeArr.indexOf('2') > -1) {
                    this.form1.edu_type = 2;
                    this.form1.education='';
                    this.form1.education_text= '';
                    this.form1.degree='';
                    this.form1.degree_text='';
                    this.form1.graduated_school='';
                    this.form1.major='';
                }else{
                    this.form1.edu_type = '';

                }
            },
            async getUser(){
                getuser().then((res) => {
                    const info = res.data.info;

                    this.form1.name = info.user_name;
                    this.form1.mobile = info.mobile;
                })
            },
            // 审核
            saveReview() {

                this.$refs['reviewForm'].validate((valid) => {
                    if (valid) {

                        if (this.reviewForm.status == 2 && this.reviewForm.reason == '') {
                            this.$message.error('请输入审核备注');
                            return false;
                        }

                        this.submmitReview();
                    } else {
                        return false;
                    }
                });
            },
            async submmitReview(){

                if (this.auditType == "2") { // 终审

                    secondTrial(this.reviewForm).then(() => {
                        this.$message.success('操作成功！');

                        setTimeout(() => {
                            this.$goBack();
                        }, 1000)
                    });
                }

                if (this.auditType == "1") { // 初审

                    firstTrial(this.reviewForm).then(() => {
                        this.$message.success('操作成功！');

                        setTimeout(() => {
                            this.$goBack();
                        }, 1000)
                    });
                }
            },
            committeType() {
                this.rules1.committee_positon[0].required = this.form1.committee_type == '无' ? false : true;
                if(this.form1.committee_type == '无') {
                    this.form1.committee_positon = '';
                }
            },
            editReason(name,title){
                this.dialogFormVisible = true;
                this.editReasonName = name;
                this.editReasonTitle = title;

                this.edit_reason = this.reasonData[name] || '';
            },

            saveReasonText(){
                let $this = this;

                if (!this.edit_reason) {
                    this.$message.error('请输入修改意见');
                    return false;
                }

                this.reasonData[this.editReasonName] = this.edit_reason;
                let obj = {
                    title: this.editReasonTitle,
                    reason: this.edit_reason
                };
                if($this.resonList.length == 0) {
                    $this.resonList.push(obj);
                }else {
                    let index = null;

                    $this.resonList.forEach((v,i) =>{
                        if(v.title == obj.title) {
                            index = i;
                        }
                    })
                    if(index != null) {
                        $this.resonList[index]['reason'] = this.edit_reason
                    }else {
                        $this.resonList.push(obj);
                    }
                }
                $this.reviewForm.reason = '';
                $this.resonList.forEach((item) =>{
                    $this.reviewForm.reason += item.title+':'+item.reason +'  '
                })
                this.dialogFormVisible = false;
            },
            next() {
                this.TabChange(this.activeNum + 1);
            },
            prev(){
                this.TabChange(this.activeNum - 1);
            },
            submmitFun(){
                this[`form${this.active}`].more = this.activeNum;
                this[`form${this.active}`].status = 1;

                this.$refs[`form${this.active}`].validate((valid) => {
                    if (valid) {
                        if(this.editReasonFlag) {
                            this.$refs['reviewForm'].validate((valid) => {
                                if (valid) {

                                    if (this.reviewForm.status == 2 && this.reviewForm.reason == '') {
                                        this.$message.error('请输入审核备注');
                                        return false;
                                    }

                                    this.addbase(this[`form${this.active}`], 'submmit');
                                } else {
                                    return false;
                                }
                            });
                        }else {
                            this.addbase(this[`form${this.active}`], 'submmit');
                        }
                    } else {
                        return false;
                    }
                });
            },
            save(){
                this[`form${this.active}`].more = this.activeNum;
                this.addbase(this[`form${this.active}`], 'save');
            },

            TabChange(active){
                const activeNum = active * 1;
                const msg = this.active == 1 ? '请先填写【基本信息（一）】' : (this.active == 2 ? '请先填写【基本信息（二）】' : '请先填写【基本信息（三）】');

                if (this.status == 'pass') {
                    this.active = activeNum.toString();
                    this.activeNum = activeNum;
                    return true;
                }


                if (this.validflag) {
                    this.validflag = false;
                    return true;
                }

                this.$refs[`form${this.active}`].validate(async (valid) => {

                    if (valid) {
                        this[`form${this.active}`].more = this.activeNum;
                        await this.addbase(this[`form${this.active}`], 'next', activeNum);

                    } else {
                        this.$message.error(msg);

                    }
                });

                return false;
            },
            async addbase(form, type, activeNum){
                
                
                if (this.status == 'review'){
                    form.position = 1;
                }
                const params = Object.assign({},form);
                for(let key in params){
                    if(key == 'study_work' || key == 'achievement' 
                        || key == 'work_score' || key == 'paper' || key == 'three_remark'){
                        if(params[key] && params[key] != '') {
                            params[key] = params[key].replace(/(\r\n)|(\n)/g,'<w:br/>');
                        }
                    }
                }

                form.remark = this.reasonData;
                params.remark = this.reasonData;

                await addbase(params).then(res => {

                    if (res.code !== 0) {
                        this.$message.error(res.msg);
                        this.validflag = false;
                        return false;
                    }

                    // 暂存
                    if (type == 'save') {
                        this.$message.success('暂存成功！');
                    }

                    // 提交审核
                    if (type == 'submmit' && this.status !== 'review') {
                        this.$message.success('提交成功！');

                        setTimeout(() => {
                            this.$goBack();
                        }, 1000)
                    }

                    // 提交审核
                    if (type == 'submmit' && this.status == 'review') {
                        // 先提交当前页数据再进行审核操作
                        this.saveReview();
                    }

                    // 新增时第一步提交成功后 获取 ID
                    if (this.status == 'add' && this.active == 1) {
                        this.form2.id = res.data.id;
                        this.form3.id = res.data.id;
                    }

                    // 下一步
                    if (type == 'next') {
                        this.active == 1 ? this.isTabChange2 = false : '';
                        this.active == 2 ? this.isTabChange3 = false : '';
                        this.active = activeNum.toString();
                        this.activeNum = activeNum;
                        this.validflag = true;

                    }
                });
            },

            // 获取详情
            async getBaseInfo(){
                getBaseInfo({id: this.id}).then((res) => {
                    if (res.code !== 0) {
                        this.$message.error(res.msg);
                        return false;
                    }

                    const data = res.data;

                    if(data.base1.vocation_type == 0) {
                        data.base1.vocation_type = '';
                    }
                    // if(data.base1.post_level == 0) {
                    //     data.base1.post_level = '';
                    // }
                    // if(data.base1.position_party == 0) {
                    //     data.base1.position_party = '';
                    // }

                    this.getForm(data.base1, 1);
                    this.getForm(data.base2, 2);
                    this.getForm(data.base3, 3);
                    this.form1.name = data.base1.represent_name;


                    this.audioObj.audit_time = data.base1.audit_time;
                    this.audioObj.audit_reason = data.base1.reason;
                    this.audioObj.audit_type = data.base1.audit_type == 1 ? '推荐单位' : '中国科协';
                    this.audit_status = data.base1.audit_status || 0;
                    this.reasonData = data.reason || {};
                    this.form3.three_remark = data.base3.remark;
                    this.isNeedValidTech = +this.form1.tech_association_appoint === 1;
                    this.setTechAssociaVal();

                })
            },

            getForm(data, num){
                let form = this[`form${num}`];

                for (let i in data) {

                    if(i == 'edu_type' && data[i] !='') {
                        form[i] = data[i];

                        if(form[i] == 3) {
                            this.eduTypeArr = ['2','1'];
                        }else if(form[i] == 1) {
                            this.eduTypeArr = ['1'];
                        }else if(form[i] == 2) {
                            this.eduTypeArr = ['2'];
                        }

                    }else {
                        form[i] = data[i];
                    }
                }

                if(num ==1) {
                    if(this.form1.native_place !='110000' && this.form1.native_place !='120000' && this.form1.native_place !='310000' && this.form1.native_place !='500000') {
                        this.getPlaceTree('native',1);
                    }
                    if(this.form1.birth_place !='110000' && this.form1.birth_place !='120000' && this.form1.birth_place !='310000' && this.form1.birth_place !='500000') {
                        this.getPlaceTree('birth',1);
                    }
                    if(this.form1.vocation_type) {
                        this.getCompanyTypeList('edit');
                    }
                    if(this.form1.position_party) {
                        this.getPositionTypeList('edit');
                    }
                    this.rules1.committee_positon[0].required = this.form1.committee_type == '无' ? false : true;
                    this.rules1.positon_name_post[0].required = this.form1.position_party == '0' ? false : true;
                }else{ 
                    for(let key in form){
                        if(key == 'study_work' || key == 'achievement' 
                            || key == 'work_score' || key == 'paper' || key == 'three_remark'){
                            form[key] = form[key].replace(/<w:br\s*\/?>/g,"\r\n");
                        }
                    }
                }
                
            },

            // 民族
            async getNationList(){
                getNationList().then((res) => {
                    this.NationList = res.data;
                })
            },
            // 国籍
            async getCountryList(){
                getCountryList().then((res) => {
                    this.CountryList = res.data;
                })
            },
            // 党派
            async getPartyList(){
                getPartyList().then((res) => {
                    this.PartyList = res.data;
                })
            },
            // 证件类别
            async getCertificateList(){
                getCertificateList().then((res) => {
                    this.CertificateList = res.data;
                })
            },
            // 学历
            async getEducationList(){
                getEducationList().then((res) => {
                    this.EducationList = res.data;
                })
            },
            // 学位
            async getDegreeList(){
                getDegreeList().then((res) => {
                    this.DegreeList = res.data;
                })
            },
            // 学会类别
            async getMeetingList(){
                getMeetingList().then((res) => {
                    this.MeetingList = res.data;
                })
            },
            // 籍贯 出生地
            async getPlaceTree(type,info){
                let parame ={
                    parent_id: 0
                }
 
                if(type == 'native') {
                    if(!info) {
                        this.form1.native_city = '';
                    }
                    parame.parent_id= this.form1.native_place;
                }else if(type == 'birth') {
                    if(!info) {
                        this.form1.birth_city = '';
                    }
                    parame.parent_id= this.form1.birth_place;
                }
                getDistrictTree(parame).then((res) => {
                    if(type == 'birth') {
                        this.birthCityData = res.data;
                    }else if(type == 'native') {
                        this.nativeCityData = res.data;
                    }else{
                        this.nativePlaceData = res.data;
                    }
                })
            },

            //  科协分类
            async getAssociaList(){
                getAssociaList().then((res) => {
                    this.AssociaList = res.data;
                })
            },
            //  专业人员类别
            async getMajorcateList(){
                getMajorcateList().then((res) => {
                    this.MajorcateList = res.data;
                })
            },
            // 职业类别二级
            async getCompanyTypeList(type) {
                if(!type){
                    this.form1.company_type = '';
                }

                getCompanyTypeList(this.form1.vocation_type)
                    .then((res) => {
                        this.companyTypeList = res.data;
                        if(!type){
                            this.form1.company_type = this.companyTypeList[0];
                        }

                    });
            },
            // 党派及社会团体二级
            async getPositionTypeList(type) {

                if(!type) {
                    this.form1.position_type = '';
                }

                this.rules1.positon_name_post[0].required = this.form1.position_party == '0' ? false : true;
                if(this.form1.position_party == 3 || this.form1.position_party == '0'){
                    if(this.form1.position_party == '0') {
                        this.form1.positon_name_post = ''; 
                    }
                    
                    return false;
                }
                getPositionTypeList(this.form1.position_party).then((res) => {
                    this.positionTypeData = res.data;
                })
            },
            initFileUpload(request) {
                getQiNiuToken().then(res => {
                    if (res.code != 0) {
                        return;
                    }

                    let data = res.data;

                    let token = data.token;
                    let host = data.img_url;

                    let params = {
                        token: token,
                        request: request,
                        module: 'registrationTab',
                        complete: complete => {
                            let key = complete.key;
                            this.form1.cover = host + "/" + key;

                        },
                        next: () => {
                        },
                        error: () => {
                        }
                    }

                    fileUpload(params)
                });
            },
            // 封面上传
            imageUpload(request) {
                getQiNiuToken().then(res => {
                    if (res.code != 0) {
                        return;
                    }

                    let data = res.data;
                    let token = data.token;
                    let host = data.img_url;

                    let params = {
                        token: token,
                        request: request,
                        module: 'registrationTab',
                        complete: complete => {
                            let key = complete.key;

                            this.form1.cover = host + "/" + key;
                            this.currCropperImgSrc = this.form1.cover;
                            this.isShowCropper = true;
                        },
                        next: () => {
                        },
                        error: () => {
                        }
                    };

                    fileUpload(params);
                });
            },
            // 完成裁剪
            finishCrop(url) {
                this.isShowCropper = false;
                this.form1.cover = url;
            },
            // 上传之前判断
            beforeUpload(file) {
                const isJPG = file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png";
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('大小不得超过2MB!');
                }
                return isJPG && isLt2M;
            },

            goBack() {
                this.$goBack();
            },
        }
    };
</script>

<style lang="scss" scoped>

    ::v-deep .el-form {
        .el-upload__tip{
            margin-top:15px;
            color: #C0C4CC;
        }
        .el-input__icon {
            line-height: 28px;
        }
        .el-form-item__content{
            width: 100%;
            input,select{
                height: 40px;
                list-style: 40px;
            }
        }
        .el-form-item__error{
            margin-top:5px;
            position: initial;
            display: block;
            text-align: left;
        }
        .label-td{
            .el-form-item__content{
                display: none !important;
            }
        }
        .el-form-item {
            margin:0;
            width:100%;
        }

        .el-button {
            margin-left: 10px;
        }

        textarea {
            height: 200px;
        }

        input,
        .el-date-editor.el-input {
            width: 100%;
            border:0 !important;
        }
        .education-text input,
        .modal-input input,
        .el-date-editor input{
            border: 1px solid #DCDFE6 !important;
        }
        .modal-input input {
            width: 300px;
        }

        label {
            width: auto !important;
            line-height: normal;
            padding:0;
        }
        .el-select{
            display: block;
            input{
                width:100%;
                border: 1px solid #DCDFE6 !important;
            }
        }
        .el-form-select{
            .el-form-item{
                display: inline-block;
                width:calc(50% - 10px);
            }
        }
        .el-radio-group label {
            min-width: 50px !important;
        }

        .el-input.is-disabled .el-input__inner,
        .el-textarea.is-disabled .el-textarea__inner {
            background: transparent !important;
        }

        .el-upload--picture-card {
            width: 100px;
            height: 100px;
            line-height: 100px;
        }

        .erro-label label {
            color: #F56C6C;
        }

        .icon-edit {
            position: absolute;
            top: 50%;
            right: 5px;
            margin-top:-25px;
            margin-left: 0;
            color: #67C23A;

            i {
                font-weight: bold;
                font-size: 16px;
            }
        }
    }

    ::v-deep .text-box .el-form-item__content {
        margin-left: 220px !important;
        position: relative;
        left: auto;
        top:auto;
    }
    ::v-deep  .form-box .el-form-item__content{
        width:80%;
        margin-bottom: 20px;
    }

    .btn {
        width: 100%;
        display: block;
        text-align: right;
        margin: 20px 0;

        &.text-left {
            text-align: left;
        }
    }

    .review-reason {
        padding: 20px;
        line-height: 30px;
        font-weight: bold;

        p {
            color: #F56C6C;
        }

        .review-title {
            color: #409EFF;
        }
    }

    .registrat-table{
        width: 100%;
        border: 1px solid #E4E7ED;
        td{
            position: relative;
            border: 1px solid #E4E7ED;
            text-align: center;
            padding:5px 10px;
            &.label-td{
                width:200px;
                padding:5px 25px;
                .el-form-item__content{
                    display: none !important;
                }
            }
        }
    }
</style>
