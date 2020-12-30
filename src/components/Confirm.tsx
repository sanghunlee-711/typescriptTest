import React from "react";
import "../styles/confirm.scss";

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

function Confirm(props: {
  buydata: [];
  error: [];
  newBuyData: EnumServiceItems | null | undefined;
  checking: (
    order: number,
    checkedData: EnumServiceItems | null | undefined
  ) => void;
  checkAll: (checkedData: EnumServiceItems | null | undefined) => void;
  checkBoolean: string;
}) {
  return (
    <div className="Confirm">
      <section className="Confirm">
        <div className="requestContainer">
          <h2>구매 대상 확인</h2>
          <div className="requestCount">
            <span> 전체 {props.newBuyData?.length}/</span>
            <span>대기 {props.newBuyData?.length} /</span>
            <span>완료 0</span>
          </div>

          <table>
            <tr>
              <th onClick={() => props.checkAll(props.newBuyData)}>
                <input type="checkbox" />
                {props.checkBoolean === "true" ? (
                  <div>AllCheck</div>
                ) : (
                  <div>NOTCHECK</div>
                )}
              </th>
              <th>품목이름</th>
              <th>품목코드</th>
              <th>구매단가(VAT포함)</th>
              <th>구매입고일</th>
              <th>상태</th>
              <th>시리얼</th>
            </tr>
            {props?.newBuyData?.map((el: EnumServiceItem, index) => {
              return (
                <tr key={index}>
                  <td onClick={() => props.checking(index, props.newBuyData)}>
                    <input type="checkbox" />
                    {el.active === "false" ? (
                      <div>Hello</div>
                    ) : (
                      <div>Yellow</div>
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
                    <span> 대기</span>
                  </td>
                  <td>
                    <input type="text" value={el.unitPrice} />
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
