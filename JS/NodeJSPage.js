var http = require('http');
var fs = require('fs');

http.createServer(function(req, res)
{
		var url = req.url;
		switch(url)
		{
			case '/':
			getStaticFileContent(res,'public/home.html','text/html');
			break;
			
			case '/about':
			getStaticFileContent(res,'public/about.html','text/html');
			break;
			
			case '/contact':
			getStaticFileContent(res,'public/contact.html','text/html');
			break;
			
			default:
			res.writeHead(400,{'Content-Type':'text/plain'});
			res.end('400 - file not found');
		}
		
}).listen(9099);

console.log('Server running at http://localhost:9099 ') 

var fs = require('fs');
function getStaticFileContent(response,filepath,contentType)
{
	fs.readFile(filepath,function(error,data)
	{
		if (error)
		{
			response.writeHead(500,{'Content-Type':'text/plain'});
			response.end('500 - internal Server error.')
		}
		else if (data)
		{
			response.writeHead(200,{'Content-Type':'text/html'});
			response.end(data);
			
		}
	});
		
}
