import React from 'react';
import '../css/musicListItem.less';

export default class MusicListItem extends React.Component{
    render(){
        let musicItem = this.props.musicItem;
        return (
            <li className={`components-musiclistitem row ${this.props.focus ? 'focus' : ''}`}>
                <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
                <p className="-col-auto delete"></p>
            </li>
        )
    }
}