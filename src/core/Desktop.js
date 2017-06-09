export class Desktop {
     
    constructor(element){
        
        this.element = element || window;
        this.isTouch = false;

        this.touch = {
            delta : {},
            move : {}
        };
        
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp   = this.mouseUp.bind(this);
        this.mouseMove = this.mouseMove.bind(this);

        this.init();
    }


    init(){
        // console.log('init');
        this.element.addEventListener('mousedown', this.mouseDown);
        
        window.addEventListener('mouseup', this.mouseUp);
        window.addEventListener('mousemove', this.mouseMove);
        
        this.isTouch = false;
    }

    mouseDown(e){
        console.log(this);
        // console.log('mouse down');

        this.isTouch  = true;

        this.touch.move.x = e.screenX;
        this.touch.move.y = e.screenY;
    }

    mouseUp(e){
        // console.log('mouse up');

        this.isTouch = false;

    }

    mouseMove(e){
        if(!this.isTouch) return;
        // console.log('mouse move');

        let screen = {
            width  : window.innerWidth,
            height : window.innerHeight
        };

        if(this.element !== window) screen = {
            width  : this.element.clientWidth,
            height : this.element.clientHeight
        };


        this.touch.delta = {
            x : e.screenX - this.touch.move.x,
            y : e.screenY - this.touch.move.y
        };

        console.log('delta', this.touch.delta);

        this.touch.move = {
            x : e.screenX,
            y : e.screenY
        };

        // console.log('move ', this.touch.move);

        // console.log('screen ', screen)

    }

}
