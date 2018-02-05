import React from 'react';
import Header from './components/header';
import Player from './page/player';
import MusicList from './page/musicList';
import { MUSIC_LIST } from './config/config';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Pubsub from 'pubsub-js';

export default class Root extends React.Component{
    constructor() {
        super();
        this.state = {
            musicList: MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0]
        };
    };
    playMusic(musicItem) {
        $('#player').jPlayer('setMedia',{
            mp3: musicItem.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem: musicItem
        })
    };
    playNext(type = 'next') {
        let index = this.findMusicIndex(this.state.currentMusicItem);
        let newIndex = null;
        let musicListLength = this.state.musicList.length;
        if(type === 'next') {
            newIndex = (index + 1) % musicListLength;
        }else{
            newIndex = (index - 1 + musicListLength) % musicListLength;
        }
        this.playMusic(this.state.musicList[newIndex]);
    };
    findMusicIndex(musicItem) {
      return this.state.musicList.indexOf(musicItem);
    };
    componentDidMount() {
        $('#player').jPlayer({
            supplied: 'mp3',
            wmode: 'window',
            useStateClassSkin: true
        });
        this.playMusic(this.state.currentMusicItem);
        $('#player').bind($.jPlayer.event.ended, () => {
            this.playNext();
        });
        Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMusic(musicItem);
        });
        Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
            this.setState({
                musicList: this.state.musicList.filter(item => {
                    return item !== musicItem;
                })
            })
        });
        Pubsub.subscribe('PLAY_PREV', (msg, musicItem) => {
            this.playNext('prev');
        });
        Pubsub.subscribe('PLAY_NEXT', (msg, musicItem) => {
            this.playNext();
        });
    };
    componentWillMount() {
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PLAY_PREV');
        Pubsub.unsubscribe('PLAY_NEXT');
        $('#player').unbind($.jPlayer.event.ended);
    };
    render() {
        let This = this;

        const MusicLists = () => (
            <MusicList currentMusicItem={This.state.currentMusicItem} musicList={this.state.musicList}/>
        );

        const Players = () => (
            <Player currentMusicItem={This.state.currentMusicItem} repeatType='1' isPlay={This.state.playState} />
        );

        return (
            <Router>
                <section>
                    <Header />
                    <Route exact path="/" component={Players} />
                    <Route path="/list" component={MusicLists} />
                </section>
            </Router>
        );
    }
}