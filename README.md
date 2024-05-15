Create a `.env` in the root directory:

```
PORT=
GEMINI_API_KEY=
```

You need to obtain the `GEMINI_API_KEY` in [Google AI Studio](https://aistudio.google.com/app/apikey).

Open local host in the `PORT`. You can write a PC component in the url after the `/`, which will show the Gemini response. For example:

```
http://localhost:3000/INTEL CORE I7 10700F
```

Google Chrome automatically encodes the spaces, so just write the component and press enter.

Im using this project to learn Nodejs.
I try to have good architecture, but I am still struggling with natural concepts like routes or controllers.
At least this first try is working modularly, was able to have unit testing, and used dependency injection.
