import React from "react";
import { useEffect, useState } from "react";
import "./Main.scss";
import Confirm from "./components/Confirm";
import Done from "./components/Done";
import Request from "./components/Request";

interface EnumServiceItem {
  created: string;
  douzoneCode: string;
  id: number;
  isUsed: boolean;
  modified: string;
  name: string;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
  active?: string;
  serial?: number;
  serialActive?: string;
  showSerial?: string;
}

interface ErrorType {
  [index: number]: { serial?: string };
}
type ErrorTypes = Array<ErrorType>;
type EnumServiceItems = Array<EnumServiceItem>;

function Main() {
  const [buydata, setBuydata] = useState<[]>([]);
  const [site, setSite] = useState<[]>([]);
  const [sitePartition, setSitePartition] = useState<[]>([]);
  const [error, setError] = useState<ErrorTypes>([]);
  const [newBuyData, setNewBuyData] = useState<
    EnumServiceItems | null | undefined
  >(null);
  const [checkBoolean, setCheckBoolean] = useState<string>("true");
  const [countBool, setCountBool] = useState<number>(0);
  const [receiveData, setReceiveData] = useState<
    EnumServiceItems | null | undefined
  >([]);

  //getData function
  function api(url: string, setDataType: string) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        if (setDataType === "buydata") {
          setBuydata(res.data);
          makeItemList(res.data);
        } else if (setDataType === "site") {
          setSite(res);
        } else if (setDataType === "sitePartition") {
          setSitePartition(res);
        } else if (setDataType === "error") {
          setError(res.data);
        } else {
          return;
        }
      });
  }
  useEffect(() => {
    const buydataUrl =
      "https://tpay-coding-test.s3.ap-northeast-2.amazonaws.com/data.json";

    const siteUrl =
      "https://tpay-coding-test.s3.ap-northeast-2.amazonaws.com/site.json";

    const sitePartitionUrl =
      " https://tpay-coding-test.s3.ap-northeast-2.amazonaws.com/sitePartition.json";

    const errorUrl =
      "https://tpay-coding-test.s3.ap-northeast-2.amazonaws.com/error.json";

    api(buydataUrl, "buydata");
    api(siteUrl, "site");
    api(sitePartitionUrl, "sitePartition");
    api(errorUrl, "error");
  }, []);

  function happenError(
    errorData: ErrorTypes,
    checkedData: EnumServiceItems | null | undefined
  ): void {
    const errorArray: EnumServiceItems | null = [];

    checkedData?.map((el, index) => {
      let i = 0;
      while (i < el.quantity) {
        const sampleEl: EnumServiceItem = JSON.parse(JSON.stringify(el)); //deep copy
        const sampleError: string | undefined = errorData[index + 1][i].serial;
        if (sampleError !== undefined) {
          //error
          sampleEl.serial = sampleEl.quantity + 1;
          sampleEl.active = "true";
          sampleEl.serialActive = "true";
          sampleEl.showSerial = "true";
          errorArray.push(sampleEl);
        } else {
          //not error
          sampleEl.serial = i + 1;
          sampleEl.active = "true";
          sampleEl.serialActive = "false";
          sampleEl.showSerial = "false";

          errorArray.push(sampleEl);
        }
        i += 1;
      }
    });
    setNewBuyData(errorArray);
  }

  function makeItemList(itemData: EnumServiceItems | null): void {
    const newData: EnumServiceItems | null = [];

    itemData?.map((el) => {
      let i = 0;

      while (i < el.quantity) {
        const sampleEl: EnumServiceItem = JSON.parse(JSON.stringify(el)); //deep copy

        sampleEl.active = "false";
        sampleEl.serialActive = "false";
        sampleEl.showSerial = "false";

        sampleEl.serial = i + 1;
        newData.push(sampleEl);
        i += 1;
      }
    });
    setNewBuyData(newData);
  }

  //checkFucntion
  function checking(
    order: number,
    checkedData: EnumServiceItems | null | undefined
  ): void {
    checkedData?.forEach((el, index) => {
      if (el.active === "true" && index === order) {
        //uncheck
        setNewBuyData(
          checkedData?.map((el, index) =>
            index === order && el.active === "true"
              ? {
                  ...el,
                  active: "false",
                  serialActive: "false",
                  showSerial: "false",
                }
              : el
          )
        );
        setCountBool(countBool - 1);
        setCheckBoolean(checkedData?.length <= countBool ? "false" : "true");
      } else if (el.active === "false" && index === order) {
        //recheck
        setNewBuyData(
          checkedData?.map((el, index) =>
            index === order && el.active === "false"
              ? {
                  ...el,
                  active: "true",
                  serialActive: "false",
                  showSerial: "false",
                }
              : el
          )
        );
        setCountBool(countBool + 1);
        setCheckBoolean(checkedData?.length <= countBool ? "false" : "true");
      }
    });
  }

  //checkAll function
  function checkAll(checkedData: EnumServiceItems | null | undefined): void {
    setCheckBoolean(checkBoolean === "true" ? "false" : "true");

    setNewBuyData(
      checkedData?.map((el) =>
        checkBoolean === "true"
          ? {
              ...el,
              active: "true",
              serialActive: "false",
              showSerial: "false",
            }
          : {
              ...el,
              active: "false",
              serialActive: "false",
              showSerial: "false",
            }
      )
    );
  }
  //receive function
  function receiveProduct(
    receivedData: EnumServiceItems | null | undefined
  ): void {
    const receivedArray: EnumServiceItems | null | undefined = [];
    const newshowData: EnumServiceItems | null | undefined = [];

    receivedData?.forEach((el) => {
      const testArr: EnumServiceItem | null | undefined = JSON.parse(
        JSON.stringify(el)
      );
      if (testArr?.active === "true" && testArr?.showSerial === "false") {
        receivedArray.push(testArr);
      }
      //구매완료 투입
      setReceiveData(receiveData?.concat(receivedArray));
    });

    receivedData?.forEach((el) => {
      const newOneArray: EnumServiceItem | null | undefined = JSON.parse(
        JSON.stringify(el)
      );
      if (
        newOneArray?.active === "false" ||
        newOneArray?.showSerial === "true"
      ) {
        newshowData.push(newOneArray);
      }
      //구매절차 데이터
      setNewBuyData(newshowData);
    });
  }

  return (
    <div className="Main">
      <Request site={site} sitePartition={sitePartition} />
      <Confirm
        buydata={buydata}
        error={error}
        newBuyData={newBuyData}
        checking={checking}
        checkAll={checkAll}
        checkBoolean={checkBoolean}
        receiveProduct={receiveProduct}
        receiveData={receiveData}
        happenError={happenError}
      />
      <Done receiveData={receiveData} />
    </div>
  );
}

export default Main;
