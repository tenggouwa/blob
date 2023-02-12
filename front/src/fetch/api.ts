// 配置简化转换
function conversion(url: string, method: 'post' | 'get') {
    return {
        url,
        method,
    }
}

// ajax通用配置
export default {
  // 理财币种列表
  fetchTest: conversion('/test', 'get'),
}
