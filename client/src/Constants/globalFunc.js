



class Global {


    static shortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]




    static convertServerDate(date) {

        if (date) {
            var day = new Date(date).getDate()
            var month = new Date(date).getMonth()
            var monthName = Global.shortNames[month]
            var year = new Date(date).getFullYear()
            var format = day + '-' + monthName + '-' + year
            return format
        }
    }


    static convertUserDate(date) {
        if (date) {
            var splitDate = date.split('-')
            var month = parseInt(splitDate[1])
            var monthName = Global.shortNames[month - 1]
            var day = splitDate[0]
            var year = splitDate[2]

            var format = day + '-' + monthName + '-' + year
            return format

        }
    }




}

export default Global