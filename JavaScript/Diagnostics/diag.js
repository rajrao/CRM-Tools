
var tests = {
	latency: {
		func: runLatencyTest,
		desc: "Latency Test"
	},
	bandwidth: {
		func: runBandwidthTest,
		desc: "Bandwidth Test"
	},
	browserInfo: {
		func: runBrowserInfoTest,
		desc: "Browser Info"
	},
	ipAddress: {
		func: runIpAddressTest,
		desc: "IP Address"
	},
	jsArrayBenchmark: {
		func: runJsArrayBenchmark,
		desc: "JavaScript Array Benchmark"
	},
	jsMorphBenchmark: {
		func: runJsMorphBenchmark,
		desc: "JavaScript Morph Benchmark"
	},
	jsBase64Benchmark: {
		func: runJsBase64Benchmark,
		desc: "JavaScript Base64 Benchmark"
	},
	jsDomBenchmark: {
		func: runJsDomBenchmark,
		desc: "JavaScript Dom Benchmark"
	},
	orgInfo: {
		func: runOrgInfoTest,
		desc: "Organization Info"
	},
	all: {
		func: runAllTests,
		desc: "All Tests"
	}
},
testQueue = [];
function getTime() {
	var d = new Date;
	return d.getTime()
}
function isArray(testObject) {
	return testObject && !testObject.propertyIsEnumerable("length") && typeof testObject === "object" && typeof testObject.length === "number"
}
function buildTestMatrix() {
	for (var testId in tests) {
		var table = document.getElementById("testsTable"),
		row = document.getElementById("testsTable").insertRow(table.rows.length);
		row.setAttribute("id", "tr_" + testId);
		var descCell = row.insertCell(0);
		descCell.innerHTML = tests[testId]["desc"];
		var actionCell = row.insertCell(1);
		actionCell.innerHTML = window.location.href.indexOf("debug=1") > 0 || testId == "all" ? "       <input type='button' id='runBtn_" + testId + "' value='Run' class='runButton' onclick=\"runTest('" + testId + "')\" />" : "";
		var statusCell = row.insertCell(2);
		statusCell.setAttribute("id", "td_status_" + testId);
		var resultCell = row.insertCell(3);
		resultCell.setAttribute("id", "td_result_" + testId)
	}
}
function appendToResultConsole(txt) {
	var curdate = new Date,
	dstring = curdate.toGMTString(),
	resultConsole = document.getElementById("resultConsole");
	resultConsole.value += txt + "Client Time: " + dstring + "\r\n\r\n";
	setTimeout(function () {
		var resultConsole = document.getElementById("resultConsole");
		resultConsole.scrollTop = resultConsole.scrollHeight
	}, 10)
}
function copyToClipboard() {
	var resultConsole = document.getElementById("resultConsole"),
	clipboard = new XUI.ClipboardManager;
	clipboard.SetData(resultConsole.value)
}
function clearResultConsole() {
	var resultConsole = document.getElementById("resultConsole");
	resultConsole.value = ""
}
function emailResults() {
	var subject = escape("CRM Client Performance Report" + (ORG_UNIQUE_NAME !== "" ? " from [" + ORG_UNIQUE_NAME + "]" : "")),
	body = escape("Please Copy-Paste the results from the CRM Diagnostics window into this e-mail."),
	eMailUrl = "mailto:crmperftalk@microsoft.com?subject=" + subject + "&body=" + body,
	eMailLink = document.getElementById("eMailLink");
	eMailLink &&
	document.body.removeChild(eMailLink);
	eMailLink = document.createElement("a");
	eMailLink.style.display = "none";
	eMailLink.setAttribute("id", "domBenchmarkDiv");
	eMailLink.setAttribute("target", "_self");
	eMailLink.setAttribute("href", eMailUrl);
	document.body.appendChild(eMailLink);
	Mscrm.Utilities.click(eMailLink)
}
function setTestStatus(testId, status, result) {
	var statusTd = document.getElementById("td_status_" + testId),
	resultTd = document.getElementById("td_result_" + testId);
	statusTd.style.color = "";
	if (status == "started")
		statusTd.style.color = "orange";
	else
		if (status == "complete")
			statusTd.style.color = "green";
	statusTd.innerHTML = status == null ? "" : status;
	resultTd.innerHTML = result == null ? "" : result
}
function clearAllSubTestStatuses() {
	for (var i in tests)
		i != "all" &&
		setTestStatus(i)
}
function runTest(testId) {
	setTestStatus(testId, "started");
	var runBtn = document.getElementById("runBtn_" + testId);
	if (runBtn)
		runBtn.disabled = true;
	setTimeout(function () {
		var res = tests[testId]["func"](testId);
		if (testId != "all") {
			setTestStatus(testId, "complete", res);
			if (runBtn)
				runBtn.disabled = false
		}
	}, 20)
}
function runAllTests(testId) {
	clearAllSubTestStatuses();
	var runBtn = document.getElementById("runBtn_" + testId);
	if (runBtn)
		runBtn.disabled = true;
	for (var i in tests)
		i != testId &&
		testQueue.push(i);
	processTestsInTheQueue(function () {
		setTestStatus(testId, "complete");
		if (runBtn)
			runBtn.disabled = false
	})
}
function processTestsInTheQueue(completeCallBack) {
	var testId = testQueue.shift();
	if (testId != null && testId.length > 0) {
		runTest(testId);
		setTimeout(function () {
			processTestsInTheQueue(completeCallBack)
		}, 30)
	} else
		completeCallBack()
}
function runLatencyTest(testId) {
	var trialsToRun = 20,
	results = runDownloadTest("/_static/Tools/Diagnostics/smallfile.txt", trialsToRun),
	testResults = results.testResults,
	txt = "=== Latency Test Info === \r\n";
	txt += "Number of times run: " + trialsToRun + "\r\n";
	for (var avgDownloadTime = 0,
		i = 0; i < testResults.length; i++) {
		txt += "Run " + (i + 1) + " time: " + testResults[i].downloadTime + " ms\r\n";
		avgDownloadTime += testResults[i].downloadTime
	}
	avgDownloadTime = Math.floor(avgDownloadTime / testResults.length);
	txt += "Average latency: " + avgDownloadTime + " ms\r\n";
	appendToResultConsole(txt);
	return avgDownloadTime + " ms"
}
function runBandwidthTest(testId) {
	for (var trialsToRun = 10,
		adaptionSchedule = [{
				speed: 0,
				url: "/_static/Tools/Diagnostics/random100x100.jpg"
			}, {
				speed: .5,
				url: "/_static/Tools/Diagnostics/random350x350.jpg"
			}, {
				speed: 1,
				url: "/_static/Tools/Diagnostics/random750x750.jpg"
			}, {
				speed: 2,
				url: "/_static/Tools/Diagnostics/random1000x1000.jpg"
			}, {
				speed: 4,
				url: "/_static/Tools/Diagnostics/random1500x1500.jpg"
			}
		],
		results = runDownloadTest(adaptionSchedule, trialsToRun),
		testResults = results.testResults,
		txt = "=== Bandwidth Test Info === \r\n",
		i = 0; i < testResults.length; i++) {
		txt += "Run " + (i + 1) + "\r\n";
		txt += "  Time: " + testResults[i].downloadTime + " ms\r\n";
		txt += "  Blob Size: " + testResults[i].downloadedContentLength + " bytes\r\n";
		txt += "  Speed: " + testResults[i].downloadSpeed + " KB/sec\r\n"
	}
	var maxDownloadSpeed = results.maxDownloadSpeed,
	maxDownloadSpeedUnit = "KB/sec";
	if (maxDownloadSpeed > 1024) {
		maxDownloadSpeed = (maxDownloadSpeed / 1024).toFixed(2);
		maxDownloadSpeedUnit = "MB/sec"
	}
	txt += "Max Download speed: " + maxDownloadSpeed + " " + maxDownloadSpeedUnit + "\r\n";
	appendToResultConsole(txt);
	return maxDownloadSpeed + " " + maxDownloadSpeedUnit
}
function runDownloadTest(whatToDownload, trialsToRun) {
	for (var isAdaptiveRun = Array.isArray(whatToDownload),
		testResults = [],
		downloadedContentLength = 0,
		lastRunSpeed = 0,
		prevAdpSpeed = 0,
		i = 0; i < trialsToRun; i++) {
		var url = "";
		if (isAdaptiveRun)
			for (var ai = 0; ai < whatToDownload.length; ai++) {
				var adptFile = whatToDownload[ai];
				if (lastRunSpeed >= adptFile.speed) {
					url = adptFile.url;
					if (prevAdpSpeed < adptFile.speed) {
						i = 0;
						prevAdpSpeed = adptFile.speed
					}
				}
			}
		else
			url = whatToDownload;
		var results = xhrLoad(url);
		testResults.push({
			downloadTime: results.downloadTime,
			downloadedContentLength: results.downloadedContentLength,
			downloadSpeed: Math.floor(results.downloadedContentLength * (1e3 / results.downloadTime) / 1024)
		});
		lastRunSpeed = results.downloadedContentLength * (1e3 / results.downloadTime) / 1024 / 1024
	}
	var maxDownloadSpeed = 0;
	for (var i in testResults)
		if (testResults[i].downloadTime > 0)
			maxDownloadSpeed = Math.max(maxDownloadSpeed, testResults[i].downloadSpeed);
	return {
		testResults: testResults,
		maxDownloadSpeed: maxDownloadSpeed
	}
}
function xhrLoad(url) {
	var xmlhttp = new XMLHttpRequest,
	startTime = getTime(),
	res = 0,
	downloadedContentLength = 0;
	xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var endTime = getTime();
			res = endTime - startTime;
			downloadedContentLength = xmlhttp.getResponseHeader("content-length")
		}
	};
	url += "?_rnd=" + Math.floor(Math.random() * 1e8);
	xmlhttp.open("GET", url, false);
	try {
		xmlhttp.send()
	} catch (e) {}
	return {
		downloadTime: res,
		downloadedContentLength: downloadedContentLength
	}
}
function runBrowserInfoTest(testId) {
	var txt = "=== Browser Info === \r\n";
	txt += "Browser CodeName: " + navigator.appCodeName + "\r\n";
	txt += "Browser Name: " + navigator.appName + "\r\n";
	txt += "Browser Version: " + navigator.appVersion + "\r\n";
	txt += "Cookies Enabled: " + navigator.cookieEnabled + "\r\n";
	txt += "Platform: " + navigator.platform + "\r\n";
	txt += "User-agent header: " + navigator.userAgent + "\r\n";
	appendToResultConsole(txt)
}
function runIpAddressTest(testId) {
	var txt = "=== Machine Info === \r\n";
	txt += "Client IP Address: " + CLIENT_IP_ADDRESS + "\r\n";
	appendToResultConsole(txt)
}
function runJsArrayBenchmark(testId) {
	var startTime = getTime();
	arrayBenchmark();
	var res = getTime() - startTime,
	txt = "=== Array Manipultaion Benchmark === \r\n";
	txt += "Time: " + res + " ms\r\n";
	appendToResultConsole(txt);
	return res + " ms"
}
function runJsMorphBenchmark(testId) {
	var startTime = getTime();
	morphBenchmark();
	var res = getTime() - startTime,
	txt = "=== Morph Benchmark === \r\n";
	txt += "Time: " + res + " ms\r\n";
	appendToResultConsole(txt);
	return res + " ms"
}
function runJsBase64Benchmark(testId) {
	var startTime = getTime();
	base64Benchmark();
	var res = getTime() - startTime,
	txt = "=== Base 64 Benchmark === \r\n";
	txt += "Time: " + res + " ms\r\n";
	appendToResultConsole(txt);
	return res + " ms"
}
function runJsDomBenchmark(testId) {
	var results = domBenchmark(),
	txt = "=== DOM Benchmark === \r\n";
	txt += "Total Time: " + results[0] + " ms\r\n";
	txt += results[1];
	appendToResultConsole(txt);
	return results[0] + " ms"
}
function runOrgInfoTest(testId) {
	var txt = "=== Organization Info === \r\n";
	txt += "Organization name: " + ORG_UNIQUE_NAME + "\r\n";
	txt += "Is Live: " + IS_LIVE + "\r\n";
	txt += "Server time: " + SERVER_TIME + "\r\n";
	txt += "Url: " + window.location + "\r\n";
	appendToResultConsole(txt);
	return ORG_UNIQUE_NAME
}
window.onload = function () {
	buildTestMatrix()
}
