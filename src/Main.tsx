import React from "react";
import { useEffect, useState } from "react";
import "./styles/Main.scss";
import Confirm from "./components/Confirm";
import Done from "./components/Done";
import Request from "./components/Request";
import { EnumServiceItem, EnumServiceItems } from "./interface/Enumservice";
import { ErrorTypes } from "./interface/ErrorType";

function Main(): React.ReactElement {
  const [buydata, setBuydata] = useState<[]>([]);
  const [site, setSite] = useState<[]>([]);
  const [sitePartition, setSitePartition] = useState<[]>([]);
  const [error, setError] = useState<ErrorTypes>([]);
  const [newBuyData, setNewBuyData] = useState<
    EnumServiceItems | null | undefined
  >(null);
  const [countBool, setCountBool] = useState<number>(0);
  const [receiveData, setReceiveData] = useState<
    EnumServiceItems | null | undefined
  >([]);

  //getData function
  function api(url: string, setDataType: string) {
    const BASE_URL = "http://localhost:3000/";
    return fetch(BASE_URL + url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error(response.statusText);
        // }
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
        console.log(
          "fetch",
          fetch("./data/data.json")
            .then((res) => res.json())
            .then((res) => console.log("dataddata", res.data))
        );
      });
  }
  useEffect(() => {
    const buydataUrl = "data/data.json";

    const siteUrl = "data/site.json";

    const sitePartitionUrl = "data/sitePartition.json";

    const errorUrl = "data/error.json";

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

    if (receiveData?.length != undefined && receiveData?.length >= 1) {
      alert("완료분을 제거 후 다시 발생시켜주세요 [새로고침이 실행 됩니다]");

      return window.location.reload();
    }
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
      }
    });
  }

  //checkAll function
  function checkAll(
    checkedData: EnumServiceItems | null | undefined,
    countBool: number
  ): void {
    if (checkedData && countBool === checkedData?.length) {
      setCountBool(0);
    } else {
      setCountBool(Number(checkedData?.length));
    }

    setNewBuyData(
      checkedData?.map((el) =>
        checkedData && countBool !== checkedData?.length
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
    setCountBool(Number(newBuyData?.length));
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
        receiveProduct={receiveProduct}
        receiveData={receiveData}
        happenError={happenError}
        countBool={countBool}
      />
      <Done receiveData={receiveData} />
    </div>
  );
}

export default Main;
