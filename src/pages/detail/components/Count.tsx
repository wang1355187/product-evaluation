import React from "react";
import { Text, View } from "@tarojs/components";
import {
  protectTimeDicData,
  maxPayTimeUnitDicData,
  baseHospitalUnitDicData,
} from "@/dicData";

export interface IProps {
  detailData: any;
}

const CounterNotLife: React.FC<IProps> = (props) => {
  const { detailData } = props;
  const {
    weappProductQuotaCalcs = [],
    weappProductCalcInfo = {},
    weappProduct,
    // weappProductMiHSs = [],
    insType,
  } = detailData;
  const { maxProtectTime, maxProtectTimeUnit, maxPayTime, maxPayTimeUnit } =
    weappProduct || {};
  // const {baseHospitalizationQuota, baseHospitalizationQuotaUnit} = (weappProductMiHSs || []).filter(v=>+v.hasHsQuota===1)[0] || {};
  const { quotaLimit, quotaUnit } = weappProductQuotaCalcs[0] || {};
  let data = weappProductQuotaCalcs.filter((v) => v.quota);
  let socialSecurity = [];
  // 医疗
  if (+insType === 3) {
    socialSecurity = data.filter((v) => v.socialSecurity === "1");
    data = socialSecurity.length > 0 ? socialSecurity : data;
  }
  const man = data.filter((v) => v.sex === "0");
  const woman = data.filter((v) => v.sex === "1");
  const list = man.map((v, index) => {
    return {
      age: v.age,
      woman: woman[index]?.quota || "/",
      man: v.quota || "/",
    };
  });
  const counterMap = {
    1: `50万保额，保${maxProtectTime || ""}${
      protectTimeDicData[maxProtectTimeUnit]
    }，${maxPayTime}${maxPayTimeUnitDicData[maxPayTimeUnit]}交费`,
    3: `${quotaLimit}${baseHospitalUnitDicData[quotaUnit]}保额，${
      socialSecurity.length ? "有" : "无"
    }社保`,
    4: `普通用户`,
    5: "正在计算",
    6: `10万保额，${maxProtectTime}${protectTimeDicData[maxProtectTimeUnit]}，${maxPayTime}${maxPayTimeUnitDicData[maxPayTimeUnit]}`,
  };
  return (
    <View className="u-counter">
      <Text className="u-counter-text">计算标准：{counterMap[+insType]}</Text>
      {weappProductCalcInfo.premiumDesc && (
        <Text className="u-counter-text">
          （保费说明：{weappProductCalcInfo.premiumDesc}）
        </Text>
      )}
      {list.length > 0 && (
        <View className="u-counter-table">
          <View className="u-counter-thead">
            <View className="th1">
              <Text>年龄</Text>
            </View>
            <View className="th2">
              <Text>首年保费（男）</Text>
            </View>
            <View className="th3">
              <Text>首年保费（女）</Text>
            </View>
          </View>

          {list.map((v) => {
            return (
              <View className="u-counter-trow" key={v.age}>
                <View className="td1">
                  <Text>{v.age}</Text>
                </View>
                <View className="td2">
                  <Text>{v.man}</Text>
                </View>
                <View className="td3">
                  <Text>{v.woman}</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const CounterLife: React.FC<IProps> = (props) => {
  const { detailData } = props;
  const {
    weappProductQuotaCalcs = [],
    weappProductCalcInfo = {},
    insType,
  } = detailData;
  const data = weappProductQuotaCalcs.filter((v) => v.quota);
  const ageMap = {};
  data.forEach((v) => {
    if (ageMap.hasOwnProperty(v.age)) {
      const current = ageMap[v.age];
      const last = current[current.length - 1];
      // 顺便排序
      if (v.quotaLimit < last.quotaLimit) {
        ageMap[v.age].unshift(v);
      } else {
        ageMap[v.age].push(v);
      }
    } else {
      ageMap[v.age] = [v];
    }
  });
  const list = Object.keys(ageMap).map((v) => ageMap[v]);
  return (
    <View className="u-counter">
      <Text className="u-counter-text">计算标准：20年交费</Text>
      {weappProductCalcInfo.premiumDesc && (
        <Text className="u-counter-text">
          （保费说明：{weappProductCalcInfo.premiumDesc}）
        </Text>
      )}
      <View className="u-counter-table">
        <View className="u-counter-thead">
          <View className="th1">
            <Text>年龄</Text>
          </View>
          {+insType !== 2 ? (
            <React.Fragment>
              <View className="th2">
                <Text>首年保费（男）</Text>
              </View>
              <View className="th2">
                <Text>首年保费（女）</Text>
              </View>
              <View className="th2">
                <Text>首年保费（男）</Text>
              </View>
              <View className="th3">
                <Text>首年保费（女）</Text>
              </View>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <View className="th2">
                <Text>首年保费</Text>
                <Text>(10万保额)</Text>
              </View>
              <View className="th2">
                <Text>首年保费</Text>
                <Text>(20万保额)</Text>
              </View>
              <View className="th2">
                <Text>首年保费</Text>
                <Text>(50万保额)</Text>
              </View>
              <View className="th3">
                <Text>首年保费</Text>
                <Text>(100万保额)</Text>
              </View>
            </React.Fragment>
          )}
        </View>

        {list.map((v, index) => {
          const item = v.sort((a, b) => {
            if (a.quotaLimit - b.quotaLimit === 0) {
              return a.sex - b.sex;
            }
            return 0;
          });
          return (
            <View className="u-counter-trow" key={"list" + index}>
              <View className="td1">
                <Text>{item[0] ? item[0].age : ""}</Text>
              </View>
              <View className="td2">
                <Text>{item[0] ? item[0].quota : "/"}</Text>
              </View>
              <View className="td2">
                <Text>{item[1] ? item[1].quota : "/"}</Text>
              </View>
              <View className="td2">
                <Text>{item[2] ? item[2].quota : "/"}</Text>
              </View>
              <View className="td3">
                <Text>{item[3] ? item[3].quota : "/"}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const Counter: React.FC<IProps> = (props) => {
  const { detailData = {} } = props;
  const { insType } = detailData;
  if (!insType) return <View></View>;
  return [2, 4].includes(+insType) ? (
    <CounterLife detailData={detailData}></CounterLife>
  ) : (
    <CounterNotLife detailData={detailData}></CounterNotLife>
  );
};

export default Counter;
