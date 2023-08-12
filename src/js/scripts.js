var spriteWidth = 49;

window.nzxt = {
  v1: {
    onMonitoringDataUpdate: (data) => {
      const { cpus, gpus, ram } = data;
      var cpuTemp = Math.round(data.cpus[0].temperature);
      var cpuCharge = Math.round((data.cpus[0].load) * 100);
      var gpuTemp = Math.round(data.gpus[0].temperature);
      var gpuCharge = Math.round((data.gpus[0].load) * 100);

      var health = 8;
      for (let i = 1; i <= 8; i++) {
        if (gpuCharge > ((100 / 8) * i)) {
          health--;
        }
      }

      document.getElementById("health").style.background = "url(./src/img/health.png) -" + (spriteWidth * health) + "px 3px no-repeat";
      document.getElementById("infoTop").innerHTML = getInfoContent("CPU", cpuTemp, cpuCharge);
      document.getElementById("infoBottom").innerHTML = getInfoContent("GPU", gpuTemp, gpuCharge);
     }
  }
};

function getInfoContent(label, temp, charge) {
  return label + ": <span class=\"" + getGrade(temp) + "\">" + temp + "c</span>  -  <span class=\"" + getGrade(charge) + "\">" + charge + "%</span>";
}

function getGrade(temp) {
  if (temp > 70) {
    return 'gradeCritical';
  } else if (temp > 50) {
    return 'gradeWarning';
  } else {
    return 'gradeNormal';
  }
}