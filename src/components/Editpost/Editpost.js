import React, { Component } from 'react';
import {Button,TextArea,Input, Segment, Container,Menu,Icon,Sidebar, Header} from 'semantic-ui-react';
import Validation from '../Validation/Validation';
import Axios from '../../axios-instance';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
class editPost extends Component{
    state={
        loadedData:'null'
    }
    componentDidMount(){
        Axios.get(`posts/${this.props.match.params.id}.json`)
        .then(response=>{
            this.setState({loadedData:{...response.data}});
        });
    }
    inputHandler=(event)=>{
        let updatedPost={...this.state.loadedData};
        updatedPost[event.target.name]=event.target.value;
        this.setState({loadedData:updatedPost});
    }
    savedUpdatedDataToServerHandler=()=>{
        let valid=false;
        valid=Validation(this.state.loadedData);
        if(valid){
        Axios.patch(`posts/${this.props.match.params.id}.json`,this.state.loadedData)
    .then( response => {
        alert("Successfully updated...");
        this.props.history.push('/');
    } )}
    else{
        alert('Please fill out required fields');
    }}
    render(){
    return(
            <>
            <Menu inverted attached="top">
            <Menu.Item inverted pointing secondary onClick={() => this.setState({ menuVisible: !this.state.menuVisible })} >
                <Icon name="sidebar" />Menu
            </Menu.Item>          
        </Menu>
        <Sidebar.Pushable inverted
            as={Segment}  >
            <Sidebar as={Menu} animation="overlay" 
            visible={this.state.menuVisible} 
            icon="labeled" vertical width='thin' 
            inverted
            onHide={() => this.setState({ menuVisible: !this.state.menuVisible })}>
        {this.props.isAuthenticated ?
            <><Menu.Item as={Link} to ='/'><Icon name="home" />POSTS</Menu.Item>
            <Menu.Item as={Link} to ='/logout'><Icon name="block layout" />Logout</Menu.Item> </> :
            <Menu.Item as={Link} to ='/login'><Icon name="smile" />Log In</Menu.Item>
        }
        </Sidebar>
        <Sidebar.Pusher inverted dimmed={this.state.menuVisible}>
                
                        <Segment textAlign="center">
                        <Container>
                            <Header>Edit the post</Header>
                            <label><span style={{color: "red"}}>*</span>TITLE:</label><br></br>
                            <Input name="title"  value={this.state.loadedData.title} onChange={this.inputHandler}/><br></br><br></br>
                            <label><span style={{color: "red"}}>*</span>CONTENT:</label><br></br>
                            <TextArea rows="4"  name="content" value={this.state.loadedData.content} onChange={this.inputHandler}/><br></br><br></br>
                            <label><span style={{color: "red"}}>*</span>AUTHOR:</label><br></br>
                            <Input name="author" value={this.state.loadedData.author} onChange={this.inputHandler}/><br></br><br></br>
                            <label>AGE:</label><br></br>
                            <Input type="number" name="age"  value={this.state.loadedData.age} onChange={this.inputHandler}/><br></br><br></br>
                            <Button color="grey" onClick={this.savedUpdatedDataToServerHandler}>
                                Update
                            </Button >
                    </Container>
                    </Segment>
            </Sidebar.Pusher>
            </Sidebar.Pushable>
                    
            </>
    )}}


    const mapStateToProps= state =>{
        return{
            isAuthenticated:state.token,
            userid:state.userId
        }
    }
    export default connect(mapStateToProps)(editPost);