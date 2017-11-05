// Setting default values
document.getElementById('date').valueAsDate = new Date();
document.getElementById("time").defaultValue = "09:00";

// Function used for adding tasks to timeline
function addTask(){
	// Dismiss popup
	window.location.hash = "#my-new-hash";

	var months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
	var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	var types = ['Appointment','Meeting'];

	// Caputre inputs
	var taskData = [];
	var dateDOM = document.getElementById('date');
	var date = new Date(dateDOM.value);
	taskData.dayNumber = date.getUTCDate() < 10 ? '0'+date.getUTCDate() : date.getUTCDate();
	taskData.dayName = days[date.getDay()];
	taskData.month = months[date.getUTCMonth()];
	taskData.year = date.getUTCFullYear();

	taskData.author = 'John Doe'; // For now this is hardcoded

	var timeDOM = document.getElementById('time');
	taskData.time = timeDOM.value;
	var titleDOM = document.getElementById('title');
	taskData.title = titleDOM.value;
	var typeDOM = document.getElementById('type');
	taskData.type = types[typeDOM.value];
	var descDOM = document.getElementById('desc');
	taskData.desc = descDOM.value;

	

	addTaskHtml(taskData);
}

function addTaskHtml(taskData){
	// Count li elements to see if we're adding an odd or an even li
	var oddElement = document.getElementsByClassName('timeline-li').length %2 == 0;
	
	// Add HTML
	var timelineElement = document.getElementById('timeline-ul');
	var newTaskElement = `<li class="timeline-li">`;
	// The only part that's different between odd and even tasks is the order of the
	// .icon elements and the direction of the margin
	if(oddElement){
		newTaskElement += `
				<div class="icon blue">
					<div class="event-type inline mr-5">`+taskData.type+`</div>
					<div class="container inline">
			    		<span class="event-icon">
			    			<i class="fa fa-calendar" aria-hidden="true"></i>
			    		</span>
			    		<span class="event-time block grey">`+taskData.time+`</span>
			    	</div>
				</div>`;
	} else {
		newTaskElement += `
				<div class="icon blue">
					<div class="container inline">
			    		<span class="event-icon">
			    			<i class="fa fa-calendar" aria-hidden="true"></i>
			    		</span>
			    		<span class="event-time block grey">`+taskData.time+`</span>
			    	</div>
					<div class="event-type inline ml-5">`+taskData.type+`</div>
				</div>`;
	}

	newTaskElement += `
				<div class="content">
					<div class="event-date">
						<span class="day-number">`+taskData.dayNumber+`</span>
						<div class="container inline ml-10">
							<span class="day-name block">`+taskData.dayName+`</span>
							<span class="month-year block grey">`+taskData.month+' '+taskData.year+`</span>
						</div>
					</div>
					<div class="event-type grey"><i class="fa fa-info-circle" aria-hidden="true"></i>`+type+`</div>
					<div class="event-text grey">
						<i class="fa fa-pencil" aria-hidden="true"></i>
						<p class="inline">
							`+taskData.desc+`
						</p>
					</div>
				</div>
				<div class="author grey">by `+taskData.author+`</div>
			</li>`

	timelineElement.innerHTML += newTaskElement;
}