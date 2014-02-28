Template.addAssignment.events({
  "submit form": function(event) {
    event.preventDefault();
  },
  "click .createAssignmentBtn": function(event, template) {
    var formObj = template.find("form");
    var formJson = FormUtils.serializeForm(formObj);
    if (formJson.assignmentType === "Other") {
      formJson.assignmentType = formJson.assignmentTypeCustomName.split(" ")[0].toLowerCase();
    } else {
      formJson.assignmentType = formJson.assignmentType.toLowerCase();
    }
    Assignments.insert(formJson);
    formObj.reset();
    Session.set("assignmentType", null);
  },
  "change select[name=assignmentType]": function(event) {
    Session.set("assignmentType", event.target.value);
  }
});

Template.addAssignment.helpers({
  "isTypeOther": function() {
    return Session.get("assignmentType") === "Other";
  },
  "assignments": function() {
    return Assignments.find();
  }
});