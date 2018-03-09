## Simple REST api with node

This projects has a simple HTTP server in nodejs. 
 
The user can request and add data from a resource with api endpoints.

the current routes are:
``` 
/api/v1/cars
```

will return a list of cars in memory in json format.

```
/api/v1/cars?id={someId}
```

will return the requested car if it is in the data, otherwise a not found error.

Sending a valid json object with car data will add the car to the list.

valid request body for POST:
```
{
  "make": "toyota",
  "modlel": "corolla",
  "year": "2067"
}

All properties of each car are rquired, otherwise a 400 bad request will be sent.