/**
 * Created by Administrator on 2017/10/21.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import MyLayout from '../layout/MyLayout'
import MySplash from '../com/splash'
import {Carousel, Card} from 'antd';
export default class Home extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <MyLayout>
                    <MySplash></MySplash>
                </MyLayout>
            </div>

        )
    }

}