export class ConfigProvider {

  //visual studio
     public yourSiteUrl: string = 'http://localhost:3001';
    // public yourSiteUrl: string = 'http://45.132.242.104:3001';


    //nodejs
    // public yourSiteUrl: string = 'http://31.220.62.185:3001';
  public consumerKey: string = "faacc10715566968714dafcf37";
  public consumerSecret: string = "0b17d38b15566968718f34b934";
  
  public url: string = this.yourSiteUrl + '/api/';
  public imgUrl: string = this.yourSiteUrl + "/";
 
  public loader = 'dots';

}
 