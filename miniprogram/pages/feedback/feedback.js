Page({
  data: {
    content: '',
    contact: '',
    submitting: false,
    submitSuccess: false
  },

  onContentInput(e) {
    this.setData({ content: e.detail.value });
  },

  onContactInput(e) {
    this.setData({ contact: e.detail.value });
  },

  submitFeedback() {
    var content = this.data.content.trim();
    var contact = this.data.contact.trim();

    if (!content) {
      wx.showToast({ title: '请输入留言内容', icon: 'none' });
      return;
    }

    this.setData({ submitting: true });

    wx.request({
      url: 'http://8.138.129.142:8882/api/feedback',
      method: 'POST',
      header: { 'content-type': 'application/json' },
      data: {
        content: content,
        contact: contact,
        source: 'lingshan-bus'
      },
      success: (res) => {
        if (res.data && res.data.ok) {
          this.setData({
            content: '',
            contact: '',
            submitSuccess: true,
            submitting: false
          });
          wx.showToast({ title: '提交成功 🎉', icon: 'success' });
        } else {
          wx.showToast({ title: '提交失败，请重试', icon: 'none' });
          this.setData({ submitting: false });
        }
      },
      fail: () => {
        wx.showToast({ title: '网络错误，请稍后重试', icon: 'none' });
        this.setData({ submitting: false });
      }
    });
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' });
  },

  goAbout() {
    wx.navigateTo({ url: '/pages/about/about' });
  }
});
