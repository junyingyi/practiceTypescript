import { Component, Vue, Inject, Model, Emit, Watch, Prop } from 'vue-property-decorator';
import { IHttp } from '@/plugins/mixins/provides/service';
import { BehaviorSub } from '@/plugins/mixins/provides/subject/base';
import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { router } from '@/router';
import { Field, Checklist, Toast, MessageBox, DatetimePicker } from 'mint-ui';
import UploadImg from '@/components/UploadImg/UploadImg.component.vue';
import { cloneObj } from '@/plugins/mixins/provides/service/cloneObj';
import PlanState from '@/components/PlanState/PlanState.component.vue';
import { sesStorage } from '@/plugins/mixins/provides/service/storage';
import { watch } from 'fs';
@Component({
  components: {
    mtField: Field,
    mtChecklist: Checklist,
    UploadImg,
    PlanState,
  },
})
export default class Manage extends Vue {
  subscribeSub!: Subscription;

  // 依赖注入
  @Inject() '$Http': IHttp;
  @Inject() '$NotificationOneSub': BehaviorSub;

  // prop属性
  // @Prop() private src!: string;
  theme = sesStorage.getItem('theme') || 0;
  //存放数据类的参数
  public config: any = {
    statusUrl: 'Supplier/QueryAllStatus', //获取状态
    subUrl: 'Supplier/PaymentAmount', //签署
    queryUrl: 'Supplier/QueryAmountInfo', //查询状态
    SupUrl: 'Supplier/GetCategories', //查询所有的标签
    Brand: 'Supplier/QueryBrandCtg', //获取品牌名称
    create: 'Supplier/CreateOrUpdateBrandCtg', //添加品牌
  };

  selectOne: any = [];
  selectTwo: any = [];
  selectThree: any = [];
  brandData: any = []; //品牌数据

  datalist = {
    categoryIdlist: [],
    brandName: '商品',
    isBrandBusiness: 1,
    brandLinkAuthorizaTitle1: '',
    brandLinkAuthorizaTitle2: '',
    brandLinkAuthorizaTitle3: '',
    brandLinkAuthorizaPic1: '',
    brandLinkAuthorizaPic2: '',
    brandLinkAuthorizaPic3: '',
    trademarkRegisterPic: '',
    productQualificationPic: '',
    categoryNamelist: [],
    showSelect: false,
    showBrand: false,
    showName: false,
    showOne: false,
  };

  value1: any = '';
  value2: any = '';
  // index: any = 0;
  // picked: any = '1';
  widths: any = '100%';
  dynamic: any = 0;
  // dat: any = null;
  ID: any = null;
  save: any = false;
  stateInfo: any = {};


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
    this.categortData();
    this.brandCtg();
    this.brandData.push(cloneObj(this.datalist));
  }

  // 监听属性
  @Watch('value1')
  onValue1(value1: any) {
    console.log(value1);
    this.selectOne.forEach((item: any) => {
      if (item.id == value1) {
        this.selectTwo = item.children;
        this.brandData[this.dynamic].categoryNamelist[0] = item.categoryName;
        this.brandData[this.dynamic].categoryIdlist[0] = value1;
        const res = this.selectTwo.find((item: any) => item.id == this.ID);
        // console.log(res, "!1111");
        if (res) {
          this.value2 = res.id;
        } else {
          // console.log(this.brandData[this.dynamic].categoryIdlist[1], "顺序", this.dynamic)
          this.value2 = '';
        }
      }
      if (value1 == '') {
        this.value2 = '';
        this.selectTwo = [];
      }
    });
  }

  @Watch('value2')
  onValue2(value2: any) {
    if (value2 != "") {
      this.brandData[this.dynamic].categoryIdlist[1] = value2;
    }
    this.selectTwo.forEach((item: any, index: any) => {
      if (item.id == value2) {
        this.brandData[this.dynamic].categoryNamelist[1] = item.categoryName;
      }
    });
  }

  //监听brandData数据变化改变滑动
  @Watch('brandData')
  onWidth(brandData: any) {
    if (this.brandData.length > 2) {
      this.widths = (this.brandData.length * 2.5) + "rem"
    } else {
      this.widths = "100%"
    }
  }

  categortData() {
    //获取品牌的1级类目
    this.$Http.api(this.config.SupUrl, {}, 'get').then((res) => {
      // console.log(res.result.items);
      this.selectOne = res.result.items;
    });
  }


  brandCtg() {
    //查询商品列表
    this.$Http.api(this.config.Brand, {}, "post").then(res => {
      if (res.success && res.result[0]) {
        this.brandData = res.result
        this.checked(this.dynamic)
      }
    })
  };

  checked(val: any) {
    //点击的当前的li
    this.dynamic = val;
    this.ID = this.brandData[this.dynamic].categoryIdlist[1]
    this.value1 = this.brandData[this.dynamic].categoryIdlist[0] || "";
    this.value2 = this.brandData[this.dynamic].categoryIdlist[1] || "";

  }
  radioChange(val: any) {
    console.log(val.value);
  }

  addBrand() {
    //添加品牌
    this.brandData.push(cloneObj(this.datalist));
    console.log(this.brandData);

  }

  delCurrent() {
    //删除当前品牌
    MessageBox.confirm('请确定是否删除当前产品').then((action: any) => {
      if (this.brandData.length > 0) {
        this.brandData.splice(this.dynamic, 1);
        this.dynamic--;
        this.checked(this.dynamic);
        if (this.dynamic < 0) this.dynamic++;
      } else {
        this.brandData.push(cloneObj(this.datalist));
      }
      if (!this.brandData[0]) {
        this.brandData.push(cloneObj(this.datalist));
      }
    });
  }

  saves() {
    //保存请求
    let isOk = true
    this.brandData.forEach((item: any) => {
      if (!item.categoryIdlist[0]) {
        item.showSelect = true;
        isOk = false
        return false;
      } else {
        item.showSelect = false;
      }
      if (item.brandName == '') {
        item.showName = true;
        isOk = false
        return false;
      } else {
        item.showName = false;
      }
      if (item.isBrandBusiness == '1') {
        //true
        if (!item.trademarkRegisterPic) {
          MessageBox.alert('请上传商标注册证!').then((action: any) => { });
          isOk = false
          return false;
        } else if (!item.productQualificationPic) {
          MessageBox.alert('请上传商品资质!').then((action: any) => { });
          isOk = false
          return false;
        }
      } else {
        //false
        if (item.brandLinkAuthorizaTitle1 == '') {
          item.showOne = true;
          isOk = false
          return false;
        } else {
          item.showOne = false;
        }
        if (!item.brandLinkAuthorizaPic1) {
          MessageBox.alert('请上传品牌销售授权证明!').then((action: any) => { });
          isOk = false
          return false;
        }
      }
    });

    if (isOk) {
      this.$Http
        .api(
          this.config.create,
          {
            inputlist: this.brandData,
            save: this.save,
          },
          'post'
        )
        .then((res) => {
          if (res.success) {
            if (!this.save) {
              console.log(res);
              this.goTo('AttractAllot');
            } else {
              MessageBox.alert('数据保存成功!').then((action: any) => { });
              console.log(res);
            }
          }
        });
    }
  }

  goTo(url: string, params: any = {}) {
    router.push({ name: url, query: params });
  }

  saveDrafts() {
    //保存草稿
    this.save = true;
    this.saves();
  }

  saveSbumit() {
    //保存并提交
    this.save = false;
    MessageBox.confirm('提交后品牌信息将不能修改，请确认是否提交').then((action: any) => {
      this.saves();
    });
  }



}
