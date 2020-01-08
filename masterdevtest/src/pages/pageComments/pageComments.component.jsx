import React from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import BasicTable from '../../components/datatable/datatable.component';

let initialState ={
    comments : []
}
class PageComments extends React.Component{
    columnsComment = [
        {
          name: 'Name',
          selector: 'name',
          sortable: true,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
        }
    ];

    constructor(props){
        super(props);
        this.state={...initialState};
    }
    componentDidMount(){
        const { match : { params : { id } } } = this.props;
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        .then(response => response.json())
        .then(response => this.setState({comments: response}))
        .catch(error=> alert(error));
    }

    filterComments = function(item, filterText) {
        return item.email.toUpperCase().includes(filterText.toUpperCase())  ||
        item.name.toUpperCase().includes(filterText.toUpperCase())
    }
    render(){
        const { comments } = this.state;
        return (<div className='posts-page'>
            {!comments.length?
                <div className='loader-custom'>
                    <Loader
                    type="TailSpin"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    />
                </div>
                :
                <>
                    <h1>Comments</h1>
                    <BasicTable data = {comments} columns={this.columnsComment} filterContext = { this.filterComments}></BasicTable>
                </>
            }
            
        </div>);
    }
}
export default PageComments;