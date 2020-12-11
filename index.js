/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const WorkOS = require('@workos-inc/node').default;
require('dotenv').config()

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
const workos = new WorkOS(process.env.WORKOS_API_KEY);
/**
 *  App Configuration
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

/**
 * Route Definitions
 */
app.get("/", async (req, res) => {
  const directories = await workos.directorySync.listDirectories();
  res.render("index", {
      title: "Home",
      directories: directories.data
  });
});

app.get('/directory/:id', async (req, res) => {
  const directories = await workos.directorySync.listDirectories();
  const directory = await directories.data.filter((directory) => {
    return directory.id == req.params.id
  })[0]
  res.render('directory', {
    directory: directory,
    title: "Directory"
  })
})

app.get('/directory/:id/usersgroups', async (req, res) => {
  const directories = await workos.directorySync.listDirectories();
  const directory = await directories.data.filter((directory) => {
    return directory.id == req.params.id
  })[0]
  const groups = await workos.directorySync.listGroups({
    directory: req.params.id,
  });
  const users = await workos.directorySync.listUsers({
    directory: req.params.id,
} );
  res.render('groups', {
    groups: groups.data,
    directory: directory,
    users: users.data,
    title: "Group & Users"
  })
})

app.get('/directory/:id/group/:groupId', async (req, res) => {
  const directories = await workos.directorySync.listDirectories();
  const directory = await directories.data.filter((directory) => {
    return directory.id == req.params.id
  })[0]
  const groups = await workos.directorySync.listGroups({
    directory: req.params.id,
  });
  const group = await groups.data.filter((group) => {
    return group.id == req.params.groupId
  })[0]
  res.render('group', {
    directory: directory,
    title: "Directory",
    group: JSON.stringify(group),
    rawGroup: group
  })
})

app.get('/directory/:id/user/:userId', async (req, res) => {
  const directories = await workos.directorySync.listDirectories();
  const directory = await directories.data.filter((directory) => {
    return directory.id == req.params.id
  })[0]
  const users = await workos.directorySync.listUsers({
    directory: req.params.id,
  });
  const user = await users.data.filter((user) => {
    return user.id == req.params.userId
  })[0]
  res.render('user', {
    directory: directory,
    title: "Directory",
    user: JSON.stringify(user),
    rawUser: user
  })
  console.log(user);
})

/**
 * Server Activation
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
