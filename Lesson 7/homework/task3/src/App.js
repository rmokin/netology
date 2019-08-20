import React from 'react';
import moment from 'moment';
import './App.css';

function SortedComponent(Component, sortBy, sortPrint){
  return class extends React.Component{

    howToSort = (list, sortBy, sortPrint) => {

      let items = {};
      let keys = [];
      for (let item of list) {
        const k = moment(item.date).format(
          (sortBy === "year" && "YYYY-01-01") ||
          (sortBy === "month" && "2000-MM-01") ||
          (sortBy === "date" && "YYYY-MM-DD")
        );
        items[k] = items[k] || {
          [sortBy]: k,
          amount: 0
        };
        items[k].amount += item.amount; 
        (keys.indexOf(k) < 0) && keys.push(k);
      }
      return keys.sort().map((sortedKey) => { 
        return {
          ...items[sortedKey],
          [sortBy]: sortPrint(sortedKey),
        }; 
      });

    }

    render(){
      return (
        <Component {...this.props} list={this.howToSort(this.props.list, sortBy, sortPrint)} />
      );
    }
  };
}

function YearTable(props) {
    console.log('YearTable', props);

    return (
        <div>
            <h2>Year Table</h2>
            <table>
                <thead>
                  <tr>
                      <th>Month</th>
                      <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {props.list.map((item,index) => (
                      <tr key={index}>
                          <td>{item.year}</td>
                          <td>{item.amount}</td>
                      </tr>
                  ))}
                </tbody>
            </table>
        </div>
    );
};

function SortTable(props) {
    console.log('SortTable', props);

    return (
        <div>
            <h2>Sort Table</h2>
            <table>
                <thead>
                  <tr>
                      <th>Month</th>
                      <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {props.list.map((item,index) => (
                      <tr key={index}>
                          <td>{item.date}</td>
                          <td>{item.amount}</td>
                      </tr>
                  ))}
                </tbody>
            </table>
        </div>
    );
};

function MonthTable(props) {
    console.log('MonthTable', props);

    return (
        <div>
            <h2>Month Table</h2>
            <table>
                <thead>
                  <tr>
                      <th>Month</th>
                      <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {props.list.map((item,index) => (
                      <tr key={index}>
                          <td>{item.month}</td>
                          <td>{item.amount}</td>
                      </tr>
                  ))}
                </tbody>
            </table>
        </div>
    );
};

const SortedYearTable = SortedComponent(
  YearTable,
  "year",
  (key) => moment(key).format('YYYY')
);

const SortedMonthTable = SortedComponent(
  MonthTable,
  "month",
  (key) => moment(key).format('MMM')
);

const SortedDateTable = SortedComponent(
  SortTable,
  "date",
  (key) => moment(key).format('YYYY-MM-DD')
);

// TODO:
// 1. Загрузите данные с помощью fetch: https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json
// 2. Не забудьте вынести URL в переменные окружения (не хардкодьте их здесь)
// 3. Положите их в state
export default class App extends React.Component {
    state = {
        list: []
    };

    componentDidMount(){
      fetch(process.env.REACT_APP_DATA_URL,{
          cache: 'no-cache',
          method: 'GET',
          referrer: 'no-referrer',
      })
          .then((response) => {debugger; return response.json()})
          .then((json) => {
            
            this.setState({
              list: json.list,
            })
          })
    }

    render() {
        const {list} = this.state;
        return (
            
            <div id="app">
                <SortedMonthTable list={list} />
                <SortedYearTable list={list} />
                <SortedDateTable list={list} />
            </div>
        );
    }
}