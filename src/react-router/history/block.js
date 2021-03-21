export default class Block {
    blockStore = '';
    constructor(getUserConfirmation){
        //
        this.getUserConfirmation = getUserConfirmation;
    }
    addBlock(msg){//blcok参数可能是个string或者function
        console.log(333,msg)
        if(typeof msg != 'string' &&  typeof msg != 'function'){
            throw new Error('报错！')
        }
        this.blockStore = msg;
        return ()=>{
            this.blockStore = '';
        }
    }
    triggerBlock(location, action, callback){
        if(!this.blockStore){//没有阻塞，继续执行页面跳转
            callback();
            return;
        }
        let msg = '';
        if(typeof this.blockStore == 'function'){
            msg = this.blockStore(location, action);
        }else{
            msg = this.blockStore;
        }
        //有阻塞就触发getUserConfirmation函数
        this.getUserConfirmation(msg, function(flag){
            if(flag){
                callback();
            }
        })
    }
}