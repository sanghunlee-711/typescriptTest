import React from "react";
import "../styles/request.scss";
import { useEffect, useState } from "react";

function Reqeust(props: { site: []; sitePartition: [] }) {
  return (
    <section className="Reqeust">
      <div className="requestContainer">
        <h2>구매요청</h2>
        <table>
          <th>기본정보</th>
          <tr>
            <td>
              <span>*</span>구매요청자
            </td>
            <td className="inputArea">
              <input className="buyRequire" type="text" placeholder="이상훈" />
            </td>
            <td>
              <span>*</span>지사
            </td>
            <td className="inputArea">
              <select className="site" name="site">
                {props.site.map(function (el) {
                  type dataType = {
                    id: number;
                    name: string;
                  };
                  return (
                    <option
                      key={el["id" as keyof dataType]}
                      value={el["id" as keyof dataType]}
                    >
                      {el["name" as keyof dataType]}
                    </option>
                  );
                })}
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <span>*</span>창고
            </td>
            <td className="inputArea">
              <select className="sitePartition" name="sitePartition">
                {props.sitePartition.map(function (el) {
                  type dataType = {
                    id: number;
                    name: string;
                  };
                  return (
                    <option
                      key={el["id" as keyof dataType]}
                      value={el["id" as keyof dataType]}
                    >
                      {el["name" as keyof dataType]}
                    </option>
                  );
                })}
              </select>
            </td>
            <td>
              <span>*</span>구매희망일
            </td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr className="memo">
            <td>메모</td>
            <td colSpan="3" align="center" className="inputArea">
              <textarea></textarea>
            </td>
          </tr>
        </table>
      </div>
    </section>
  );
}

export default Reqeust;
