/**
 * @OnlyCurrentDoc
 */
 
function Initialize() {
 
  try {
 
    var triggers = ScriptApp.getProjectTriggers();
 
    for (var i in triggers)
      ScriptApp.deleteTrigger(triggers[i]);
 
    ScriptApp.newTrigger("EmailGoogleFormData")
      .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
      .onFormSubmit().create();
 
  } catch (error) {
    throw new Error("Please add this code in the Google Spreadsheet");
  }
}
 
function EmailGoogleFormData(e) {
 
  if (!e) {
    throw new Error("Please go the Run menu and choose Initialize");
  }
 
  try {
 
    if (MailApp.getRemainingDailyQuota() > 0) {
 
      // You may replace this with another email address
      var email = "";
 
      // Enter your subject for Google Form email notifications
      var subject = "New User - ";
 
      var key, entry,
        message = "",
        ss = SpreadsheetApp.getActiveSheet(),
        cols = ss.getRange(1, 1, 1, ss.getLastColumn()).getValues()[0];
 
      // Iterate through the Form Fields
      for (var keys in cols) {
 
        key = cols[keys];
        entry = e.namedValues[key] ? e.namedValues[key].toString() : "";
        
        if(key == "New User Name")
          subject += entry;
 
        // Only include form fields that are not blank
        if ((entry !== "") && (entry.replace(/,/g, "") !== ""))
          message += key + ' :: ' + entry + "\n\n";
      }
 
      MailApp.sendEmail(email, subject, message);
    }
  } catch (error) {
    Logger.log(error.toString());
  }
}
