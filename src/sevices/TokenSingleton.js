export default class TokenSingleton{

    ins=null;
    token=null;
    constructor(token) {
         this.token=token;
    }

    static SetToken=token=>{
        this.ins= new TokenSingleton(token)
    }

    static GetTokenSingleTon= ()=>{
      return this.token;
    }

}