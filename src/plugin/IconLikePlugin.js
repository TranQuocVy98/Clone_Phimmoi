function IconLikePlugin() {
    // const initFacebookSDK = () => {
    //     if (window.FB) {
    //         window.FB.XFBML.parse();
    //     }

    //     // let { language } = this.props;
    //     // let locale = language === LANGUAGES.VI ? 'vi_VN' : 'en_US';
    //     window.fbAsyncInit = function () {
    //         window.FB.init({
    //             appId: 1781178922052941,
    //             // appId: process.env.REACT_APP_FACEBOOK_APP_ID,
    //             cookie: true, // enable cookies to allow the server to access
    //             // the session
    //             xfbml: true, // parse social plugins on this page
    //             version: 'v2.5', // use version 2.1
    //         });
    //     };
    //     (function (d, s, id) {
    //         var js,
    //             fjs = d.getElementsByTagName(s)[0];
    //         if (d.getElementById(id)) return;
    //         js = d.createElement(s);
    //         js.id = id;
    //         js.src = `//connect.facebook.net/vi_VN/sdk.js`;
    //         fjs.parentNode.insertBefore(js, fjs);
    //     })(document, 'script', 'facebook-jssdk');
    // };

    // initFacebookSDK();
    return (
        <div
            className="fb-like"
            data-href="https://www.facebook.com/vycutepro/posts/pfbid02XZqshdTZKhy5E924oiFe3yPBg1W7ddgSPCfmgWdKUP9AuSwkWSBNdF6iKUYCboA5l"
            data-width="120px"
            data-layout="button_count"
            data-action="like"
            data-size="small"
            data-share="true"
        />
    );
}

export default IconLikePlugin;
