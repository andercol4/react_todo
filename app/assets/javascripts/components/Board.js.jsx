var Board = React.createClass({
  getInitialState: function(){
    return({editBoard: false, editName: this.props.name})
  },

  loadBoard: function() {
    this.props.toggleBoard(this.props.id)
  },

  toggleEditBoard: function() {
    this.setState({editBoard: !this.state.editBoard})
  },

  editBoard: function(id){
    var self = this;
    var name = this.refs.boardName.value;
    self.setState({editName: name, editBoard: false});
    $.ajax({
      url: '/boards/' + id,
      type: 'PUT',
      data: {board: {name: this.refs.boardName.value}},
      success: function(data){
      self.setState({editName: name, editBoard: false})
      }
    });
  },

  view: function() {
    var board = this.props
    return(
      <div className='col s4'>
        <div className='row'>
          <div className='card blue-grey darken-1'>
            <div className='card-content white-text' onClick={this.loadBoard}>
              <span className='card-title'>{this.state.editName}</span>
            </div>
            <div className='card-action'>
              <a onClick={this.toggleEditBoard}>Edit Board</a>
              <a onClick={() => board.deleteBoard(board.id)}>Delete Board</a>
            </div>
          </div>
        </div>
      </div>);
  },

  edit: function() {
    var board = this.props
    return(
      <div className='col s4'>
        <div className='row'>
          <div className='card blue-grey darken-1'>
            <div className='card-content white-text'>
              <form>
                <input autoFocus="true" type='text' defaultValue={this.state.editName} ref="boardName" />
              </form>
            </div>
            <div className='card-action'>
              <a onClick={() => this.editBoard(board.id)}>Submit Edit</a>
              <a onClick={this.toggleEditBoard}>Cancel Change</a>
              <a onClick={() => board.deleteBoard(board.id)}>Delete Edit</a>
            </div>
          </div>
        </div>
      </div>);
  },

  render: function () {
    if(this.state.editBoard)
      return(this.edit());
    else
      return(this.view());
  }
});
