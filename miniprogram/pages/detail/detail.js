// pages/detail/detail.js
const busData = require('../../utils/bus_data.js');

Page({
  data: {
    line: null,
    direction: 'forward',
    stations: [],
    currentTime: '',
    isOperating: false,
    interval: 15,
    displayTime: ''  // 显示的首末班时间
  },

  onLoad(options) {
    const lineId = options.id;
    const line = busData.lines.find(l => l.id === lineId);
    if (line) {
      const stations = JSON.parse(JSON.stringify(line.stations));
      this.setData({ 
        line: JSON.parse(JSON.stringify(line)),
        stations: stations,
        direction: 'forward',
        displayTime: line.time
      });
      this.calculateTimes();
    }
  },

  onShow() {
    this.calculateTimes();
  },

  calculateTimes() {
    const { line, stations, direction } = this.data;
    if (!line || !stations.length) return;

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentMinutes = hours * 60 + minutes;

    // 根据方向选择对应的时间
    const timeStr = direction === 'forward' ? line.time : (line.timeBackward || line.time);
    this.setData({ displayTime: timeStr });

    const timeParts = timeStr.split('-');
    const startTime = timeParts[0].split(':');
    const endTime = timeParts[1].split(':');
    const startMinutes = parseInt(startTime[0]) * 60 + parseInt(startTime[1]);
    const endMinutes = parseInt(endTime[0]) * 60 + parseInt(endTime[1]);

    const intervalStr = line.interval.replace('分钟', '');
    const interval = parseInt(intervalStr) || 15;
    const totalDuration = parseInt(line.duration) || 40;

    const isOperating = currentMinutes >= startMinutes && currentMinutes <= endMinutes;
    const timeStrNow = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

    // 计算下一趟车从当前方向起点发车的时间
    let firstDeparture = startMinutes;
    if (currentMinutes > startMinutes) {
      const passedIntervals = Math.floor((currentMinutes - startMinutes) / interval);
      firstDeparture = startMinutes + (passedIntervals + 1) * interval;
    }

    const updatedStations = stations.map((station) => {
      let arrivalTime = null;
      if (isOperating) {
        // 跨天处理
        const minutesInDay = 24 * 60;
        const nextBusArrival = (firstDeparture + station.duration) % minutesInDay;
        
        if (nextBusArrival <= endMinutes + totalDuration) {
          const arrivalHour = Math.floor(nextBusArrival / 60) % 24;
          const arrivalMin = nextBusArrival % 60;
          arrivalTime = `${String(arrivalHour).padStart(2, '0')}:${String(arrivalMin).padStart(2, '0')}`;
        }
      }
      return { 
        name: station.name, 
        duration: station.duration, 
        arrivalTime, 
        minutesAway: station.duration 
      };
    });

    this.setData({ 
      currentTime: timeStrNow, 
      isOperating, 
      interval, 
      stations: updatedStations 
    });
  },

  // 切换方向
  switchDirection() {
    const { line, direction } = this.data;
    if (!line) return;
    
    const newDirection = direction === 'forward' ? 'backward' : 'forward';
    
    let newStations;
    if (newDirection === 'backward') {
      const totalDuration = parseInt(line.duration) || line.stations[line.stations.length - 1].duration;
      const originalStations = JSON.parse(JSON.stringify(line.stations));
      
      const reversed = [...originalStations].reverse();
      
      newStations = reversed.map((s, idx) => {
        if (idx === 0) return { name: s.name, duration: 0 };
        const dur = totalDuration - originalStations[originalStations.length - idx - 1].duration;
        return { name: s.name, duration: dur };
      });
    } else {
      newStations = JSON.parse(JSON.stringify(line.stations));
    }

    this.setData({ 
      direction: newDirection, 
      stations: newStations 
    });
    
    this.calculateTimes();
  },

  goBack() {
    wx.navigateBack();
  },

  showStationDetail(e) {
    const station = e.currentTarget.dataset.station;
    const waitTime = station.arrivalTime 
      ? `预计 ${station.duration} 分钟后到站` 
      : '当前未运营';
    wx.showModal({
      title: station.name,
      content: waitTime,
      showCancel: false,
      confirmText: '知道了',
      success: () => {
        // 可扩展：点击后执行的操作
      }
    });
  },

  onShareAppMessage() {
    const { line, direction } = this.data;
    if (!line) return {};
    const route = direction === 'forward' 
      ? `${line.start} - ${line.end}` 
      : `${line.end} - ${line.start}`;
    return { 
      title: `${line.id} ${route}`, 
      path: `/pages/detail/detail?id=${line.id}` 
    };
  }
});