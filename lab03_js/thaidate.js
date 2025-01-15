let thaiDate = {
    currentDate: new Date(),
    thaiMonths: ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม',
    'มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'],

    year() { return this.currentDate.getFullYear()+543},
    month() { return this.currentDate.getMonth()+1},
    day() { return this.currentDate.getDate()},

    short(){
        txt = `${this.day()}/${this.month()}/${this.year()}`
        return txt
    },

    full(){
        return `${this.day()}/${this.thaiMonths[this.month()-1]}/${this.year()}`
    }
}

console.log(thaiDate.short())
console.log(thaiDate.full())