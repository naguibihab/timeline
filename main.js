// Function used for adding tasks to timeline
function addTask(){
	// Dismiss popup
	window.location.hash = "#my-new-hash";

	// Caputre inputs
	var date = document.getElementById('date');
	var time = document.getElementById('time');
	var title = document.getElementById('title');
	var desc = document.getElementById('desc');

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
					<div class="event-type inline mr-5">Appointment</div>
					<div class="container inline">
			    		<span class="event-icon">
			    			<i class="fa fa-calendar" aria-hidden="true"></i>
			    		</span>
			    		<span class="event-time block grey">14:45</span>
			    	</div>
				</div>`;
	} else {
		newTaskElement += `
				<div class="icon blue">
					<div class="container inline">
			    		<span class="event-icon">
			    			<i class="fa fa-calendar" aria-hidden="true"></i>
			    		</span>
			    		<span class="event-time block grey">14:45</span>
			    	</div>
					<div class="event-type inline ml-5">Appointment</div>
				</div>`;
	}

	newTaskElement += `
				<div class="content">
					<div class="event-date">
						<span class="day-number">04</span>
						<div class="container inline ml-10">
							<span class="day-name block">Friday</span>
							<span class="month-year block grey">april 2014</span>
						</div>
					</div>
					<div class="event-type grey"><i class="fa fa-info-circle" aria-hidden="true"></i> Appointment</div>
					<div class="event-text grey">
						<i class="fa fa-pencil" aria-hidden="true"></i>
						<p class="inline">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris feugiat urna volutpat odio gravida lacinia. Mauris magna eros, rhoncus eu dolor quis, porta elementum augue.
						</p>
					</div>
				</div>
				<div class="author grey">by John Doe</div>
			</li>`

	timelineElement.innerHTML += newTaskElement;
}