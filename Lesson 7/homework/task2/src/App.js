import React, { useState } from 'react';
import './App.css';

function ComponentPopulizigizm(Component){
  return class extends React.Component{
    render(){

      const ComponentRender = (props) => {
        return (
          <Component {...this.props}/>
        );
      }
      if (this.props.views >= 1000){

        return (
          <Popular>
            <ComponentRender/>
          </Popular>
        );

      }
      if (this.props.views < 100){

        return (
          <New>
            <ComponentRender/>
          </New>
        );

      }
      return (
        <ComponentRender/>
      );
    }
  };
}

function New(props) {
    return (
        <div className="wrap-item wrap-item-new">
            <span className="label">New!</span>
            {props.children}
        </div>
    )
};

function Popular(props) {
    return (
        <div className="wrap-item wrap-item-popular">
            <span className="label">Popular!</span>
            {props.children}
        </div>
    )
};

function Article(props) {
    return (
        <div className="item item-article">
            <h3><a href="#">{props.title}</a></h3>
            <p className="views">Прочтений: {props.views}</p>
        </div>
    )
};

function Video(props) {
    return (
        <div className="item item-video">
            <iframe src={props.url} frameforder={0} allow="autoplay; encrypted-media" ></iframe>
            <p className="views">Просмотров: {props.views}</p>
        </div>
    )
};

const VideoPopulizim = ComponentPopulizigizm(Video);
const ArticlePopulizim = ComponentPopulizigizm(Article);

function List(props) {
    return props.list.map((item,index) => {
        switch (item.type) {
            case 'video':
                return (
                    <VideoPopulizim key={index} {...item} />
                );

            case 'article':
                return (
                    <ArticlePopulizim key={index} {...item} />
                );
        }
    });
};

export default function App() {
    const [list, setList] = useState([
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            views: 50
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            views: 12
        },
        {
            type: 'article',
            title: 'Невероятные события в неизвестном поселке...',
            views: 175
        },
        {
            type: 'article',
            title: 'Секретные данные были раскрыты!',
            views: 1532
        },
        {
            type: 'video',
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            views: 4253
        },
        {
            type: 'article',
            title: 'Кот Бегемот обладает невероятной...',
            views: 12,
        },
    ]);

    return (
        <List list={list} />
    );
}
