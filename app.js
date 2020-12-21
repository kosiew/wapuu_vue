(function (window, $) {
    const appTemplate = `<div id="peppa-info-app" style="opacity: 1" >
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
                                <div class="action-footer"><p>Thanks <a href="https://github.com/tobyqin">Toby</a> bringing me here ^_^</p></div>
                            </div>
                        </div>
                    </span>
                    </div>`;

    const peppaApp = new Vue({
        data: {
            message: '',
            moreMessage: ''
        },
        methods: {
            setMessage(message, moreMessage) {
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



    window.peppaInfo = {
        isReady(successCallBack) {
            $(document).ready(function(){
                successCallBack();
            });
        },
        appendToBody() {
            $('body').append(appTemplate);
        },
        addStyle() {
            $('head').append(`<style type="text/css">#peppa-info-app div,#peppa-info-app span,#peppa-info-app p,#peppa-info-app h1,#peppa-info-app h2,#peppa-info-app h3,#peppa-info-app h4,#peppa-info-app a,#peppa-info-app img,#peppa-info-app b{color:#fff;font-family:HelveticaNeue,Helvetica,Arial,"Microsoft Yahei",sans-serif;font-size:12px;margin:0;padding:0;border:0;box-sizing:border-box;text-align:left}#peppa-info-app{position:fixed;left:-55px;top:40%;z-index:100}#peppa-img{position:fixed;left:-55px;top:40%;width:95px;transition:all .3s ease-out;-moz-transition:all .3s ease-out;-webkit-transition:all .3s ease-out;-o-transition:all .3s ease-out}#peppa-img:hover{left:-40px;transform:rotate(-10deg);-ms-transform:rotate(-10deg);-moz-transform:rotate(-10deg);-webkit-transform:rotate(-10deg);-o-transform:rotate(-10deg);cursor:pointer}#peppa-img:hover + .pig-say{visibility:visible;width:auto}#peppa-img:hover + .pig-say .pig-email{visibility:hidden}#peppa-info-app .pig-say{visibility:collapse;width:0}#peppa-info-app .pig-say:hover{visibility:visible}#peppa-info-app .pig-info{height:100px;margin-left:123px;margin-top:-35px;background-color:#D40082;border:2px solid #D40082;color:#fff;padding:6px;padding-left:10px;padding-right:10px;width:220px;-moz-border-radius:12px;-webkit-border-radius:12px;border-radius:12px;text-shadow:2px 2px 5px #333;line-height:20px}#peppa-info-app .pig-info a{text-decoration:none}#peppa-info-app .pig-info a:hover{text-decoration:underline}#peppa-info-app .pig-info label{font-size:.5em}#peppa-info-app .pig-info-arrow{margin-left:110px;margin-top:20px;width:0;height:0;border-top:13px solid transparent;border-right:26px solid #D40082;border-bottom:13px solid transparent}#peppa-info-app .pig-info .action-header{border-bottom:1px solid rgba(255,255,255,0.6);width:100px}#peppa-info-app .pig-info h3{margin-top:12px;font-size:14px;font-weight:600}#peppa-info-app a.action-link{text-decoration:none;font-size:12px}#peppa-info-app a.action-link:hover{cursor:pointer;text-decoration:underline}#peppa-info-app .pig-info-more{visibility:collapse}#peppa-info-app .pig-info:hover .pig-info-more{visibility:visible}#peppa-info-app .action-footer p,#peppa-info-app .action-footer a{position:relative;margin-top:5px;margin-bottom:0;font-size:10px;color:rgba(255,255,255,0.8)}#peppa-info-app .action-footer a{cursor:pointer}#peppa-info-app .action-footer a:hover{text-decoration:underline}#peppa-info-app a:hover{cursor:pointer}</style>`);
        },
        startApp() {
            this.appendToBody();
            setTimeout(() => {
                peppaApp.$mount('#peppa-info-app');
            }, 3000);
        }
    };
})(window, jQuery);
