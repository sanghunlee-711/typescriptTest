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
}

type EnumServiceItems = Array<EnumServiceItem>;

function Main() {
  const [buydata, setBuydata] = useState<[]>([]);
  const [site, setSite] = useState<[]>([]);
  const [sitePartition, setSitePartition] = useState<[]>([]);
  const [error, setError] = useState<[]>([]);
  const [newBuyData, setNewBuyData] = useState<
    EnumServiceItems | null | undefined
  >(null);
  const [checkBoolean, setCheckBoolean] = useState<string>("true");
  const [countBool, setCountBool] = useState<number>(0);
  const [receiveData, setReceiveData] = useState<
    EnumServiceItems | null | undefined
  >(null);
  // const [user, setUser] = useState<UserData | null>(null);

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

  function makeItemList(itemData: EnumServiceItems | null): void {
    const newData: EnumServiceItems | null = [];
    itemData?.map((el) => {
      for (let i = 0; i < el.quantity; i++) {
        el.active = "false";
        console.log("EL", el);
        newData.push(el);
      }
    });
    return setNewBuyData(newData);
  }

  //checkFucntion
  function checking(
    order: number,
    checkedData: EnumServiceItems | null | undefined
  ): void {
    checkedData?.forEach((el, index) => {
      if (el.active === "true" && index === order) {
        setNewBuyData(
          checkedData?.map((el, index) =>
            index === order && el.active === "true"
              ? { ...el, active: "false" }
              : el
          )
        );
        setCountBool(countBool - 1);
        setCheckBoolean(checkedData?.length <= countBool ? "false" : "true");
        console.log(checkedData?.length);
        console.log(countBool);
      } else if (el.active === "false" && index === order) {
        setNewBuyData(
          checkedData?.map((el, index) =>
            index === order && el.active === "false"
              ? { ...el, active: "true" }
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
          ? { ...el, active: "true" }
          : { ...el, active: "false" }
      )
    );
  }
  //receive function
  function receiveProduct(
    receivedData: EnumServiceItems | null | undefined
  ): void {
    setReceiveData(receivedData);
    setNewBuyData([]);
  }

  function checkFunction(num: number): void {
    // console.log(buydata, site, sitePartition, error);

    // buydata.map((data) => {
    //   type dataType = {
    //     created: string;
    //     douzoneCode: string;
    //     id: number;
    //     isUsed: boolean;
    //     modified: string;
    //     name: string;
    //     quantity: number;
    //     totalPrice: number;
    //     unitPrice: number;
    //   };

    //   console.log(data["totalPrice" as keyof dataType]);
    // });
    console.log(error);
  }

  return (
    <div className="Main">
      {/* 기본정보 */}
      <Request site={site} sitePartition={sitePartition} />
      {/* 구매 대상 확인 */}
      <Confirm
        buydata={buydata}
        error={error}
        newBuyData={newBuyData}
        checking={checking}
        checkAll={checkAll}
        checkBoolean={checkBoolean}
        receiveProduct={receiveProduct}
        receiveData={receiveData}
      />
      {/* 구매완료 */}
      <Done receiveData={receiveData} />
    </div>
  );
}

export default Main;
