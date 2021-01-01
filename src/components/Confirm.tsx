import React from "react";
import "../styles/confirm.scss";
import { EnumServiceItem, EnumServiceItems } from "../interface/Enumservice";
import { ErrorTypes } from "../interface/ErrorType";

function Confirm(props: {
  buydata: [];
  error: ErrorTypes;
  newBuyData: EnumServiceItems | null | undefined;
  receiveData: EnumServiceItems | null | undefined;

  checking: (
    order: number,
    checkedData: EnumServiceItems | null | undefined
  ) => void;
  checkAll: (checkedData: EnumServiceItems | null | undefined) => void;
  checkBoolean: string;
  receiveProduct: (receivedData: EnumServiceItems | null | undefined) => void;
  happenError: (
    errorData: ErrorTypes,
    checkedData: EnumServiceItems | null | undefined
  ) => void;
  countBool: number;
}): React.ReactElement {
  return (
    <div className="Confirm">
      <section className="Confirm">
        <div className="requestContainer">
          <h2>구매 대상 확인</h2>
          <div className="requestCount">
            <span>
              전체
              {props.newBuyData?.length === undefined
                ? 0
                : props.newBuyData?.length +
                  (props.receiveData?.length === undefined
                    ? 0
                    : props.receiveData?.length)}
              /
            </span>
            <span>대기 {props.newBuyData?.length} /</span>
            <span>
              완료
              {props.receiveData?.length === 0 || undefined
                ? 0
                : props.receiveData?.length}
            </span>
          </div>

          <table>
            <tr>
              <th onClick={() => props.checkAll(props.newBuyData)}>
                {props.newBuyData != undefined &&
                props.countBool >= props.newBuyData?.length ? (
                  <img src="https://img.icons8.com/ios/15/000000/checked-checkbox--v1.png" />
                ) : (
                  <img src="https://img.icons8.com/ios/15/000000/unchecked-checkbox.png" />
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
                <tr
                  key={index}
                  className={el.active === "true" ? "marking" : ""}
                >
                  <td onClick={() => props.checking(index, props.newBuyData)}>
                    {el.active === "false" ? (
                      <img src="https://img.icons8.com/ios/15/000000/unchecked-checkbox.png" />
                    ) : (
                      <img src="https://img.icons8.com/ios/15/000000/checked-checkbox--v1.png" />
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
                    <span className="createdDate">
                      {el.created.slice(0, el.created.indexOf("T"))}
                    </span>
                  </td>
                  <td className="pending">
                    <span> 대기</span>
                  </td>
                  <td>
                    <input
                      disabled
                      type="text"
                      value={el.active === "true" ? `시리얼${el.serial}` : ""}
                    />

                    {el.serialActive === "true" ? (
                      <span className="serialErrorMent">
                        시리얼이 중복되었습니다.
                      </span>
                    ) : (
                      <span></span>
                    )}
                  </td>
                </tr>
              );
            })}
          </table>
          {props?.newBuyData?.length === 0 ? (
            <div className="noData">
              <img
                alt="nodata image"
                src="https://icon-library.com/images/no-data-icon/no-data-icon-10.jpg"
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
      <section className="buttonWrapper">
        <button
          className={
            props.newBuyData?.length === 0 ? "endButton" : "activeButton"
          }
          type="submit"
          onClick={() => props.receiveProduct(props.newBuyData)}
        >
          입고하기
        </button>
        <button
          type="submit"
          className={
            props.newBuyData?.length === 0 ? "endButton" : "activeButton"
          }
          onClick={() => props.happenError(props.error, props.buydata)}
        >
          오류발생시키기
        </button>
      </section>
    </div>
  );
}

export default Confirm;
