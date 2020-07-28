var ConfigProvider = /** @class */ (function () {
    function ConfigProvider() {
        //visual studio
        this.yourSiteUrl = 'http://localhost:3001';
        // public yourSiteUrl: string = 'http://45.132.242.104:3001';
        //nodejs
        // public yourSiteUrl: string = 'http://31.220.62.185:3001';
        this.consumerKey = "faacc10715566968714dafcf37";
        this.consumerSecret = "0b17d38b15566968718f34b934";
        this.url = this.yourSiteUrl + '/api/';
        this.imgUrl = this.yourSiteUrl + "/";
        this.loader = 'dots';
    }
    return ConfigProvider;
}());
export { ConfigProvider };
//# sourceMappingURL=config.js.map