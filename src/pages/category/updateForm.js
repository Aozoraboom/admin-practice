import React, { Component } from 'react';
import {Form,Input} from 'antd';
import PropTypes from 'prop-types';
import { configConsumerProps } from 'antd/lib/config-provider';
const {Item} = Form;
class UpdateForm extends Component {
    state = {}
    static propTypes = {
        categoryName:PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }
    handleChange(){
        const {getFieldValue} = this.props.form;
        console.log(getFieldValue('categoryName'))
    }
    componentWillMount(){
        // 将form对象通过setForm()传递给父组件
        this.props.setForm(this.props.form)
    }
    render() { 
        const {categoryName} = this.props;
        const {getFieldDecorator} = this.props.form; 
        return ( 
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue:categoryName,
                        })(
                            <Input onClick={()=>{this.handleChange()}} placeholder='请输入分类名称'/>
                        )
                    }
                    
                </Item>
            </Form>
        );
    }
}
 
export default Form.create()(UpdateForm);