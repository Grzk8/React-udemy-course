import React from 'react';
import Radium, {StyleRoot} from 'radium';

const cockpit = (props) => {
        // let classes = ['red', 'bold'].join(' ');  
        const classes = [];

        if(props.persons.length <= 2){
          classes.push('red'); // classes = ['red']     w className dodajemy .join(' ')
        }
        if (props.persons.length <=1){
          classes.push('bold');  // classes = ['red', bold]     w className dodajemy .join(' ')
        }


          return(
              <StyleRoot>
            <div>
            <h1>{props.title}</h1>
            <p className={classes.join(' ')} >This is really working!</p>  
            <button 
                style={props.style}
                onClick={props.clicked}>Switch Name</button>
            </div>
        </StyleRoot>  
    );
};

export default Radium(cockpit);