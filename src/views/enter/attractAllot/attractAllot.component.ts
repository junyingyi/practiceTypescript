import { Component, Vue, Inject, Model, Emit, Watch, Prop } from 'vue-property-decorator';
import { IHttp } from '@/plugins/mixins/provides/service';
import { BehaviorSub } from '@/plugins/mixins/provides/subject/base';
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { router } from '@/router';
import PlanState from '@/components/PlanState/PlanState.component.vue';
import { sesStorage } from '@/plugins/mixins/provides/service/storage';

@Component({
  components: {
    PlanState,
  },
})
export default class AttractAllot extends Vue {
  subscribeSub!: Subscription;

  // 依赖注入
  @Inject() '$Http': IHttp;
  @Inject() '$NotificationOneSub': BehaviorSub;

  type: number = 0;
  theme = sesStorage.getItem('theme');
  imgs: any = [
    require(`@/assets/enter${this.theme.name == 'wp' ? '' : '2'}/attractAllot_img_01.png`),
    require(`@/assets/enter${this.theme.name == 'wp' ? '' : '2'}/attractAllot_img_02.png`),
  ];
  stateInfo: any = {};

  // prop属性
  // @Prop() private src!: string;

  //存放数据类的参数
  public config: any = {
    statusUrl: 'Supplier/QueryAllStatus', //获取状态
    params: {
      //接口参数
    },
  };

  created() {
    this.subWatch(); //存放所有的sub
    this.getData();
  }

  

  //subscribe监听
  subWatch() {
    this.subscribeSub = this.$NotificationOneSub
      .getParams()
      .pipe(filter((res: any) => res !== 0))
      .subscribe((item: any) => {});
  }
  //补全信息
  infoGo() {
    switch (this.stateInfo.opstatus) {
      case 2:
        //2:待审核
        break;
      case 3:
        //3:审核不通过
        if (this.stateInfo.editBaseInfo == 1) {
          this.goTo('Applicant');
        } else {
          this.goTo('Manage');
        }
        break;
      case 4:
        //4:审核通过
        this.goTo('Activate');
        break;
    }
  }

  goTo(url: string, params: any = {}) {
    router.push({ name: url, query: params });
  }

  //获取数据
  getData() {
    this.$Http.api(this.config.statusUrl, {}, 'post').then((data: HttpBase<HttpResult>) => {
      if (data && data.success) {
        this.stateInfo = data.result;
        this.type = this.stateInfo.auditStatus;
      }
    });

    // this.$Http.proxy(this.config.queryUrl, {}, 'post').then((data: HttpBase<HttpResult>) => {
    //   if (data.success) {
    //     // *active: 1  //激活账户( 0:表示没有编辑过，1:表示当前激活状态，3:表示可编辑状态)
    //     // auditStatus: 3 //审核状态(1:保存草稿 2:待审核 3:审核通过 4:审核不通过)
    //     // *canConfirm: 2  //确认保证金
    //     // *canLogin: 2  //去登录
    //     // *canPay: 2  //缴纳保证金
    //     // ctgAuditStatus: 3  //品牌分类审核状态(1:保存草稿 2:待审核 3:审核通过 4:审核不通过)
    //     // ctgReason: null  //品牌分类审核不通过原因
    //     // *editBaseInfo: 0  //编辑企业资质信息
    //     // *editCtgBrand: 0  //编辑类目/品牌
    //     // opstatus: 5 //当前进度状态（[0],[1.提交信息] [2.待审核 3.审核不通过 4.审核通过] [5.激活账户/保证金 6.签署协议],[]）
    //     // reason: null //审核不通过原因
    //     // *signProtocol: 2  //签署协议
    //     this.dataInfo = data.result;
    //     this.type = this.dataInfo.auditStatus;
    //   }
    // });
  }

  //解绑
  beforeRouteLeave(to: any, from: any, next: any) {
    if (this.subscribeSub != undefined) {
      this.subscribeSub.unsubscribe();
    }
    next();
  }

  /* 生命周期 */
  // beforeCreate() {}
  // created() {}
  // beforeMount() {}
  // mounted() {}
  // beforeUpdate() {}
  // beforeDestroy() {}
  // destroyed() {}

  /* 路由导航守卫钩子 */
  // beforeRouteEnter(to: any, from: any, next: Function) {
  //   next();
  // }
  // beforeRouteUpdate(to: any, from: any, next: Function) {
  //   next();
  // }
  // beforeRouteLeave(to: any, from: any, next: Function) {
  //   next();
  // }
}
