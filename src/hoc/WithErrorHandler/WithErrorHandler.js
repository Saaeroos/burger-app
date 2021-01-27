import React, { Component } from 'react'

import Aux from '../Aux/Aux'
import Modal from '../../Components/UI/Modal/Modal'

const WithErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        clearErrorHandler = ()=> {
            this.setState({
                error: null
            })
        }
        componentWillMount (){
            this.reqInterceptors = axios.interceptors.request.use(req=>{
                this.setState({
                    error: null
                })
                return req;
            })
            this.resInterceptors = axios.interceptors.response.use(res=>res, error=>{
                this.setState({
                    error: error
                })
            })
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptors)
            axios.interceptors.response.eject(this.resInterceptors)
        }
        render(){
            return(
                <Aux>
                    <Modal show={this.state.error} close={this.clearErrorHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default WithErrorHandler