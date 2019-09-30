<template>
  <div>
    <div class="swiper">
      <img class="hello" :src="imgs[0]" alt="">
    </div>
    <div class="tenet">
      <img class="tenetImg" :src="imgs[1]" alt="">
    </div>
    <div class="details">
      <button :class="addButton" @click="enters">申请入驻</button>
      <img class="enter" :src="imgs[2]" alt="">
    </div>
    <div class="question">
      <img :src="imgs[3]" alt="">
    </div>
    <div class="main">
      <div class="title">
        <ul>
          <li
            v-for="(item,index) in datas"
            ref="lis"
            :key="index"
            :class="{ colorChange: (index == dynamic && theme.name == 'wp'),colorChange2: (index == dynamic && theme.name !== 'wp')}"
            @click="checked(index)"
          >{{item}}</li>
        </ul>
      </div>
      <div class="content">
        <div v-show="content1">
          <p>若您是经销商，请提供：</p>
          <p>营业执照、开户许可证、增税一般纳税人资格、品牌使用及产品代理授权证明 品牌授权链需要完整：例如，经销商若为二级代理，需要提供：</p>
          <p>a. 所经营品牌商标注册证明或商标注册备案通知书</p>
          <p>b. 品牌商授权给一级代理的授权书</p>
          <p>c. 一级代理授权给二级代理的授权书</p>
          <p>若您是生产商，请提供：</p>
          <p>进口产品报关单据及相关文件；</p>
          <p>食品、化妆品必须提供进口产品检疫检验合格证书（批次）。</p>
          <p>若您经营净水设备、饮水设备（除陶瓷净水器）等产品，请提供：</p>
          <p>涉及饮用水卫生安全产品卫生许可批件。</p>
          <p>若您经营手机，请提供：</p>
          <p>"3C中国国家强制性产品认证证书 、电信设备进网许可证 、无线电发射设备型号核准证"</p>
          <p>若您经营电热毯、压力锅、燃气热水器、燃气灶、商用大型厨房电器、10匹以上工业用途的空调等，请提供：</p>
          <p>"3C中国国家强制性产品认证证书 、电信设备进网许可证 、无线电发射设备型号核准证"</p>
          <p>若您经营消毒柜，请提供</p>
          <p>消毒产品生产企业卫生许可。</p>
          <p>若您经营特殊标识产品，请提供：</p>
          <p>如果商品包装标签标识别或网页描述中有声称获得了某某荣誉证书、专利证书、ISO9001质量管理体系认证、 ISO14001环境体系认证、著名品牌、某某活动指定产品等信息的，供应商还应当提供相应的资质文件。</p>
          <p>若您是代工厂，我们要求：</p>
          <p>1. 企业本身为知名品牌，或具有为国内外市场领先品牌代工的丰富经验，生产标准领先，品控严格（有国际品牌，如雀巢、亿滋、玛氏等，或有国内龙头品牌代工经验，通过严格国际体系认证）</p>
          <p>2. 具有国内外原产地优质货源采购能力，有较强原料采购议价权（例如有进口权、稳定的国外原产地资源、茶企自有茶园等）</p>
          <p>3. 健全的质量认证体系，通过ISO、HACCP等检测</p>
          <p>4. 具有较强的产品研发能力，包括新品开发、配方研发等（便于后期进行战略合作，产品升级、创新等）</p>
          <p>5. 公司产能规模较大，资质齐全，食品类注册资金不低于500万，母婴/日化类注册资金不低于1000万，财务状况稳定，有地方政府支持优先（由于历史原因或国家政策原因导致注册资金不足，但其它条件非常优秀，可经特殊审批后通过）</p>
          <p>6. 上市企业优先。</p>
          <p>注意：我们可能对于某些合作品类的供应商有额外的资质要求，如：</p>
          <p>a、3C认证、质检报告（省级以上检测机构出具的，至少具有CMA标志的）</p>
          <p>b、是否为线上独家代理（或{{names}}线上授权）</p>
          <p>c、食品流通许可证</p>
        </div>
        <div v-show="content2">
          <p>供应商提供商品及页面信息，营养宝负责销售给顾客。</p>
          <p>供应商为自有品牌代工的OEM模式。</p>
        </div>
        <div v-show="content3">
          <p>以上未涉及的品类。</p>
        </div>
        <div v-show="content4">
          <p>收到您的合作申请邮件后，我们将按照采购需求与您联系，请您耐心等候。</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export { default } from './supplierEntry.component.ts';
</script>


<style lang="less" scoped>
@import url('./supplierEntry.component.less');
</style>
