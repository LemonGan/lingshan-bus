// pages/detail/detail.js
const busData = require('../../utils/bus_data.js');

Page({
  data: {
    line: null,
    direction: 'forward',
    stations: [],
    currentTime: '',
    isOperating: false,
    displayTime: '',
    nextBusHint: '',
    listFading: false,
    stationPopup: null
  },

  onLoad(options) {
    const lineId = options.id;
    const line = busData.lines.find(l => l.id === lineId);
    if (line) {
      this.setData({ 
        line: JSON.parse(JSON.stringify(line)),
        stations: JSON.parse(JSON.stringify(line.stations)),
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

    // 下一趟车从起点发车时间
    let firstDeparture = startMinutes;
    if (currentMinutes > startMinutes) {
      const passedIntervals = Math.floor((currentMinutes - startMinutes) / interval);
      firstDeparture = startMinutes + (passedIntervals + 1) * interval;
    }

    let nextBusHint = '';
    if (isOperating) {
      const waitMin = firstDeparture - currentMinutes;
      if (waitMin <= 0) {
        nextBusHint = '正在发车中';
      } else if (waitMin < interval) {
        nextBusHint = `下一班约 ${waitMin} 分钟后发车`;
      } else {
        const nextHour = Math.floor(firstDeparture / 60) % 24;
        const nextMin = firstDeparture % 60;
        nextBusHint = `下一班发车时间 ${String(nextHour).padStart(2,'0')}:${String(nextMin).padStart(2,'0')}`;
      }
    }

    const updatedStations = stations.map((station) => {
      let arrivalTime = null;
      if (isOperating) {
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
        arrivalTime
      };
    });

    this.setData({ 
      currentTime: timeStrNow, 
      isOperating, 
      stations: updatedStations,
      nextBusHint
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

    // 先淡出
    this.setData({ listFading: true });
    var _this = this;
    setTimeout(function() {
      _this.setData({ direction: newDirection, stations: newStations });
      _this.calculateTimes();
      // 淡入
      setTimeout(function() {
        _this.setData({ listFading: false });
      }, 50);
    }, 200);
  },

  goBack() {
    wx.navigateBack();
  },

  showStationDetail(e) {
    const station = e.currentTarget.dataset.station;
    this.setData({ stationPopup: station });
  },

  closeStationPopup() {
    this.setData({ stationPopup: null });
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
