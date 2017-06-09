export class Mobile {
    
    constructor(element){

        this.element = element || window;
        this.isTouch = false;
 
        this.touch = {
            delta : {},
            move  : {},
            pinch : {}
        };

        this.touchDown = this.touchDown.bind(this);
        this.touchUp   = this.touchUp.bind(this);
        this.touchMove = this.touchMove.bind(this);

        this.init();        
        
    }


    init(){
        console.log('init');
        this.element.addEventListener('touchstart', this.touchDown);

        window.addEventListener('touchend', this.touchUp);
        window.addEventListener('touchmove', this.touchMove);

        this.isTouch = false;        

    }

    touchDown(e){
        console.log(this);
        
    }

    touchUp(e){

    }

    touchMove(e){

    }

}

  