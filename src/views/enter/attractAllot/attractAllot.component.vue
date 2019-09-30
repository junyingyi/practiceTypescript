<template>
  <div class="attractAllot">
    <PlanState
      :type="stateInfo.opstatus"
      :canConfirm="stateInfo.canConfirm"
      :canLogin="stateInfo.canLogin"
    ></PlanState>
    <div class="attract_img">
      <img :src="imgs[ stateInfo.opstatus == 3?1:0]" alt>
    </div>
    <div class="attract_text">
      <div
        class="attractt_p"
        v-if="stateInfo.opstatus == 2 || stateInfo.opstatus == 1"
      >您的申请信息招商组同事正在加紧审核请耐心等待，审核通过后可以点击“补全信息”继续完善您的信息，请留意手机短信信息</div>
      <div class="attractt_p" v-else-if="stateInfo.opstatus == 4">你的审核已通过，请尽快补全入住信息</div>
      <div class="attractt_no" v-else>
        <p>您的申请已被驳回，驳回原因为：</p>
        <p style="color:red">{{ stateInfo.reason }}</p>
        <p>可以点“修改信息”继续修改您的信息并重新提交</p>
      </div>
      <div style="text-align:center">
        <span
          class="attractt_btn"
          :class="{attractt_disable: stateInfo.opstatus == 2 || stateInfo.opstatus == 1,colorChange1: theme.name == 'wp',colorChange4: theme.name !== 'wp'}"
          @click="infoGo()"
        >{{stateInfo.opstatus !== 3?'补全信息':'修改信息'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export { default } from './attractAllot.component.ts';
</script>

<style lang="less" scoped>
@import url('./attractAllot.component.less');
</style>
