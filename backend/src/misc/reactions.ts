import googleCalendarServices from '../services/googleCalendar/googleCalendarServices'
import gmailServices from '../services/gmail/gmailServices'

export default {
  '637119cbfeedeee6369fb6c6': googleCalendarServices.reactions.createEvent,
  '637159f6feedeee6369fb6d0': gmailServices.reactions.sendEMail
}
