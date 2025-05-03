document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      // Save token to localStorage or cookie
      localStorage.setItem('token', data.token);
  
      // Redirect based on role
      const role = data.role;
      if (role === 'Student') window.location.href = '/student dashboard.html';
      else if (role === 'Admin') window.location.href = '/admin dashboard.html';
      else if (role === 'Faculty') window.location.href = '/faculty dashboard.html';
      else if (role === 'HOD') window.location.href = '/hod dashboard.html';
      else if (role === 'Exam_Controller') window.location.href = '/exam dashboard.html';
      else if (role === 'Parent') window.location.href = '/parent dashboard.html';
      else alert('Unknown role!');
    } else {
      alert(data.message || 'Login failed');
    }
  });
  
  