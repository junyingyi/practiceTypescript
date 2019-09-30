<template>
    <div class="plan_wrap">
        <div class="step">
            <img :src="img">
        </div>
        <div class="step">
            <img :src="(canConfirm == 1 || canLogin == 1) ? list[7]:list[+type]">
        </div>
    </div>
</template>

<script>
export { default } from './PlanState.component.ts';
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('./PlanState.component.less');
</style>
