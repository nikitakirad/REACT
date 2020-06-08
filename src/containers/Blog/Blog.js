import React, { Component } from 'react';
import Newpost from '../../components/Newpost/Newpost';
import { connect } from 'react-redux';
import Allposts from '../../components/Allposts/Allposts';
import {Menu,Segment,Icon,Sidebar,Loader,Dimmer} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import Axios from '../../axios-orders';
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
        loading:false
    }
    componentDidMount(){
        if(this.props.isAuthenticated){
            this.setState({loading:true});
            const queryParams = '?auth=' + this.props.isAuthenticated + '&orderBy="userId"&equalTo="' + this.props.userid + '"';
            // console.log(queryParams);
            Axios.get('/posts.json' +queryParams)
            .then( response => {
                const fetchedPostsFromServer = [];
                // console.log(res.data);
                if(response.data === null){
                    //alert('No post yet Please add it');
                    this.setState({loading:false});
                    
                }
                else{
                    for ( let key in response.data ) {
                        fetchedPostsFromServer.push( {
                            ...response.data[key],
                            id: key
                        } );
                        // console.log(fetchedOrders);
                        // console.log(this.state.fetchedposts);
                    }
            }
                this.setState({fetchedposts:fetchedPostsFromServer,loading:false});

            })
        }
    }
    inputHandler=(event)=>{
        let updatedPost={...this.state.post};
        updatedPost[event.target.name]=event.target.value;
        this.setState({post:updatedPost});
        // console.log(this.state.post);
    }
    savedDataToServerHandler=()=>{
        if(this.props.isAuthenticated){
            const postdata={...this.state.post,userId:this.props.userid};
            // console.log(this.props.token);
            //console.log(Validation(postdata));
            console.log(postdata);
            let valid='';
            valid=Validation(postdata);
            if(valid){
                console.log(valid);
                Axios.post('/posts.json?auth=' + this.props.isAuthenticated,postdata)
                .then( response => {
                    // console.log( response.data );
                    alert("Successfully added...");
                    this.setState(previousstate=>(
                        previousstate.fetchedposts.push({...postdata,id:response.data.name})
                    ));
                    // console.log(this.state.fetchedposts);
                } )}
            else{
                console.log(valid);
                alert('please fill all required fields');
            }}
        else{
            this.props.history.push('/login');
        }
    }
    deleteHandler=(id)=>{
        console.log(id);
        if(window.confirm('Are you sure you want to delete?') === true){
        Axios.delete(`posts/${id}.json`)
            .then(response =>{
                alert("Successfully deleted...");
                let updateFetchedPostAfterDelete=[];
                for(let key in this.state.fetchedposts){
                    if(this.state.fetchedposts[key].id !== id){
                        updateFetchedPostAfterDelete.push(this.state.fetchedposts[key]);
                        // console.log(updateFetchedPostAfterDelete);
                    }
                }
                // console.log(updateFetchedPostAfterDelete);
                this.setState({fetchedposts:updateFetchedPostAfterDelete})
    })}}
    // storeEditedPostOnServer={
    //     title:'',
    //     content:''
    // }
    // editHandler=(id,event)=>{
    //     // console.log(event);
    //     // console.log(id);
    //     let editParticularPost=[...this.state.fetchedposts]
    //     // console.log(this.storeEditedPostOnServer);
    //     for(let key in editParticularPost){
    //         if(editParticularPost[key].id === id ){
    //             this.storeEditedPostOnServer={...editParticularPost[key]}
    //             editParticularPost[key][event.target.name]=event.target.value;
    //             this.storeEditedPostOnServer[event.target.name]=event.target.value;
                
    //         }
    //     }
    //     // console.log(editParticularPost);
    //     let valid='';
    //     valid=Validation(this.storeEditedPostOnServer);
    //     if(valid){
    //         this.setState({fetchedposts:editParticularPost});}
    //     // console.log(this.storeEditedPostOnServer);
    //     else{
    //         alert('Please Fill out required fields');
    //     }
    // }
    // updateValueToServer=(id)=>{
    //     console.log(id);
        
        
    //         Axios.patch(`posts/${id}.json`,this.storeEditedPostOnServer)
    //         .then(response => {
    //                 console.log(response)
    //                 alert("Successfully edited...");
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }
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
            console.log("loading")
            allpost= 
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
            
            console.log(allpost)
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
                {/* <Segment inverted> */}
                    {/* //</Sidebar.Pusher><Menu inverted pointing secondary> */}
                    {/* {this.props.isAuthenticated ?
                    (<Menu.Item position="right">
                        <Button  color="grey" as={Link} to ='/'>Posts</Button>
                        <Button  color="grey" as={Link} to ='/logout'>Log out</Button>
                    </Menu.Item>) :
                    (<Menu.Item position="right">
                        <Button  color="grey" as={Link} to ='/login'>Log In</Button>
                    </Menu.Item>)
            } */}
            {/* //</Menu>
            //</Sidebar.Pushable></Segment> */}
            <Segment textAlign="center">
                <Newpost onInputChange={(event)=>this.inputHandler(event)}
                savedDataToServer={this.savedDataToServerHandler}/><br></br>
                {/* <Allposts posts={this.state.fetchedposts} 
                deletepost={this.deleteHandler}
                editpost={this.editHandler}
                edit={this.updateValueToServer}
                clicked={this.postSelectedHandler}/> */}
                {allpost}
            </Segment>
            </Sidebar.Pusher>
            </Sidebar.Pushable>
       </div>
    );
}
}
const mapStateToProps= state =>{
    console.log(state);
    return{
        isAuthenticated:state.token,
        userid:state.userId
    }
}
export default connect(mapStateToProps)(blog);