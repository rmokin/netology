export class Rgb{
    constructor(entity){
        Object.assign(this,{
            r: 0,
            g: 0,
            b: 0,
        }, entity );
    }
    toString() {
        return  (
            "rgb(" +
                ((this.r < 10 && '0') || '') + this.r.toString() + ',' +
                ((this.g < 10 && '0') || '') + this.g.toString() + ',' +
                ((this.b < 10 && '0') || '') + this.b.toString() +
            ")"
        );
    }
    getRGBA(opacity) {
        return  (
            "rgba(" +
                ((this.r < 10 && '0') || '') + this.r.toString() + ',' +
                ((this.g < 10 && '0') || '') + this.g.toString() + ',' +
                ((this.b < 10 && '0') || '') + this.b.toString() + ',' +
                ( opacity || '0.9') +
            ")"
        );
    }
}