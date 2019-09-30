<template>
  <div>
    <div class="main">
      <PlanState
        :type="stateInfo.opstatus"
        :canConfirm="stateInfo.canConfirm"
        :canLogin="stateInfo.canLogin"
      ></PlanState>
      <div class="brand">
        <button :class="{ colorChange1:theme.name == 'wp',colorChange4:theme.name !== 'wp'}" style="color:white" @click="addBrand">添加品牌</button>
        <div>
          <ul ref="slide" :style="{width:widths}">
            <li
              :class="{ colorChange1: (index == dynamic && theme.name == 'wp'),colorChange4: (index == dynamic && theme.name !== 'wp')}"
              v-for="(item,index) in brandData"
              :key="index"
              @click="checked(index,item)"
            >{{item.brandName}}</li>
          </ul>
        </div>
      </div>

      <div v-for="(item,index) in brandData" :key="index" v-show="index==dynamic">
        <div class="manage">
          <h2>经营信息</h2>
        </div>

        <div class="companyName">
          <p>
            <i>*</i>
            <strong>主要经营类目（二级类目）:</strong>
          </p>
          <div class="fillIn selection">
            <select v-model="value1">
              <option value>请选择</option>
              <option
                v-for="item in selectOne"
                :key="item.id"
                :value="item.id"
              >{{item.categoryName}}</option>
            </select>
            <select v-model="value2">
              <option value>请选择</option>
              <option
                v-for="item in selectTwo"
                :key="item.id"
                :value="item.id"
              >{{item.categoryName}}</option>
            </select>
            <!-- <select v-model="value3">
              <option value>请选择</option>
              <option
                v-for="item in selectThree"
                :key="item.id"
                :value="item.id"
              >{{item.categoryName}}</option>
            </select>-->
            <!-- <div>
              <span v-for="(item,index) in item.categoryNamelist" :key="index">{{item+"/"}}</span>
            </div>-->
          </div>
          <p class="hint">
            <span v-show="brandData[index].showSelect">请选择经营类目</span>
          </p>
        </div>

        <div class="companyName">
          <p>
            <i>*</i>
            <strong>品牌名称：</strong>
          </p>
          <div class="fillIn">
            <input type="text" placeholder="请填写您的品牌名称" v-model="brandData[index].brandName">
          </div>
          <p class="hint">
            <span v-show="brandData[index].showName">请填写品牌名称</span>
          </p>
        </div>

        <div class="companyName">
          <p>
            <strong>是否是品牌商：</strong>
          </p>
          <div class="labe">
            <!-- <checklist :options="commonList" v-model="radioValue" :max="1" @on-change="change"></checklist> -->
            <label class="radio1">
              <input
                type="radio"
                value="1"
                :name="index"
                v-model="brandData[index].isBrandBusiness"
              >是
            </label>
            <label class="radio2">
              <input
                type="radio"
                value="2"
                :name="index"
                v-model="brandData[index].isBrandBusiness"
              >否
            </label>
          </div>
        </div>

        <div class="mains" v-show="brandData[index].isBrandBusiness==1">
          <div class="companyName">
            <p>
              <i>*</i>
              <strong>上传商标注册证和商品资质:</strong>
            </p>

            <UploadImg :src.sync="brandData[index].trademarkRegisterPic" labal="商标注册证1份"></UploadImg>
            <UploadImg :src.sync="brandData[index].productQualificationPic" labal="商品资质1份"></UploadImg>
          </div>
          <div class="matters">
            <p>商标证在申请品牌可提供《商标注册申请书》，商品注册证和商品资质需一并上传，为确保图片清晰，请确认图片清晰</p>
          </div>
        </div>

        <div class="mains" v-show="brandData[index].isBrandBusiness==2">
          <div class="companyName">
            <p style="margin-bottom:0.2rem">
              <i>*</i>
              <strong>品牌链路授权：</strong>
            </p>
            <p>
              <i>*</i>
              <strong>一级链路授权：</strong>
            </p>
            <div class="fillIn">
              <input
                type="text"
                placeholder="请填写链路授权名称"
                v-model="brandData[index].brandLinkAuthorizaTitle1"
              >
            </div>
            <p class="hint">
              <span v-show="brandData[index].showOne">请填写链路授权名称</span>
            </p>

            <UploadImg :src.sync="brandData[index].brandLinkAuthorizaPic1" labal="上传品牌销售授权证明"></UploadImg>
          </div>

          <div class="companyName">
            <p>
              <strong>二级链路授权：</strong>
            </p>
            <div class="fillIn">
              <input
                type="text"
                placeholder="请填写链路授权名称"
                v-model="brandData[index].brandLinkAuthorizaTitle2"
              >
            </div>

            <UploadImg :src.sync="brandData[index].brandLinkAuthorizaPic2" labal="上传品牌销售授权证明"></UploadImg>
          </div>

          <div class="companyName">
            <p>
              <strong>三级链路授权：</strong>
            </p>
            <div class="fillIn">
              <input
                type="text"
                placeholder="请填写链路授权名称"
                v-model="brandData[index].brandLinkAuthorizaTitle3"
              >
            </div>

            <UploadImg :src.sync="brandData[index].brandLinkAuthorizaPic3" labal="上传品牌销售授权证明"></UploadImg>
          </div>

          <div class="matters">
            <p>
              品牌销售授权证明—注册人与授权人的关系证明，
              最多三级，图片大小2M内，为保障审核效率。请在对应位置上传清晰的品牌链路授权证书
            </p>
          </div>
        </div>
      </div>

      <div class="operation">
        <button @click="delCurrent" :class="{ colorChange1:theme.name == 'wp',colorChange3:theme.name !== 'wp'}">删除当前品牌</button>
        <button @click="saveDrafts">保存草稿</button>
        <button @click="saveSbumit">保存并提交</button>
      </div>
    </div>
  </div>
</template>


<script>
export { default } from './manage.component.ts';
</script>

<style lang="less" scoped>
@import url('./manage.component.less');
</style>
