//////Created & Designed by: Marc Ferrándiz Borràs ///////

//init snake game
function snakeGame(){
	//Create canvas
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var food;
	var score; // Total score
	var r=10;//wide cells
	var d; // default direction
	
		
	//Create the epic snake
	var aSnake; //an array of cells to make up the snake
	
	
	init();

	// Lets paint the snake
	paintSnake();
	
	function init()
	{
		d = "right"; //default direction
		create_snake();//call snake creator
		create_food();// call the create food
				
		score = 0;// reset score;
		// let's move the snake now using a timer 
		//every 80ms
		if(typeof game_loop!="undefined") clearInterval(game_loop);
		game_loop = setInterval(paintSnake, 80);

	}
	
	function create_snake()
	{
		var length = 5; //Length of the initial snake
		aSnake = []; //Empty array to start with
		for(var i = length-1; i>=0; i--)
		{
			// This will create an horizontal snake on top left
			aSnake.push({x:i,y:0});
		}
	}
	
	function create_food()
	{
		// this will create a cell with x & y between 0-44
		food = {
			x:Math.round(Math.random()* (w-r)/r),
			y:Math.round(Math.random()* (h-r)/r),
			
		};
	}
	
	function paintSnake(){
		
		//Paint the canvas now
		ctx.fillStyle = "#9c9715";
		ctx.fillRect(0, 0, w, h);
		//if we want a stroke in the design->uncomment the next line
		//ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);

		//The movement code for the snake to come here.
		//Pop out the tail cell and place it infront of the head cell
		var nx = aSnake[0].x;
		var ny = aSnake[0].y;
		//These were the position of the head cell.
		//We will increment it to get the new head position
		
		//Lets add proper direction based movement 
		if(d == "right") nx++;
		else if(d == "left") nx--;
		else if(d == "up") ny--;
		else if(d == "down") ny++;
		
		//restart the game if the snake hits the walls
		if(nx == -1 || nx >= w/r || ny == -1 || ny >= h/r || collision_body(nx,ny,aSnake))
		{
			//restart game
			init();
			return;
		//eat food
		}else if(nx == food.x && ny == food.y){
			
			var tail = {x: nx, y: ny};
			//Create new food
			create_food();
			score++;
			
		//nothing go ahead
		}else{
			var tail = aSnake.pop(); //pops out the last cell
			tail.x = nx;
			tail.y = ny;
		}
		
		aSnake.unshift(tail); //puts back the tail as the first cell
		
		for( var i = 0; i < aSnake.length ; i++)
		{
			var c = aSnake[i];//position of the snake cell (x,y)
			//Lets paint wide cells
			paint_cell(c.x,c.y);
		}
		// paint the food
		paint_cell(food.x,food.y);
		
		// paint the score
		var score_text="Score: "+score;
		ctx.font='20px Impact';
		ctx.fillText(score_text,15,h-15);
	}
	
		
	//Lets add the keyboard listener
	$(document).keydown(function(e){
		var key=e.which;// number of keyboard 
		
		if(key == "37" && d != "right") d="left"
		else if(key == "38" && d != "down") d="up"
		else if(key == "39" && d != "left") d="right"
		else if(key == "40" && d != "up") d="down"
		
		
	})
	
	
	// Paint a generic cell
	function paint_cell(x,y)
	{
		
		//Lets paint wide cells
			ctx.fillStyle = "black";
			ctx.fillRect(x*r,y*r,r,r);
			ctx.strokeStyle = "#9c9715";
			ctx.strokeRect(x*r,y*r,r, r);
	}
	
	//Collision of the own body
	function collision_body(x,y,array)
	{
		for(var i = 0; i<array.length; i++)
		{
			if(x == array[i].x && y == array[i].y)
			{
				return true;
			}
		}
		return false;
	}
}

