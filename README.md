I could've just used a gist but I am too lazy to do so

## This script automates Flips BPS backups whenever you save changes on your ROM.
It's as simple as that, and it can save a lot of time if you screw something up, or just want to test stuff that might change/break the rom in an irreverseable matter. Most likely windows-only, I don't have a linux setup to test this as of now.

### Setup
- Get [Node.JS](https://nodejs.org/en/download/) (script was tested on v14.16.1)
- Get [Flips](https://www.smwcentral.net/?p=section&a=details&id=11474) (Slightly old, but it still works)
- Clone the files provided here into a new folder
- Copy your completely legally obtained ROM into the same folder
- Copy the Flips binary files into the same folder
- Create a folder called "backups"
- Open up command line and enter `npm i`
- Afterwards start the script through `node index.js`, you'll be prompted to enter the path of your rom hack
- If needed, edit `index.js` how you like


![bussy](https://i.jecket.xyz/2di7t.png)
