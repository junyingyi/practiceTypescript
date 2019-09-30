import { Component, Vue, Inject, Model, Emit, Watch, Prop } from 'vue-property-decorator';
import { IHttp } from '@/plugins/mixins/provides/service';
import { BehaviorSub } from '@/plugins/mixins/provides/subject/base';
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { router } from '@/router';
import { Field, Checklist, Toast } from 'mint-ui';
import UploadImg from '@/components/UploadImg/UploadImg.component.vue';
import { cloneObj } from '@/plugins/mixins/provides/service/cloneObj';
import PlanState from '@/components/PlanState/PlanState.component.vue';
import { sesStorage } from '@/plugins/mixins/provides/service/storage';
import { regExp } from '@/config';

@Component({
  components: {
    mtField: Field,
    mtChecklist: Checklist,
    UploadImg,
    PlanState,
  },
})
export default class Activate extends Vue {
  subscribeSub!: Subscription;

  // 依赖注入
  @Inject() '$Http': IHttp;
  @Inject() '$NotificationOneSub': BehaviorSub;

  dataInfo: any = {};

  // prop属性
  // @Prop() private src!: string;

  //存放数据类的参数
  public config: any = {
    statusUrl: 'Supplier/QueryAllStatus', //获取状态
    addUrl: 'Supplier/ActivateAccount',
    queryUrl: 'Supplier/QueryAccount',
    datumQueryUrl: 'Supplier/QuerySupplierBaseInfo',
    uploadUrl: 'Upload/UploadFile', //上传图片
    dealUrl: 'Supplier/QueryProtocol', //查看协议
    signUrl: 'Supplier/SignProtocol', //签署
    isDisabled: false,
  };

  //协议
  dealConfig: any = {
    isChannel: true,
    isEBusiness: true,
    isChecked: true,
  };
   
  theme = sesStorage.getItem('theme');
  //验证码
  countdown: any = '获取邮箱验证码';
  countOff: boolean = true;
  countTimer: any;

  newForm: any = {
    tenantName: '',
    mobilePhone: '',
    companyEmail: '',
    settlementType: 1,
    userName: '',
    openBank: '',
    bankAccount: '',
    verifyCode: '',
  };

  //验证规则
  rules: any = {
    userName: { required: true, pass: false, message: '帐户名称为必填项' },
    openBank: { required: true, pass: false, message: '开户行为必填项' },
    bankAccount: { required: true, pass: false, message: '企业银行账号为必填项' },
    verifyCode: { required: true, reg: regExp.numOrWord, pass: false, message: '邮箱验证码为必填项' },
    settlementType: { required: true, pass: false, message: '结算方式为必填项' },
  };

  stateInfo: any = {};

  isDeal: any = [];

  created() {
    this.getData();
  }

  //subscribe监听
  subWatch() {
    this.subscribeSub = this.$NotificationOneSub
      .getParams()
      .pipe(filter((res: any) => res !== 0))
      .subscribe((item: any) => {});
  }

  goTo(url: string, params: any = {}) {
    router.push({ name: url, query: params });
  }

  //获取数据
  // async getData() {
  //   let data: HttpBase<HttpResult> = await this.$Http.proxy(this.config.queryUrl, {}, 'post');
  //   if (data && data.success) {
  //     console.log('看看这个');
  //   }
  // }

  //获取数据
  getData(): void {
    //获取状态
    this.$Http.api(this.config.statusUrl, {}, 'post').then((data: HttpBase<HttpResult>) => {
      if (data && data.success) {
        this.stateInfo = data.result;
      }
    });

    //获取查询供应商基本资料
    this.$Http.api(this.config.datumQueryUrl, {}, 'post').then((data: HttpBase<HttpResult>) => {
      if (data.success && data.result) {
        this.newForm.tenantName = data.result.tenantName;
        this.newForm.mobilePhone = data.result.mobilePhone;
        this.newForm.companyEmail = data.result.companyEmail;
        console.log(data);
      }
    });
    //获取信息
    this.$Http.api(this.config.queryUrl, {}, 'post').then((data: HttpBase<HttpResult>) => {
      if (data.success) {
        this.newForm = Object.assign({}, data.result);
        console.log(data);
      }
    });
    //获取协议
    this.$Http.api(this.config.dealUrl, {}, 'post').then((data: HttpBase<HttpResult>) => {
      if (data.success) {
        this.dealConfig = Object.assign(this.dealConfig, data.result);
      }
    });
  }

  //提交
  save() {
    if (this.isDeal.length) {
      console.log(this.newForm);
      //自动验证
      let state: boolean = false;
      for (const key in this.rules) {
        if (this.rules[key].required) {
          if (!this.newForm[key]) {
            this.rules[key].pass = true;
            state = true;
            Toast({
              message: this.rules[key].message,
              position: 'bottom',
              duration: 3 * 1000,
            });
            return;
          } else {
            this.rules[key].pass = false;
          }
        }
        if (!state && this.rules[key].reg) {
          if (!this.newForm[key].match(this.rules[key].reg)) {
            this.rules[key].pass = true;
            state = true;
            Toast({
              message: this.rules[key].message,
              position: 'bottom',
              duration: 3 * 1000,
            });
            return;
          }
        }
      }
      if (state) return;

      let obj = cloneObj(this.newForm);
      delete obj.tenantName;
      delete obj.mobilePhone;
      delete obj.companyEmail;
      delete obj.isCanEdit;
      this.$Http.api(this.config.addUrl, obj, 'post').then((data: HttpBase<HttpResult>) => {
        if (data.success) {
          console.log(data);
          this.confirmSign(() => {
            Toast({
              message: '激活成功',
              position: 'bottom',
              duration: 3000,
            });
            this.goTo('Intake');
          });
        }
      });
    } else {
      Toast({
        message: '请查看并勾选供应商入驻协议',
        position: 'bottom',
        duration: 3000,
      });
    }
  }

  //签署协议
  confirmSign(fn: any = null) {
    this.$Http.api(this.config.signUrl, {}, 'post').then((data: HttpBase<HttpResult>) => {
      if (data.success) {
        if (fn) {
          fn();
        }
      }
    });
  }

  //获取验证码
  goCode() {
    if (this.countOff) {
      this.$Http.api('Supplier/SendEmailCode', {}, 'post').then((data: HttpBase<HttpResult>) => {
        if (data.success) {
          this.setCountdown();
          Toast({
            message: '已发送成功，注意查收！',
            position: 'bottom',
          });
        }
      });
    } else {
      Toast({
        message: '请填写邮箱',
        position: 'bottom',
      });
    }
  }

  //倒计时
  setCountdown() {
    let i = 120;
    this.countOff = false;
    this.countTimer = setInterval(() => {
      this.countdown = i-- + 's后重新发送';
      if (i <= 0) {
        this.countdown = '获取邮箱验证码';
        this.countOff = true;
        clearInterval(this.countTimer);
      }
    }, 1000);
  }

  //解绑
  beforeRouteLeave(to: any, from: any, next: any) {
    if (this.subscribeSub != undefined) {
      this.subscribeSub.unsubscribe();
    }
    next();
  }
}
