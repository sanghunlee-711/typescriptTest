import React from "react";
import { useEffect, useState } from "react";

function Done() {
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
              <td>
                <button></button>
              </td>
            </tr>
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
