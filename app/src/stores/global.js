import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      isConnected: false,
      lastMessage: '',
      showDiv: true,
      taps: 0,
      timeout: null,
      config: {
        passcode: 14130,
        inactivityTimeout: 30000,
        targetEndpoint: '/attract',
        servicePortal: './portal.html'
      },
      faceIndex: 0,
    }
  },
  actions: {
    updateConnection(state) {
      this.isConnected = state
    },
    updateLastMsg(msg) {
      this.lastMessage = msg.toString();
    }
  }
})