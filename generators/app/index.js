var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = class extends Generator {
    constructor(args, opts) {
      super(args, opts);
    }

    // init() {
    //     this.log('foo :)');
    //     this.log(yosay('Welcome to the marvellous ' + chalk.red('C#') + ' generator!'));
    // }
    
    prompting() {
        return this.prompt([{
          type    : 'input',
          name    : 'name',
          message : 'Your project name',
          default : this.appname // Default to current folder name
        }]).then((answers) => {
          //this.log('app name', answers.name);
          this.applicationName = answers.name;
        });
    }

    writing() {
        this.fs.copyTpl(
          this.templatePath('Program.cs'),
          this.destinationPath('Program.cs'),
          { applicationName: this.applicationName }
        );

        this.fs.copyTpl(
            this.templatePath('project.csproj'),
            this.destinationPath(this.applicationName + '.csproj'),
            { applicationName: this.applicationName }
        );

        this.fs.copyTpl(
            this.templatePath('.vscode/launch.json'),
            this.destinationPath('.vscode/launch.json'),
            { applicationName: this.applicationName }
        );

        this.fs.copyTpl(
            this.templatePath('.vscode/tasks.json'),
            this.destinationPath('.vscode/tasks.json'),
            { applicationName: this.applicationName }
        );
      }
};