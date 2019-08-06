import React,{useState} from 'react';
import {Rgb} from '../models/Rgb';
import '../App.css';

export function RgbToHex(props){

    const [form, setForm] = useState({
        color: null,
    });



    const handleSetColor = (e) => {

        const color = e.target.value;

        setForm((prevState) => {
            return (
                {...prevState, color: color}
            );
        });
    };

    function hexToRgb(color){
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
        return (
            ( (!color || color === '#') && 'no color') || 
            (color && !result && 'bad color') ||
            (result && new Rgb({
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            }))
        );
    }

    const color = hexToRgb(form.color);
    return (
        <div className="main-div" style={{backgroundColor: color instanceof Rgb && color.getRGBA(0.9) }}>
            <div className="center-div">
                <form>
                    <div className="color-setter">
                        <input className="color-setter-value" type="text" value={form.color ? '#' + form.color.replace('#','') : '#'} onChange={handleSetColor} />
                        <div className="color-setter-marker" style={{backgroundColor: color instanceof Rgb && color.getRGBA(1.0) }}>
                            {color.toString()}
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
    );

}

