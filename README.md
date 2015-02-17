# SWAPI-js


Library based on the [Star Wars API](http://swapi.co/) by Paul Hallett

## Careful
Using this library should be pretty simple as long as the API you want to use exposes itself somewhere. The description should expose something like that:

```
{
  "people": "http://swapi.co/api/people/", 
  "planets": "http://swapi.co/api/planets/", 
  "films": "http://swapi.co/api/films/", 
  "species": "http://swapi.co/api/species/", 
  "vehicles": "http://swapi.co/api/vehicles/", 
  "starships": "http://swapi.co/api/starships/"
}
```

## Get started
1. Initialize your instance using only the URL where the API is described:
  <pre>var myApi = new Swapi('http://swapi.co/api/');</pre>
2. You can now use your API *almost* as you wish. Since that the instance is initialized using the description given when asked directly to the API, we need to compose with AJAX's asynchronous ways. That's why when you actually use your instance, you should wrap the calls in its `.ready()` method.
  <pre>myApi.ready(function () {
      // Here, i can be sure that my API instance is ready to be used
      // Now, I can do whatever i want !
  });</pre>
  It works in the same way as JQuery's `.ready()` method.

## What is available ?
For each key word exposed in the API's description, your intance will have 3 methods available:
  * `get[KeyWord](id, success, error)` : retrieves a single result from the given `id` and passes it to the `success` callback
  * `getAll[KeyWord](success, error)` : retrieves all results and passes them to the `success` callback
  * `getPage[KeyWord](page, success, error)` : retrieves a single page of results and passes it to the `success` callback
  All `error` arguments are error callbacks and are optional.

It is possible to handle several APIs at once, they will be completely independant of one another.


# Evolution
Using ES6's promises could be a blast
