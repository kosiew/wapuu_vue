(function (window, $) {
    const appTemplate = `<div id="peppa-app" style="opacity: 1" >
                      <span>
                        <img id="peppa-img"  
                        src="https://raw.githubusercontent.com/tobyqin/tampermonkey_vue/master/github-info/peppa.png">
                        <div class="peppa-say">
                            <div class="peppa-info-arrow"></div>
                            <div class="peppa-info">
                                <p><b>Wapuu:</b> {{message}} <br/>
                                <span>User: {{userInfo.login}} / </span>
                                <span>Repos: {{userInfo.public_repos}}<br></span>
                                <span>Gists: {{userInfo.public_gists}} / </span>
                                <span>Followers: {{userInfo.followers}}<br></span>     
                                <div class="peppa-info-more">
                                </div>              
                                <div class="action-footer"><p>Thanks <a href="https://github.com/tobyqin"> Siew </a> bringing me here ^_^</p></div>
                            </div>
                        </div>
                    </span>
                    </div>`;

    const peppaApp = new Vue({
        data: {
            message: 'Hello world!',
            userInfo: {'login':'Unknown',
            'public_repos':'...',
            'public_gists':'...',
            'followers':'...'}
        },
        methods: {
            getUserId(url) {
                let userId = '';
                let regex = /github.com\/([^\/]*).*/;
                let found = url.match(regex);
                if (found && found.length > 1) {
                    userId = found[1];
                    this.getUserInfo(userId);
                }
            },
            getUserInfo(userId) {
                fetch('https://api.github.com/users/' + userId).then(res => {
                    return res.json();
                }).then(json => {
                        this.userInfo = json;
                    }
                );
            }
        },
        created: function () {
            this.getUserId(window.location.toString());
        }
    });



    window.githubInfo = {
        isReady(successCallBack) {
            $(document).ready(function(){
                successCallBack();
            });
        },
        appendToBody() {
            $('body').append(appTemplate);
        },
        addStyle() {
            const css = `<style type="text/css">
              #peppa-app div,#peppa-app span,#peppa-app p,
              #peppa-app h1,#peppa-app h2,#peppa-app h3,
              #peppa-app h4,#peppa-app a,#peppa-app img,
              #peppa-app b {
                  color:#fff;
                  font-family:HelveticaNeue,Helvetica,Arial,"Microsoft Yahei",sans-serif;
                  font-size:12px;
                  margin:0;
                  padding:0;
                  border:0;
                  box-sizing:border-box;
                  text-align:left}
              #peppa-app{
                  position:fixed;
                  left:-55px;
                  top:40%;
                  z-index:100}
              #peppa-img{
                  position:fixed;
                  left:-55px;
                  top:40%;
                  width:95px;
                  transition:all .3s ease-out;
                  -moz-transition:all .3s ease-out;
                  -webkit-transition:all .3s ease-out;
                  -o-transition:all .3s ease-out}#peppa-img:hover{left:-40px;
                  transform:rotate(-10deg);
                  -ms-transform:rotate(-10deg);
                  -moz-transform:rotate(-10deg);
                  -webkit-transform:rotate(-10deg);
                  -o-transform:rotate(-10deg);
                  cursor:pointer}#peppa-img:hover + .peppa-say{visibility:visible;
                  width:auto}
              #peppa-img:hover + .peppa-say .peppa-email{
                  visibility:hidden}#peppa-app .peppa-say{visibility:collapse;
                  width:0}#peppa-app .peppa-say:hover{visibility:visible}#peppa-app .peppa-info{height:100px;
                  margin-left:123px;
                  margin-top:-35px;
                  background-color:#D40082;
                  border:2px solid #D40082;
                  color:#fff;
                  padding:6px;
                  padding-left:10px;
                  padding-right:10px;
                  width:220px;
                  -moz-border-radius:12px;
                  -webkit-border-radius:12px;
                  border-radius:12px;
                  text-shadow:2px 2px 5px #333;
                  line-height:20px}
            #peppa-app .peppa-info a{
                text-decoration:none}
            #peppa-app .peppa-info a:hover{
                text-decoration:underline}
            #peppa-app .peppa-info label{
                font-size:.5em}
            #peppa-app .peppa-info-arrow{
                margin-left:110px;
                  margin-top:20px;
                  width:0;
                  height:0;
                  border-top:13px solid transparent;
                  border-right:26px solid #D40082;
                  border-bottom:13px solid transparent}
            #peppa-app .peppa-info .action-header{
                border-bottom:1px solid rgba(255,255,255,0.6);
                  width:100px}#peppa-app .peppa-info h3{margin-top:12px;
                  font-size:14px;
                  font-weight:600}#peppa-app a.action-link{text-decoration:none;
                  font-size:12px}#peppa-app a.action-link:hover{cursor:pointer;
                  text-decoration:underline}
            #peppa-app .peppa-info-more{
                visibility:collapse}
            #peppa-app .peppa-info:hover .peppa-info-more{
                visibility:visible}
            #peppa-app .action-footer p,#peppa-app .action-footer a{
                position:relative;
                  margin-top:5px;
                  margin-bottom:0;
                  font-size:10px;
                  color:rgba(255,255,255,0.8)}
            #peppa-app .action-footer a{
                cursor:pointer}
            #peppa-app .action-footer a:hover{
                text-decoration:underline}#peppa-app a:hover{cursor:pointer}
        </style>`;
            $('head').append(css);
        },
        startApp() {
            this.appendToBody();
            setTimeout(() => {
                peppaApp.$mount('#peppa-app');
            }, 3000);
        }
    };
})(window, jQuery);

