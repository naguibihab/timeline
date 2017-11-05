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

	taskData.timestamp = new Date(dateDOM.value + " " + taskData.time);

	// Copying the object as we'll temper with the HTML
	var timelineTasks = Object.assign(new Array(),document.getElementsByClassName('timeline-li'));
	console.log(timelineTasks);

	// Adding in the task
	if(timelineTasks.length > 0){
		var timelineElement = document.getElementById('timeline-ul');

		var timestamp = new Date(document.getElementById('timestamp-'+(timelineTasks.length-1)).value);
		if(timestamp >= taskData.timestamp) {
			// All tasks in the timeline are ahead of ours so we append ours at the end
			console.log('All tasks in the timeline are ahead of ours');
			document.getElementById('timeline-ul').innerHTML += constructTaskHtml(taskData);
		} else {
			// Destroying the timeline to construct it agin
			var newTimelineUl = '';

			// Figure out where we should add in the new task based on date & time
			for(var i=0; i < timelineTasks.length; i++){
				var timestamp = new Date(document.getElementById('timestamp-'+i).value);
				if(timestamp < taskData.timestamp) {
					// Timestamp of the element we're iterating on is behind the one we're adding
					// So we add ours
					console.log('Adding ours',i);
					newTimelineUl += constructTaskHtml(taskData);
					// Then add the remaining tasks
					timelineElement.innerHTML = newTimelineUl + addRemainingHtml(timelineTasks,i);
					return;
				} else {
					console.log('Ours is behind');
					newTimelineUl += timelineTasks[i].outerHTML;
				}
			}

			console.log('Constructing the timeline',newTimelineUl)
			timelineElement.innerHTML = newTimelineUl;
		}
	} else {
		// First task, append at the end
		console.log('first task');
		document.getElementById('timeline-ul').innerHTML += constructTaskHtml(taskData);
	}
}

function addRemainingHtml(timelineTasks,index){
	var appendedRemainingTasks = '';
	for(i=index; i<timelineTasks.length; i++){
		appendedRemainingTasks += timelineTasks[i].outerHTML;
	}
	return appendedRemainingTasks;
}

// This function takes the task data and returns the task HTML based on the amount of tasks
// inside the timeline
function constructTaskHtml(taskData){
	// Count li elements to see if we're adding an odd or an even li
	var timelineLength = document.getElementsByClassName('timeline-li').length;
	var oddElement = timelineLength %2 == 0;

	// Add HTML
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
					<div class="event-type grey"><i class="fa fa-info-circle" aria-hidden="true"></i> `+taskData.title+`</div>
					<div class="event-text grey">
						<i class="fa fa-pencil" aria-hidden="true"></i>
						<p class="inline">
							`+taskData.desc+`
						</p>
					</div>
				</div>
				<div class="author grey">by `+taskData.author+`</div>
				<input type="hidden" id="timestamp-`+timelineLength+`" value="`+taskData.timestamp+`">
			</li>`

	return newTaskElement;
}