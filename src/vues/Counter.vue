<template>
  <div class="count">
      <h1>Counter</h1>
      <div class="number">{{ count }}</div>
      <div>
          <button @click="Increment">Increment</button>
          <button @click="Decrement">Decrement</button>
      </div>
      
  </div>
    <p v-if="success" class="count_success"> {{ message }} </p>
    <p v-if="processing" class="processing"> {{ message }} </p>
    <p v-if="fail" class="count_failure"> {{ message }} </p>
</template>

<script>
import Web3 from "web3";
import abi from "../assets/abi.json";
const address_contract = "0x13A6DAadFABE9295eC96da1c626FB672C50F7a04";
const provider = window.ethereum;
const web3 = new Web3(provider);
const contract = new web3.eth.Contract(abi,address_contract);
export default {
    name:'Counter',
    data() {
        return {
            count:0,
            message:"",
            processing:false,
            success:false,
            fail:false,
        }
    },
    async mounted () {
        this.count = await contract.methods.counter().call();
    },
    methods: {

        async RetrieveToken(address) {
            try {
                this.fail = false;
                this.success = false;
                this.processing = true;
                this.message = "Processing your request";

                //check if token available on backend
                const request = await fetch(`https://back-count-liviator.herokuapp.com/token/get/${address}`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                    },
                });
                const response = await request.json();
                if (request.status == 200) {
                    this.message = "User is whitelisted, proceding to counter's modification";
                    return response

                } else {
                    this.processing = false;
                    this.message = response.error;
                    this.fail = true;
                    return -1
                }
            } catch(e) {
                alert(e)
            }
        },

        async Increment() {
            try {
            await provider.enable();
            const address = await web3.eth.getAccounts();
            const token = await this.RetrieveToken(address);
            if(token != -1) {
                const result = await contract.methods.increment(token.token.r, token.token.s, token.token.v).send({from:address[0]}              ) 
                    if(result.status == true){
                        this.success = true;
                        this.processing = false;
                        this.message = "Counter Incremented";
                        this.count++;
                    }
                    else {
                        this.fail=true;
                        this.processing = false;
                        this.message = "Contract execution failed";
                    }
                }


            } catch (e) {
                alert(e);
            }
        },
        async Decrement() {
            try {
                if(this.count >0) {
                    await provider.enable();
                    const address = await web3.eth.getAccounts();
                    const token = await this.RetrieveToken(address);
                    if(token != -1) {
                       const result = await contract.methods.decrement(token.token.r, token.token.s, token.token.v).send({from:address[0]})
                            if(result.status == true){
                                this.success = true;
                                this.processing = false;
                                this.message = "Counter Decremented";
                                this.count = this.count - 1;
                            } else {
                                this.fail=true;
                                this.processing = false;
                                this.message = "Contract execution failed";
                            }          
                         
                    } 
                }   else {
                        this.fail=true;
                        this.success = false;
                        this.message = "Counter can't be negative";
                    }
                

            } catch (e) {
                alert(e);
            }
        }
    }
}
</script>

<style>
.count {
    position: fixed;
    align-items: center;
    padding-left:43%;
    justify-content: center;
}
.processing {
    background-color: lightgray;
    border-radius: 25px;
    padding-top: 20px;
    padding-bottom:20px;
    top:200px;
    position: relative;
    align-items: center;
    justify-content: center;
}
.count_failure {
    background-color: rgba(242,0,0,0.37);
    top:200px;
    border-radius: 25px;
    padding-top: 20px;
    padding-bottom:20px;
    position: relative;
    align-items: center;
    justify-content: center;
}

.count_success {
    background-color: #18F518;
    border-radius: 25px;
    top:200px;
    padding-top: 20px;
    padding-bottom:20px;
    position: relative;
    align-items: center;
    justify-content: center;
}
.number{
    font-size: 100px;
}
</style>