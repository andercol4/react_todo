var List = React.createClass({
  // this function sets up the basic format.
  getInitialState: function() {
    return { items: []};
  },
  componentDidMount: function(){
    this.refreshList()
  },
  // This function goes and grabs all the stuff we need from the DB
  refreshList: function(){
    var self = this;
    $.ajax({
      url: '/items',
      type: 'GET',
      data: {list_id: this.props.id},
      success: function(data) {
        self.setState({items: data.items})
      }
    });
  },

  showAddForm: function() {
    this.setState({showAdd: !this.state.showAdd})
  },

  addItemForm: function() {
    if (this.state.showAdd) {
      return(<div>
              <form onSubmit={this.submitItem}>
                <div className='input-field'>
                  <input autoFocus='true' placeholder='Item name' type='text' onChange={this.addItemName} />
                  <button className='btn waves-effect' type='submit'>Save</button>
                </div>
              </form>
            </div>);
    }
  },

  submitItem: function(e) {
    e.preventDefault()
    var self = this;
    $.ajax({
      url: '/items',
      type: 'POST',
      data: {list_id: this.props.id, item: {name: this.state.itemName}},
      success: function(data) {
        var items = self.state.items;
        items.push(data);
        self.setState({items: items, showAdd: false, itemName: null});
      }
    });
  },

  addItemName: function(e) {
    this.setState({itemName: e.currentTarget.value});
  },

  displayItems: function() {
    var items = [];
    for(var i=0; i < this.state.items.length; i++){
      var item = this.state.items[i]
      var key = "Item-" + item.id
      items.push(<Item refreshList={this.refreshList} listId={this.props.id} url={item.url} key={key} id={item.id} name={item.name} complete={item.complete} />)
    };
    return items;
  },

  deleteList: function(){
    var self = this;
    $.ajax({
      url: this.props.url,
      type: 'DELETE',
      success: function() {
        self.props.fetchLists();
      }
    });
  },

  render: function() {
    return(<div>
            <div className='card blue-grey darken-1'>
              <div className='card-content white-text'>
                <div className="right">
                  <button className='btn' onClick={this.deleteList}>Delete List</button>
                </div>
                <span className='card-title'>{this.props.name}</span>
                <ul>
                  {this.displayItems()}
                </ul>
                <a className='waves-effect waves-light btn' onClick={this.showAddForm}>Add Item</a>
                {this.addItemForm()}
              </div>
            </div>
          </div>);
  }
});
