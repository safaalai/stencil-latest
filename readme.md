# Repository for Workerd issue https://github.com/cloudflare/workerd/issues/1009

This repository has 3 parts:
1.  Client (stenciljs)
    starts websocket
    Key code is in [profile.tsx](/src/components/app-profile/app-profile.tsx)

2.  Pages function open
    receives websocket request & forwards to durable object
    Code is in [open.ts](/functions/open.ts)

3.  durable object my_do
    terminates websocket request
    code is in [index.ts](/packages/my_do/src/index.ts)

To create repository
1.  clone repository
2.  `npm install` in root directory

To start the project:
1.  In terminal window #1 
    a. cd packages/my_do 
    b. npm start 
2.  In terminal window #2 
    a. cd / 
    b. sh ./build.sh 
    c. wait for build to complete on browser 
    d. close browser window 
    e. go back to terminal and click b to start browser window 
3.  In browsser window open up console window 
4.  Click on profile button 

You will see console logs in both the browser (client) and the my_do terminal.
workerd error will appear on the my_do terminal (#1).



