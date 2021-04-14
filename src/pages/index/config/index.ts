export interface Filter {
  type: string
  name: string
  options: Option[]
}

export interface Option {
  label: string
  value: any,
  id?: string;
  insType?: string;
  level?: string;
  name?: string;
  tagId?: string[];
  checked?: boolean
}

export const filterList: Filter[] = [
  {
    type: 'type',
    name: '险种类目',
    options: [
      {label: '不限',value: '0', checked: true},
      {label: '重疾险',value: '1', checked: false},
      {label: '意外险',value: '4', checked: false},
      {label: '医疗险',value: '3', checked: false},
      {label: '年金险',value: '5', checked: false},
      {label: '寿险',value: '2', checked: false},
      {label: '防癌险',value: '6', checked: false},
    ]
  },
  {
    type: 'companyId',
    name: '保险公司',
    options: [
      {label: '不限',value: '0', checked: true},
    ]
  },
  {
    type: 'ageId',
    name: '投保年龄',
    options: [
      {label: '不限',value: '0'},
      {label: '儿童（0-17岁）',value: '1', checked: true},
      {label: '成人（18-60岁）',value: '2', checked: false},
      {label: '老人（60岁以上）',value: '3', checked: false},
    ]
  },
]


/** 各种保险对应的个性化条件, 保险对应 value 作为 key */
/** 寿险跟防癌险里边的保障期限 终身/一年期 id还没有找到   */
/**
 *  不限的产品特色传的是ids的值
 */
export const conditionMap: Record<string|number, Filter[]> = {
  // 无限
  0: [{
    type: 'tagName',
    name: '产品特色',
    options: [
      {label: '不限',value: '', checked: true},
      {label: '高性价比',value: '高性价比', checked: false},
      {label: '智能核保',value: '智能核保',checked: false},
      {label: '消费型',value: '消费型', checked: false},
      {label: '高危职业',value: '高危职业',checked: false},
    ]
  }],
  // 重疾险 1
  1: [
    {
      type: 'tagName',
      name: '产品特色',
      options: [
        {label: '不限',value: '', checked: true},
        {label: '高性价比',value: '721', checked: false},
        {label: '消费型',value: '722', checked: false},
        {label: '儿童疾病',value: '723', checked: false},
        {label: '多次赔付',value: '724', checked: false},
        {label: '智能核保',value: '725', checked: false},
        {label: '投保人豁免',value: '726', checked: false},
        {label: '高危职业',value: '727', checked: false},
        {label: '返还保费',value: '728', checked: false},
        {label: '中症保障',value: '729', checked: false},
      ]
    },
    {
      type: 'insProductTagIds',
      name: '保障期限',
      options: [
        {label: '不限',value: '', checked: true},
        {label: '1年',value: '72', checked: false},
        {label: '20年',value: '73', checked: false},
        {label: '30年',value: '74', checked: false},
        {label: '至60岁',value: '75', checked: false},
        {label: '至70岁',value: '76', checked: false},
        {label: '至80岁',value: '77', checked: false},
        {label: '终身',value: '78', checked: false},
      ]
    },
  ],
  // 意外险 4
  4: [{
    type: 'tagName',
    name: '产品特色',
    options: [
      {label: '不限',value: '', checked: true},
      {label: '综合意外',value: '721', checked: false},
      {label: '交通意外额外赔付',value: '722', checked: false},
      {label: '高危职业',value: '723', checked: false},
      {label: '保猝死',value: '724', checked: false},
      {label: '高性价比',value: '725', checked: false},
      {label: '0免赔',value: '726', checked: false},
      {label: '住院津贴',value: '727', checked: false},
      {label: '返还保费',value: '728', checked: false},
      {label: '消费型',value: '729', checked: false},
    ]
  }],
  // 医疗 3
  3: [{
    type: 'tagName',
    name: '产品特色',
    options: [
      {label: '不限',value: '', checked: true},
      {label: '百万医疗',value: '721', checked: false},
      {label: '消费型',value: '722', checked: false},
      {label: '保证续保',value: '723', checked: false},
      {label: '就医绿通',value: '724', checked: false},
      {label: '智能核保',value: '725', checked: false},
      {label: '高性价比',value: '726', checked: false},
      {label: '小额医疗',value: '727', checked: false},
      {label: '癌症医疗',value: '728', checked: false},
      {label: '不限社保',value: '729', checked: false},
      {label: '0免赔',value: '730', checked: false},
    ]
  }],
  // 年金 5
  5: [{
    type: 'tagName',
    name: '产品特色',
    options: [
      {label: '不限',value: '', checked: true},
      {label: '教育金',value: '721', checked: false},
      {label: '养老金',value: '722', checked: false},
      {label: '高流动性',value: '723', checked: false},
      {label: '投保门槛低',value: '724', checked: false},
      {label: '领钱时间早',value: '725', checked: false},
      {label: '有分红',value: '726', checked: false},
      {label: '保证领取',value: '727', checked: false},
      {label: '万能账户',value: '728', checked: false},
      {label: '万能保底高',value: '729', checked: false},
      {label: '养老社区',value: '730', checked: false},
    ]
  }],
  // 寿险 2
  2: [
    {
      type: 'tagName',
      name: '产品特色',
      options: [
        {label: '不限',value: '', checked: true},
        {label: '全残保障',value: '721', checked: false},
        {label: '高危职业',value: '722', checked: false},
        {label: '免责少',value: '723', checked: false},
        {label: '消费型',value: '724', checked: false},
      ]
    },
    {
      type: 'insProductTagIds',
      name: '保障期限',
      options: [
        {label: '不限',value: '', checked: true},
        {label: '定期寿险',value: '57', checked: false},
        {label: '终身寿险',value: '58', checked: false},
        {label: '一年期寿险',value: '59', checked: false},
      ]
    },
  ],
  // 防癌 6
  6: [
    {
      type: 'tagName',
      name: '产品特色',
      options: [
        {label: '不限',value: '', checked: true},
        {label: '保原位癌',value: '721', checked: false},
        {label: '多次赔付',value: '722', checked: false},
        {label: '特定癌症额外赔',value: '723', checked: false},
        {label: '保费豁免',value: '724', checked: false},
        {label: '高性价比',value: '725', checked: false},
        {label: '高危职业',value: '726', checked: false},
        {label: '消费型',value: '727', checked: false},
      ]
    },
    {
      type: 'insProductTagIds',
      name: '保障期限',
      options: [
        {label: '不限',value: '', checked: true},
        {label: '定期保障',value: '57', checked: false},
        {label: '保障',value: '58', checked: false},
        {label: '一年期',value: '59', checked: false},
      ]
    },
  ],
}
