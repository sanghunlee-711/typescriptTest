import React from "react";
import { useEffect, useState } from "react";

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
}

type EnumServiceItems = Array<EnumServiceItem>;

function Done(props: { receiveData: EnumServiceItems | null | undefined }) {
  return (
    <div className="Done">
      <section className="Confirm">
        <div className="requestContainer">
          <h2>구매완료</h2>

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
            <th>이력</th>

            {props?.receiveData?.map((el: EnumServiceItem, index) => {
              return (
                <tr key={index}>
                  <td>
                    {el.active === "false" ? (
                      <div>notCheck</div>
                    ) : (
                      <div>Check</div>
                    )}
                  </td>
                  <td>
                    {el.isUsed ? (
                      <span className="newOne">[신품]</span>
                    ) : (
                      <span className="oldOne">[중고]</span>
                    )}
                    <span>{el.name}</span>
                  </td>
                  <td>
                    <span>{el.douzoneCode}</span>
                  </td>
                  <td>
                    <span>{el.unitPrice}</span>
                  </td>
                  <td>
                    <span>{el.unitPrice}</span>
                  </td>
                  <td className="pending">
                    <span>완료</span>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={el.active === "true" ? `시리얼${el.serial}` : ""}
                    />
                  </td>
                  <td>:</td>
                </tr>
              );
            })}
          </table>
        </div>
        <div className="buttonWrapper">
          <button type="submit">되돌리기</button>
        </div>
      </section>
    </div>
  );
}

export default Done;
