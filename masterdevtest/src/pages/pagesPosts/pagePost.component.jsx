import React from 'react';
import {withRouter} from 'react-router-dom';

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import BasicTable from '../../components/datatable/datatable.component';
import './pagePost.styles.scss';

const initialState =
{
    posts : []
};
class PagePosts extends React.Component{
    columnsPost = [
        {
          name: 'Title',
          selector: 'title',
          sortable: true,
        },
        
        {
          cell:(row) => <button onClick={this.handleButtonClick} id={row.id}>show all comments</button>,
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
        }
    ];
    
    constructor(props){
        super(props);
        this.state ={ ...initialState };
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(
            response => response.json()
        ).then(
            response=> this.setState({posts: response})
        )
        .catch(error => alert(error));
    }

      
    handleButtonClick = (state) => {
        const {target:{id}}= state;
        this.props.history.push(`/comments/${id}`);
    };
      
    filterPosts = function(item, filterText) {
        return  item.title.toUpperCase().includes(filterText.toUpperCase())
    }

    render(){
        const { posts } = this.state;
        return <div className='posts-page'>
            {!posts.length?
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
                    <h1>Posts</h1>
                    <BasicTable data = {posts} columns={this.columnsPost} filterContext={this.filterPosts} ></BasicTable>
                </>
            }
            
        </div>
    }
}
export default withRouter(PagePosts);