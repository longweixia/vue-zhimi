<template>
  <div>
    <div>
        用户名：
        <Input prefix="ios-contact" placeholder="Enter name" style="width: auto" />
    </div>
    <div style="margin-top: 6px">
        密码：
        <Input placeholder="Enter name" style="width: auto">
            <Icon type="ios-contact" slot="prefix" />
        </Input>
    </div>
     <Button type="primary" @click="login">登录</Button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'login'
    }
  },
  methods:{
    login(){
        this.axios.get('/login')
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
  }
}
</script>

<style lang="less" scoped>

</style>
