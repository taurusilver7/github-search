# A Github user Search Application

> using React-js, Auth0 & material-ui, a mobile responsive application to search for github user details, repos, projects, followers, following....

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

- The application contains navbar, search, user-info, user & repos components.

* The styling is done using styled components from [Main docs](https:/styled-components.com/).
* Icons used are [React Icons - Main Docs](https://react-icons.github.io/react-icons/)
* The page routing is a little specific. Since a traditional navbar with all link is absent- [react-router-dom - Main Docs](https://reactrouter.com/web/guides/quick-start)
* <Switch> renders the first child <Route> that matches
* A <Route path="*"> always matches

- The Github API content:

* [Root Endpoint](https://api.github.com)
* [Get User](https://api.github.com/users/taurusilver7)
* [Repos](https://api.github.com/users/taurusilver7/repos?per_page=100)
* [Followers](https://api.github.com/users/taurusilver7/followers)
* [Rate Limit](https://api.github.com/rate_limit)

For unauthenticated requests, the rate limit allows for up to 60 requests per hour. Unauthenticated requests are associated with the originating IP address, and not the user making requests.

- [Fusion Charts - Main Docs](https://www.fusioncharts.com/)

- [Auth0 - Main Docs](https://auth0.com/)
- Create Application
- Choose : Single Page Web Applications
- Choose : React
- Go to Settings Tab
- Copy/Paste Domain, ClientID - can be public (or use .env)
- Add Domain -
  for now http://localhost:3000 (DON'T COPY PASTE FROM URL BAR)

  - Allowed Callback URLs
  - Allowed Logout URLs
  - Allowed Web Origins
  - SAVE CHANGES!!!!!!!!!!!!!!!

- Connections
  email,social

### Deployments

[netlify](https://www.netlify.com/)

### redirects with react-router-dom

In order for routing to work on netlify, redirects was added to the public folder.

- create a \_redirects file in public & add the following lines to it.
- \_redirects file in public

```
/*   /index.html
```

### warning with build process.

> If the buid process fails at any time, rewrite the build code in package.json

```js
"build": "CI= react-scripts build",
```

- The App component has dashboard, login, error pages for respective uses.
- The dashboard contains navbar, search,user info, user & repos components to display the details of the github user.
- To create a datalayer to connect the whole components, a StateProvider called GithubProvider is created using Reacct Context API.
- Some Mock user, followers, repos are available at gitgub api to avoid over usage of gthub request usage rate of 60 req/hr.
- The initial states of all user, follwer, repos are set to their respoective moc values.(own values can e used.)
- this intial state values can be dragged into Info components to display on the component.

- the static compnents are designed & customized first & Info component is first styled.
- An object of various info's are created from the obj githubUser.
- An array of items with color combos, values(repos,follw,folwng,gists), label(thier names), icons(imported), id's is created and iterated over the created component _Item_ for rendering with a required design format.

- the next component is user component. It has 2 local componetns Card & Followers.
  The card component retrieves the data(avatar_url, html_url, name,company,blog,bio,location, twitter_username..) from the githubUser via `useContext`.
- The card is customized to display all the data obtained from object {githubUser}
- The followers local component is customized in the same process.

- The next component is the repos component designed using charts.
- FusionCharts library is preferred over other chart libraries is integration(seamlessly made easy - import lib, setup component, go), specilization, default setup & the documentation
- To get the most used language by the user, iterate over the array of repos to grab the value of _language_ property & count them to display in chart to get the most used language. >>>>> `Array.prototype.reduce(callbck, rtrn value obj)`.
- calculate the popular languages, stars for lanuages, forks on repos & ntegrate into the charts.

- The search component contains the search bar, search button & requests/hr counter.
- step-1: update the user value in state as an input is being entered.
- step-2: preventDefault & update the user if the user exists.
- step-3 (optinal): empty the form after a search is made.
- [gihub api end point](https://api.github.com). Make an ajax request to the api end point.

- The authentication is provided by auth0- a III party tool providing authentication & authorization with extremely strict API regualtion.
- [Auth0 - Main Docs](https://auth0.com/)
- Domain name: taurusilver.us.auth0.com
- Client ID: "CAGxHudhlEBy060KTujVQktFYKbZfkMS"

- A single page application is created in the Auth0. Select the technology used as React & get the domain & client ID. These two can be stored as env variables for privacy issues. Set the callback URL at localhost:3000. **but change it to the host site after hosting.**(netlify, herou, firebase...)
- Create google & social media connections which uses the respective auth for login to the project
- Auth0.com >> Docs >> (choose libraries in docs) >> Auth0 React SDK >> auth0/auth0-react

- The Auth0 React SDK (auth0-react.js) is a JavaScript library for implementing authentication and authorization in React apps with Auth0. It provides a custom React hook and other Higher Order Components so you can secure React apps using best practices while writing less code.

- The navbar is customized to show login button if no user & user image, name & logout button if logged in.

- To set restriction to access to the ones not logged in,

1.  direct the logout button to the login page created.
2.  The login page is redirected to the auth0 authentication panel.

- This can be done by setting a private route. There are routes for login, dashboard, error.
- The PrivateRoute wraps the route that is to be protected (i.e Dashboard) & make it into a private route on conditions of logged in.
- the private route needs access to props- children b/c >> Dashboard is a child of PrivateRoute & rest props (...rest).
- The PrivateRoute returns the children _(Dashboard)_ on condition (the user && isAuthen) true else redirect to _Login_ page
- The login functionality is coded in the Login page with useAuth0() >> loginWithRedirect
- Even after the login functionaity is added to login page, successfully logging in, the user is redirected to the login page b/c the isLoading parameter is still true. (i.e, isAuthenticated && user >> false).
- Use a wrapper (AuthWrapper) with isLoading, error from useAuth0 & return a page using a condition. (return loading gif id isLoading is true, error.msg if error is true, children component (
  <Router>
  <PrivateRoute>
  <Dashboard></Dashboard>
  </PrivateRoute>
  </Router>)).

- use continous depoyment with github repo >>> establish a connection b/w netlify & github repo, so the future changes in repo allows for rebilding the app in netlify.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
