let errorCounter = 1;

function testFloor(times) {
  const cutOffFloor = moment('04:30:00', 'HH:mm:ss');

  times.forEach((row) => {
    if (row[7] === 'FOOD SERVICE' || row[7] === 'PM HOST') {
      const clockin = row[9].substring(0, 8);
      const clockinTime = moment(clockin, 'HH:mm:ss');

      if (clockinTime.isBefore(cutOffFloor)) {
        alert('Adjust Someone!');
        console.log(row[5]);
        errorCounter += 1;
      }
    }
  });
}

function testBar(times) {
  const cutOffBar = moment('03:30:00', 'HH:mm:ss');

  times.forEach((row) => {
    if (row[7] === 'PM BAR') {
      const clockin = row[9].substring(0, 8);
      const clockinTime = moment(clockin, 'HH:mm:ss');

      if (clockinTime.isBefore(cutOffBar)) {
        alert('Adjust a Bartender!');
        console.log(row[5]);
        errorCounter += 1;
      }
    }
  });
}

function processCSV() {
  const fileInput = document.getElementById('csvFileInput');
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const contents = e.target.result.split('\n').map(row => row.split(','));
      displayCSVContents(contents);
      // Call the test functions
      testFloor(contents);
      testBar(contents);

      if (errorCounter > 0) {
        alert('Issues found!');
      } else {
        alert('No issues');
      }
      
      // Reset error counter for subsequent checks
      errorCounter = 0;
    };

    reader.readAsText(file);
  } else {
    alert('Please select a CSV file.');
  }
}
