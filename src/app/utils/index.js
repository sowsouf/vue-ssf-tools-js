import momentJS       from 'moment'
import momentTimezone from 'moment-timezone'

const twoDigits = (n) => parseInt(n) < 10 ? '0' + parseInt(n) : parseInt(n);
const clone = (object) => JSON.parse(JSON.stringify(object));
const moment = (date = null, format = null) => {
  momentTimezone.locale('fr')
  return date === null ? momentJS() : format === null ? momentJS(date) : momentJS(date, format)
}

export {
  twoDigits,
  moment
}
