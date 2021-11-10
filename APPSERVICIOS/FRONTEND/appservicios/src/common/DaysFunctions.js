 
 
 
 export const limitWeek = date => {
    const init = addDays(date, 1 - date.getDay())
    const finish =  addDays(date, 7 - date.getDay())
    const response = {
      init: init.getFullYear() + '-' + (init.getMonth() + 1) + '-' + init.getDate(),
      finish: finish.getFullYear() + '-' + (finish.getMonth() + 1) + '-' + finish.getDate()
    }
    return response
  }

export const addDays = (date, days) => {
    var new_date = new Date(date)
    new_date.setDate(new_date.getDate() + days)
    return new_date;
  }

export const formatDate = (number) => {
    if (number.toString().length === 1){
        return '0' + number.toString()
    } else if (number.toString().length === 2){
        return number.toString()
    }
} 

export const formatHour = hour => {
  var response = ''
  if (String(hour).length === 1){
      response = '0' + hour + ':00'
  } else {
      response = hour + ':00'
  }
  return response;

}

export const dateTimeObj = dt => {
  const response = {
    date: dt.split('T')[0],
    hour: dt.split('T')[1].split(':')[0] + ':' + dt.split('T')[1].split(':')[1]
  }
  return response
}

export const fullDate = date =>{
  const dateBase = new Date(date.split('-')[0], date.split('-')[1] - 1, date.split('-')[2]);
  return days[dateBase.getDay() === 0 ? 6 : dateBase.getDay() - 1] + ' ' 
+ dateBase.getDate() + ' ' 
+ months[dateBase.getMonth()] + ' ' 
+ dateBase.getFullYear()
} 


export const formatHourDB = dt => {
  const dt1 = dt.split(':')
  const response = dt1[0] + ':' +dt1[1]
  return response
}

export const HourFromDate = date => {
  const x1 = date.split('T')[1]
  const x2 = x1.split(':')[0]
  return Number(x2) 
}

export const jsToPyDate = date => {
  var day = (date.getDate()).toString();
  if (day.length === 1){
    day = '0' + day
  }
  var month =( date.getMonth() + 1).toString();
  if (month.length === 1){
    month = '0' + month
  }
  const year = (date.getFullYear()).toString()
  return year + '-' + month + '-' + day

}



export const days = [
  'Lunes',
  'Maretes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sabado',
  'Domingo'
]

export const daysShort = [
  'LU',
  'MA',
  'MI',
  'JU',
  'VI',
  'SA',
  'DO'
]

export const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]


