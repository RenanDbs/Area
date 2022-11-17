import sendEMail from './reactions/sendEMail'
import eMailReceived from './actions/eMailReceived'

export default {
  actions: {
    eMailReceived
  },
  reactions: {
    sendEMail
  }
}
