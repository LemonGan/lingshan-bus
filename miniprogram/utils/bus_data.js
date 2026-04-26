// 灵山公交线路数据 - 含双向首末班时间
var lines = [
  {
    id: "3路",
    type: "城区",
    start: "建材市场",
    end: "职校",
    time: "06:00-21:00",
    timeBackward: "06:20-21:00",
    interval: "15分钟",
    price: "2元",
    duration: "40分钟",
    stations: [
      {name: "建材市场", duration: 0},
      {name: "柑子园", duration: 3},
      {name: "江南邮政", duration: 6},
      {name: "中医院", duration: 9},
      {name: "泰丰百货", duration: 12},
      {name: "步行街", duration: 15},
      {name: "红十字会", duration: 18},
      {name: "国鹏宾馆", duration: 21},
      {name: "南站", duration: 24},
      {name: "移动公司", duration: 27},
      {name: "教育局", duration: 30},
      {name: "交警大队", duration: 33},
      {name: "兴莱鞋厂", duration: 36},
      {name: "职校", duration: 40}
    ]
  },
  {
    id: "7路",
    type: "城区",
    start: "新院村委",
    end: "二医院",
    time: "06:00-21:00",
    timeBackward: "06:00-21:00",
    interval: "20分钟",
    price: "2元",
    duration: "45分钟",
    stations: [
      {name: "新院村委", duration: 0},
      {name: "新洲中学", duration: 20},
      {name: "南站", duration: 25},
      {name: "国鹏宾馆", duration: 30},
      {name: "江南邮政", duration: 39},
      {name: "二医院", duration: 45}
    ]
  },
  {
    id: "101路",
    type: "城区",
    start: "鹏大汽车城",
    end: "园丰牧业",
    time: "08:00-23:30",
    timeBackward: "08:00-23:30",
    interval: "12分钟",
    price: "2元",
    duration: "55分钟",
    stations: [
      {name: "鹏大汽车城", duration: 0},
      {name: "灵山职校", duration: 5},
      {name: "交警大队", duration: 11},
      {name: "华源大厦", duration: 14},
      {name: "教育局", duration: 17},
      {name: "中国移动", duration: 20},
      {name: "汽车南站", duration: 23},
      {name: "步行街", duration: 35},
      {name: "中医院", duration: 41},
      {name: "园丰牧业", duration: 55}
    ]
  },
  {
    id: "102路",
    type: "城区",
    start: "汽车南站",
    end: "洲塘村",
    time: "08:00-23:30",
    timeBackward: "08:00-23:30",
    interval: "15分钟",
    price: "2元",
    duration: "30分钟",
    stations: [
      {name: "汽车南站", duration: 0},
      {name: "步行街", duration: 9},
      {name: "中医院", duration: 18},
      {name: "新洲中学", duration: 22},
      {name: "洲塘村", duration: 30}
    ]
  },
  {
    id: "106路",
    type: "城区",
    start: "大琴垌小学",
    end: "华源大厦",
    time: "08:00-23:30",
    timeBackward: "08:00-23:30",
    interval: "15分钟",
    price: "2元",
    duration: "42分钟",
    stations: [
      {name: "大琴垌小学", duration: 0},
      {name: "步行街", duration: 30},
      {name: "六峰山", duration: 33},
      {name: "汽车南站", duration: 38},
      {name: "教育局", duration: 40},
      {name: "华源大厦", duration: 42}
    ]
  },
  {
    id: "618路",
    type: "城区",
    start: "新中医院",
    end: "独岭村",
    time: "06:00-18:30",
    timeBackward: "06:00-18:30",
    interval: "25分钟",
    price: "2元",
    duration: "50分钟",
    stations: [
      {name: "新中医院", duration: 0},
      {name: "湘桂广场", duration: 8},
      {name: "六峰山大门", duration: 24},
      {name: "灵山中学", duration: 32},
      {name: "独岭村", duration: 50}
    ]
  },
  {
    id: "210路",
    type: "城乡",
    start: "烟墩政府",
    end: "外国语学校",
    time: "06:48-17:23",
    timeBackward: "07:10-17:45",
    interval: "25分钟",
    price: "2-8元",
    duration: "20分钟",
    stations: [
      {name: "烟墩政府", duration: 0},
      {name: "勒菜路口", duration: 10},
      {name: "外国语学校", duration: 20}
    ]
  },
  {
    id: "502路",
    type: "城乡",
    start: "太平镇",
    end: "园丰牧业",
    time: "06:30-18:10",
    timeBackward: "07:00-18:40",
    interval: "30分钟",
    price: "2-19.9元",
    duration: "65分钟",
    stations: [
      {name: "太平镇", duration: 0},
      {name: "三隆", duration: 35},
      {name: "交通局", duration: 55},
      {name: "园丰牧业", duration: 65}
    ]
  },
  {
    id: "601路",
    type: "城乡",
    start: "新妇幼保健院",
    end: "睦村",
    time: "07:59-17:33",
    timeBackward: "07:30-17:00",
    interval: "30分钟",
    price: "2-6元",
    duration: "90分钟",
    stations: [
      {name: "新妇幼保健院", duration: 0},
      {name: "华源大厦", duration: 8},
      {name: "汽车南站", duration: 22},
      {name: "六峰公园", duration: 38},
      {name: "旧总站", duration: 60},
      {name: "聚龙湾", duration: 68},
      {name: "睦村", duration: 90}
    ]
  },
  {
    id: "8012路",
    type: "城乡",
    start: "那隆",
    end: "灵山图书馆",
    time: "07:30-17:30",
    timeBackward: "08:00-18:00",
    interval: "25分钟",
    price: "2-5元",
    duration: "65分钟",
    stations: [
      {name: "那隆", duration: 0},
      {name: "独岭村", duration: 48},
      {name: "灵山中学", duration: 63},
      {name: "灵山图书馆", duration: 65}
    ]
  },
  {
    id: "8018路",
    type: "城乡",
    start: "大平",
    end: "二医院",
    time: "07:00-17:30",
    timeBackward: "07:20-17:50",
    interval: "25分钟",
    price: "2-7元",
    duration: "120分钟",
    stations: [
      {name: "大平", duration: 0},
      {name: "那隆客运站", duration: 15},
      {name: "檀圩镇政府", duration: 30},
      {name: "鹏大汽车城", duration: 45},
      {name: "职校", duration: 54},
      {name: "交警大队", duration: 63},
      {name: "华源大厦", duration: 66},
      {name: "汽车南站", duration: 75},
      {name: "步行街", duration: 90},
      {name: "二医院", duration: 120}
    ]
  },
  {
    id: "806路",
    type: "城乡",
    start: "平南街",
    end: "新中医院",
    time: "06:30-18:30",
    timeBackward: "06:30-18:30",
    interval: "20分钟",
    price: "2-5元",
    duration: "55分钟",
    stations: [
      {name: "平南街", duration: 0},
      {name: "平南中学", duration: 4},
      {name: "平南客运站", duration: 8},
      {name: "锦绣广场", duration: 32},
      {name: "旧总站", duration: 36},
      {name: "湘桂���场", duration: 48},
      {name: "新中医院", duration: 55}
    ]
  },
  {
    id: "8011路",
    type: "城乡",
    start: "六峰文化步行街",
    end: "那隆中学",
    time: "06:40-18:00",
    timeBackward: "07:00-18:20",
    interval: "20分钟",
    price: "2-5元",
    duration: "60分钟",
    stations: [
      {name: "六峰文化步行街", duration: 0},
      {name: "汽车总站", duration: 12},
      {name: "灵山职校", duration: 27},
      {name: "鹏大汽车城", duration: 33},
      {name: "檀圩镇政府", duration: 45},
      {name: "那隆中学", duration: 60}
    ]
  },
  {
    id: "802路",
    type: "城乡",
    start: "石塘",
    end: "灵山汽车总站",
    time: "07:30-18:30",
    timeBackward: "08:00-19:00",
    interval: "30分钟",
    price: "2-8元",
    duration: "90分钟",
    stations: [
      {name: "石塘", duration: 0},
      {name: "平山中学", duration: 35},
      {name: "佛子中学", duration: 67},
      {name: "园丰牧业", duration: 79},
      {name: "二医院", duration: 83},
      {name: "中医院", duration: 88},
      {name: "步行街", duration: 90},
      {name: "灵山汽车总站", duration: 90}
    ]
  },
  {
    id: "8028路",
    type: "城乡",
    start: "陆屋客运站",
    end: "聚龙湾",
    time: "07:00-18:00",
    timeBackward: "07:30-18:30",
    interval: "30分钟",
    price: "2-12元",
    duration: "55分钟",
    stations: [
      {name: "陆屋客运站", duration: 0},
      {name: "三隆镇", duration: 18},
      {name: "交警大队", duration: 32},
      {name: "华源大厦", duration: 38},
      {name: "汽车总站", duration: 49},
      {name: "聚龙湾", duration: 55}
    ]
  },
  {
    id: "809路",
    type: "城乡",
    start: "伯劳",
    end: "二医院",
    time: "05:44-18:25",
    timeBackward: "06:10-18:50",
    interval: "20分钟",
    price: "2-10元",
    duration: "110分钟",
    stations: [
      {name: "伯劳", duration: 0},
      {name: "天山中学", duration: 24},
      {name: "鹏大汽车城", duration: 42},
      {name: "职校", duration: 60},
      {name: "交警大队", duration: 70},
      {name: "华源大厦", duration: 75},
      {name: "汽车总站", duration: 88},
      {name: "步行街", duration: 101},
      {name: "中医院", duration: 106},
      {name: "二医院", duration: 110}
    ]
  }
];

module.exports = { lines: lines };