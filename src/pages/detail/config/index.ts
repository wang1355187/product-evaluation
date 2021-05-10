export const ProductPatchMap = {
  '1': {
    key: 'productSiPatch',
    options: [
      {label: '投保年龄', key: 'insuredAge'},
      {label: '职业要求', key: 'insuredJobType'},
      {label: '重疾赔付', key: 'reparationTimes'},
      {label: '中症保障', key: 'hasMid'},
      {label: '智能核保', key: 'smartUnderwriting'},
      {label: '被保人豁免', key: 'insuredExoneration'},
    ]
  },
  '2': {
    key: 'productLifePatch',
    options: [
      {label: '投保年龄', key: 'insuredAge'},
      {label: '职业要求', key: 'insuredJobType'},
      {label: '最高保额', key: 'maxQuota'},
      {label: '等待期', key: 'waitTime'},
      {label: '健康告知', key: 'healthInformation'},
      {label: '是否吸烟', key: 'smoking'},
    ]
  },
  '3': {
    key: 'productMedicalPatch',
    options: [
      {label: '投保年龄', key: 'insuredAge'},
      {label: '一般住院保额', key: 'baseHospitalizationQuota'},
      {label: '一般免赔额', key: 'hospitalDeductible'},
      {label: '重疾住院保额', key: 'siHospitalizationQuota'},
      {label: '重疾免赔额', key: 'siHospitalDeductible'},
      {label: '保证续保期', key: 'guaranteedRenewalPeriod'},
    ]
  },
  '4': {
    key: 'productAccidentPatch',
    options: [
      {label: '投保年龄', key: 'insuredAge'},
      {label: '职业要求', key: 'insuredJobType'},
      {label: '报销范围', key: 'reimbursementRange'},
      {label: '报销比例', key: 'reimbursementRatio'},
      {label: '免赔额', key: 'deductible'},
      {label: '住院津贴', key: 'accidentalHospitalizationAllowance'},
    ]
  },
  '5': {
    key: '',
    options: []
  },
  '6': {
    key: 'productAcPatch',
    options: [
      {label: '投保年龄', key: 'insuredAge'},
      {label: '癌症保额', key: 'cancerInsurance'},
      {label: '原位癌保额', key: 'cancerInSituCoverage'},
      {label: '特定癌症保额', key: 'specificCancerCoverage'},
      {label: '癌症多次赔付', key: 'multipleClaimsForCancer'},
      {label: '身故', key: 'deathCustomize'},
    ]
  },
}