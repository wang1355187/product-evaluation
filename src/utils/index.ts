export const getInsuredJobType = (type: number | string) => {
  const map = {
    0: '不限职业',
    8: '除高危职业',
    10: '5-6类',
    11: '以投保为准'
  }
  return map[type] || `1${type!==1?`-${type}类`:''}`
}

/** 去掉 object 中 空值 | 空数组 的 key */
export const removeEmptyKey = (obj: object): void => {
  if (!obj || typeof obj !== 'object') { return; }
  Object.keys(obj).forEach((key) => {
    const v = obj[key];
    if (v === '' || v.length === 0) {
      delete obj[key];
    }
  });
};
