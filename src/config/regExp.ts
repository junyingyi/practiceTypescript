export const regExp = {
  figure: /^\+?[1-9][0-9]*$/, //大于0的正整数

  phone: /^1[3-9]\d{9}$/,

  len6: /^[\s\S]{0,6}$/,

  email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,

  url: /^(http:\/\/|^https:\/\/|^\/\/)((\w|=|\?|\.|\/|&|-)+)/,

  moneyFormat: /^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/, //非负小数

  min0: /^[+]?[\d]+(([\.]{1}[\d]+)|([\d]*))$/,

  min0Float: /^(0\.[1-9]{1,2}|0\.0[1-9]{1}|0\.[1-9]{1}0{0,1}|[1-9]{0,8}|[1-9]\d{0,8}(\.+\d{1,2})?)$/, //大于0的任意整数或小数，小数位不超过2个

  min1: /^\+?[1-9][0-9]*$/,

  max2: /^(0|[1-9][0-9]*)+(.[0-9]{1,2})?$/, //非零开头的最多带两位小数的数字

  maxDecimals2: /^([0-9]*)+(.[0-9]{1,2})?$/, //非零开头的最多带两位小数的数字

  maxdigital2: /^([1-9][0-9]{0,1})$/, //最多2位正整数

  maxdigital1: /^[0-9]$/, //最多1位正整数

  integer: /^[0-9]*[1-9][0-9]*$/,

  zeroNoZero: /^(0|[1-9][0-9]*)$/, //零和非零开头的数字

  integers: /^[0-9]*[0-9][0-9]*$/,

  password: /^(?=.*?[A-Za-z]+)(?=.*?[0-9]+)(?=.*?[A-Za-z]).{8,16}$/,

  strongPassword: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{6,16}$/, //要求大小写字母数字特殊符号四选三

  // strongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,20}/,  //至少1个大写字母，1个小写字母，1个数字和1个特殊字符

  approvalStatus: /(2|3)/,

  // pullParams: /^([1-9]*)$/,
  pullParams: /^[1-9]\d*$/,

  singular: /^(\d|10)?$/,

  identity: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,

  numOrWordLimit: /^[A-Za-z0-9]{3,32}$/, // 英文或数字，3-32之间

  numOrWord: /^[A-Za-z0-9]*$/, // 英文或数字，3-32之间

  exist: /^./g, // 匹配是否有值 - '' []

  timeStr: /^((0\d{1})|([1-9]\d{0,})):[0-5]\d:[0-5]\d$/,
  numChar8: /(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/, //不少于8位的必须包括数字和字母
  specialChar: /^[^#%&*!@$^\/|:<>?\"]*$/,

  fourtext: /^[^。]([^。]*。?){0,3}[^。]*[^。]+$/, //包含3个句号（不判断结尾是否为句号）
  // 号码段或手机号
  telOrPhone: /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/,

  numTwo: /(^\d?[1-9]{1}$)|(^[1-9]{1}\d?$)/,
};
