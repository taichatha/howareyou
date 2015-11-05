// A basic app container where views will be rendered in
App = React.createClass({

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],


   // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    return {

      moods: Moods.find({}, {sort: {createdAt: -1}}).fetch(),
      currentUser: Meteor.user()
    }
  },
  
  getInitialState: function() {
    
    return {the_date: new Date(), showPast: false};
  },

  onPastClick: function() {
    if(this.state.showPast == false){
      this.setState({ showPast: true});  
    }
    else{
      this.setState({ showPast: false});
    }
    
  },

  dayBefore: function() {
    this.state.the_date.setDate(this.state.the_date.getDate() - 1 );
    
    this.setState({the_date: this.state.the_date});
  },

  dayAfter: function() {
    this.state.the_date.setDate(this.state.the_date.getDate() + 1 );
    
    this.setState({the_date: this.state.the_date});
  },
  renderAllMoods() {
    var moodies = this.data.moods;
    var show = [];
    for(var i = 0; i<moodies.length; i++){
        if(moodies[i].owner === Meteor.userId()){
            show.push(<Mood key={moodies[i]._id} mood={moodies[i]} />);
   
      };
    };

    return (<div>{show}</div>);
  },

  renderDate() {
    return this.state.the_date.toDateString();
  },

  renderMoods() {
    // Get tasks from this.data.moods
    var d = this.state.the_date;
    var moodies = this.data.moods;
    var show = [];
    for(var i = 0; i<moodies.length; i++){
        if(moodies[i].owner === Meteor.userId()){
          if(moodies[i].createdAt.toDateString() === d.toDateString()){
            show.push(<Mood key={moodies[i]._id} mood={moodies[i]} />);
        };
      };
    };

    return (<div>{show}</div>);
  },

  handleSubmit: function() {
    event.preventDefault();

    var text = React.findDOMNode(this.refs.mood).value.trim();

    Moods.insert({
      text: text,
      createdAt: new Date(),            // current time
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username  // username of logged in user
    });

    React.findDOMNode(this.refs.mood).value="0";


  },

  renderToday: function() {
    var today = new Date();
    return today.toDateString();
  },

  render: function() {
    return (
      <div className="container">
        <div className="header">
          <h1>How are You?</h1>
          <AccountsUIWrapper />
        </div>
        
        { this.data.currentUser ?
        <div className="moody">
          <form className="your_mood" onSubmit={this.handleSubmit} >
            <select ref="mood">
              <option value="0" disabled selected>Select your Mood</option>
              <option value=":)">:)</option>
              <option value=":|">:|</option> 
              <option value=":(">:(</option>
            </select>
            <button type="submit">submit</button>
            
          </form> 
        
          <div>
            <div>
              <button onClick={this.dayBefore}>[==</button>
              {this.renderDate()}
              <button onClick={this.dayAfter}>==]</button>
            </div>
            <ul>
              {this.renderMoods()}
            </ul>
          </div>  
          <div>
            <h1>All Moods</h1>
            <button onClick={this.onPastClick}>\/</button>
            {this.state.showPast ? <ul>
              {this.renderAllMoods()}
            </ul> : null }

          </div>  
        </div>
        : '' 
      }
      
      </div>
    );
  }
});
