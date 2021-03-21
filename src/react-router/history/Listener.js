export default class Listener {
    listenerStore = [];

    triggerListener(location,action){
        for(let i = 0 ; i < this.listenerStore.length ;i ++){
            let listener = this.listenerStore[i];
            typeof listener == 'function' && listener(location,action);
        }
    }
    addListener(listener){
        this.listenerStore.push(listener);
        //关闭定时器函数
        return ()=>{
            let index = this.listenerStore.indexOf(listener);
            this.listenerStore.splice(index,1);
        }
    }
}