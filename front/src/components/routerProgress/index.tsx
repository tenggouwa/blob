import React, { useEffect, useLayoutEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const RouterProgress = () => {
  useLayoutEffect(() => {
    NProgress.start();
  })
  useEffect(() => {
    NProgress.done();
  }, [])
  return <></>
}

export default RouterProgress;
