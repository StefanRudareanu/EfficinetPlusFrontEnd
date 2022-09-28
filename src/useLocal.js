const useLocalStorage=()=>{
return{
    saveStorage(key,value){
            localStorage.setItem(key,JSON.stringify(value))},
    getStorage(key){
        return JSON.parse(localStorage.getItem(key))}}}
export default useLocalStorage;