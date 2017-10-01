

function makecolor( myname  , v1 ,v2)
{
	var V = (v1+v2)/2;
	//console.log(V)
	var R = 0 , G = 0 , B = 0;
	if(V <= 255 )
	{
		R = 255;
		G = V;
	}	
	else if(V <= 510 )
	{
		R = 255 - (V-255);
		G = 255;
	}
	else if(V <= 765 )
	{
		G = 255;
		B = V - 510;
		
	}
	else if(V <= 1020 )
	{
		G = 255 - (V - 765);
		B = 255;
	}
	else if(V <= 1275 )
	{
		B = 255;
		R = V - 1020;
	}
	else if(V <= 1530 )
	{
		R = 255;
		B = 255 - (V - 1275);
	}
	//console.log(v1)
	if(myname=="root")
	{	
		return "rgb(255,0,0)" ;}
	
	
	
	else
	{
	console.log(R,G,B)	
		return "rgb("+ Math.round(R) +"," + Math.round(G) +"," + Math.round(B) +")";}
	//1530
	
}

//readTextFile("positive.txt","negative.txt");

