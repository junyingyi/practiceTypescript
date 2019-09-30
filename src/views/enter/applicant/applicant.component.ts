import { Component, Vue, Inject, Model, Emit, Watch, Prop } from 'vue-property-decorator';
import { MessageBox, DatetimePicker } from 'mint-ui';
import { Subscription } from 'rxjs';
import { router } from '@/router';
import UploadImg from '@/components/UploadImg/UploadImg.component.vue';
import { IHttp } from '@/plugins/mixins/provides/service';
import PlanState from '@/components/PlanState/PlanState.component.vue';
import { sesStorage } from '@/plugins/mixins/provides/service/storage';

Vue.component(DatetimePicker.name, DatetimePicker);
@Component({
  components: {
    UploadImg,
    PlanState,
  },
})
export default class Applicant extends Vue {
  subscribeSub!: Subscription;
  @Inject() '$Http': IHttp;

  theme = sesStorage.getItem('theme') || 0;

  stateInfo: any = {};
  rules: any = {
    //验证规则
    companyName: { pass: false }, //公司名
    companyAddress: { pass: false }, //公司地址
    contactUser: { pass: false },//申请人姓名
    tenantName: { pass: false },//供应商名称
    code: { pass: false },//验证码
    licenseNumber: { pass: false }, //信用代码
    licenseValidEndData: { pass: false }, //结束时间
    licenseValidStartData: { pass: false }, //开始时间
    mobilePhone: { pass: false },//手机号码
    companyEmail: { pass: false }, //邮箱
  };
  accessTime:any ={
    dataStart:  false, //选取开始时间状态
    dataEnd:  false, //选取结束时间状态
    // Start:'选取启始时间',
    // End:'选取结束时间',
  }

  saves: any = '';
  times: any = false;
  time: any = 60;
  tenantName: any = ''; //供应商名称
  names: any = ''; //0:供应商  1：商家
  types: any = ''; //wp:微品  yyb：营养宝
  // ids: any = ''; //接口返回的数据
  texts: any = []; //文字描述
  formData: any = {
    contactUser: '',
    mobilePhone: '',
    companyEmail: '',
    tenantName: '',
    companyName: '',
    companyAddress: '',
    remark: '',
    licenseValidStartData: '',
    licenseValidEndData: '',
    licenseNumber: '',
    licensePic: '',
    qualificationPic: '',
    openingPermitPic: '',
    idCardZMPic: '',
    idCardFMPic: '',
    code: '',
    save: '',
    otherPic1: '',
    otherPic2: '',
    otherPic3: '',
    id: 0,
    supplierType: '',
  };

  public config: any = {
    statusUrl: 'Supplier/QueryAllStatus', //获取状态
    getCode: 'Supplier/SendSmsByType', //获取手机验证码
    saveSubmit: 'Supplier/CreateSupplierBaseInfo', //保存并上传
    QuerySupplier: 'Supplier/QuerySupplierBaseInfo', //查询接口
    updates: 'Supplier/UpdateSupplierBaseInfo', //更新商家信息
  };

  async querySupplier() {
    //查询资料接口
    const res = await this.$Http.proxy(this.config.QuerySupplier, {}, 'post');
    console.log(res, '@222');
    if (res.success && res.result) {
      this.formData = res.result;
      // this.formData.id = res.result.id;
    }
  }

  async getCode() {
    //获取手机验证码
    const that = this;
    if(this.times) return;
    if (/^1[3-9]\d{9}$/.test(this.formData.mobilePhone) && this.formData.mobilePhone != '') {
      this.rules.mobilePhone.pass = false;
      const res = await this.$Http.proxy(this.config.getCode, { phone: this.formData.mobilePhone }, 'get');
      if (res.success) {
        this.times = true;
        let timer = setInterval(() => {
          if (that.time > 0) {
            that.time--;
          } else {
            clearInterval(timer);
            that.time = 60;
            that.times = false;
          }
        }, 1000);
      }
    } else {
      this.rules.mobilePhone.pass = true;
      return;
    }
  }

  init() {
    console.log(this.theme.type);
    this.names = this.theme.type == 0 ? '供应商' : '商家';
    this.types = this.theme.name == 'wp' ? '微品' : '营养宝';
    console.log(this.names);
  }

  //时间选取搓
  openPickerStart() {
    this.accessTime.dataStart = true;
    this.accessTime.dataEnd = false;
    (<any>this.$refs).picker.open();
  }
  openPickerEnd() {
    this.accessTime.dataStart = false;
    this.accessTime.dataEnd = true;
    (<any>this.$refs).picker.open();
  }
  handleConfirm(data: any) {
    var d = new Date(data);
    const month = d.getMonth() + 1 >= 10 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1);
    const datas = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate();
    const youWant = d.getFullYear() + '-' + month + '-' + datas + ' ' + '00:00:00';
    if (this.accessTime.dataStart) {
      this.formData.licenseValidStartData = youWant;
      // this.accessTime.Start = !this.formData.licenseValidStartData?"选取启始时间":"";
    } else {
      this.formData.licenseValidEndData = youWant;
      // this.accessTime.End = !this.formData.licenseValidEndData?"选取结束时间":"";
    }
  }

  async draft() {
    //保存草稿
    this.formData.save = true;
    this.save();
  }

  save() {
    let isOk = true
    for (const key in this.rules) {
      // console.log(this.formData[key])
      console.log(key)
      if (!this.formData[key]) {
        this.rules[key].pass = true
        isOk = false;
        return
      } else {
        this.rules[key].pass = false
      }
      if (key == 'mobilePhone') {
        if (/^1[3-9]\d{9}$/.test(this.formData.mobilePhone)) {
          this.rules[key].pass = false;
        } else {
          isOk = false;
          this.rules[key].pass = true;
          return;
        }
      }
      if (key == 'companyEmail') {
        if (!/^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/.test(this.formData.companyEmail)) {
          this.rules[key].pass = true;
          isOk = false;
          return;
        } else {
          this.rules[key].pass = false;
        }
      }
    }
    if(this.formData.licenseValidStartData>this.formData.licenseValidEndData){
      MessageBox.alert('起始时间不能超过结束时间').then((action: any) => { });
      return
    }
    if (!this.formData.licensePic) {
      MessageBox.alert('请上传营业执照附件').then((action: any) => { });
      return;
    } else if (!this.formData.openingPermitPic) {
      MessageBox.alert('请上传开户许可证').then((action: any) => { });
      return;
    } else if (!this.formData.idCardZMPic) {
      MessageBox.alert('请上传身份证正面').then((action: any) => { });
      return;
    } else if (!this.formData.idCardFMPic) {
      MessageBox.alert('请上传身份证反面').then((action: any) => { });
      return;
    }
    // 验证通过执行
    if(isOk){
      this.formData.supplierType = this.theme.type;
      const url = this.formData.id == 0 ? this.config.saveSubmit : this.config.updates;
      const req = this.formData.id == 0 ? 'post' : 'put';
      this.$Http.api(url, this.formData, req).then((res) => {
        if (!this.formData.save) {
          this.$router.push({ path: '/enter/manage' });
        } else {
          MessageBox.alert('保存成功').then((action: any) => {
            if (res.success && res.result) {
              this.formData = res.result;
            }
          });
        }
      });
    }

  }

  submits() {
    //保存并提交
    MessageBox.confirm('提交后资质信息将不能修改，请确认是否提交?').then(async (action: any) => {
      this.formData.save = false;
      this.save();
    });
  }
  //获取数据
  getData() {
    this.$Http.api(this.config.statusUrl, {}, 'post').then((data: HttpBase<HttpResult>) => {
      if (data && data.success) {
        this.stateInfo = data.result;
      }
    });
  }

  created() {
    this.getData();
    this.init();
    this.querySupplier();
    this.texts = [
      {
        title: `1. ${this.types}自营${this.names}入驻流程介绍:`,
        arr: [
          '① 签署在线入驻协议',
          `登录自营${this.names}入驻系统后，请阅读并签署在线入驻协议方可进入后续入驻流程`,
          '② 阅读入驻帮助',
          `③ ${this.names}信息提交`,
          '包含基本信息、财务信息及基本资质的提交',
          `④ ${this.types}专人跟进审核`,
          '您可登录入驻系统查询最新的入驻进度',
          '如果审核通过，您的入驻即已成功，后续我方如有采购意向，会有专人与您联系。',
          '如果被驳回，会告知您驳回原因，您可以修改后再次提交。',
        ],
      },
      {
        title: `2. ${this.types}自营${this.names}入驻步骤介绍：`,
        arr: [
          '① 签署在线入驻协议',
          `登录自营${this.names}入驻系统后，请阅读并签署在线入驻协议方可进入后续入驻流程。`,
          '② 阅读入驻帮助',
          `③ ${this.names}信息提交`,
          '包含基本信息、财务信息及基本资质的提交',
          `④ ${this.types}专人跟进审核`,
          '您可登录入驻系统查询最新的入驻进度',
          '如果审核通过，您的入驻即已成功，后续我方如有采购意向，会有专人与您联系。',
          '如果被驳回，会告知您驳回原因，您可以修改后再次提交。',
        ],
      },
      {
        title: '3. 如何查询入驻进度？',
        arr: [`请${this.names}及时登录${this.types}自营${this.names}入驻系统查看入驻进度。`],
      },
      {
        title: '4. 怎么修改我的信息和资质？',
        arr: [
          `${this.names}在入驻成功，并开通${this.names}开放平台后， 可以在${
          this.names
          }开发平台针对本身的公司基本信息、财务信息、 基本资质及产品资质进行修改并提交审核。`,
        ],
      },
      {
        title: `5. ${this.names}入驻的基础前提条件是什么？`,
        arr: [
          '合作基础前提',
          '1、 注册资金50万以上，公司成立时间2年以上；',
          '2、 公司为一般纳税人，可开具17%的增值税发票；',
          `3、 能够提供5证--营业执照、税务登记证、组织机构代码证、开户银行许可证、增值税一般纳税人资格证/出版物经营许可证（图书${
          this.names
          }）及产品资质，如3C等；`,
          '4、 对销售品牌有商标注册证或完整授权。',
        ],
      },
    ];
  }

}
