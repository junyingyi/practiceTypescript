<template>
  <div>
    <div class="main">
      <PlanState
        :type="stateInfo.opstatus"
        :canConfirm="stateInfo.canConfirm"
        :canLogin="stateInfo.canLogin"
      ></PlanState>
      <div class="relation">
        <strong style="margin-bottom:0.2rem">联系信息</strong>
        <div class="companyName">
          <p>
            <i>*</i>
            <strong>公司名称:</strong>
          </p>
          <div class="fillIn">
            <input type="text" placeholder="请填写公司的完整名称" v-model.trim="formData.companyName">
          </div>
          <p class="hint">
            <span v-show="rules.companyName.pass">请填写公司名称</span>
          </p>
        </div>
      </div>
      <div class="companyName">
        <p>
          <i>*</i>
          <strong>公司地址:</strong>
        </p>
        <div class="fillIn">
          <input type="text" placeholder="请填写公司的完整地址" v-model.trim="formData.companyAddress">
        </div>
        <p class="hint">
          <span v-show="rules.companyAddress.pass">请填写公司地址</span>
        </p>
      </div>
      <!-- <enterInput :datas="address" @addressBlur="addressBlur"></enterInput> -->
      <div class="companyName">
        <p>
          <i>*</i>
          <strong>申请人姓名:</strong>
        </p>
        <div class="fillIn">
          <input type="text" placeholder="请填写您的姓名" v-model.trim="formData.contactUser">
        </div>
        <p class="hint">
          <span v-show="rules.contactUser.pass">请填写申请人姓名</span>
        </p>
      </div>
      <div class="companyName">
        <p>
          <i>*</i>
          <strong>供应商名称:</strong>
        </p>
        <div class="fillIn">
          <input type="text" placeholder="请填写供应商名称" v-model.trim="formData.tenantName">
        </div>
        <p class="hint">
          <span v-show="rules.tenantName.pass">请填写供应商名称</span>
        </p>
      </div>
      <div class="companyName">
        <p>
          <i>*</i>
          <strong>申请人移动电话:</strong>
        </p>
        <div class="fillIn">
          <input type="text" placeholder="请填写您的手机联系方式" v-model.number="formData.mobilePhone">
        </div>
        <p class="hint">
          <span v-show="rules.mobilePhone.pass">请填写申请人移动电话</span>
        </p>
        <div class="fillIn">
          <button @click="getCode">{{times?time : '获取验证码'}}</button>
          <input type="text" placeholder="请填写手机验证码" v-model.number="formData.code">
        </div>
        <p class="hint">
          <span v-show="rules.code.pass">请填写正确的验证码</span>
        </p>
      </div>
      <div class="companyName">
        <p>
          <i>*</i>
          <strong>申请人邮箱:</strong>
        </p>
        <div class="fillIn">
          <input type="text" placeholder="请填写您的邮箱联系方式" v-model="formData.companyEmail">
        </div>
        <p class="hint">
          <span v-show="rules.companyEmail.pass">请填写你的邮箱联系方式</span>
        </p>
      </div>
      <div class="companyName">
        <p>
          <i>*</i>
          <strong>统一社会信用代码（或税号):</strong>
        </p>
        <div class="fillIn">
          <input type="text" placeholder="请填写统一社会信用代码(或税号)" v-model="formData.licenseNumber">
        </div>
        <p class="hint">
          <span v-show="rules.licenseNumber.pass">请填写有效的统一社会信用代码</span>
        </p>
      </div>

      <div class="companyName">
        <p>
          <i>*</i>
          <strong>企业营业执照有效期起止时间:</strong>
        </p>
        <div class="fillIn">
          <div class="fillInContent">
            <div id="datePicker" @click="openPickerStart">
              {{formData.licenseValidStartData}}
            </div>
            <span>-</span>

            <div id="datePicker2" @click="openPickerEnd">
              {{formData.licenseValidEndData}}
            </div>
          </div>
        </div>
        <p class="hint">
          <span
            v-show="rules.licenseValidStartData.pass && rules.licenseValidEndData.pass"
          >请填写企业营业执照有效期起止时间</span>
        </p>
      </div>
      <!-- 选取时间弹窗 -->
      <div @touchmove.prevent>
        <mt-datetime-picker
          ref="picker"
          type="date"
          @confirm="handleConfirm"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
        ></mt-datetime-picker>
      </div>

      <!-- 资质信息按照顺序依次校验弹窗提示 -->
      <div class="companyName">
        <p>
          <i>*</i>
          <strong>企业营业执照信息:</strong>
        </p>

        <UploadImg :src.sync="formData.licensePic" labal="营业执照上传"></UploadImg>
      </div>
      <!-- 一般纳税人信息 -->
      <div class="companyName">
        <p>
          <strong>一般纳税人资格证书:</strong>
        </p>
        <p class="status">具备一般纳税人资格的企业提供，如无一般纳税人资格可不提供</p>

        <UploadImg :src.sync="formData.qualificationPic" labal="请上传纳税人资格证书"></UploadImg>
      </div>
      <!-- 开户许可证 -->
      <div class="companyName">
        <p>
          <i>*</i>
          <strong>开户许可证:</strong>
        </p>

        <UploadImg :src.sync="formData.openingPermitPic" labal="请上传开户许可证"></UploadImg>
      </div>
      <!-- 法人身份证上传 -->
      <div class="companyName">
        <p>
          <i>*</i>
          <strong>法人身份证上传:</strong>
        </p>
        <UploadImg :src.sync="formData.idCardZMPic" labal="请上传身份证正面"></UploadImg>
        <UploadImg :src.sync="formData.idCardFMPic" labal="请上传身份证反面"></UploadImg>
      </div>
      <!-- 法人身份证上传 -->
      <div class="companyName">
        <p>
          <strong>其他资格上传:</strong>
        </p>
        <UploadImg :src.sync="formData.otherPic1" labal="请上传其他资格证"></UploadImg>
      </div>
      <div class="notice">
        <p>请确保图片清晰，文字可辨并有清晰的红色公章；附件文件名请勿包含！@#（）等特殊字符。</p>
      </div>
      <div class="button">
        <button
          @click="draft"
          :class="{colorChange2: theme.name == 'wp',colorChange3: theme.name !== 'wp'}"
        >保存草稿</button>
        <button
          @click="submits"
          :class="{colorChange1: theme.name == 'wp',colorChange4: theme.name !== 'wp'}"
        >保存并提交</button>
      </div>
      <div>
        <p>
          <strong
            style="font-size:0.32rem;padding:0.1rem 0;border-bottom:0.04rem solid #fd5f56"
          >入驻帮助</strong>
        </p>
      </div>
      <!-- 文字提示区域 -->
      <div class="flow" v-for="(item,index) in texts" :key="index">
        <p class="letter">{{item.title}}</p>
        <div class="content">
          <p v-for="(items,index) in item.arr" :key="index">{{items}}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export { default } from './applicant.component.ts';
</script>


<style lang="less" scoped>
@import url('./applicant.component.less');
</style>
