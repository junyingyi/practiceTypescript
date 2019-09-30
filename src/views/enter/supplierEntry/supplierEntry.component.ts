import { Component, Vue, Inject, Model, Emit, Watch, Prop } from 'vue-property-decorator';
import { Subscription } from 'rxjs';
import { router } from '@/router';
import { IHttp } from '@/plugins/mixins/provides/service';
import { sesStorage } from '@/plugins/mixins/provides/service/storage';
const dsBridge = require('dsbridge');

@Component
export default class supplierEntry extends Vue {
  subscribeSub!: Subscription;

  @Inject() '$Http': IHttp;

  datas: any = ['基本资质要求', '合作模式', '未开放合作品类', '申请反馈'];
  content1: any = true;
  content2: any = false;
  content3: any = false;
  content4: any = false;
  dynamic: any = '';
  names: any = '';
  config: any = {
    statusUrl: 'Supplier/QueryAllStatus', //获取状态
    logUrl: 'TokenAuth/ExternalAuthenticate', //单点登录
    params: {
      token: localStorage.getItem('at_token') || '',
    },
  };
  stateInfo: any = {};
  theme: any = {
    name: router.currentRoute.query.name || 'wp',
    type: router.currentRoute.query.type || 0,
  };

  imgs: any = ['banner1.png', 'attractAllot_img_03.png', 'attractAllot_img_05.png', 'attractAllot_img_04.png'];
  isMerchant = ['banner1.png', 'attractAllot_img_05.png'];

  shareObj: any = {
    shareTitle: '',
    shareContent: '',
    shareImg: '',
    url: '',
  };

  init() {
    sesStorage.setItem('theme', this.theme);
    this.theme = sesStorage.getItem('theme');
    let isWp: boolean = this.theme.name == 'wp' ? true : false;
    this.names = this.theme.name == 'wp' ? '微品' : '营养宝';
    this.imgs = this.imgs.map((item: any) => {
      item = require('@/assets/' +
        (isWp ? 'enter/' : 'enter2/') +
        item.split('.')[0] +
        (this.theme.type == 1 && this.isMerchant.indexOf(item) !== -1 ? '_sj.' : '.') +
        item.split('.')[1]);
      return item;
    });
    document.title = (isWp ? '微品' : '营养宝') + (this.theme.type == 1 ? '商家' : '供应商') + '入驻';
    this.shareObj.shareTitle = document.title;
    this.shareObj.shareContent = `欢迎加入${document.title}大家庭`;
    this.shareObj.shareImg = isWp
      ? 'https://vpclub-img.oss-cn-shenzhen.aliyuncs.com/upload/vphonor/201904/10/636904914333587643.png'
      : 'https://vpclub-img.oss-cn-shenzhen.aliyuncs.com/upload/vphonor/201904/10/636904914680118302.png';
    this.shareObj.url = `https://yyb.vpclub.cn/pc/enter/supplierEntry?name=${this.theme.name}&type=${this.theme.type}`;
  }

  created() {
    this.init();
    this.checked(0);
    this.getData();
    this.setShare(this.shareObj);
  }

  setShare(obj: any) {
    //app分享
    dsBridge.call(
      'jstowebview',
      {
        type: 2,
        shareTitle: obj.shareTitle,
        shareDesc: obj.shareContent,
        shareImg: obj.shareImg,
        shareLink: obj.url,
      },
      (res: any) => {
        console.log('回调' + res);
      }
    );
  }

  get addButton() {
    if (this.theme.name == 'wp') {
      return 'apply';
    } else {
      return 'applys';
    }
  }

  checked(val: any) {
    this.dynamic = val;
    switch (val) {
      case 0:
        this.content1 = true;
        this.content2 = false;
        this.content3 = false;
        this.content4 = false;
        break;
      case 1:
        this.content1 = false;
        this.content2 = true;
        this.content3 = false;
        this.content4 = false;
        break;
      case 2:
        this.content1 = false;
        this.content2 = false;
        this.content3 = true;
        this.content4 = false;
        break;
      case 3:
        this.content1 = false;
        this.content2 = false;
        this.content3 = false;
        this.content4 = true;
        break;
      default:
        break;
    }
  }
  goTo(url: string, params: any = {}) {
    router.push({ name: url, query: params });
  }
  enters() {
    //点击跳转
    this.getState();
  }
  getData() {
    this.$Http
      .api(this.config.logUrl, { token: this.config.params.token.replace(' ', '') }, 'post')
      .then((data: HttpBase<HttpResult>) => {
        if (data && data.success) {
          if (data.result.accessToken) {
            localStorage.setItem('token', data.result.accessToken);
          }
        }
      });
    // }
  }

  getState() {
    this.$Http.api(this.config.statusUrl, {}, 'post').then((data: HttpBase<HttpResult>) => {
      if (data && data.success) {
        this.stateInfo = data.result;
        if (this.stateInfo) {
          if (this.stateInfo.opstatus == 0 || this.stateInfo.opstatus == 1) {
            if (this.stateInfo.editBaseInfo == 1) {
              this.goTo('Applicant'); //企业资质
            } else if (this.stateInfo.editCtgBrand == 1) {
              this.goTo('Manage'); //品牌
            } else if (this.stateInfo.auditStatus !== 1) {
              this.goTo('AttractAllot');
            }
          } else if (this.stateInfo.opstatus == 2 || this.stateInfo.opstatus == 3 || this.stateInfo.opstatus == 4) {
            this.goTo('AttractAllot'); //招商分配
          } else if (this.stateInfo.opstatus == 5 || this.stateInfo.opstatus == 6) {
            if (this.stateInfo.canPay == 1) {
              //缴纳保证金
              this.goTo('Intake');
            } else if (this.stateInfo.canConfirm == 1 || this.stateInfo.canLogin == 1) {
              //确认保证金
              this.goTo('Audit');
            } else {
              //补全信息
              this.goTo('Activate');
            }
          } else {
            this.goTo('Audit'); //入驻审核
          }
        }
      }
    });
  }
}
