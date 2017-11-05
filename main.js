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
	var dateDOM = document.getElementById('date');
	var date = new Date(dateDOM.value);
	var dayNumber = date.getUTCDate() < 10 ? '0'+date.getUTCDate() : date.getUTCDate();
	var dayName = days[date.getDay()];
	var month = months[date.getUTCMonth()];
	var year = date.getUTCFullYear();

	var author = 'John Doe'; // For now this is hardcoded

	var timeDOM = document.getElementById('time');
	var titleDOM = document.getElementById('title');
	var typeDOM = document.getElementById('type');
	var type = types[typeDOM.value];
	var descDOM = document.getElementById('desc');

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
					<div class="event-type inline mr-5">`+type+`</div>
					<div class="container inline">
			    		<span class="event-icon">
			    			<i class="fa fa-calendar" aria-hidden="true"></i>
			    		</span>
			    		<span class="event-time block grey">`+timeDOM.value+`</span>
			    	</div>
				</div>`;
	} else {
		newTaskElement += `
				<div class="icon blue">
					<div class="container inline">
			    		<span class="event-icon">
			    			<i class="fa fa-calendar" aria-hidden="true"></i>
			    		</span>
			    		<span class="event-time block grey">`+timeDOM.value+`</span>
			    	</div>
					<div class="event-type inline ml-5">`+type+`</div>
				</div>`;
	}

	newTaskElement += `
				<div class="content">
					<div class="event-date">
						<span class="day-number">`+dayNumber+`</span>
						<div class="container inline ml-10">
							<span class="day-name block">`+dayName+`</span>
							<span class="month-year block grey">`+month+' '+year+`</span>
						</div>
					</div>
					<div class="event-type grey"><i class="fa fa-info-circle" aria-hidden="true"></i>`+type+`</div>
					<div class="event-text grey">
						<i class="fa fa-pencil" aria-hidden="true"></i>
						<p class="inline">
							`+descDOM.value+`
						</p>
					</div>
				</div>
				<div class="author grey">by `+author+`</div>
			</li>`

	timelineElement.innerHTML += newTaskElement;
}