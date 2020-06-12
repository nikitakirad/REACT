import React, { Component } from 'react';
import Newpost from '../../components/Newpost/Newpost';
import { connect } from 'react-redux';
import Allposts from '../../components/Allposts/Allposts';
import {Menu,Segment,Icon,Sidebar,Loader,Dimmer} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import Axios from '../../axios-instance';
import Validation from '../../components/Validation/Validation';
class blog extends Component{
    state={
        post:{
            title:'',
            content:'',
            userId:'',
            author:'',
            age:''
        },
        fetchedposts:[],
        menuVisible: false,
        loading:false,
        modalOpen:false
    }
    componentDidMount(){
        const token=localStorage.getItem('token');
        const userId=localStorage.getItem('userId');
        if(token){
            this.setState({loading:true});
            const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
            
            Axios.get('/posts.json' +queryParams)
            .then( response => {
                const fetchedPostsFromServer = [];
                
                if(response.data === null){
                   
                    this.setState({loading:false});
                    
                }
                else{
                    for ( let key in response.data ) {
                        fetchedPostsFromServer.push( {
                            ...response.data[key],
                            id: key
                        } );
                       
                    }
            }
                this.setState({fetchedposts:fetchedPostsFromServer,loading:false});

            })
        }
    }
    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => this.setState({ modalOpen: false });

    inputHandler=(event)=>{
        let updatedPost={...this.state.post};
        updatedPost[event.target.name]=event.target.value;
        this.setState({post:updatedPost});
        
    }
    savedDataToServerHandler=()=>{
        if(this.props.isAuthenticated){
            const postdata={...this.state.post,userId:this.props.userid};
            let valid='';
            valid=Validation(postdata);
            if(valid){
                Axios.post('/posts.json?auth=' + this.props.isAuthenticated,postdata)
                .then( response => {
                    alert("Successfully added...");
                    let data=[...this.state.fetchedposts];
                    data.push({...postdata,id:response.data.name})
                    this.setState({
                        fetchedposts:data});
                        this.props.history.push('/login');
                } )
                this.handleClose();
            }
            else{
                alert('please fill all required fields');
            }}
        else{
            this.props.history.push('/login');
        }
    }
    deleteHandler=(id)=>{
        if(window.confirm('Are you sure you want to delete?') === true){
        Axios.delete(`posts/${id}.json`)
            .then(response =>{
                alert("Successfully deleted...");
                let updateFetchedPostAfterDelete=[];
                for(let key in this.state.fetchedposts){
                    if(this.state.fetchedposts[key].id !== id){
                        updateFetchedPostAfterDelete.push(this.state.fetchedposts[key]);
                    }
                }
                this.setState({fetchedposts:updateFetchedPostAfterDelete})
    })}}
    
    postSelectedHandler=(id)=>{
        this.props.history.push('/post/' +id);
    }
    render(){
        
        let allpost=<Allposts posts={this.state.fetchedposts} 
        deletepost={this.deleteHandler}
        editpost={this.editHandler}
        edit={this.updateValueToServer}
        clicked={this.postSelectedHandler}/>
        if(this.state.loading){
            allpost= 
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
        }
    return(
        <div>
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
            
                <Menu.Item as={Link} to ='/logout'><Icon name="block layout" />Logout</Menu.Item> :
                <Menu.Item as={Link} to ='/login'><Icon name="smile" />Log In</Menu.Item>
            }
            </Sidebar>
            <Sidebar.Pusher inverted dimmed={this.state.menuVisible}>
            <Segment textAlign="center">
                <Newpost onInputChange={(event)=>this.inputHandler(event)}
                savedDataToServer={this.savedDataToServerHandler}
                open={this.handleOpen}/><br></br>
                {allpost}
            </Segment>
            </Sidebar.Pusher>
            </Sidebar.Pushable>
       </div>
    );
}
}
const mapStateToProps= state =>{
    return{
        isAuthenticated:state.token,
        userid:state.userId
    }
}
export default connect(mapStateToProps)(blog);