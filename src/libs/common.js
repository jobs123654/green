let d=new Date()
export default {
    getDate(){
        return d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate()
    }
}
