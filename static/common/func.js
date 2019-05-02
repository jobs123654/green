export default {
   getUrlRequestData(work){
     let r=''
     for (let i in work){
       r+=i+'='+work[i]+'&&'
     }
     return r;
   }
}
