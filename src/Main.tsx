import React from "react";
import { useEffect, useState } from "react";
import "./Main.scss";
import Confirm from "./components/Confirm";
import Done from "./components/Done";
import Request from "./components/Request";
import { JsxEmit } from "typescript";

function Main() {
  const [buydata, setBuydata] = useState<[]>([]);

  //getData function
  function api(url: string) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => setBuydata(res.data));
  }

  useEffect(() => {
    const url =
      "https://tpay-coding-test.s3.ap-northeast-2.amazonaws.com/data.json";
    api(url);
  }, []);

  function checkFunction(): void {
    console.log(buydata);

    buydata.map((data) => {
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

      console.log(data["totalPrice" as keyof dataType]);
    });
  }

  return (
    <div className="Main">
      {/* 구매요청 */}
      <Request />
      {/* 구매 대상 확인 */}
      <Confirm buydata={buydata} />
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
