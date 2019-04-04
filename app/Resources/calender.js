import React from "react";
import ReactDOM from 'react-dom';
import dateFns from "date-fns";
import "./App.css";


class Calender extends React.Component {

  constructor(props){
    super(props);
    
  this.state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    selectedRoom: 1,
    starttime: '09:00',
    endtime: '',
    eventname:'',
    eventdetail:''    
};
this.prevMonth=this.prevMonth.bind(this); 
this.nextMonth=this.nextMonth.bind(this); 
this.handleChange = this.handleChange.bind(this);
this.handleSubmit = this.handleSubmit.bind(this); 

  }
//##################################################################//
  handleChange(e){
    if(e.target.name === 'room') {
    this.setState({
      selectedRoom:e.target.value,
    });
  }
  if(e.target.name === 'starttime') {
    this.setState({
      starttime:e.target.value,
    });
  }
  if(e.target.name === 'endtime') {
    this.setState({
      endtime:e.target.value,
    });
  }
  if(e.target.name === 'eventname') {
    this.setState({
      eventname:e.target.value,
    });
  }
  if(e.target.name === 'eventdetail') {
    this.setState({
      eventdetail:e.target.value,
    });
  }
  
  }
//########################################################################//
handleSubmit(e) {

  const datFormat = "YYYY-MM-DD"; 
  console.log('submit called');
  e.preventDefault(); 
        $.ajax({
            url: 'http://127.0.0.1:8000/api/booking',
            type: 'POST',
            data: {
                eventdetail: this.state.eventdetail,
                eventname: this.state.eventname,
                selectedRoom: this.state.selectedRoom,
                selectedDate:  dateFns.format(this.state.selectedDate, datFormat),
                starttime:  this.state.starttime,
                endtime: this.state.endtime
            },
            dataType: 'json',
            success: function(response) {
                console.log('submit ' + response.success_message);
                this.setState({
                  currentMonth: new Date(),
                  selectedDate: new Date(),
                  selectedRoom: 1,
                  starttime: '09:00',
                  endtime: '',
                  eventname:'',
                  eventdetail:''
                });
            }.bind(this),
            error: function(xhr) {
                console.log(`An error occured: ${xhr.status} ${xhr.statusText}`);
            }   
    });

      }

//####################################################################

renderHeader() {
  const dateFormat = "MMMM YYYY";

  return (
    <div className="header row flex-middle">
      <div className="col col-start">
        <div className="icon" onClick={this.prevMonth}>
          chevron_left
        </div>
      </div>
      <div className="col col-center">
        <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
      </div>
      <div className="col col-end" onClick={this.nextMonth}>
        <div className="icon">chevron_right</div>
      </div>
    </div>
  );
}

renderDays() {
  const dateFormat = "dddd";
  const days = [];

  let startDate = dateFns.startOfWeek(this.state.currentMonth);

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col col-center" key={i}>
        {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
      </div>
    );
  }

  return <div className="days row">{days}</div>;
}

renderCells() {
  const { currentMonth, selectedDate } = this.state;
  const monthStart = dateFns.startOfMonth(currentMonth);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart);
  const endDate = dateFns.endOfWeek(monthEnd);

  const dateFormat = "D";
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = dateFns.format(day, dateFormat);
      const cloneDay = day;
      days.push(
        <div
          className={`col cell ${
            !dateFns.isSameMonth(day, monthStart)
              ? "disabled"
              : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
          }`}
          key={day}
          onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
        >
          <span className="number">{formattedDate}</span>
          <span className="bg">{formattedDate}</span>
        </div>
      );
      day = dateFns.addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
}
//###################################################################
onDateClick(day){
  this.setState({
    selectedDate: day
  });
};

nextMonth(){
  this.setState({
    currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
  });
};

prevMonth(){
  this.setState({
    currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
  });
};

handleAlternate(event) {
  event.preventDefault();
  console.log("checked")
}

//##################################################################
    render() {
      const datFormat = "DD/MM/YYYY"; 
      return (
        <div className="App" >
          <header>
            <div id="logo">
              <span className="icon">date_range</span>
              <span>
                Schedule <b>calendar</b>
              </span>
            </div>
          </header>      
          <div>
      
        <div style={{float: 'left'}}>
				<form method='POST'onSubmit={this.handleSubmit} >
        <div className="form-header">
        <h4>Booking</h4>
        </div>
				<div className="form-group">
					Event Name:	<input type="text" name="eventname" value={this.state.eventname} onChange={this.handleChange} className="form-control"  required="required"/>
				</div>
        <div className="form-group">
					Event Description:	<input type="text" name="eventdetail" value={this.state.eventdetail} onChange={this.handleChange} className="form-control"  required="required"/>
				</div>
        <div className="form-group">
					Room Selected:	 <select className="form-control" name="room" value={this.state.selectedRoom} onChange={this.handleChange}>
            <option value='1'>Alpha Room</option>
            <option value='2'>Beta Room</option>
            <option value='3'>Neutron Room</option>
          </select>
				</div>
        <div className="form-group">
				Booking Date:	<input type="textArea" name="bookdate" value={dateFns.format(this.state.selectedDate, datFormat)} name="eventdetails" className="form-control"  required="required" readOnly/>
				</div>
        <div className="form-group">
					Start Time:	<input type="time" step="1800" min="09:00" name="starttime" value={this.state.starttime} onChange={this.handleChange} max="22:30" className="form-control"  required="required"/>
				</div>
        <div className="form-group">
	     	End Time: <input type="time" step="1800"  min="09:30" max="23:00" name="endtime" value={this.state.endtime} onChange={this.handleChange}  className="form-control"  required="required"/>
				</div>

					<div className="form-group">
          <button onClick={this.handleAlternate.bind(this)}  className="btn btn-success">Check Availability</button>
          <button type="submit" style={{marginLeft:'5px'}} className="btn btn-primary">Submit</button>     
					</div>
				</form>						
		  	</div>

         </div >
          <div style={{marginLeft:'350px'}}>
          <main>
          <div className="calendar">
      {this.renderHeader()}
      {this.renderDays()}
      {this.renderCells()}
       </div>
          </main>
         </div>
         
         </div>
   
      );
    }
  }


ReactDOM.render(<Calender/>, document.getElementById('root'));