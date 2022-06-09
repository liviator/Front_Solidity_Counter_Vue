<template>
      <div class="navbar">
          <header>
              <img src="../assets/logoEra.png" alt="" class="logo">
          </header>
        <div>
        <router-link class="link" :to=" { name: 'Whitelist' }">Whitelist an address</router-link>
        <router-link class="link" :to=" { name: 'Counter' }">Counter</router-link>
        </div>
      </div>



</template>

<script>
export default {
    name:'navbar'
}
</script>

<style>
.logo {
    max-width: 100px;
}
.navbar {
    position: relative;
    display: flex;
    left: 0;
    top:0px;
    justify-content:left;
    align-items: center;
    width: 100%;
    -webkit-box-shadow: -2px 7px 9px 4px rgba(0,0,0,0.21); 
    box-shadow: -2px 7px 9px 4px rgba(0,0,0,0.21);
}
.link {
    position:relative;
    width:30px;
    margin-left: 400px   ;
    justify-content: space-between;
    color: black;

    
}


</style>