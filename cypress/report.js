const { exec } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

const args = process.argv.slice(2);
const specArg = args.find(arg => arg.includes('--spec'));
const specPath = specArg ? specArg.split('=')[1] : '';

if (!specPath) {
  console.error('❌ No --spec argument provided');
  process.exit(1);
}

const folderName = path.dirname(specPath).split(path.sep).pop();
const reportDir = `cypress/reports/${folderName}`;
fs.emptyDirSync(reportDir); // Clean old reports

const cypressCmd = `npx cypress run --spec "${specPath}" --reporter mochawesome --reporter-options "reportDir=${reportDir},overwrite=false,html=false,json=true"`;

console.log(`🚀 Running Cypress with reports in ${reportDir}`);
exec(cypressCmd, (err, stdout, stderr) => {
  if (err) {
    console.error(`❌ Cypress error:\n${stderr}`);
  } else {
    console.log(`✅ Cypress done.\n${stdout}`);
    
    // Merge JSON and generate HTML report
    const mergeCmd = `npx mochawesome-merge ${reportDir}/*.json > ${reportDir}/merged.json && npx marge ${reportDir}/merged.json --reportDir=${reportDir} --reportFilename=index.html`;
    console.log(`🧩 Generating final report: ${mergeCmd}`);

    exec(mergeCmd, (err2, stdout2, stderr2) => {
      if (err2) {
        console.error(`❌ Report generation error:\n${stderr2}`);
      } else {
        console.log(`✅ Final HTML report created at: ${reportDir}/index.html`);
      }
    });
  }
});
