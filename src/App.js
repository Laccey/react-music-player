import React from 'react';
import Header from './components/header';
import Player from './page/player';
import MusicList from './page/musicList';
import { MUSIC_LIST } from './config/config';
import { BrowserRouter, Route, Link } from 'react-router-dom';

class App extends React.Component{
	constructor() {
        super();
        this.state = {
        	musicList: MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0]
        };
	};
	componentDidMount() {
		$('#player').jPlayer({
			ready() {
				$('#player').jPlayer('setMedia',{
					mp3: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3'
				}).jPlayer('play');
			},
			supplied: 'mp3',
			wmode: 'window',
			useStateClassSkin: true
		});
	};
    render() {
        return (
            <div>
                <Header />
                <Route render={() => <Player currentMusicItem={this.state.currentMusicItem}></Player>}></Route>
                <Route path='/list' render={() => <MusicList musicList={this.state.musicList} currentMusicItem={this.state.currentMusicItem}></MusicList> }></Route>
            </div>
        );
    }
}

export default App;