<template>
  <div class="activate">
    <PlanState
      :type="stateInfo.opstatus"
      :canConfirm="stateInfo.canConfirm"
      :canLogin="stateInfo.canLogin"
    ></PlanState>
    <div class="act_form">
      <div class="actf_line">公司名称：{{ newForm.tenantName }}</div>
      <div class="actf_line">手机号码：{{ newForm.mobilePhone }}</div>
      <div class="actf_line">
        <label for="">
          <i>*</i>结算方式
        </label>
        <div class="fillIn selection">
          <select v-model="newForm.settlementType">
            <option value="0">请选择</option>
            <option value="1">预付款</option>
            <option value="2">按月付</option>
          </select>
          <p class="hint" v-show="rules.settlementType && rules.settlementType.pass">
            <span>请选结算方式</span>
          </p>
        </div>
      </div>
      <div class="actf_line">
        <label for="">
          <i>*</i>帐户名称
        </label>
        <div class="fillIn">
          <input type="text" v-model="newForm.userName" placeholder="请填写帐户名称">
          <p class="hint" v-show="rules.userName && rules.userName.pass">
            <span>请填写帐户名称</span>
          </p>
        </div>
      </div>
      <div class="actf_line">
        <label for="">
          <i>*</i>开户行
        </label>
        <div class="fillIn">
          <input type="text" v-model="newForm.openBank" placeholder="请填写开户行">
          <p class="hint" v-show="rules.openBank && rules.openBank.pass">
            <span>请填写开户行</span>
          </p>
        </div>
      </div>
      <div class="actf_line">
        <label for="">
          <i>*</i>企业银行账号
        </label>
        <div class="fillIn">
          <input type="text" v-model="newForm.bankAccount" placeholder="请填写企业银行账号">
          <p class="hint" v-show="rules.bankAccount && rules.bankAccount.pass">
            <span>请填写企业银行账号</span>
          </p>
        </div>
      </div>
      <div class="actf_line">
        <label for="">
          <i>*</i>验证邮箱
        </label>
        <div class="fillIn fill_code">
          <input type="text" v-model="newForm.companyEmail" placeholder="请填写邮箱">
          <span class="fill_get" @click="goCode()">{{ countdown }}</span>
          <!-- <p class="hint" v-show="rules.companyEmail.pass">
            <span>请选填写邮箱</span>
          </p>-->
        </div>
      </div>
      <div class="actf_line">
        <label for="">
          <i>*</i>邮箱验证码
        </label>
        <div class="fillIn">
          <input type="text" v-model="newForm.verifyCode" placeholder="请填写邮箱验证码">
          <p class="hint" v-show="rules.verifyCode && rules.verifyCode.pass">
            <span>请填写邮箱验证码</span>
          </p>
        </div>
      </div>
      <div class="actf_checkbox">
        <input type="checkbox" v-model="isDeal">
        <label>
          <a :href="dealConfig.otherProtocolUrl">签署供应商入驻协议</a>
        </label>
      </div>
      <!-- <mt-checklist class="act_radio" v-model="isDeal" :options="['签署供应商入驻协议']">签署供应商入驻协议</mt-checklist> -->
      <div style="text-align:center">
        <span class="act_btn" :class="{colorChange1: theme.name == 'wp',colorChange4: theme.name !== 'wp'}" @click="save()">激活账号</span>
      </div>
      <!-- <UploadImg :src.sync="forData.img" labal="营业执照上传"></UploadImg> -->
    </div>
  </div>
</template>

<script>
export { default } from './activate.component.ts';
</script>

<style lang="less" scoped>
@import url('./activate.component.less');
</style>
