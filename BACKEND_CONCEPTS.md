**Question: What does this code accomplish? Why is it useful in your application?**
```Javascript
jobSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  },
});
```
This code configures the Mongoose jobSchema to customize how documents are converted to JSON when sent to clients. By setting virtuals: true, any virtual properties—fields computed from other data but not stored in the database—are included in the JSON output. The transform function modifies the object before it’s returned, in this case creating a new id property that copies the value of MongoDB’s _id field, making the API response cleaner and more frontend-friendly. This is useful because it hides MongoDB-specific details, ensures consistency across API responses, and allows virtual fields to be included automatically, improving the usability and readability of the data your application sends to clients.
---
**Question: What is CORS, and why is it necessary for the application to include this middleware?**
```Javascript
app.use(cors());
```
CORS stands for Cross-Origin Resource Sharing, a security mechanism implemented by browsers that restricts web pages from making requests to a different domain than the one that served the page. For example, if your frontend runs on http://localhost:5173 and your backend runs on http://localhost:4000, the browser treats this as a cross-origin request and blocks it by default.

The line app.use(cors()) in backend/app.js adds CORS middleware to your Express server, which automatically sets the necessary HTTP headers to allow cross-origin requests. This ensures that your frontend can successfully communicate with the backend during development (and in production if configured appropriately), preventing errors like “Blocked by CORS policy.”
---
**Question: How does this proxy setting work, and what problems does it solve in the development environment?**
```Javascript
proxy: {
  "/api": {
    target: "http://localhost:4000",
    changeOrigin: true,
  },
},
```
It tells the Vite development server to forward requests that start with /api to your backend running on http://localhost:4000. For example, a request to /api/jobs in the frontend will actually be sent to http://localhost:4000/api/jobs.
---
