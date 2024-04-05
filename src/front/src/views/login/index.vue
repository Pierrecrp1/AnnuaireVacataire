<template>
    <v-row no-gutters align="center">
        <v-col lg="6" md="6" style="height: 100vh;" class="imgLogin pa-12">
            <IconLogin />
            <div class="bottom_txt">
                <a href="https://storyset.com/people" target="_blank">People illustrations by Storyset</a>
            </div>
        </v-col>
        <v-col lg="6" md="6" sm="12" style="height: 100vh;" class="px-4">
            <LoginForm v-if="statut === 'login'" @register="statut = 'register'"/>
            <RegisterSelector v-else-if="statut === 'register'" @login="statut = 'login'"></RegisterSelector>
        </v-col>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';
import RegisterSelector from '../../components/login/RegisterSelector.vue';
import IconLogin from '../../components/icons/IconLogin.vue';
import LoginForm from '../../components/login/LoginForm.vue';
const statut = ref('login');
</script>

<style>
.imgLogin {
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (max-width: 960px){
        display: none;
    }
}

.bottom_txt {
    height: 0;
    margin-top: -3vh;
}

.bottom_txt a {
    color: black;
    text-decoration: none;
    font-size: clamp(0.625rem, 0.0625rem + 1vw, 0.875rem);
}
</style>