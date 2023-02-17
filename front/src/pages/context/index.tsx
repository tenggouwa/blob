import React from "react";
import './index.scss';

const List = new Array(20).fill(undefined);
const SideBar = () => {
  return (
    <ul className="sideBar">
      {
        List.map((item, index) => (
          <li>书签{index}</li>
        ))
      }
    </ul>
  )
}

const Container = () => {
  return (
    <div className="container">container</div>
  )
}

export default function SelfContext() {
  return (
    <div className="main">
      <SideBar />
      <Container />
    </div>
  )
}