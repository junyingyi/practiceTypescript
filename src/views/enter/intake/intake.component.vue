<template>
  <div class="intake">
    <PlanState
      :type="stateInfo.opstatus"
      :canConfirm="stateInfo.canConfirm"
      :canLogin="stateInfo.canLogin"
    ></PlanState>
    <div class="intake_wrap">
      <div class="intake_tit">
        您需要缴纳保证金
        <strong>￥{{dataInfo.needMoney}}（含服务费）</strong>
      </div>
      <ul>
        <li>
          <span>收款方</span>
          {{ dataInfo.companyName }}
        </li>
        <li>
          <span>开户行</span>
          {{ paymentForm.userName }}
        </li>
        <li>
          <span>收款账号</span>
          {{ paymentForm.bankAccount }}
        </li>
      </ul>
      <div class="actf_line">
        <label for="">
          <i>*</i>请上传转账凭证
        </label>
        <div class="fillIn">
          <UploadImg :src.sync="paymentForm.pic" labal="请上传转账凭证"></UploadImg>
          <p class="hint" v-show="rules.openBank && rules.openBank.pass">
            <span>请上传转账凭证</span>
          </p>
        </div>
      </div>
      <div class="intake_hint">
        <p>温馨提示：
          <br>请使用对公账户进行转账，提交后财务会在3个工作日内核实并审核，请留意短信信息
        </p>
      </div>
      <div style="text-align:center">
        <span class="act_btn" :class="{colorChange1: theme.name == 'wp',colorChange4: theme.name !== 'wp'}" @click="save()">提交</span>
      </div>
    </div>
  </div>
</template>

<script>
export { default } from './intake.component.ts';
</script>

<style lang="less" scoped>
@import url('./intake.component.less');
</style>
