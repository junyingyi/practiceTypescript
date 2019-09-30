export const API: any = [
  {
    testUrl: '',
    service: 'api',
    test: false,
    interfaces: ['TokenAuth/Authenticate', 'TokenAuth/ExternalAuthenticate'],
  },
  {
    testUrl: '',
    service: 'api/services/app',
    test: false,
    interfaces: [
      'Supplier/SupplierRegister',
      'Sms/RegSendSms',
      'Upload/UploadFile',
      'Supplier/CreateSupplierBaseInfo',
      'Supplier/QuerySupplierBaseInfo',
      'Sms/SendSMSCode',
      'Supplier/GetCategories',
      'Supplier/CreateOrUpdateBrandCtg',
      'Supplier/QueryBrandCtg',
      'Supplier/QueryAllStatus',
      'Supplier/ActivateAccount',
      'Supplier/UpdateSupplierBaseInfo',
      'Supplier/SendEmailCode',
      'Supplier/QueryAccount',
      'Supplier/SignProtocol',
      'Supplier/PaymentAmount',
      'Supplier/SendRegSms',
      'WebMessageText/GetAllMsg',
      'WebMessageText/ReadMsg',
      'WebMessageText/QueryNoRead',
      'WebMessageText/GetAll',
      'WebMessageText/Create',
      'Supplier/QueryProtocol',
      'Supplier/QueryAmountInfo',
      'Supplier/SendSmsByType',
    ],
  },
];

export const HOST: string =
  process.env.VUE_APP_EVN === 'production' ? 'https://yyb.vpclub.cn/pc' : 'https://yyb.vpclub.cn/pc';
// process.env.VUE_APP_EVN === 'production' ? 'https://yyb.vpclub.cn/pc' : 'http://172.16.10.51:5003';
