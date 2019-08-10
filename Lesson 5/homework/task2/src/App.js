import React from 'react';
import {Tab,TabItem} from './components/Tab';
import {NavBar} from './components/NavBar';
import Rate from './components/Rate';
import Clock from './components/Clock';
import ItemList from './components/ItemList';
import './App.css';


function App() {
  return (
    <div className="wrapper">
      <Tab>
        <TabItem name="Сейчас в СМИ">
          <div className="item-news">
            <i className="fa fa-address-book" aria-hidden="true"></i>
            <span>Новость 1</span>
          </div>
          <div className="item-news">
            <i className="fa fa-meetup" aria-hidden="true"></i>
            <span>Новость 2</span>
          </div>
          <div className="item-news">
            <i className="fa fa-s15" aria-hidden="true"></i>
            <span>Новость 3</span>
          </div>
        </TabItem>
        <TabItem name="Сейчас в Германии">
          <div className="item-news">
            <i className="fa fa-address-book" aria-hidden="true"></i>
            <span>Новость 5</span>
          </div>
          
        </TabItem>
        <TabItem name="Рекомендуем" href="https://www.google.ru">
          
        </TabItem>
        <Clock className="clock"  href={false} format="DD MMMM YY, dd,  hh:mm:ss"/>          
      </Tab>
      <br/>
      <NavBar className="rates">
        <Rate rate={65.03} delta={0.8} link="https://news.yandex.ru/quotes">
          USD MOEX
        </Rate>
        <Rate rate={78.03} delta={-0.1} link="https://news.yandex.ru/quotes">
          EUR NASDAQ
        </Rate>
      </NavBar>
      <div className="searcher">
        <NavBar className="hotlinks">
          <a href="https://yandex.ru/portal/video?stream_active=category&stream_channel=default&stream_category=film&from_block=video-tabs&from=morda">
            Видео
          </a>
          <a href="https://yandex.ru/images/">
            Картинки
          </a>
          <a href="https://google.ru/">
            Google
          </a>
        </NavBar>
        <div className="searcher-control">
          <input type="text" />
          <button>Найти</button>
        </div>
      </div>
      <div className="ad-block">
        <div style={{marginTop:'15px'}}>Реклама</div>
      </div>
      <div className="reblicks">
      <ItemList position="horizontal">
        <div>
          <h3>
            Погода
          </h3>
          <table>
            <tr>
              <td style={{fontSize:"32px"}}>
                +27
              </td>
              <td style={{fontSize:"10px"}}>
                Днем +27, вечером +10
              </td>
            </tr>
          </table>
        </div>
        <div>
          <h3>
            Карта Лупыри
          </h3>
          <ItemList position="horizontal">
            <a className="small-link" href="http://yandex.ru?search=Лупыри Такси">Такси</a>
            <a className="small-link" href="http://yandex.ru?search=Лупыри Лыжи">Лыжи</a>
          </ItemList>
        </div>
        <div>
          <h3>
            Телепрограмма
            <button>Смотреть</button>
          </h3>
          <ItemList position="vertical">
            <span>
              10:30 Кто-то где-то с чем-то
            </span>
            <span>
              11:30 Патамушто
            </span>
            <span>
              20:30 Голубей любить
            </span>
            
          </ItemList>
        </div>
        
      </ItemList>
      </div>
       
    </div>
    
  );
}

export default App;
