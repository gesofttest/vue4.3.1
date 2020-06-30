<template>
    <div class="hello">
        <span>{{msg}}</span>
        <el-row>
            <router-link to='testCkeditor'><el-button type="primary" v-on:click="initVueonloac">aaa</el-button></router-link>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        methods: {
            async initVueonloac() {


                let res = await this.$axios.get('http://127.0.0.1:8061/login.action');

                console.log(res);
                console.log(!process.env.VUE_CLI_TEST)
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
