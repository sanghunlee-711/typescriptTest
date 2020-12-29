import React from "react";
import "../styles/confirm.scss";

function Confirm(props: { buydata: []; error: []; newBuyData: [] }) {
  function checkFunction(): void {
    console.log(props.buydata);
    console.log(props.newBuyData);
  }

  // const lengthCalculator = (arr: []) => {
  //   const newLength: number = arr.length();
  //   return console.log(arr);
  // };

  return (
    <div className="Confirm">
      <section className="Confirm">
        <div className="requestContainer">
          <h2 onClick={checkFunction}>구매 대상 확인</h2>
          <div className="requestCount">
            <span> 전체 {props.newBuyData?.length}/</span>
            <span>대기 {props.newBuyData?.length} /</span>
            <span>완료 0</span>
          </div>

          <table>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>품목이름</th>
              <th>품목코드</th>
              <th>구매단가(VAT포함)</th>
              <th>구매입고일</th>
              <th>상태</th>
              <th>시리얼</th>
            </tr>
            {props.newBuyData.map((el, index) => {
              type dataType = {
                id: number;
                name: string;
                douzoneCode: string;
                quantity: number;
                unitPrice: number;
                totalPrice: number;
                isUsed: boolean;
                created: string;
                modified: string;
              };
              return (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    {el["isUsed" as keyof dataType] ? (
                      <span className="newOne">[신품]</span>
                    ) : (
                      <span className="oldOne">[중고]</span>
                    )}

                    {/* <span>
                      {el["isUsed" as keyof dataType] ? "신품" : "중고"}
                    </span> */}

                    <span>{el["name" as keyof dataType]}</span>
                  </td>
                  <td>
                    <span>{el["douzoneCode" as keyof dataType]}</span>
                  </td>
                  <td>
                    <span>{el["unitPrice" as keyof dataType]}</span>
                  </td>
                  <td>
                    <span>{el["unitPrice" as keyof dataType]}</span>
                  </td>
                  <td className="pending">
                    <span> 대기</span>
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
              );
            })}
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
