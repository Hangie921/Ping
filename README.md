# Ping
This is the Project folder for Ping

# /routes
Received the route and do the mission assigned and then return the result value and render the view

# /module
Everything about modules js included

# /views
All jade are in here

# gulpfile.js
Control the work flow automatically

- `gulp.task('sass')`: Compile the .scss into .css
- `gulp.task('lint')`: Check the .js
- `gulp.tast('develop')`: Detect changes and restart the server,only in dev mode
- `gulp.task('default')`: The first task that gulp will run while initialing and keep watching the changes
- `gulp.task('script')`: Concat all the .js into one js file,only uncomment it online.


# Debug

### Run debug mode app.js

```bash
npm run debug
```

### 上Code流程

1. cd Ping/app
2. npm run test
3. git ..............

### 更新Ping lib

1. 檢查https://github.com/Hangie921/Ping_Library 的master base
2. npm install

or 

```bash
npm run updateping
```

# Generator

**regen** will dropDatabase
```bash
npm run gen
npm run regen
```

# Deployment

**redeploy** = pm2 restart app.js
```bash
npm run deploy
npm run redeploy
```


