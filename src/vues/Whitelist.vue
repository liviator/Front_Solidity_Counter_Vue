<template>
<div class="whitelist">
    
    <h1>
        Whitelist an address 
    </h1>
    <div>
        <div>
        <p>
            You can either choose to Whitelist a specific address or yours
        </p>
        </div>
        <p v-if="state" class="error"> {{ message }} </p>
        <p v-if="success" class="success"> {{ message }} </p>
        <form @submit.prevent="Whitelist" class="form">
            <div class ="input">
                <input  class="input" type="text" name="address" id="address" v-model="address" placeholder="0xf537A5099200760eFEF5bb9AE7C18A0D033e71d3">
                <button type="submit"> Whitelist address </button>
            </div>
            <button type="submit" @click="use_injected = 1">Whitelist your address</button>
        </form>
    </div>
</div>
</template>

<script>
import Web3 from "web3";


export default {
    name:'Whitelist',
    data() {
        return {
            use_injected:0,
            address:"",
            state:false,
            success:false,
            message:""
        }
    },
    methods: {
        async Whitelist() { //whitelist an address or the address of a metamask account
        try{
            this.state = false;
            this.success = false;
            const use_injected= this.use_injected;
            var address = this.address;
            if(use_injected == 1) { //Metamask
                const provider = window.ethereum;
                await provider.enable();
                const web3 = new Web3(provider);
                address = await web3.eth.getAccounts();
                this.use_injected = 0;
            }
            if(!address) {
                this.state = true;
                this.message = "Error, Address is needed";
                }

            const request = await fetch(`https://back-count-liviator.herokuapp.com/token/create/${address}`, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                    },
                });
            const response = await request.json();
            if(request.status == 400) {
                this.state = true;
                this.message = response.error;
            }
            else {
                this.message = "Address whitelisted";
                this.success = true;
            }
        } catch(e) {
            alert(e)
        }  
        }
    }
}



</script>

<style>
.whitelist {
    position: fixed;
    align-items: center;
    padding-left:35%;
    justify-content: center;
}

.form {
    padding-top: 10px;
    justify-content: space-between;
}

.input {
    position: relative;
    margin-right: 10px;
    justify-content: space-between;
    margin-bottom: 10px;
}

.error {
    background-color: rgba(242,0,0,0.37);
    border-radius: 25px;
    padding: 20px;
}

.success {
    background-color: #18F518;
    border-radius: 25px;
    padding: 20px;
}
</style>