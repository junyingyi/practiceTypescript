import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class Header extends Vue {
  @Prop() private position!: string;
}
