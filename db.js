const fs = require('fs');

const db =
  process.env.CONTEXT === 'production'
    ? { TableName: 'NetlifyFunctionsProduction_Movies' }
    : {
        TableName: `NetlifyFunctionsDeployPreview_${process.env.DEPLOY_ID}_Movies`
      };

fs.writeFileSync('db.json', JSON.stringify(db));
