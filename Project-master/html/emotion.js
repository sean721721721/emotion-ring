

	function readTextFile(posi , nega , text)
	{
		var count = 0;
		var count2 = 0;
		var totalText = text.length;
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", posi, false);
		rawFile.onreadystatechange = function ()
		{
			if(rawFile.readyState === 4)
			{
				if(rawFile.status === 200 || rawFile.status == 0)
				{
					var allText = rawFile.responseText;
					var SplitedText = allText.split("\n")
				
					for(i=0 ;i < SplitedText.length ; i++)
					{
						if(SplitedText[i]!="")
						count +=text.split(SplitedText[i]).length-1;
					}
				}
			}
		}
		
		var rawFile2 = new XMLHttpRequest();
		rawFile2.open("GET", nega, false);
		rawFile2.onreadystatechange = function ()
		{
			if(rawFile2.readyState === 4)
			{
				if(rawFile2.status === 200 || rawFile2.status == 0)
				{
					var allText2 = rawFile2.responseText;
					var SplitedText2 = allText2.split("\n")
				
					
				
					for(var i=0 ;i < SplitedText2.length ; i++)
					{
						if(SplitedText2[i]!="")
						count2 +=text.split(SplitedText2[i]).length-1;
					}
				}
			}
		}
		rawFile.send(null);
		rawFile2.send(null);
	var Emotion = (count - count2);
	    var out=0;
		
		if(totalText < 30)
		{
			if(Emotion>0)out = 8;
			else if(Emotion<0)out = 6;
			else out = 7;
		}
		else if(totalText < 100)
		{
			if(Emotion>=0)out = 1;
			else out = 5;
		}
		else
		{
			if(Emotion>2)out = 2;
			else if (Emotion<-2)out = 4;
			else out = 3;
		}
		return out;
		
	}
	function poscount(posi , text)
	{
		var count = 0;
		
		var totalText = text.length;
		var rawFile = new XMLHttpRequest();
		rawFile.open("GET", posi, false);
		rawFile.onreadystatechange = function ()
		{
			if(rawFile.readyState === 4)
			{
				if(rawFile.status === 200 || rawFile.status == 0)
				{
					var allText = rawFile.responseText;
					var SplitedText = allText.split("\n")
				
					for(i=0 ;i < SplitedText.length ; i++)
					{
						if(SplitedText[i]!="")
						count +=text.split(SplitedText[i]).length-1;
					}
				}
			}
		}
		
		
		rawFile.send(null);
	
		return count;
	}
	

	
	
	//readTextFile("positive.txt","negative.txt");

