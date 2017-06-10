export class Desktop {
     
    constructor(element){
        
        this.element = element || window;
        this.isTouch = false;
        this.isMove = false;

        this.touch = {
            delta : {},
            move  : {},
            pitch : 0,
            yaw   : 0,
            type  : '',
            direction : {
                north : false,
                south : false,
                east  : false,
                west  : false
            }
        };
        
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp   = this.mouseUp.bind(this);
        this.mouseMove = this.mouseMove.bind(this);

        this._gesture = {
            type : '',
            count : 0
        };

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
        // console.log(this);
        // console.log('mouse down');

        this.isTouch  = true;

        this.touch.move.x = e.clientX;
        this.touch.move.y = e.clientY;
    }

    mouseUp(e){
        // console.log('mouse up');

        this.isTouch = false;
        this.isMove  = false;

        this.touch.direction = {
            north : false,
            south : false,
            east  : false,
            west  : false
        };

        this._gesture = {
            type : '',
            count : 0
        };

    }

    mouseMove(e){
        if(!this.isTouch) return;
        this.isMove  = true;
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
            x : e.clientX - this.touch.move.x,
            y : e.clientY - this.touch.move.y
        };
       
        this.touch.delta.y > 0 ? ( () => { this.touch.direction.south = true;  this.touch.direction.north = false; } )() : ( ()=> { this.touch.direction.north = true; this.touch.direction.south = false; } )();
        this.touch.delta.x > 0 ? ( () => { this.touch.direction.east  = true;  this.touch.direction.west  = false; } )() : ( ()=> { this.touch.direction.west  = true; this.touch.direction.east  = false; } )();
  
        // console.log('direction', this.touch.direction);
        // console.log('delta', this.touch.delta);

        let 
            typeArr = [],
            type = '';

        Object.keys(this.touch.direction).map( (item) => {
            
            if(this.touch.direction[item]) typeArr.push(item);

        });
        
        if(typeArr.length > 1) type = Math.abs(this.touch.delta.y) > Math.abs(this.touch.delta.x) ? typeArr[0] : typeArr[1];
        
        if(this._gesture.type === type){ 
            this._gesture.count++;
            if(this._gesture.count === 5) this.touch.type = type;
 
        }else this._gesture.count = 0;
        
        this._gesture.type = type;        
    
        this.touch.move = {
            x : e.clientX,
            y : e.clientY
        };

        // console.log('move ', this.touch.move);

        // console.log('screen ', screen)

        let 
            fov    = 45,
            aspect = screen.width / screen.height,
            radian = Math.PI/180,
            half   = Math.PI/2;

        this.touch.yaw   += this.touch.delta.x / screen.width * fov * aspect * radian;
        
        this.touch.pitch += this.touch.delta.y / screen.height * fov * radian;
        this.touch.pitch  = Math.max(-half, Math.min(half, this.touch.pitch));

        // console.log('y yaw', this.touch.yaw);
        // console.log('x pitch', this.touch.pitch);
    }
     
}
