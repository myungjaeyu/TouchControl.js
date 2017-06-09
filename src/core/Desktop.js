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
        console.log('init');
        this.element.addEventListener('mousedown', this.mouseDown);
        
        window.addEventListener('mouseup', this.mouseUp);
        window.addEventListener('mousemove', this.mouseMove);
        
        this.isTouch = false;
    }

    mouseDown(e){
        console.log(this);
        
    }

    mouseUp(e){

    }

    mouseMove(e){

    }

} 