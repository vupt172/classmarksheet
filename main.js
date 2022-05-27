var testScore = {
    name: "",
    math: 0,
    physical: 0,
    chemistry: 0
};
var totalDataRow = 0;
/**
 * @description clear user input form
 */
function clearFormInputData() {
    $("#i-name").val("");
    $("#i-math").val("");
    $("#i-physical").val("");
    $("#i-chemistry").val("");
}
/**
 * @description set data from user input form to testScore object
 */
function convertInputFormDataToObject() {
    testScore.name = $("#i-name").val();
    testScore.math = parseFloat($("#i-math").val());
    testScore.physical = parseFloat($("#i-physical").val());
    testScore.chemistry = parseFloat($("#i-chemistry").val());
}
/**
 * @description convert specified table row data to  testScore object 
 * @param rowIndex index of row in table(included table header)
 */
function convertTableDataToObject(rowIndex) {
    var selectedRow = $("#table-score tr").eq(rowIndex);
    var cellList = selectedRow.children();
    testScore.name = cellList.eq(1).text();
    testScore.math = parseFloat(cellList.eq(2).text());
    testScore.physical = parseFloat(cellList.eq(3).text());
    testScore.chemistry = parseFloat(cellList.eq(4).text());
}
/**
 *@description add new row to a score table
 */
function addRecord() {
    convertInputFormDataToObject();
    clearFormInputData();
    var table = $("#table-score");
    var newRow = "<tr>"
    newRow += "<td>" + (totalDataRow + 1) + "</td>";
    newRow += "<td>" + testScore.name + "</td>";
    newRow += "<td>" + testScore.math + "</td>";
    newRow += "<td>" + testScore.physical + "</td>";
    newRow += "<td>" + testScore.chemistry + "</td>";
    newRow += "<td>" + "?" + "</td>";
    newRow += "</tr>"
    table.append(newRow)
    totalDataRow++;
}
/**
 * @description edit data information of a row of table score
 */
function editRecord() {
    var recordId = prompt("Nhap STT");
    if (recordId == null) return;
    convertInputFormDataToObject();
    clearFormInputData();
    var currentRow = $("#table-score tr").eq(recordId);
    var cellList = $(currentRow).children();
    cellList.eq(1).text(testScore.name);
    cellList.eq(2).text(testScore.math);
    cellList.eq(3).text(testScore.physical);
    cellList.eq(4).text(testScore.chemistry);
    cellList.eq(5).text("?");
    currentRow.removeClass("excellent-student");
}

/**
 * @description delete a row of table score and numbered table 
 */
function deleteRecord() {
    var recordId = prompt("Nhap STT");
    if (recordId == null || recordId <= 0) return;
    var selectRow = $("#table-score tr").eq(recordId);
    selectRow.remove();
    //renumbered table stt
    $("#table-score tr:not(:first-child)").each(function(index) {
        $(this).children().eq(0).text(index + 1);
    })
    totalDataRow--;

}
/**
 * @description caculate average score(math,physical,chemistry) of a student
 */
function calcAverageScore() {
    $("#table-score tr:not(:first-child)").each(function(index) {
        var cellList = $(this).children();
        if (cellList.eq(5).text() == "?") {
            convertTableDataToObject(index + 1)
            var averageScore = (testScore.math + testScore.physical + testScore.chemistry) / 3;
            cellList.eq(5).text(averageScore.toFixed(1));
        }
    });
}
/**
 * @description evaluate student if average score >8.0
 */
function evaluateStudentCapacity() {
    $("#table-score tr:not(:first-child)").each(function(index) {
        var cellList = $(this).children();
        if (cellList.eq(5).text() >= 8.0) {
            $(this).addClass("excellent-student");
        }
    })
}