export class Mobile {
    
    constructor(element){

        this.element = element || window;
        this.isTouch = false;
        this.isPinch = false;
 
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
        // console.log(this);
        console.log('touch start');

        this.isTouch = true;

        if(e.touches.length > 1){

            this.touch.pinch.x = e.touches[0].pageX - e.touches[1].pageX;
            this.touch.pinch.y = e.touches[0].pageY - e.touches[1].pageY;
 
            this.touch.pinch.start = Math.sqrt(this.touch.pinch.x * this.touch.pinch.x + this.touch.pinch.y * this.touch.pinch.y);
            // console.log('pinch start' ,this.touch.pinch.start);
            return;
        }
        

    }

    touchUp(e){ 
        console.log('touch end');
        
        this.isTouch = false;
        this.isPinch = true;
    }

    touchMove(e){
        if(!this.isTouch) return;   
        console.log('touch move');

        if(e.touches.length > 1){
            
            this.touch.pinch.x = e.touches[0].pageX - e.touches[1].pageX;
            this.touch.pinch.y = e.touches[0].pageY - e.touches[1].pageY;
            // console.log('pinch ' ,this.touch.pinch);

            this.touch.pinch.end = Math.sqrt(this.touch.pinch.x * this.touch.pinch.x + this.touch.pinch.y * this.touch.pinch.y);
            // console.log('pinch end ' ,this.touch.pinch.end);


            this.touch.pinch.zoom = this.touch.pinch.start / this.touch.pinch.end;
            // this.touch.pinch.start = this.touch.pinch.end;
             
            console.log('pinch zoom', this.touch.pinch.zoom);

            let 
                fov = 45;

            this.touch.pinch.fov = fov * this.touch.pinch.zoom;
            console.log('pinch fov', this.touch.pinch.fov);

            this.isPinch = true;
            return;
        }

    }

}

  