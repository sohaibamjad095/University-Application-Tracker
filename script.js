 universities =
JSON.parse(
    localStorage.getItem("universities")
) || [];

function addUniversity(){

    const uniName =
        document.getElementById("uniName").value.trim();

    const country =
        document.getElementById("country").value.trim();

    const deadline =
        document.getElementById("deadline").value;

    const ielts =
        document.getElementById("ielts").value.trim();

    const sat =
        document.getElementById("sat").value.trim();

    const scholarship =
        document.getElementById("scholarship").value.trim();

    const status =
        document.getElementById("status").value;

    if(
        !uniName ||
        !country ||
        !deadline
    ){
        alert("Please fill required fields");
        return;
    }
const today =
new Date();

const deadlineDate =
new Date(deadline);

const daysLeft =
Math.ceil(
(deadlineDate - today)
/
(1000*60*60*24)
);

let priority = "Low";

if(daysLeft <= 7){
    priority = "High";
}
else if(daysLeft <= 30){
    priority = "Medium";
}
    universities.push({
        uniName,
        country,
        deadline,
        ielts,
        sat,
        scholarship,
        status,
        priority
    });

    saveData();
    displayUniversities();

    updateDashboard();

    clearInputs();
}

function displayUniversities(){
    const universityList =
        document.getElementById("universityList");

    universityList.innerHTML = "";

    universities.forEach((uni,index)=>{

        const card =
    document.createElement("div");

card.classList.add("university-card");
const daysLeft =
Math.ceil(
(
new Date(uni.deadline) -
new Date()
) / (1000 * 60 * 60 * 24)
);
let deadlineColor = "green";

if(daysLeft <= 7){
    deadlineColor = "red";
}
else if(daysLeft <= 30){
    deadlineColor = "orange";
}
        card.innerHTML = `
            <h2>${uni.uniName}</h2>

            <p><b>Country:</b> ${uni.country}</p>

            <p><b>Deadline:</b> ${uni.deadline}</p>
            <p>
⏳ ${
Math.ceil(
(new Date(uni.deadline) - new Date()) /
(1000 * 60 * 60 * 24)
)
} Days Left
</p>
${
Math.ceil(
(new Date(uni.deadline) - new Date()) /
(1000 * 60 * 60 * 24)
) <= 7
?
'<p style="color:red;"><b>⚠ Deadline Soon!</b></p>'
:
''
}
            <p><b>IELTS:</b> ${uni.ielts}</p>

            <p><b>SAT:</b> ${uni.sat}</p>

            <p><b>Scholarship:</b> ${uni.scholarship}</p>
<p><b>Priority:</b> ${uni.priority}</p>
            <p>
<b>Status:</b>
<span class="${uni.status.toLowerCase().replace(/\s/g,'')}">
${uni.status}
</span>
</p>

            <button onclick="deleteUniversity(${index})">
                Delete
            </button>
            <button onclick="editUniversity(${index})">
                Edit
            </button>
        `;

        universityList.appendChild(card);

    });

}

function deleteUniversity(index){

    universities.splice(index,1);
saveData();
    displayUniversities();

    updateDashboard();

}

function updateDashboard(){

    const total =
        universities.length;

    const submitted =
        universities.filter(
            uni => uni.status === "Submitted"
        ).length;

    const accepted =
        universities.filter(
            uni => uni.status === "Accepted"
        ).length;

    document.getElementById(
        "totalUniversities"
    ).textContent = total;

    document.getElementById(
        "submittedCount"
    ).textContent = submitted;

    document.getElementById(
        "acceptedCount"
    ).textContent = accepted;

    let progress = 0;

    if(total > 0){

        progress = Math.round(
            (submitted / total) * 100
        );

    }

    document.getElementById(
        "progressText"
    ).textContent =
        "Progress: " + progress + "%";

    document.getElementById(
        "progressBar"
    ).style.width =
        progress + "%";

}

function clearInputs(){

    document.getElementById("uniName").value = "";

    document.getElementById("country").value = "";

    document.getElementById("deadline").value = "";

    document.getElementById("ielts").value = "";

    document.getElementById("sat").value = "";

    document.getElementById("scholarship").value = "";

}
function saveData(){

    localStorage.setItem(
        "universities",
        JSON.stringify(universities)
    );

}
displayUniversities();
updateTimeline();
function updateTimeline(){

    const timeline =
    document.getElementById(
        "timeline"
    );

    timeline.innerHTML = "";

    const sorted =
    [...universities].sort(
        (a,b)=>
        new Date(a.deadline) -
        new Date(b.deadline)
    );

    sorted.forEach(uni => {

        timeline.innerHTML += `
        <div class="university-card">
            <b>${uni.uniName}</b>
            <br>
            ${uni.deadline}
        </div>
        `;

    });

}
updateDashboard();
function searchUniversities(){

    const search =
    document
    .getElementById("searchInput")
    .value
    .toLowerCase();

    const cards =
    document.querySelectorAll(
        ".university-card"
    );

    cards.forEach(card => {

        if(
            card.innerText
            .toLowerCase()
            .includes(search)
        ){
            card.style.display = "block";
        }
        else{
            card.style.display = "none";
        }

    });

}
function editUniversity(index){

    const uni = universities[index];

    document.getElementById("uniName").value =
        uni.uniName;

    document.getElementById("country").value =
        uni.country;

    document.getElementById("deadline").value =
        uni.deadline;

    document.getElementById("ielts").value =
        uni.ielts;

    document.getElementById("sat").value =
        uni.sat;

    document.getElementById("scholarship").value =
        uni.scholarship;

    document.getElementById("status").value =
        uni.status;

    universities.splice(index,1);

    saveData();

    displayUniversities();

    updateDashboard();

}
function exportCSV(){

    let csv =
    "University,Country,Deadline,IELTS,SAT,Scholarship,Status\n";

    universities.forEach(uni => {

        csv +=
        `${uni.uniName},${uni.country},${uni.deadline},${uni.ielts},${uni.sat},${uni.scholarship},${uni.status}\n`;

    });

    const blob =
    new Blob(
        [csv],
        {type:"text/csv"}
    );

    const url =
    window.URL.createObjectURL(blob);

    const a =
    document.createElement("a");

    a.href = url;

    a.download =
    "universities.csv";

    a.click();

}
function filterCountry(){

    const selected =
    document.getElementById(
        "countryFilter"
    ).value;

    const cards =
    document.querySelectorAll(
        ".university-card"
    );

    cards.forEach(card => {

        if(
            selected === "All" ||
            card.innerText.includes(selected)
        ){
            card.style.display = "block";
        }
        else{
            card.style.display = "none";
        }

    });

}
function calculateChance(){

    const grade =
    Number(
        document.getElementById(
            "gradeInput"
        ).value
    );

    const sat =
    Number(
        document.getElementById(
            "satInput"
        ).value
    );

    const ielts =
    Number(
        document.getElementById(
            "ieltsInput"
        ).value
    );

    let chance = 0;

    chance += grade * 0.4;
    chance += (sat / 1600) * 40;
    chance += (ielts / 9) * 20;

    chance = Math.round(chance);

    document.getElementById(
        "chanceResult"
    ).textContent =
    "Admission Chance: " +
    chance +
    "%";

}
function checkScholarship(){

    const grade =
    Number(
        document.getElementById(
            "scholarshipGrade"
        ).value
    );

    const sat =
    Number(
        document.getElementById(
            "scholarshipSAT"
        ).value
    );

    let result = "";

    if(
        grade >= 85 &&
        sat >= 1400
    ){
        result =
        "🏆 High Scholarship Eligibility";
    }
    else if(
        grade >= 75 &&
        sat >= 1200
    ){
        result =
        "🥈 Moderate Scholarship Eligibility";
    }
    else{
        result =
        "📚 Limited Scholarship Eligibility";
    }

    document.getElementById(
        "scholarshipResult"
    ).textContent =
    result;

}
function toggleDarkMode(){

    document.body.classList.toggle("light-mode");

}
function sortByDeadline(){

    universities.sort((a,b)=>{
        return new Date(a.deadline) - new Date(b.deadline);
    });

    saveData();
    displayUniversities();
    updateDashboard();
}
function sortByStatus(){

    const order = {
        "Accepted": 1,
        "Submitted": 2,
        "In Progress": 3,
        "Rejected": 4
    };

    universities.sort((a,b)=>{
        return order[a.status] - order[b.status];
    });

    saveData();
    displayUniversities();
    updateDashboard();
}