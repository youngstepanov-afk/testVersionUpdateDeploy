const fs = require('fs');
const path = require('path');

const versionFilePath = path.join(__dirname, 'public', 'version.json');

fs.readFile(versionFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading version file:', err);
    process.exit(1);
  }

  try {
    const versionData = JSON.parse(data);
    versionData.version = `0.1 + ${Date.now()}`;
    
    fs.writeFile(versionFilePath, JSON.stringify(versionData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing version file:', err);
        process.exit(1);
      }
      console.log('Version updated successfully:', versionData.version);
    });
  } catch (parseErr) {
    console.error('Error parsing version file:', parseErr);
    process.exit(1);
  }
});