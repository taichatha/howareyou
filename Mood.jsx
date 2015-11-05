Mood = React.createClass({
	propTypes: {
		//Thiscomponent gets the mood
		//to display through a React Prop.
		//We can use propTypes to indicate it is required.
		mood: React.PropTypes.object.isRequired
	},

	deleteThisMood() {
		Moods.remove(this.props.mood._id);
	},

	renderDate(){
		day = this.props.mood.createdAt.getDay() + 1;
		month = this.props.mood.createdAt.getMonth();
		year = this.props.mood.createdAt.getFullYear();
		return (month + '/' + day + '/' + year);
	},

	renderTime(){
		ampm= 'am';
		h =this.props.mood.createdAt.getHours();
		m = this.props.mood.createdAt.getMinutes();
		if(h>=12){
			if(h>12) h -= 12;
			ampm = 'pm'
		}
		if(m<10){m = '0'+m;};
		return (h+':' + m + ' ' + ampm);
	},

	render(){
		return(
			<div>
				<button className="delete" onClick={this.deleteThisMood}>
          &times;</button>
				<li className="face">{this.props.mood.text}</li>
				<li>{this.renderTime()}</li>
				<li>{this.renderDate()}</li>
				
			</div>
		);
	}

});