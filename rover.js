// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%  Initial information about the rover and surface  %%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// Initial position and direction of the rover
var rover = {
  position: [0,0],
  direction: 'N'
}

var previousStatus = {
  Xaxis: rover.position[0],
  Yaxis: rover.position[1],
  direction: rover.direction
}

// Grid size in both directions
var gridSize = {
  Xaxis: 10,
  Yaxis: 10
}

// Unidentified surface objects - USOs (obstacle)
var USOs = []; // Could be empty (no obstacles)
USOs.push([5,5]); // We add as many obstacles we want
USOs.push([7,3]);

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%  Moving the rover (according to an input command string)  %%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// Hypothesis 1: We assume that when the rover goes backwards it steps back one
//               position but its direction remains the same
// Hypothesis 2: We assume that when the rover turns right or left it does it on
//               its own axis (spins) without changing its position

// Forward
function goForward() {
	switch(rover.direction) {
    	case 'N':
    		rover.position[1]++;
      		break;
    	case 'E':
      		rover.position[0]++;
      		break;
    	case 'S':
      		rover.position[1]--;
      		break;
    	case 'W':
      		rover.position[0]--;
      		break;
  	}
	gridLocation();
}

// Backward
function goBackward() {
	switch(rover.direction) {
    	case 'N':
      		rover.position[1]--;
      		break;
    	case 'E':
      		rover.position[0]--;
      		break;
    	case 'S':
      		rover.position[1]++;
     		break;
    	case 'W':
      		rover.position[0]++;
      		break;
	}
	gridLocation();
}

// Turn right 
function goRight() {
  	switch(rover.direction) {
    	case 'N':
      		rover.direction='E';
      		break;
    	case 'E':
      		rover.direction='S';
      		break;
    	case 'S':
      		rover.direction='W';
      		break;
    	case 'W':
      		rover.direction='N';
      		break;
  }
}

// Turn left
function goLeft() {
  	switch(rover.direction) {
    	case 'N':
      		rover.direction='W';
      		break;
    	case 'E':
      		rover.direction='N';
      		break;
    	case 'S':
      		rover.direction='E';
      		break;
    	case 'W':
      		rover.direction='S';
      		break;
  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%  Checking the smoothness of the surface  %%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function avoidUSOs() {
	for (j = 0; j < USOs.length; j++) {
		if (rover.position[0] == USOs[j][0] && rover.position[1] == USOs[j][1]){
			alert('Obstacle detected at [' + USOs[j][0] + ',' + USOs[j][1] + ']. Last position at [' + previousStatus.Xaxis + ','+ previousStatus.Yaxis + ']' + ', facing ' + previousStatus.direction);
			rover.position[0] = previousStatus.Xaxis;
			rover.position[1] = previousStatus.Yaxis;
			rover.direction = previousStatus.direction;
			break;
	    } else {
	       previousStatus.Xaxis = rover.position[0];
	       previousStatus.Yaxis = rover.position[1];
	       previousStatus.direction = rover.direction;
	       break;
	    }
    }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%  Keeping the rover in the "same planet" (-spherical-)  %%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// Will be implemented for each single f/b command (this consumes more resources)
// but could also be implemented at the end for the final position (if no
// obstacles are detected -- otherwise should be implemented inside that loop)

function gridLocation(){
  // Above Xaxis max position
	if (rover.position[0] > gridSize.Xaxis) {
		rover.position[0] = 0;
		console.log('One spin to the grid in X+ direction');
	}
  // Under Xaxis min position
	if (rover.position[0] < 0) {
		rover.position[0] = gridSize.Xaxis;
		console.log('One spin to the grid in X- direction');
	}
  // Above Yaxis max position
	if (rover.position[1] > gridSize.Yaxis) {
		rover.position[1] = 0;
		console.log('One spin to the grid in Y+ direction');
	}
  // Under Yaxis min position
	if (rover.position[1] < 0) {
		rover.position[1] = gridSize.Yaxis;
		console.log('One spin to the grid in Y- direction');
	}
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%  Executing instructions (input provided by the operator)  %%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// The instructions should be provided without any blank space between them and
// in lower cases

function moveRover(houstonSays) {
	for (i = 0; i < houstonSays.length; i++) {
		switch(houstonSays[i]) {
			case 'f':
			  	goForward();
				break;
			case 'b':
				goBackward();
				break;
			case 'l':
				goLeft();
				break;
			case 'r':
				goRight();
				break;
		}
        avoidUSOs();
	}
	console.log('I am at [' + rover.position[0] + ',' + rover.position[1] + ']' + ', facing ' + rover.direction);	
}


// Example of input string : moveRover('fffrfflfffbb');
