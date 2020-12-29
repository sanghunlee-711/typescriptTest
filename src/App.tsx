import React from "react";
import { useEffect, useState } from "react";
import "./App.scss";

function App() {
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
    // console.log(buydata.map((el) => el.id));
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
    <div className="App">
      <span>Hello WOrld!</span>
      <h2>구매요청</h2>
      {buydata.map(function (data) {
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
      })}
      <h2>구매 대상 확인</h2>
      <h2>구매 완료</h2>
    </div>
  );
}

export default App;
