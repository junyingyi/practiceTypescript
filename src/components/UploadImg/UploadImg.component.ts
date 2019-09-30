import { Component, Prop, Vue, Inject, Watch } from 'vue-property-decorator';
import { IHttp } from '@/plugins/mixins/provides/service';
import { MessageBox } from 'mint-ui';

@Component({
  components: {},
})
export default class UploadImg extends Vue {
  @Inject() '$Http': IHttp;

  @Prop() private src!: string;
  @Prop() private labal!: string;

  @Watch('src')
  onSrc(src: any) {
    if (src == '') {
      this.showOpen = false;
    } else {
      this.showOpen = true;
    }
  }

  get value() {
    return this.src;
  }
  set value(old) {
    this.$emit('update:src', old);
  }

  open: any = {}; //开户信息
  showOpen: boolean = false;

  public config: any = {
    uploadUrl: 'Upload/UploadFile', //上传图片
  };

  created() {
    this.showOpen = this.src ? true : false;
  }

  addImg4() {
    (<any>this.$refs).fileOpen.click();
  }
  fileChangeOpen(file: any) {
    this.open = file.target.files[0];
    if (this.open.size / 1024 / 1024 > 2) {
      MessageBox.alert('上传失败，图片上传限制2M内').then((action: any) => {});
      return;
    }
    let oData = new FormData();
    oData.append('file', this.open);
    this.$Http.api(this.config.uploadUrl, oData, 'post').then((data: HttpBase<HttpResult>) => {
      if (data.success) {
        this.value = data.result.aliyunPath;
        this.showOpen = true;
      }
    });
  }
  delOpen() {
    //开户信息删除
    this.open = {};
    this.value = '';
    (<any>this.$refs).fileOpen.value = '';
    this.showOpen = false;
  }
}
