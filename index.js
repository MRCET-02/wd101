document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    
    var dobInput = document.getElementById('dob');
    var dob = new Date(dobInput.value);
    var age = new Date().getFullYear() - dob.getFullYear();

    if (age < 18 || age > 55) {
      alert('Please enter a valid date of birth between 18 and 55 years old.');
      return;
    }

    
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var acceptedTerms = document.getElementById('terms').checked;

    
    var userData = { name, email, password, dob: dob.toISOString(), acceptedTerms };
    var savedData = JSON.parse(localStorage.getItem('userData')) || [];
    savedData.push(userData);
    localStorage.setItem('userData', JSON.stringify(savedData));
    updateTable();

    this.reset();
  });

  function updateTable() {
    var dataTableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    dataTableBody.innerHTML = ''; 

    var savedData = JSON.parse(localStorage.getItem('userData')) || [];

    savedData.forEach(function(userData) {
      var row = dataTableBody.insertRow();

      var nameCell = row.insertCell(0);
      nameCell.innerHTML = userData.name;

      var emailCell = row.insertCell(1);
      emailCell.innerHTML = userData.email;

      var passwordCell = row.insertCell(2);
      passwordCell.innerHTML = userData.password;

      var dobCell = row.insertCell(3);
      dobCell.innerHTML = userData.dob;

      var termsCell = row.insertCell(4);
      termsCell.innerHTML = userData.acceptedTerms ? 'Yes' : 'No';
    });
};