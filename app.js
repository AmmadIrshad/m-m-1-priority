function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generatePatientData() {
  const arrivalMean = parseFloat(document.getElementById("arrivalMean").value);
  const serviceMean = parseFloat(document.getElementById("serviceMean").value);

  if (isNaN(arrivalMean) || isNaN(serviceMean)) {
    alert(
      "Please enter valid numeric values for Arrival Mean and Service Mean."
    );
    return;
  }

  let x = 0;
  let count = 0;
  let P = 0;
  let cp = [];

  while (P <= 0.999) {
    P += (Math.exp(-arrivalMean) * Math.pow(arrivalMean, x)) / factorial(x);
    let roundedP = P.toFixed(4);
    cp.push(roundedP);
    x++;
    count++;
  }

  let intArr = 0;
  let arrival = 0;
  let service = 0;
  let interArrivalList = [];
  let arrivalList = [];
  let serviceList = [];

  for (let i = 0; i < count; i++) {
    interArrivalList.push(intArr);
    arrivalList.push(arrival);
    intArr = generateRandomNumber(0, count - 1);
    arrival += intArr;
    service = Math.round(-serviceMean * Math.log(Math.random()));
    serviceList.push(service);
  }

  const m = 1994;
  const a = 55;
  const b = 9;
  let xo = 10112166;
  let li = [];
  let lj = [];
  let lk = [];

  const outputTable = document.getElementById("outputTable");
  outputTable.innerHTML = ""; // Clear previous content

  const headerRow = outputTable.insertRow(0);
  headerRow.innerHTML =
    "<th>Patient</th><th>C.P</th><th>Arrival Time</th><th>Service Time</th><th>Priority</th>";

  for (let i = 0; i < count; i++) {
    xo = (a * xo + b) % m;
    li.push(xo);
    let r = xo / m;
    let y = (3 - 1) * r + 1;
    lj.push(r);
    lk.push(Math.round(y));

    const newRow = outputTable.insertRow(i + 1);
    newRow.innerHTML = `<td>${i + 1}</td><td>${cp[i]}</td><td>${
      arrivalList[i]
    }</td><td>${serviceList[i]}</td><td>${lk[i]}</td>`;
  }
}

function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
