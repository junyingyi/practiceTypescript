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
@Component({
  components: {
    mtField: Field,
    mtChecklist: Checklist,
    UploadImg,
    PlanState,
  },
})
export default class Intake extends Vue {
  subscribeSub!: Subscription;

  // 依赖注入
  @Inject() '$Http': IHttp;
  @Inject() '$NotificationOneSub': BehaviorSub;

  // prop属性
  // @Prop() private src!: string;
  theme = sesStorage.getItem('theme');
  //存放数据类的参数
  public config: any = {
    statusUrl: 'Supplier/QueryAllStatus', //获取状态
    subUrl: 'Supplier/PaymentAmount', //签署
    queryUrl: 'Supplier/QueryAmountInfo', //查询状态
  };

  dataInfo: any = {
    needMoney: 0,
  };
  stateInfo: any = {};
  paymentForm: any = {
    payment: 15,
    userName: '深圳微品致远信息科技有限公司',
    bankAccount: '774463658856',
    pic: '',
  };

  //验证规则
  rules: any = {
    pic: { required: true, pass: false },
  };

  isPost: boolean = true;

  created() {
    this.getData();
  }

  goTo(url: string, params: any = {}) {
    router.push({ name: url, query: params });
  }

  //获取数据
  getData(): void {
    //获取状态
    this.$Http.api(this.config.statusUrl, {}, 'post').then((data: HttpBase<HttpResult>) => {
      if (data && data.success) {
        this.stateInfo = data.result;
      }
    });

    this.$Http.api(this.config.queryUrl, {}, 'post').then((data: HttpBase<HttpResult>) => {
      if (data.success) {
        this.dataInfo = data.result;
      }
    });
  }

  //提交
  save() {
     if(!this.paymentForm.pic){
      Toast({
        message: '请上传转账凭证',
        position: 'bottom',
        duration: 3000,
      });
      return
     }  

    if (this.isPost) {
      this.isPost = false;
      let state: boolean = false;
      for (const key in this.rules) {
        if (this.rules[key].required) {
          if (!this.paymentForm[key]) {
            this.rules[key].pass = true;
            state = true;
          } else {
            this.rules[key].pass = false;
          }
        }
      }
      if (state) {
        this.isPost = true;
        return;
      }

      let params = cloneObj(this.paymentForm);
      delete params.userName;
      delete params.bankAccount;
      this.$Http.api(this.config.subUrl, params, 'post').then((data: HttpBase<HttpResult>) => {
        this.isPost = true;
        if (data.success) {
          this.goTo('Audit');
        }
      });
    }
  }

  //解绑
  beforeRouteLeave(to: any, from: any, next: any) {
    if (this.subscribeSub != undefined) {
      this.subscribeSub.unsubscribe();
    }
    next();
  }
}
