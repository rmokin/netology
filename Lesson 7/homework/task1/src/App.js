import React, {useState} from 'react';
import moment from 'moment';
import './App.css';



function ComponentPrettyMaker(Component, howToWillBePretty){
  return class extends React.Component{
    render(){
      return (
        <Component {...this.props} {...howToWillBePretty(this.props)}/>
      );
    }
  };
}

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

const DateTimePretty = ComponentPrettyMaker(
  DateTime,
  (props) => {
    let date = props.date;
    let datePretty = (diff, text) => {
      const df = Math.floor(diff);
      return df > 0 ? `${df} ${text}` : ''
    };
    let diff = date => moment.duration(moment().diff(date));
    return {...props, 
      date: datePretty(diff(date).asDays(), "days ago") || 
            datePretty(diff(date).asHours(), "hours ago") ||
            datePretty(diff(date).asMinutes(), "minutes ago" ) ||
            datePretty(diff(date).asSeconds(), "seconds ago")
    }
  },
);

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <DateTimePretty date={props.date} />
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: moment().add(-10, 'seconds')
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: moment().add(-2, 'minute')
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: moment().add(-3, 'hour')
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: moment().add(-4, 'day')
        },
    ]);

    return (
        <VideoList list={list} />
    );
}


