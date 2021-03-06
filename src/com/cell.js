/**
 * Created by Administrator on 2017/5/14.
 */
import {Table, Input, Popconfirm, InputNumber} from 'antd';
import React from 'react';


export  default class Cell extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value: this.props.myvalue,
            editable: this.props.editable || false,
        }

    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.editable !== this.state.editable) {
            this.setState({editable: nextProps.editable});
            if (nextProps.editable) {
                this.cacheValue = this.state.value;

            }
        }
        if (nextProps.status && nextProps.status !== this.props.status) {
            if (nextProps.status === 'save') {
                this.props.onChange(this.state.value);
            } else if (nextProps.status === 'cancel') {
                this.setState({value: this.cacheValue});
                this.props.onChange(this.cacheValue);
            }
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        return nextProps.editable !== this.state.editable ||
            nextState.value !== this.state.value;
    }

    handleChange(e) {
        const value = e.target.value;

        this.setState({value});
        //this.props.value

    }

    render() {
        const {value, editable} = this.state;

        return (
            <div>
                {
                    editable ?
                        <div>

                            <Input
                                type="number"
                                min={1}
                                max={20}
                                defaultValue={this.props.dvalue}
                                onInput={this.props.myvalue}

                            />

                        </div>
                        :
                        <div className="editable-row-text">
                            {value.toString() || ' '}
                        </div>
                }
            </div>
        );
    }
}