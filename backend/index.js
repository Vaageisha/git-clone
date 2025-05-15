const yargs = require("yargs");
const { hideBin } = require("yargs/helpers"); //

const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pullRepo } = require("./controllers/pull");
const { pushRepo } = require("./controllers/push");
const { revertRepo } = require("./controllers/add.js");

yargs(hideBin(process.argv))
  .command("init", "Initialise a new repository", {}, initRepo)
  .command(
    "add <file>", //file details
    "Add a file to the repository",
    (yargs) => {
      yargs.positional("file", {  //"file" extracts the file details from add <file>
        describe: "file to be added to the staging area",
        type: "string",
      });
    },
   (argv)=>{   // file details extracted from argument 
    addRepo(argv.file);
   }
  )
  .command(
    "commit <message>",
    "Commit the staged file",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv)=>
    {
      commitRepo(argv.message);
    }
  )
  .command("push", "Push commits to S3",{},pushRepo)
  .command("pull", "Pull commits to S3",{}, pullRepo)
  .command(
    "revert <commitID>",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Commit ID to revert to",
        type: "string",
      });
    },
    revertRepo
  )
  .demandCommand(1, "You need atleast one command")
  .help().argv;
