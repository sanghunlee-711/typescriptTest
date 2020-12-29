import React from "react";
import { useEffect, useState } from "react";
import "./Main.scss";
import Confirm from "./components/Confirm";
import Done from "./components/Done";
import Request from "./components/Request";

function Main() {
  const [buydata, setBuydata] = useState<[]>([]);
  const [site, setSite] = useState<[]>([]);
  const [sitePartition, setSitePartition] = useState<[]>([]);
  const [error, setError] = useState<[]>([]);
  const [newBuyData, setNewBuyData] = useState<[]>([]);

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

  function makeItemList(itemData: []): void {
    const newData: [] = [];

    itemData.map((el) => {
      type dataType = {
        quantity: number;
      };

      for (let i = 0; i < el["quantity" as keyof dataType]; i++) {
        newData.push(el);
      }
      console.log("newData", newData);
    });
    return setNewBuyData(newData);
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
    // makeItemList(buydata);
  }, []);

  function checkFunction(): void {
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
    console.log(newBuyData);
  }

  return (
    <div className="Main">
      {/* 기본정보 */}
      <Request site={site} sitePartition={sitePartition} />
      {/* 구매 대상 확인 */}
      <Confirm buydata={buydata} error={error} newBuyData={newBuyData} />
      {/* 구매완료 */}
      <Done />
    </div>
  );
}

export default Main;

{
  /* {buydata.map(function (data: any) {
        type dataType = {
          created: string;
          douzoneCode: string;
          id: number;
          isUsed: boolean;
          modified: string;
          name: string;
          quantity: number;
          totalPrice: number;
          unitPrice: number;
        };
        return <span>{data["totalPrice" as keyof dataType]}</span>;
      })} */
}
