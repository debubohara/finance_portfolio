const app = document.getElementById("app");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.onclick = () => {
  navMenu.classList.toggle("active");
};

let financeData = JSON.parse(localStorage.getItem("finance")) || [];

/* ROUTER */
function loadPage(page){
  if(page==="home") homePage();
  if(page==="projects") projectsPage();
  if(page==="finance") financePage();
  if(page==="contact") contactPage();
}

/* HOME PAGE (CENTERED) */
function homePage(){
  app.innerHTML = `
    <h1>Hello, I'm Deependra Kunwar</h1>
    <p>Welcome to my finance portfolio website. Here you can see my personal finance tracker, investment analysis, and projects built using JavaScript.</p>

    <div class="card">
      <h3>About Me</h3>
      <p>I am passionate about finance, data analysis, and web development. This portfolio showcases my skills and projects, including expense tracking, investment charts, and interactive dashboards.</p>
    </div>
  `;
}

/* PROJECT PAGE */
function projectsPage(){
  app.innerHTML = `
    <h1>Projects</h1>
    <div class="projectsColumn">
      <div class="card">
        <h3>Finance Tracker</h3>
        <p>Tracks expenses and investments with interactive charts.</p>
      </div>

      <div class="card">
        <h3>Expense Analyzer</h3>
        <p>Analyzes spending patterns by category.</p>
      </div>

      <div class="card">
        <h3>Investment Dashboard</h3>
        <p>Shows growth of investments using charts.</p>
      </div>
    </div>
  `;
}

/* FINANCE PAGE */
function financePage(){
  app.innerHTML = `
    <h1>Finance Tracker</h1>
    <form id="financeForm">
      <input id="month" placeholder="Month">
      <input id="expense" type="number" placeholder="Expense">
      <input id="investment" type="number" placeholder="Investment">
      <input id="detail" placeholder="Expense Detail (Food, Rent...)">
      <button>Add</button>
    </form>

    <canvas id="financeChart"></canvas>

    <table>
      <tr>
        <th>Month</th>
        <th>Expense</th>
        <th>Investment</th>
        <th>Detail</th>
      </tr>
      <tbody id="tableData"></tbody>
    </table>
  `;

  document.getElementById("financeForm").addEventListener("submit", addFinance);
  renderTable();
  renderChart();
}

/* ADD FINANCE */
function addFinance(e){
  e.preventDefault();
  const month = document.getElementById("month").value;
  const expense = Number(document.getElementById("expense").value);
  const investment = Number(document.getElementById("investment").value);
  const detail = document.getElementById("detail").value;

  financeData.push({month,expense,investment,detail});
  localStorage.setItem("finance",JSON.stringify(financeData));
  financePage();
}

/* TABLE */
function renderTable(){
  const table = document.getElementById("tableData");
  table.innerHTML = "";
  financeData.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.month}</td>
        <td>${item.expense}</td>
        <td>${item.investment}</td>
        <td>${item.detail}</td>
      </tr>
    `;
  });
}

/* CHART */
function renderChart(){
  const ctx = document.getElementById("financeChart");
  const months = financeData.map(d=>d.month);
  const expenses = financeData.map(d=>d.expense);
  const investments = financeData.map(d=>d.investment);

  new Chart(ctx,{
    type:"bar",
    data:{
      labels:months,
      datasets:[
        {label:"Expenses", data:expenses, backgroundColor:"#ef4444"},
        {label:"Investments", data:investments, backgroundColor:"#0b3c5d"}
      ]
    },
    options:{responsive:true}
  });
}

/* CONTACT PAGE */
function contactPage(){
  app.innerHTML = `
    <h1>Contact Me</h1>
    <input placeholder="Name"><br><br>
    <input placeholder="Email"><br><br>
    <textarea placeholder="Message"></textarea><br><br>
    <button>Send</button>
  `;
}

/* INITIAL LOAD */
loadPage("home");