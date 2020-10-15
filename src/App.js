import React, { Component } from 'react';
import './App.css';
import Radium, {StyleRoot} from 'radium';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 'grfgr54y654', name: 'Max', age: 28 },
      { id: 't56565', name: 'Manu', age: 29 },
      { id: 'hjuyk', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    });

    const person = {...this.state.persons[personIndex]};

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( { persons: persons } )
  }
  // delete: index- kliknięty element, 1. podstawiamy za zmienną listę z któeej chcemy usunąć (żeby nie zmieniać state kopiujemy - destrukturyzacja)
  // 2. usuwamy jeden el poprzes splice(index,1) 1 to 1 el. 3 aktualizajja
  deletePersonHandler = (Index) => {
    const persons = [...this.state.persons];
    persons.splice(Index,1);
    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }


  render () {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {           // radium psełdoselektor
        backgroundColor: 'lightgreen',
        color: 'black',
      }
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
            name={person.name} 
            age={person.age}
            click={() => this.deletePersonHandler(index)}
            key={person.id}
            changed={(event) => this.nameChangedHandler(event, person.id)}
            />
          })}
      </div>
      )
      style.backgroundColor = 'red';
      style[':hover'] = {         // radium psełdoselektor
        backgroundColor: 'salmon',
        color: 'black'
      }
    };

    // let classes = ['red', 'bold'].join(' ');  
    const classes = [];

    if(this.state.persons.length <= 2){
      classes.push('red'); // classes = ['red']     w className dodajemy .join(' ')
    }
    if (this.state.persons.length <=1){
      classes.push('bold');  // classes = ['red', bold]     w className dodajemy .join(' ')
    }
    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')} >This is really working!</p>  
          <button 
            style={style}
            onClick={this.togglePersonsHandler}>Switch Name</button>
        {persons}
        </div>
      </StyleRoot>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default Radium(App);
