import { Component, Prop, Vue, Inject } from 'vue-property-decorator';
import { IHttp } from '@/plugins/mixins/provides/service';
import { router } from '@/router';
import { sesStorage } from '@/plugins/mixins/provides/service/storage';

@Component({
  components: {},
})
export default class PlanState extends Vue {
  @Inject() '$Http': IHttp;

  @Prop() private type!: string;
  @Prop() private canConfirm!: number;
  @Prop() private canLogin!: number;
  list: any;
  theme: any = sesStorage.getItem('theme');
  img: any = require(`@/assets/enter${this.theme.name == 'wp' ? '' : '2'}/banner2${
    this.theme.type == 1 ? '_sj' : ''
  }.png`);

  created() {
    this.list = {
      0: require(`@/assets/enter${this.theme.name == 'wp' ? '' : '2'}/1.png`),
      1: require(`@/assets/enter${this.theme.name == 'wp' ? '' : '2'}/1.png`),
      2: require(`@/assets/enter${this.theme.name == 'wp' ? '' : '2'}/2.png`),
      3: require(`@/assets/enter${this.theme.name == 'wp' ? '' : '2'}/2.png`),
      4: require(`@/assets/enter${this.theme.name == 'wp' ? '' : '2'}/2.png`),
      5: require(`@/assets/enter${this.theme.name == 'wp' ? '' : '2'}/3.png`),
      6: require(`@/assets/enter${this.theme.name == 'wp' ? '' : '2'}/3.png`),
      7: require(`@/assets/enter${this.theme.name == 'wp' ? '' : '2'}/4.png`),
    };
  }

  init() {}
}
