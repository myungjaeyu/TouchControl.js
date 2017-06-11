import { Mobile } from '../modules/Mobile';
import { Desktop } from '../modules/Desktop';

export const load = (element) => {

    let 
        dom = element || window;

    if(navigator.userAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || navigator.userAgent.match(/LG|SAMSUNG|Samsung/) != null){ 
        return new Mobile(dom);
    }else{ 
        return new Desktop(dom);
    }

};