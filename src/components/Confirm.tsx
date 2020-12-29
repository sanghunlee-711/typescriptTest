import React from "react";
import { useEffect, useState } from "react";
import "../styles/confirm.scss";

function Confirm(prop: { buydata: [] }) {
  function checkFunction(): void {
    // console.log(buydata.map((el) => el.id));
    console.log(prop.buydata);

    prop.buydata.map((data) => {
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
    <div onClick={checkFunction} className="Confirm">
      <section className="Confirm">
        <div className="requestContainer">
          <h2>구매 대상 확인</h2>
          <div className="requestCount">
            <span> 전체 6 /</span>
            <span>대기 6 /</span>
            <span>완료 0</span>
          </div>

          <table>
            <th>
              <input type="checkbox" />
            </th>
            <th>품목이름</th>
            <th>품목코드</th>
            <th>구매단가(VAT포함)</th>
            <th>구매입고일</th>
            <th>상태</th>
            <th>시리얼</th>
            <tr>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <span>[신품]소형PC스피커(USB전원)</span>
              </td>
              <td>
                <span>ETDV3SPKDO7</span>
              </td>
              <td>
                <span>3,000원</span>
              </td>
              <td>
                <span> 입고일</span>
              </td>
              <td>
                <span> 대기</span>
              </td>
              <td>
                <input type="text" />
              </td>
            </tr>
          </table>
        </div>
      </section>
      <section className="buttonWrapper">
        <button type="submit">입고하기</button>
      </section>
    </div>
  );
}

export default Confirm;
