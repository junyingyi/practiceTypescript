<template>
    <div>
        <div class="companyName">
            <div class="fillInFile">
                <div class="fill">
                    <p>{{ labal }}</p>
                    <div class="add">
                        <img @click="addImg4" src="@/assets/enter/attractAllot_add.png">
                    </div>
                </div>
                <input
                    ref="fileOpen"
                    type="file"
                    style="display:none"
                    @change="fileChangeOpen($event)"
                >
                <div class="shows" v-if="showOpen">
                    <div>
                        <span class="name">
                            <img :src="value" alt="">
                        </span>
                        <span class="pillar"></span>
                        <span class="del" @click="delOpen">删除</span>
                    </div>
                </div>
            </div>
                   <p class="hint">
          </p>
        </div>
    </div>
</template>

<script>
export { default } from './UploadImg.component.ts';
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('./UploadImg.component.less');
</style>
