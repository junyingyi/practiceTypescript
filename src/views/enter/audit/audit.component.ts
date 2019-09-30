import { Component, Vue, Inject, Model, Emit, Watch, Prop } from 'vue-property-decorator';
import { IHttp } from '@/plugins/mixins/provides/service';
import { BehaviorSub } from '@/plugins/mixins/provides/subject/base';
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { router } from '@/router';
import { Field, Checklist, Toast } from 'mint-ui';
import UploadImg from '@/components/UploadImg/UploadImg.component.vue';
import PlanState from '@/components/PlanState/PlanState.component.vue';

@Component({
  components: {
    mtField: Field,
    mtChecklist: Checklist,
    UploadImg,
    PlanState,
  },
})
export default class Audit extends Vue {
  subscribeSub!: Subscription;

  // 依赖注入
  @Inject() '$Http': IHttp;
  @Inject() '$NotificationOneSub': BehaviorSub;

  // prop属性
  // @Prop() private src!: string;

  //存放数据类的参数
  public config: any = {
    statusUrl: 'Supplier/QueryAllStatus', //获取状态
  };

  stateInfo: any = {};

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
  }
}
