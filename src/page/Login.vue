<template>
  <div class="background-drop">
    <div class="container" id="sign-in">
        <div class="row">
            <div class="col-md-4 col-md-offset-4 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1 login-form">
                <div class="panel-header">
                    <h2 class="text-center">
                        Login
                    </h2>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-xs-12">
                            <form @submit.prevent="login(user)" class="login_validator">
                                <div class="form-group">
                                    <label for="email" class="sr-only" > E-mail </label>
                                    <input class="form-control" id="email" name="username"
                                          placeholder="E-mail" v-model="user.email"
                                            type="email">
                                </div>
                                <div class="form-group">
                                    <label for="password" class="sr-only"> Password </label>
                                    <input type="password" class="form-control" id="password"
                                          name="password" placeholder="Password" v-model="user.password">
                                </div>
                                <div class="form-group checkbox">
                                  <input type="checkbox" name="remember" id="remember">
                                  <label for="remember"> Remember </label>
                                </div>
                                <div class="form-group">
                                    <input type="submit" value="Sign In" class="btn btn-primary btn-block"/>
                                </div>
                                <span v-if="$store.state.auth.error_response" class="danger">{{$store.state.auth.error_response}}</span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-index',
  data () {
    return {
      user: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    login (user) {
      this.$store.dispatch('auth/LOGIN', user)
    }
  }
}
</script>
<style scoped>

.alert {
    color: red;
}
#remember {
  margin-left: 0px;
  position: relative;
}
.background-drop {
    font-family: 'Open Sans', sans-serif;
    height: 100%;
    padding: 6.5% 0;
    background: radial-gradient(ellipse at center, #5A93AF 0%, #004E74 100%);
    position: absolute;
    right: 0;
    left: 0;
}

.login-form {
    background-color: rgba(255, 255, 255, .9);
    border-radius: 4px;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-left: 33.3%;
}
.btn-primary,
.primary,
.tags a.primary {
    border-color: #509DE0;
    background: #509DE0 !important;
}
.btn-primary:hover {
    border-color: #509DE0;
    background: #509DE0 !important;
}
.icheckbox_minimal-blue {
    background-position: -20px 0;
}
a:hover, a:focus {
    text-decoration: none;
}
.social a {
    border-radius: 50px;
    padding: 10px 11px 2px 11px;
    font-size: 25px;
}

.has-error .help-block, .has-error .control-label,
.has-error .radio, .has-error .checkbox,
.has-error .radio-inline, .has-error .checkbox-inline {
    color: #ff6666;
}
.has-error.radio label, .has-error.checkbox label,
.has-success.radio label, .has-success.checkbox label {
    color: #333;
}
.has-error .form-control, .has-error .form-control:focus {
    border-color: #ff6666;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}
.has-success .form-control, .has-success .form-control:focus {
    border-color: #66cc99;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
}
.btn-google, .btn-google:hover, .btn-google:focus {
    color: #dd4b39;
    border: 1px solid #dd4b39;
}
#forgot:hover {
    color: #2a6496 !important;
}
@media screen and (max-width: 400px) {
    .mar-left5 {
        margin-left: 18px !important;
        margin-top: -10px;
    }
    .mar-top4 {
        margin-top: -10px;
    }
    .mar-left {
        margin-left: -5px !important;
    }
    .sign-up {
        float: left !important;
    }
    #forgot::after {
        content: "\A";
        white-space: pre;
    }

}
/* Chrome, Safari, Opera */

@-webkit-keyframes CAnimation {
    from {
        -webkit-filter: hue-rotate(0deg);
    }
    to {
        -webkit-filter: hue-rotate(-360deg);
    }
}
/* Standard syntax */

@keyframes CAnimation {
    from {
        -webkit-filter: hue-rotate(0deg);
    }
    to {
        -webkit-filter: hue-rotate(-360deg);
    }
}
.forgot {
    color: #428BCA !important;
}
a:hover {
    text-decoration: none;
}
.radio label,
.checkbox label {
    padding-left: 0;
}
@media (min-width: 768px) {
    .form_width {
        margin-left: 12%;
    }
}
/* ===== Preloader =====*/
.preloader {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100000;
    backface-visibility: hidden;
    background: #ffffff;
}
.loader_img {
    width: 50px;
    height: 50px;
    position: absolute;
    left: 50%;
    top: 50%;
    background-position: center;
    margin: -25px 0 0 -25px;
}

</style>
