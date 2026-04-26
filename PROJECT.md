# 灵山公交小程序 - 项目记录

## 项目路径
`D:\study\python\lingshan-bus\miniprogram`

## 已完成功能
1. 公交线路查询（16条线路）
2. 搜索线路/站点
3. 城区/城乡分类筛选
4. 线路详情页（站点时间轴）
5. 双向首末班时间（不同时间）
6. 到站时间实时计算

## 数据结构
```javascript
{
  id: "3路",
  type: "城区",
  start: "建材市场",
  end: "职校",
  time: "06:00-21:00",      // 正向首末班
  timeBackward: "06:20-21:00", // 反向首末班
  interval: "15分钟",
  price: "0元",
  duration: "40分钟",
  stations: [{name: "站名", duration: 分钟}]
}
```

## 关键页面
- pages/index/index - 首页
- pages/bus/bus - 线路列表
- pages/detail/detail - 线路详情
- pages/list/list - 备用列表
- utils/bus_data.js - 公交数据

## 待完成/测试中
- 双向到站时间计算验证完成 ✅
- 样式调整（list/bus页面居中）✅