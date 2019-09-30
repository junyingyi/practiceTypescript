<template>
  <div class="audit">
    <PlanState
      :type="stateInfo.opstatus"
      :canConfirm="stateInfo.canConfirm"
      :canLogin="stateInfo.canLogin"
    ></PlanState>
    <div class="audit_wrap">
      <div
        class="audit_tit"
        v-if="stateInfo.canConfirm == 1"
      >您的申请信息招商组同事正在加紧审核请耐心等待，我们会在3个工作日内审核，审核结果将以短信通知</div>
      <div class="audit_pass" v-else>
        <h3>审核通过</h3>
        <p>
          请在电脑上登录
          https://yyb.vpclub.cn/admin/商家管理系统后及时修改密码！
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export { default } from './audit.component.ts';
</script>

<style lang="less" scoped>
@import url('./audit.component.less');
</style>
