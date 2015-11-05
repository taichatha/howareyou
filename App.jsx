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

  renderAllMoods() {
    return this.data.moods.map((mood) => {
      return (
        <div>
          <Mood key={mood._id} mood={mood} />
        </div>
        );
    });
  },

  renderMoods() {
    // Get tasks from this.data.moods
    var d = new Date();
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
        <h1>How are You?</h1>
        <AccountsUIWrapper />
        
        { this.data.currentUser ?
        <div>
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
