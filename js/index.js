window.addEventListener(
  "load",
  function () {
    let input = document.getElementById("input");
    input.addEventListener("change", unloadDocument);

    function unloadDocument() {
      let csvString = document.getElementById("input").files[0];
      let results = Papa.parse(csvString, {
        header: false,
        skipEmptyLines: true,
        complete: function (results) {
          results.data.map((data, index) => {
            let table = document.getElementById("table");
            createTable(table, data, index);
          });
          findSame();
        },
      });
    }
    let newStr = null;
    let thead = table.createTHead();
    let tbody = table.createTBody();
    //create Table
    function createTable(table, data, index) {
      if (index == 0) {
        let row = thead.insertRow();
        let th = document.createElement("th");
        let nameId = "Id";
        th.innerHTML = nameId;
        row.appendChild(th);
        for (let key of data) {
          th = document.createElement("th");
          let text = document.createTextNode(key);
          th.appendChild(text);
          row.appendChild(th);
        }
      } else {
        let row = tbody.insertRow();
        let tdId = document.createElement("td");
        let idNum = index;
        tdId.innerHTML = idNum;
        let num = 0;
        row.appendChild(tdId);
        for (let key of data) {
          let indexData = num;
          let valid = validateData(key, indexData);
          let td = document.createElement("td");
          if (valid == false) {
            td.style.backgroundColor = "red";
          } else if (valid == 6) {
            key = "FALSE";
          } else if (valid == "numb") {
            key = "+1" + key;
          } else if (valid == "plus") {
            key = "+" + key;
          } else if (valid == 7) {
            key = newStr;
          } else {
            td.style.backgroundColor = "white";
          }
          if (indexData == 1) {
            td.classList.add("users__phone");
          }
          if (indexData == 2) {
            td.classList.add("users__email");
          }
          num++;
          let text = document.createTextNode(key);
          td.appendChild(text);
          row.appendChild(td);
        }
      }
    }
    let isValid = true;
    let newData = null;
    let age = 0;
    let patternDate =
      /^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/([0-9]{4})$/;
    let secondDateP = /^([0-9]{4})-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
    let textPattern = /[^a-zA-Z0-9]+/g;
    let date = new Date();
    let arrayList = [];
    //validate Table
    function validateData(data, index) {
      newData = data.trim();
      switch (index) {
        case 0:
          if (newData.length == 0) {
            document.querySelector("#table").style.display = "none";
            document.querySelector(".somerError").style.display = "block";
            return (isValid = false);
          } else {
            return (isValid = true);
          }
        case 1:
          if (newData.length == 10) {
            return "numb";
          } else if (newData.length == 11 && newData[0] == 1) {
            return "plus";
          } else if (
            newData.length == 12 &&
            newData[0] == "+" &&
            newData[1] == 1
          ) {
            return true;
          } else {
            return false;
          }
        case 2:
          if (
            newData.length == 0 ||
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              newData
            )
          ) {
            return (isValid = false);
          } else {
            return (isValid = true);
          }
        case 3:
          if (
            (!parseInt(newData) && newData.length != 0) ||
            parseInt(newData) < 21
          ) {
            return (isValid = false);
          } else {
            age = parseInt(newData);
            return (isValid = true);
          }
        case 4:
          if (
            (!parseInt(newData) && newData != "" && parseInt(newData) != 0) ||
            parseInt(newData) > age ||
            parseInt(newData) < 0
          ) {
            return (isValid = false);
          } else {
            return (isValid = true);
          }
        case 5:
          if (!parseInt(newData) || 0 > parseInt(newData) > 1000000) {
            return (isValid = false);
          } else {
            return (isValid = true);
          }
        case 6:
          if (newData.toUpperCase() == "TRUE") {
            return true;
          } else if (newData.toUpperCase() == "FALSE") {
            return true;
          } else if (newData.length == 0) {
            return 6;
          } else {
            return false;
          }
        case 7:
          arrayList = newData.split(",");
          let shortName = arrayList.map((word) => {
            let t,
              s = null;
            let newSum = 0;
            let arr = [];
            t = word.trim();
            if (!t.match(/\s/)) {
              s = t.slice(0, 2);
            } else {
              arr = t.split("");
              s = arr.reduce((acc, el, i) => {
                if (el == " ") {
                  newSum = i + 1;
                }
                if (i == newSum) {
                  return acc + el;
                }
                return acc;
              });
            }
            return s;
          });

          newStr = shortName.join(" | ");

          return 7;
        case 8:
          if (
            !patternDate.test(newData) &&
            !secondDateP.test(newData) &&
            newData != ""
          ) {
            return (isValid = false);
          } else if (newData == "") {
            return (isValid = true);
          } else {
            someDate = new Date(newData);
            if (someDate > date) {
              return (isValid = true);
            } else {
              return (isValid = false);
            }
          }
        case 9:
          if (newData.length <= 6 && !textPattern.test(newData)) {
            return (isValid = true);
          } else {
            return (isValid = false);
          }
      }
    }
    //find is tha same data
    function findSame() {
      let arrPhone = document.querySelectorAll(".users__phone");
    }
  },
  false
);
