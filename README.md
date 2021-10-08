# squirl-snippets
Snippets of code I wrote for Squirl Finance


#filter.js

This component was built to render a form witch selectable filters. Once selected, these filters are added to a query parameters array. On form submit, a get request is sent with the query paramaters and a form is populated with the json result.
I have removed the URL and sensitive informartion per companies request.

#tile.js

This component renders a tile display information about a certain stock. It has functionality to check whether the stock has gone up or down and renders a dynamic symbol. 

#graph.js

This component renders a graph that was created using Victory library. The graph is dynamic, making API calls every 5 minutes. The graph also switchs data based on user input.

