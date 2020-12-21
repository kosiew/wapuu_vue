(function (window, $) {
    const appTemplate = `<div id="github-info-app" style="opacity: 1" >
                      <span>
                        <img id="peppa-img"  
                        src="https://raw.githubusercontent.com/tobyqin/tampermonkey_vue/master/github-info/peppa.png">
                        <div class="pig-say">
                            <div class="pig-info-arrow"></div>
                            <div class="pig-info">
                                <p><b></b> {{message}} <br/>
                                <div class="pig-info-more">
                                {{moreMessage}}
                                </div>              
                            </div>
                        </div>
                    </span>
                    </div>`;

    const githubApp = new Vue({
        data: {
            message: 'Hello world!',
            moreMessage: 'more message'
        },
       methods: {
            setMessage(message, moreMessage='') {
                this.message = message;
                this.moreMessage = moreMessage;
            },
            getUserId(url) {
                const userId = '';
                const regex = /github.com\/([^\/]*).*/;
                const found = url.match(regex);
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
            $('head').append(`<style type="text/css">#github-info-app div,#github-info-app span,#github-info-app p,#github-info-app h1,#github-info-app h2,#github-info-app h3,#github-info-app h4,#github-info-app a,#github-info-app img,#github-info-app b{color:#fff;font-family:HelveticaNeue,Helvetica,Arial,"Microsoft Yahei",sans-serif;font-size:12px;margin:0;padding:0;border:0;box-sizing:border-box;text-align:left}#github-info-app{position:fixed;left:-55px;top:40%;z-index:100}#peppa-img{position:fixed;left:-55px;top:40%;width:95px;transition:all .3s ease-out;-moz-transition:all .3s ease-out;-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out}#peppa-img:hover{left:-40px;transform:rotate(-10deg);-ms-transform:rotate(-10deg);-moz-transform:rotate(-10deg);-webkit-transform:rotate(-10deg);-o-transform:rotate(-10deg);cursor:pointer}#peppa-img:hover + .pig-say{visibility:visible;width:auto}#peppa-img:hover + .pig-say .pig-email{visibility:hidden}#github-info-app .pig-say{visibility:collapse;width:0}#github-info-app .pig-say:hover{visibility:visible}#github-info-app .pig-info{height:100px;margin-left:123px;margin-top:-35px;background-color:#D40082;border:2px solid #D40082;color:#fff;padding:6px;padding-left:10px;padding-right:10px;width:220px;-moz-border-radius:12px;-webkit-border-radius:12px;border-radius:12px;text-shadow:2px 2px 5px #333;line-height:20px}#github-info-app .pig-info a{text-decoration:none}#github-info-app .pig-info a:hover{text-decoration:underline}#github-info-app .pig-info label{font-size:.5em}#github-info-app .pig-info-arrow{margin-left:110px;margin-top:20px;width:0;height:0;border-top:13px solid transparent;border-right:26px solid #D40082;border-bottom:13px solid transparent}#github-info-app .pig-info .action-header{border-bottom:1px solid rgba(255,255,255,0.6);width:100px}#github-info-app .pig-info h3{margin-top:12px;font-size:14px;font-weight:600}#github-info-app a.action-link{text-decoration:none;font-size:12px}#github-info-app a.action-link:hover{cursor:pointer;text-decoration:underline}#github-info-app .pig-info-more{visibility:collapse}#github-info-app .pig-info:hover .pig-info-more{visibility:visible}#github-info-app .action-footer p,#github-info-app .action-footer a{position:relative;margin-top:5px;margin-bottom:0;font-size:10px;color:rgba(255,255,255,0.8)}#github-info-app .action-footer a{cursor:pointer}#github-info-app .action-footer a:hover{text-decoration:underline}#github-info-app a:hover{cursor:pointer}</style>`);
        },
        startApp() {
            this.appendToBody();
            setTimeout(() => {
                githubApp.$mount('#github-info-app');
            }, 3000);
        },
        setMessage(message, moreMessage='') {
            githubApp.setMessage(message, moreMessage);
        }
    };
})(window, jQuery);
